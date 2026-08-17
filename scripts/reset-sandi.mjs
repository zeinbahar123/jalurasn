#!/usr/bin/env node
/**
 * Menyetel ulang kata sandi seorang pengguna dari terminal, sekaligus
 * membuka kunci akun yang terblokir karena terlalu banyak percobaan gagal.
 *
 * Dipakai pengelola situs ketika ada pengguna yang lupa kata sandi
 * (platform ini belum memiliki pemulihan lewat email).
 *
 * Pakai:
 *   npm run reset:sandi -- pengguna@email.com
 *   npm run reset:sandi -- pengguna@email.com KataSandiBaru123
 *
 * Bila kata sandi baru tidak diisi, script akan membuatkan yang acak.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_PATH = join(__dirname, "..", ".env");

// --- Muat DATABASE_URL dari .env -------------------------
if (existsSync(ENV_PATH)) {
  for (const baris of readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
    const b = baris.trim();
    if (!b || b.startsWith("#")) continue;
    const i = b.indexOf("=");
    if (i === -1) continue;
    let v = b.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    const k = b.slice(0, i).trim();
    if (!process.env[k]) process.env[k] = v;
  }
}

const [emailArg, sandiArg] = process.argv.slice(2);

if (!emailArg) {
  console.error("Pakai: npm run reset:sandi -- <email> [kata-sandi-baru]");
  process.exit(1);
}

const email = emailArg.trim().toLowerCase();
const sandiBaru = sandiArg && sandiArg.length >= 8
  ? sandiArg
  : randomBytes(9).toString("base64url"); // ±12 karakter acak

if (sandiArg && sandiArg.length < 8) {
  console.error("✖ Kata sandi baru minimal 8 karakter.");
  process.exit(1);
}

async function buatHash(sandi) {
  const salt = randomBytes(16).toString("hex");
  const turunan = await scryptAsync(sandi.normalize("NFKC"), salt, 64);
  return `scrypt:${salt}:${turunan.toString("hex")}`;
}

const { PrismaClient } = await import("@prisma/client");
const prisma = new PrismaClient({ log: [] });

try {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, name: true, email: true },
  });

  if (!user) {
    console.error(`✖ Tidak ada pengguna dengan email: ${email}`);
    process.exit(1);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: await buatHash(sandiBaru),
      gagalMasuk: 0,
      terkunciSampai: null,
    },
  });

  console.log(`✔ Kata sandi untuk ${user.name ?? "(tanpa nama)"} <${user.email}> berhasil disetel ulang.`);
  console.log(`  Kunci akun juga sudah dibuka.\n`);
  console.log(`  Kata sandi baru: ${sandiBaru}\n`);
  console.log("  Sampaikan kepada yang bersangkutan lewat jalur yang aman,");
  console.log("  dan minta ia segera menggantinya di halaman Profil.");
} finally {
  await prisma.$disconnect();
}
