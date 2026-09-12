import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { getSoalPaket } from "@/lib/soal";
import { OPSI, type OpsiKey } from "@/lib/skd";

export const dynamic = "force-dynamic";

interface JawabanMasuk {
  soalId: string;
  jawaban: string | null;
  raguRagu?: boolean;
  detikDipakai?: number;
}

/** Toleransi 20 detik untuk jeda jaringan saat waktu hampir habis. */
const TOLERANSI_MS = 20_000;

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

  let body: { jawaban?: JawabanMasuk[] };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Body tidak valid." },
      { status: 400 },
    );
  }

  const daftar = Array.isArray(body.jawaban)
    ? body.jawaban.slice(0, 200)
    : [];

  if (daftar.length === 0) {
    return NextResponse.json({
      ok: true,
      tersimpan: 0,
    });
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
      batasPada: true,
    },
  });

  // Attempt harus milik user yang sedang login.
  if (!attempt || attempt.userId !== session.user.id) {
    return NextResponse.json(
      { error: "Sesi tidak ditemukan." },
      { status: 404 },
    );
  }

  // =========================================================
  // CEK PAKET PREMIUM
  //
  // Paket 1       = GRATIS
  // Paket 2–10    = PREMIUM
  // =========================================================

  const paket = getPaket(attempt.paketId);

  if (!paket) {
    return NextResponse.json(
      { error: "Paket try out tidak ditemukan." },
      { status: 404 },
    );
  }

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
  // CEK STATUS SESI
  // =========================================================

  if (attempt.status !== "BERLANGSUNG") {
    return NextResponse.json(
      {
        error: "Sesi sudah selesai.",
        selesai: true,
      },
      { status: 409 },
    );
  }

  // =========================================================
  // CEK BATAS WAKTU
  // =========================================================

  if (
    Date.now() >
    attempt.batasPada.getTime() + TOLERANSI_MS
  ) {
    return NextResponse.json(
      {
        error: "Waktu pengerjaan sudah habis.",
        habis: true,
      },
      { status: 409 },
    );
  }

  // =========================================================
  // VALIDASI SOAL
  // =========================================================

  const soalPaket = getSoalPaket(attempt.paketId);
  const petaSoal = new Map(
    soalPaket.map((s) => [s.id, s]),
  );

  const operasi = [];

  for (const item of daftar) {
    const soal = petaSoal.get(item.soalId);

    // Abaikan soal yang bukan bagian dari paket ini.
    if (!soal) continue;

    const jwb =
      item.jawaban &&
      OPSI.includes(
        item.jawaban.toUpperCase() as OpsiKey,
      )
        ? (item.jawaban.toUpperCase() as OpsiKey)
        : null;

    const ragu = !!item.raguRagu;

    const detik = Math.max(
      0,
      Math.min(
        60 * 60 * 3,
        Math.floor(item.detikDipakai ?? 0),
      ),
    );

    operasi.push(
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
          raguRagu: ragu,
          detikDipakai: detik,
        },

        update: {
          jawaban: jwb,
          raguRagu: ragu,
          detikDipakai: detik,
        },
      }),
    );
  }

  // =========================================================
  // SIMPAN JAWABAN
  // =========================================================

  if (operasi.length > 0) {
    await prisma.$transaction(operasi);
  }

  return NextResponse.json({
    ok: true,
    tersimpan: operasi.length,
  });
}