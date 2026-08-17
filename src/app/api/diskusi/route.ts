import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getSoalById } from "@/lib/soal";

export const dynamic = "force-dynamic";

const MAKS_KARAKTER = 1500;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const soalId = searchParams.get("soalId");
  if (!soalId) {
    return NextResponse.json({ error: "soalId wajib diisi." }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id ?? null;

  const komentar = await prisma.comment.findMany({
    where: { soalId, dihapus: false },
    orderBy: { createdAt: "asc" },
    take: 200,
    select: {
      id: true,
      isi: true,
      parentId: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          name: true,
          namaTampilan: true,
          image: true,
          isMentor: true,
          instansiLolos: true,
          tahunLolos: true,
        },
      },
      _count: { select: { votes: true } },
      votes: userId ? { where: { userId }, select: { id: true } } : false,
    },
  });

  const data = komentar.map((k) => ({
    id: k.id,
    isi: k.isi,
    parentId: k.parentId,
    createdAt: k.createdAt.toISOString(),
    milikSaya: userId === k.userId,
    penulis: {
      nama: k.user.namaTampilan || k.user.name || "Pejuang CPNS",
      foto: k.user.image,
      isMentor: k.user.isMentor,
      instansiLolos: k.user.instansiLolos,
      tahunLolos: k.user.tahunLolos,
    },
    suka: k._count.votes,
    sudahSuka: Array.isArray(k.votes) ? k.votes.length > 0 : false,
  }));

  return NextResponse.json({ komentar: data, masuk: !!userId });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Masuk dulu untuk ikut berdiskusi." },
      { status: 401 },
    );
  }

  let body: { soalId?: string; paketId?: string; isi?: string; parentId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid." }, { status: 400 });
  }

  const isi = (body.isi ?? "").trim();
  if (isi.length < 2) {
    return NextResponse.json({ error: "Tulis dulu isi komentarnya." }, { status: 400 });
  }
  if (isi.length > MAKS_KARAKTER) {
    return NextResponse.json(
      { error: `Maksimal ${MAKS_KARAKTER} karakter.` },
      { status: 400 },
    );
  }

  if (!body.soalId || !body.paketId || !getSoalById(body.paketId, body.soalId)) {
    return NextResponse.json({ error: "Soal tidak ditemukan." }, { status: 404 });
  }

  // Rem sederhana: maksimal 10 komentar per 5 menit per pengguna.
  const barusan = await prisma.comment.count({
    where: {
      userId: session.user.id,
      createdAt: { gte: new Date(Date.now() - 5 * 60_000) },
    },
  });
  if (barusan >= 10) {
    return NextResponse.json(
      { error: "Terlalu banyak komentar dalam waktu singkat. Coba lagi beberapa menit." },
      { status: 429 },
    );
  }

  if (body.parentId) {
    const induk = await prisma.comment.findUnique({
      where: { id: body.parentId },
      select: { soalId: true },
    });
    if (!induk || induk.soalId !== body.soalId) {
      return NextResponse.json({ error: "Balasan tidak valid." }, { status: 400 });
    }
  }

  const dibuat = await prisma.comment.create({
    data: {
      soalId: body.soalId,
      paketId: body.paketId,
      userId: session.user.id,
      isi,
      parentId: body.parentId ?? null,
    },
    select: { id: true, createdAt: true },
  });

  return NextResponse.json({ ok: true, id: dibuat.id, createdAt: dibuat.createdAt });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id wajib." }, { status: 400 });

  const komentar = await prisma.comment.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!komentar || komentar.userId !== session.user.id) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 403 });
  }

  await prisma.comment.update({ where: { id }, data: { dihapus: true } });
  return NextResponse.json({ ok: true });
}
