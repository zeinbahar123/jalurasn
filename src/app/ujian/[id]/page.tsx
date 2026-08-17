import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { getSoalPaket } from "@/lib/soal";
import { RuangUjian, type SoalUjianKlien, type JawabanAwal } from "@/components/ruang-ujian";

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
  if (!session?.user?.id) redirect(`/masuk?lanjut=/ujian/${id}`);

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

  if (!attempt || attempt.userId !== session.user.id) notFound();
  if (attempt.status !== "BERLANGSUNG") redirect(`/hasil/${attempt.id}`);

  const paket = getPaket(attempt.paketId);
  if (!paket) notFound();

  const soalLengkap = getSoalPaket(attempt.paketId);
  // Kunci jawaban & pembahasan TIDAK dikirim ke browser saat ujian berlangsung.
  const soal: SoalUjianKlien[] = soalLengkap.map((s) => ({
    id: s.id,
    nomor: s.nomor,
    kat: s.kat,
    sub: s.sub,
    q: s.q,
    ...(s.pre ? { pre: s.pre } : {}),
    o: s.o,
  }));

  const tersimpan = await prisma.attemptAnswer.findMany({
    where: { attemptId: attempt.id },
    select: { soalId: true, jawaban: true, raguRagu: true, detikDipakai: true },
  });

  const jawabanAwal: Record<string, JawabanAwal> = {};
  for (const a of tersimpan) {
    jawabanAwal[a.soalId] = {
      jawaban: a.jawaban,
      raguRagu: a.raguRagu,
      detikDipakai: a.detikDipakai,
    };
  }

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
