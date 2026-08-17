import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSoalPaket } from "@/lib/soal";
import { hitungNilai, jawabanBenar, poinSoal, OPSI, type OpsiKey } from "@/lib/skd";

export const dynamic = "force-dynamic";

interface JawabanMasuk {
  soalId: string;
  jawaban: string | null;
  raguRagu?: boolean;
  detikDipakai?: number;
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }

  const { id } = await params;

  let body: { jawaban?: JawabanMasuk[]; otomatis?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    /* body opsional */
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id },
    select: {
      id: true,
      userId: true,
      paketId: true,
      status: true,
      mulaiPada: true,
      batasPada: true,
    },
  });

  if (!attempt || attempt.userId !== session.user.id) {
    return NextResponse.json({ error: "Sesi tidak ditemukan." }, { status: 404 });
  }

  // Idempoten: kalau sudah selesai, arahkan saja ke hasil.
  if (attempt.status !== "BERLANGSUNG") {
    return NextResponse.json({ ok: true, attemptId: attempt.id, sudahSelesai: true });
  }

  const soalPaket = getSoalPaket(attempt.paketId);
  const petaSoal = new Map(soalPaket.map((s) => [s.id, s]));

  // 1) Simpan sisa jawaban yang mungkin belum sempat ter-flush dari klien.
  const kiriman = Array.isArray(body.jawaban) ? body.jawaban.slice(0, 200) : [];
  if (kiriman.length > 0) {
    const ops = [];
    for (const item of kiriman) {
      const soal = petaSoal.get(item.soalId);
      if (!soal) continue;
      const jwb =
        item.jawaban && OPSI.includes(item.jawaban.toUpperCase() as OpsiKey)
          ? (item.jawaban.toUpperCase() as OpsiKey)
          : null;
      ops.push(
        prisma.attemptAnswer.upsert({
          where: { attemptId_soalId: { attemptId: attempt.id, soalId: soal.id } },
          create: {
            attemptId: attempt.id,
            soalId: soal.id,
            nomor: soal.nomor,
            kategori: soal.kat,
            jawaban: jwb,
            raguRagu: !!item.raguRagu,
            detikDipakai: Math.max(0, Math.floor(item.detikDipakai ?? 0)),
          },
          update: {
            jawaban: jwb,
            raguRagu: !!item.raguRagu,
            detikDipakai: Math.max(0, Math.floor(item.detikDipakai ?? 0)),
          },
        }),
      );
    }
    if (ops.length) await prisma.$transaction(ops);
  }

  // 2) Ambil seluruh jawaban tersimpan, lalu koreksi di server.
  const tersimpan = await prisma.attemptAnswer.findMany({
    where: { attemptId: attempt.id },
    select: { soalId: true, jawaban: true },
  });

  const petaJawaban: Record<string, string | null> = {};
  for (const a of tersimpan) petaJawaban[a.soalId] = a.jawaban;

  const nilai = hitungNilai(soalPaket, petaJawaban);

  // 3) Tandai benar/poin pada tiap baris jawaban (untuk halaman pembahasan).
  const updatePoin = tersimpan
    .map((a) => {
      const soal = petaSoal.get(a.soalId);
      if (!soal) return null;
      return prisma.attemptAnswer.update({
        where: { attemptId_soalId: { attemptId: attempt.id, soalId: a.soalId } },
        data: {
          poin: poinSoal(soal, a.jawaban),
          benar: jawabanBenar(soal, a.jawaban),
        },
      });
    })
    .filter(Boolean) as ReturnType<typeof prisma.attemptAnswer.update>[];

  if (updatePoin.length) await prisma.$transaction(updatePoin);

  const sekarang = new Date();
  const batas = attempt.batasPada.getTime();
  const selesaiPada = sekarang.getTime() > batas ? attempt.batasPada : sekarang;
  const durasiDetik = Math.max(
    0,
    Math.round((selesaiPada.getTime() - attempt.mulaiPada.getTime()) / 1000),
  );

  await prisma.attempt.update({
    where: { id: attempt.id },
    data: {
      // Waktu habis tetap dinilai (sama seperti auto-submit CAT BKN).
      status: "SELESAI",
      selesaiPada,
      durasiDetik,
      ...nilai,
    },
  });

  return NextResponse.json({ ok: true, attemptId: attempt.id, ...nilai });
}
