import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { getSoalPaket } from "@/lib/soal";
import {
  RuangUjian,
  type SoalUjianKlien,
  type JawabanAwal,
} from "@/components/ruang-ujian";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sedang Mengerjakan Try Out",
  robots: { index: false, follow: false },
};

export default async function HalamanUjian({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/masuk?lanjut=/ujian/${id}`);
  }

  // =========================================================
  // AMBIL ATTEMPT
  // =========================================================

  const attempt = await prisma.attempt.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      paketId: true,
      status: true,
      batasPada: true,
    },
  });

  // Attempt harus benar-benar milik user yang sedang login.
  if (!attempt || attempt.userId !== session.user.id) {
    notFound();
  }

  // Jika sudah selesai, langsung ke halaman hasil.
  if (attempt.status !== "BERLANGSUNG") {
    redirect(`/hasil/${attempt.id}`);
  }

  // =========================================================
  // CEK PAKET
  // =========================================================

  const paket = getPaket(attempt.paketId);

  if (!paket) {
    notFound();
  }

  // =========================================================
  // PENGAMAN PREMIUM
  //
  // Paket 1       = GRATIS
  // Paket 2–10    = PREMIUM
  //
  // Walaupun seseorang mencoba membuka URL /ujian/[id]
  // secara langsung, akses tetap diperiksa di server.
  // =========================================================

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

    if (!user) {
      redirect(`/masuk?lanjut=/ujian/${id}`);
    }

    if (user.subscription !== "PREMIUM") {
      redirect("/upgrade");
    }
  }

  // =========================================================
  // SIAPKAN SOAL UNTUK BROWSER
  // =========================================================

  const soalLengkap = getSoalPaket(attempt.paketId);

  // Kunci jawaban & pembahasan TIDAK dikirim ke browser
  // selama ujian berlangsung.
  const soal: SoalUjianKlien[] = soalLengkap.map((s) => ({
    id: s.id,
    nomor: s.nomor,
    kat: s.kat,
    sub: s.sub,
    q: s.q,
    ...(s.pre ? { pre: s.pre } : {}),
    o: s.o,
  }));

  // =========================================================
  // AMBIL JAWABAN YANG SUDAH TERSIMPAN
  // =========================================================

  const tersimpan = await prisma.attemptAnswer.findMany({
    where: {
      attemptId: attempt.id,
    },
    select: {
      soalId: true,
      jawaban: true,
      raguRagu: true,
      detikDipakai: true,
    },
  });

  const jawabanAwal: Record<string, JawabanAwal> = {};

  for (const a of tersimpan) {
    jawabanAwal[a.soalId] = {
      jawaban: a.jawaban,
      raguRagu: a.raguRagu,
      detikDipakai: a.detikDipakai,
    };
  }

  // =========================================================
  // RENDER RUANG UJIAN
  // =========================================================

  return (
    <RuangUjian
      attemptId={attempt.id}
      paketNama={paket.nama}
      paketSlug={paket.slug}
      soal={soal}
      batasPadaISO={attempt.batasPada.toISOString()}
      jawabanAwal={jawabanAwal}
    />
  );
}