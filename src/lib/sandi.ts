import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

/**
 * Pengelolaan kata sandi memakai scrypt bawaan Node.js.
 *
 * Alasan memilih scrypt dan bukan pustaka pihak ketiga:
 *  - tidak butuh dependensi tambahan maupun kompilasi native (aman di Windows)
 *  - bersifat memory-hard, jadi jauh lebih tahan terhadap serangan GPU
 *    dibandingkan hash biasa seperti SHA-256
 *
 * Format tersimpan: "scrypt:<salt-heksadesimal>:<hash-heksadesimal>"
 * Kata sandi asli tidak pernah disimpan di mana pun.
 */

const PANJANG_KUNCI = 64;
const PANJANG_SALT = 16;

export async function buatHashSandi(sandi: string): Promise<string> {
  const salt = randomBytes(PANJANG_SALT).toString("hex");
  const turunan = (await scryptAsync(sandi.normalize("NFKC"), salt, PANJANG_KUNCI)) as Buffer;
  return `scrypt:${salt}:${turunan.toString("hex")}`;
}

export async function cocokkanSandi(sandi: string, tersimpan: string): Promise<boolean> {
  if (!tersimpan) return false;
  const bagian = tersimpan.split(":");
  if (bagian.length !== 3 || bagian[0] !== "scrypt") return false;

  const [, salt, hashHex] = bagian;
  let diketahui: Buffer;
  try {
    diketahui = Buffer.from(hashHex, "hex");
  } catch {
    return false;
  }
  if (diketahui.length !== PANJANG_KUNCI) return false;

  const turunan = (await scryptAsync(sandi.normalize("NFKC"), salt, PANJANG_KUNCI)) as Buffer;
  // Perbandingan waktu-tetap agar tidak bisa ditebak lewat selisih waktu balasan.
  return timingSafeEqual(diketahui, turunan);
}

// =========================================================
// Validasi masukan
// =========================================================

/** Samakan bentuk email supaya "Budi@Gmail.com " dan "budi@gmail.com" dianggap sama. */
export function rapikanEmail(nilai: unknown): string {
  return typeof nilai === "string" ? nilai.trim().toLowerCase() : "";
}

const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailValid(email: string): boolean {
  return POLA_EMAIL.test(email) && email.length <= 254;
}

export const PANJANG_SANDI_MIN = 8;

/** Mengembalikan pesan kesalahan, atau null bila kata sandi memenuhi syarat. */
export function periksaSandi(sandi: string, email?: string): string | null {
  if (sandi.length < PANJANG_SANDI_MIN) {
    return `Kata sandi minimal ${PANJANG_SANDI_MIN} karakter.`;
  }
  if (sandi.length > 200) {
    return "Kata sandi terlalu panjang (maksimal 200 karakter).";
  }
  if (email && sandi.toLowerCase() === email.toLowerCase()) {
    return "Kata sandi tidak boleh sama dengan email Anda.";
  }
  if (/^\d+$/.test(sandi)) {
    return "Kata sandi jangan hanya berisi angka. Campurkan huruf.";
  }
  const terlaluUmum = [
    "password", "12345678", "123456789", "qwerty123", "rahasia123",
    "indonesia", "kata sandi", "adminadmin", "11111111", "cpns2026",
  ];
  if (terlaluUmum.includes(sandi.toLowerCase())) {
    return "Kata sandi terlalu mudah ditebak. Gunakan yang lain.";
  }
  return null;
}

// =========================================================
// Pengaman percobaan masuk beruntun
// =========================================================

export const BATAS_GAGAL = 5;
export const MENIT_KUNCI = 15;

export function sisaMenitKunci(terkunciSampai: Date | null | undefined): number {
  if (!terkunciSampai) return 0;
  const sisa = terkunciSampai.getTime() - Date.now();
  return sisa > 0 ? Math.ceil(sisa / 60_000) : 0;
}
