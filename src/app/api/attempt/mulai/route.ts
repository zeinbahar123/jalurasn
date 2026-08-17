import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { DURASI_MENIT_DISABILITAS } from "@/lib/skd";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Silakan masuk terlebih dahulu." }, { status: 401 });
  }

  let body: { paketId?: string; waktuTambahan?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const paket = getPaket(body.paketId ?? "");
  if (!paket) {
    return NextResponse.json({ error: "Paket try out tidak ditemukan." }, { status: 404 });
  }

  const userId = session.user.id;
  const sekarang = new Date();

  // Sudah ada sesi yang masih berjalan? Lanjutkan, jangan bikin baru.
  const berjalan = await prisma.attempt.findFirst({
    where: { userId, paketId: paket.id, status: "BERLANGSUNG" },
    orderBy: { mulaiPada: "desc" },
  });

  if (berjalan) {
    if (berjalan.batasPada > sekarang) {
      return NextResponse.json({ attemptId: berjalan.id, melanjutkan: true });
    }
    // Waktunya sudah lewat — biarkan halaman ujian memicu auto-submit.
    return NextResponse.json({ attemptId: berjalan.id, melanjutkan: true, kadaluarsa: true });
  }

  const durasiMenit = body.waktuTambahan ? DURASI_MENIT_DISABILITAS : paket.durasiMenit;
  const batasPada = new Date(sekarang.getTime() + durasiMenit * 60_000);

  const attempt = await prisma.attempt.create({
    data: {
      userId,
      paketId: paket.id,
      mulaiPada: sekarang,
      batasPada,
      status: "BERLANGSUNG",
    },
    select: { id: true },
  });

  return NextResponse.json({ attemptId: attempt.id, melanjutkan: false });
}
