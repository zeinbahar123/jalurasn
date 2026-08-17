import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Belum masuk." }, { status: 401 });
  }
  const { id } = await params;

  const ada = await prisma.comment.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!ada) return NextResponse.json({ error: "Tidak ditemukan." }, { status: 404 });

  const sudah = await prisma.commentVote.findUnique({
    where: { commentId_userId: { commentId: id, userId: session.user.id } },
    select: { id: true },
  });

  if (sudah) {
    await prisma.commentVote.delete({ where: { id: sudah.id } });
  } else {
    await prisma.commentVote.create({
      data: { commentId: id, userId: session.user.id },
    });
  }

  const jumlah = await prisma.commentVote.count({ where: { commentId: id } });
  return NextResponse.json({ ok: true, suka: jumlah, sudahSuka: !sudah });
}
