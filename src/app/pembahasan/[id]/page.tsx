import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { getSoalPaket } from "@/lib/soal";
import { SKOR_MAKS_TOTAL, poinSoal } from "@/lib/skd";
import { Card, ButtonLink } from "@/components/ui";
import {
  PanelPembahasan,
  type SoalPembahasan,
} from "@/components/panel-pembahasan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pembahasan Try Out SKD",
  robots: { index: false, follow: false },
};

export default async function HalamanPembahasan({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/masuk?lanjut=/pembahasan/${id}`);
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      paketId: true,
      status: true,
      skorTotal: true,
      skorTWK: true,
      skorTIU: true,
      skorTKP: true,
      lulusSemua: true,
      answers: {
        select: {
          soalId: true,
          jawaban: true,
          raguRagu: true,
        },
      },
    },
  });

  if (!attempt || attempt.userId !== session.user.id) {
    notFound();
  }

  if (attempt.status === "BERLANGSUNG") {
    redirect(`/ujian/${attempt.id}`);
  }

  const paket = getPaket(attempt.paketId);

  if (!paket) {
    notFound();
  }

  // ============================================================
  // PROTEKSI PREMIUM
  // Paket 1 = Gratis
  // Paket 2–10 = Premium
  // ============================================================
  const paketPremium = paket.nomor > 1;

  if (paketPremium) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        subscription: true,
      },
    });

    if (!user || user.subscription !== "PREMIUM") {
      redirect("/upgrade");
    }
  }

  const soalPaket = getSoalPaket(attempt.paketId);

  const petaJawab = new Map(
    attempt.answers.map((a) => [
      a.soalId,
      {
        jawaban: a.jawaban,
        ragu: a.raguRagu,
      },
    ]),
  );

  // Jumlah komentar per soal (untuk badge)
  const hitungKomentar = await prisma.comment.groupBy({
    by: ["soalId"],
    where: {
      paketId: paket.id,
      dihapus: false,
    },
    _count: {
      _all: true,
    },
  });

  const petaKomentar = new Map(
    hitungKomentar.map((h) => [
      h.soalId,
      h._count._all,
    ]),
  );

  const soal: SoalPembahasan[] = soalPaket.map((s) => {
    const jw = petaJawab.get(s.id);

    return {
      id: s.id,
      nomor: s.nomor,
      kat: s.kat,
      sub: s.sub,
      q: s.q,
      ...(s.pre ? { pre: s.pre } : {}),
      o: s.o,
      ...(s.k ? { kunci: s.k } : {}),
      ...(s.s ? { bobot: s.s } : {}),
      pembahasan: s.p,
      jawabanSaya: jw?.jawaban ?? null,
      poin: poinSoal(s, jw?.jawaban ?? null),
      ragu: jw?.ragu ?? false,
      jumlahKomentar: petaKomentar.get(s.id) ?? 0,
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href={`/hasil/${attempt.id}`}
        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        ← Kembali ke hasil
      </Link>

      <div className="mt-5">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Pembahasan — {paket.nama}
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Skor Anda {attempt.skorTotal}/{SKOR_MAKS_TOTAL} · TWK{" "}
          {attempt.skorTWK} · TIU {attempt.skorTIU} · TKP{" "}
          {attempt.skorTKP}
        </p>
      </div>

      <Card className="mt-6 p-5">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Baca pembahasan soal yang{" "}
          <strong>salah dan yang Anda tandai ragu</strong> lebih dulu
          — dua kelompok inilah yang menyimpan tambahan skor terbesar.
          Kalau setelah membaca pembahasan masih ada yang mengganjal,
          tekan tombol <strong>Diskusi</strong> di bawah soal dan
          tanyakan langsung. Peserta lain dan mentor yang sudah lolos
          bisa ikut menjawab di sana.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <ButtonLink
            href={`/tryout/${paket.slug}`}
            varian="sekunder"
            ukuran="sm"
          >
            Kerjakan ulang paket ini
          </ButtonLink>

          <ButtonLink
            href="/tryout"
            varian="halus"
            ukuran="sm"
          >
            Paket try out lainnya
          </ButtonLink>
        </div>
      </Card>

      <div className="mt-8">
        <PanelPembahasan
          paketId={paket.id}
          soal={soal}
          bisaKomentar={!!session.user.id}
        />
      </div>
    </div>
  );
}