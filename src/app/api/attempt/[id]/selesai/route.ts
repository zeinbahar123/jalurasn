import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { getSoalPaket } from "@/lib/soal";
import {
  hitungNilai,
  jawabanBenar,
  poinSoal,
  OPSI,
  type OpsiKey,
} from "@/lib/skd";

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
    return NextResponse.json(
      { error: "Belum masuk." },
      { status: 401 },
    );
  }

  const { id } = await params;

  let body: {
    jawaban?: JawabanMasuk[];
    otomatis?: boolean;
  } = {};

  try {
    body = await req.json();
  } catch {
    /* body opsional */
  }

  // =========================================================
  // AMBIL ATTEMPT
  // =========================================================

  const attempt = await prisma.attempt.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userId: true,
      paketId: true,
      status: true,
      mulaiPada: true,
      batasPada: true,
    },
  });

  // Attempt harus benar-benar milik user yang sedang login.
  if (!attempt || attempt.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Sesi tidak ditemukan." },
      { status: 404 },
    );
  }

  // =========================================================
  // CEK PAKET
  // =========================================================

  const paket = getPaket(attempt.paketId);

  if (!paket) {
    return NextResponse.json(
      { error: "Paket try out tidak ditemukan." },
      { status: 404 },
    );
  }

  // =========================================================
  // PENGAMAN PREMIUM
  //
  // Paket 1       = GRATIS
  // Paket 2–10    = PREMIUM
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
      return NextResponse.json(
        { error: "Akun tidak ditemukan." },
        { status: 401 },
      );
    }

    if (user.subscription !== "PREMIUM") {
      return NextResponse.json(
        {
          error: "Paket ini khusus untuk pengguna Premium.",
          kode: "PREMIUM_REQUIRED",
        },
        { status: 403 },
      );
    }
  }

  // =========================================================
  // IDEMPOTEN
  //
  // Kalau sudah selesai, tidak dihitung ulang.
  // =========================================================

  if (attempt.status !== "BERLANGSUNG") {
    return NextResponse.json({
      ok: true,
      attemptId: attempt.id,
      sudahSelesai: true,
    });
  }

  // =========================================================
  // AMBIL SOAL
  // =========================================================

  const soalPaket = getSoalPaket(attempt.paketId);

  const petaSoal = new Map(
    soalPaket.map((s) => [s.id, s]),
  );

  // =========================================================
  // SIMPAN SISA JAWABAN DARI KLIEN
  // =========================================================

  const kiriman = Array.isArray(body.jawaban)
    ? body.jawaban.slice(0, 200)
    : [];

  if (kiriman.length > 0) {
    const ops = [];

    for (const item of kiriman) {
      const soal = petaSoal.get(item.soalId);

      if (!soal) continue;

      const jwb =
        item.jawaban &&
        OPSI.includes(
          item.jawaban.toUpperCase() as OpsiKey,
        )
          ? (item.jawaban.toUpperCase() as OpsiKey)
          : null;

      const detikDipakai = Math.max(
        0,
        Math.min(
          60 * 60 * 3,
          Math.floor(item.detikDipakai ?? 0),
        ),
      );

      ops.push(
        prisma.attemptAnswer.upsert({
          where: {
            attemptId_soalId: {
              attemptId: attempt.id,
              soalId: soal.id,
            },
          },

          create: {
            attemptId: attempt.id,
            soalId: soal.id,
            nomor: soal.nomor,
            kategori: soal.kat,
            jawaban: jwb,
            raguRagu: !!item.raguRagu,
            detikDipakai,
          },

          update: {
            jawaban: jwb,
            raguRagu: !!item.raguRagu,
            detikDipakai,
          },
        }),
      );
    }

    if (ops.length > 0) {
      await prisma.$transaction(ops);
    }
  }

  // =========================================================
  // AMBIL SELURUH JAWABAN TERSIMPAN
  // =========================================================

  const tersimpan = await prisma.attemptAnswer.findMany({
    where: {
      attemptId: attempt.id,
    },
    select: {
      soalId: true,
      jawaban: true,
    },
  });

  const petaJawaban: Record<string, string | null> = {};

  for (const a of tersimpan) {
    petaJawaban[a.soalId] = a.jawaban;
  }

  // =========================================================
  // HITUNG NILAI DI SERVER
  // =========================================================

  const nilai = hitungNilai(
    soalPaket,
    petaJawaban,
  );

  // =========================================================
  // SIMPAN NILAI BENAR & POIN PER SOAL
  // =========================================================

  const updatePoin = tersimpan
    .map((a) => {
      const soal = petaSoal.get(a.soalId);

      if (!soal) return null;

      return prisma.attemptAnswer.update({
        where: {
          attemptId_soalId: {
            attemptId: attempt.id,
            soalId: a.soalId,
          },
        },

        data: {
          poin: poinSoal(soal, a.jawaban),
          benar: jawabanBenar(soal, a.jawaban),
        },
      });
    })
    .filter(Boolean) as ReturnType<
    typeof prisma.attemptAnswer.update
  >[];

  if (updatePoin.length > 0) {
    await prisma.$transaction(updatePoin);
  }

  // =========================================================
  // HITUNG DURASI
  // =========================================================

  const sekarang = new Date();

  const batas = attempt.batasPada.getTime();

  const selesaiPada =
    sekarang.getTime() > batas
      ? attempt.batasPada
      : sekarang;

  const durasiDetik = Math.max(
    0,
    Math.round(
      (selesaiPada.getTime() -
        attempt.mulaiPada.getTime()) /
        1000,
    ),
  );

  // =========================================================
  // SELESAIKAN ATTEMPT
  // =========================================================

  await prisma.attempt.update({
    where: {
      id: attempt.id,
    },

    data: {
      // Waktu habis tetap dinilai.
      // Perilaku ini sama dengan auto-submit.
      status: "SELESAI",
      selesaiPada,
      durasiDetik,
      ...nilai,
    },
  });

  return NextResponse.json({
    ok: true,
    attemptId: attempt.id,
    ...nilai,
  });
}