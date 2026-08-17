"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function bersih(v: FormDataEntryValue | null, maks = 120): string | null {
  if (typeof v !== "string") return null;
  const s = v.trim().replace(/\s+/g, " ");
  if (!s) return null;
  return s.slice(0, maks);
}

export async function simpanProfilAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const isMentor = formData.get("isMentor") === "on";
  const tahunMentah = formData.get("tahunLolos");
  const tahunLolos =
    typeof tahunMentah === "string" && /^\d{4}$/.test(tahunMentah.trim())
      ? Number(tahunMentah.trim())
      : null;

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      namaTampilan: bersih(formData.get("namaTampilan"), 60),
      targetInstansi: bersih(formData.get("targetInstansi")),
      targetFormasi: bersih(formData.get("targetFormasi")),
      targetProvinsi: bersih(formData.get("targetProvinsi"), 60),
      pendidikan: bersih(formData.get("pendidikan"), 80),
      bio: bersih(formData.get("bio"), 600),
      tampilDiPeringkat: formData.get("tampilDiPeringkat") === "on",
      isMentor,
      tahunLolos: isMentor ? tahunLolos : null,
      instansiLolos: isMentor ? bersih(formData.get("instansiLolos")) : null,
    },
  });

  revalidatePath("/profil");
  revalidatePath("/peringkat");
  revalidatePath("/komunitas/mentor");
}

export async function simpanCeritaAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const judul = bersih(formData.get("judul"), 140);
  const isiMentah = formData.get("isi");
  const isi =
    typeof isiMentah === "string" ? isiMentah.trim().slice(0, 6000) : "";

  if (!judul || isi.length < 40) return;

  const tahunMentah = formData.get("tahunUjian");
  const tahunUjian =
    typeof tahunMentah === "string" && /^\d{4}$/.test(tahunMentah.trim())
      ? Number(tahunMentah.trim())
      : null;

  const hasilMentah = formData.get("hasilnya");
  const hasilnya =
    hasilMentah === "LOLOS" || hasilMentah === "BELUM LOLOS" ? hasilMentah : null;

  await prisma.story.create({
    data: {
      userId: session.user.id,
      judul,
      isi,
      tahunUjian,
      instansi: bersih(formData.get("instansi")),
      hasilnya,
    },
  });

  revalidatePath("/komunitas");
}

export async function hapusCeritaAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const cerita = await prisma.story.findUnique({
    where: { id },
    select: { userId: true },
  });
  if (!cerita || cerita.userId !== session.user.id) return;

  await prisma.story.update({ where: { id }, data: { tayang: false } });
  revalidatePath("/komunitas");
}
