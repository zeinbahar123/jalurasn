"use server";

import { AuthError } from "next-auth";
import { Prisma } from "@prisma/client";
import { signIn, signOut, auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  BATAS_GAGAL,
  buatHashSandi,
  cocokkanSandi,
  emailValid,
  periksaSandi,
  rapikanEmail,
  sisaMenitKunci,
} from "@/lib/sandi";

export type StatusForm = { error?: string; sukses?: string } | null;

/** Hanya izinkan tujuan internal, supaya tidak bisa dipakai mengarahkan ke situs luar. */
function tujuanAman(nilai: FormDataEntryValue | null): string {
  if (typeof nilai !== "string") return "/tryout";
  if (!nilai.startsWith("/") || nilai.startsWith("//")) return "/tryout";
  return nilai;
}

function teks(nilai: FormDataEntryValue | null, maks = 200): string {
  return typeof nilai === "string" ? nilai.slice(0, maks) : "";
}

// =========================================================
// Masuk
// =========================================================

export async function masukAction(
  _sebelumnya: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const email = rapikanEmail(formData.get("email"));
  const sandi = teks(formData.get("password"));
  const redirectTo = tujuanAman(formData.get("redirectTo"));

  if (!emailValid(email)) return { error: "Format email tidak valid." };
  if (!sandi) return { error: "Kata sandi belum diisi." };

  // Beri pesan yang jelas bila akun sedang terkunci, supaya pengguna tidak
  // mengira kata sandinya yang salah.
  const akun = await prisma.user.findUnique({
    where: { email },
    select: { terkunciSampai: true },
  });
  const sisa = sisaMenitKunci(akun?.terkunciSampai);
  if (sisa > 0) {
    return {
      error: `Akun dikunci sementara setelah ${BATAS_GAGAL} percobaan gagal. Coba lagi dalam ${sisa} menit.`,
    };
  }

  try {
    await signIn("credentials", { email, password: sandi, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Email atau kata sandi salah." };
    }
    // Pengalihan normal Next.js (NEXT_REDIRECT) harus diteruskan apa adanya.
    throw error;
  }
  return null;
}

// =========================================================
// Daftar
// =========================================================

export async function daftarAction(
  _sebelumnya: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const nama = teks(formData.get("nama"), 60).trim().replace(/\s+/g, " ");
  const email = rapikanEmail(formData.get("email"));
  const sandi = teks(formData.get("password"));
  const ulangi = teks(formData.get("passwordUlang"));
  const redirectTo = tujuanAman(formData.get("redirectTo"));

  if (nama.length < 2) return { error: "Nama minimal 2 karakter." };
  if (!emailValid(email)) return { error: "Format email tidak valid." };

  const masalahSandi = periksaSandi(sandi, email);
  if (masalahSandi) return { error: masalahSandi };
  if (sandi !== ulangi) return { error: "Ulangi kata sandi tidak sama." };

  const sudahAda = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (sudahAda) {
    return { error: "Email ini sudah terdaftar. Silakan masuk, atau gunakan email lain." };
  }

  try {
    await prisma.user.create({
      data: {
        name: nama,
        email,
        passwordHash: await buatHashSandi(sandi),
        namaTampilan: nama,
      },
    });
  } catch (error) {
    // Antisipasi dua pendaftaran bersamaan dengan email sama.
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { error: "Email ini sudah terdaftar. Silakan masuk." };
    }
    throw error;
  }

  try {
    await signIn("credentials", { email, password: sandi, redirectTo });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Akun berhasil dibuat, tetapi gagal masuk otomatis. Silakan masuk manual.",
      };
    }
    throw error;
  }
  return null;
}

// =========================================================
// Ganti kata sandi
// =========================================================

export async function gantiSandiAction(
  _sebelumnya: StatusForm,
  formData: FormData,
): Promise<StatusForm> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Sesi Anda sudah berakhir. Masuk kembali." };

  const lama = teks(formData.get("sandiLama"));
  const baru = teks(formData.get("sandiBaru"));
  const ulangi = teks(formData.get("sandiBaruUlang"));

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { passwordHash: true, email: true },
  });
  if (!user) return { error: "Akun tidak ditemukan." };

  if (!(await cocokkanSandi(lama, user.passwordHash))) {
    return { error: "Kata sandi lama salah." };
  }

  const masalah = periksaSandi(baru, user.email);
  if (masalah) return { error: masalah };
  if (baru !== ulangi) return { error: "Ulangi kata sandi baru tidak sama." };
  if (baru === lama) return { error: "Kata sandi baru harus berbeda dari yang lama." };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { passwordHash: await buatHashSandi(baru), gagalMasuk: 0, terkunciSampai: null },
  });

  return { sukses: "Kata sandi berhasil diperbarui." };
}

// =========================================================
// Keluar
// =========================================================

export async function keluarAction() {
  await signOut({ redirectTo: "/" });
}
