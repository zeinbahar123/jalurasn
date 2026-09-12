import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { DURASI_MENIT_DISABILITAS } from "@/lib/skd";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Silakan masuk terlebih dahulu." },
      { status: 401 }
    );
  }

  let body: {
    paketId?: string;
    waktuTambahan?: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Body tidak valid." },
      { status: 400 }
    );
  }

  const paket = getPaket(body.paketId ?? "");

  if (!paket) {
    return NextResponse.json(
      { error: "Paket try out tidak ditemukan." },
      { status: 404 }
    );
  }

  const userId = session.user.id;

  // =========================================================
  // CEK STATUS PREMIUM
  // Paket 1 = GRATIS
  // Paket 2–10 = PREMIUM
  // =========================================================

  const paketPremium = paket.nomor > 1;

  if (paketPremium) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Akun tidak ditemukan. Silakan masuk kembali." },
        { status: 401 }
      );
    }

    if (user.subscription !== "PREMIUM") {
      return NextResponse.json(
        {
          error: "Paket ini khusus untuk pengguna Premium.",
          kode: "PREMIUM_REQUIRED",
        },
        { status: 403 }
      );
    }
  }

  // =========================================================
  // CEK SESI YANG MASIH BERJALAN
  // =========================================================

  const sekarang = new Date();

  const berjalan = await prisma.attempt.findFirst({
    where: {
      userId,
      paketId: paket.id,
      status: "BERLANGSUNG",
    },
    orderBy: {
      mulaiPada: "desc",
    },
  });

  if (berjalan) {
    if (berjalan.batasPada > sekarang) {
      return NextResponse.json({
        attemptId: berjalan.id,
        melanjutkan: true,
      });
    }

    // Waktu sudah lewat.
    // Halaman ujian akan menangani auto-submit.
    return NextResponse.json({
      attemptId: berjalan.id,
      melanjutkan: true,
      kadaluarsa: true,
    });
  }

  // =========================================================
  // BUAT SESI TRY OUT BARU
  // =========================================================

  const durasiMenit = body.waktuTambahan
    ? DURASI_MENIT_DISABILITAS
    : paket.durasiMenit;

  const batasPada = new Date(
    sekarang.getTime() + durasiMenit * 60_000
  );

  const attempt = await prisma.attempt.create({
    data: {
      userId,
      paketId: paket.id,
      mulaiPada: sekarang,
      batasPada,
      status: "BERLANGSUNG",
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({
    attemptId: attempt.id,
    melanjutkan: false,
  });
}