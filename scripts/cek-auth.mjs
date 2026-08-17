#!/usr/bin/env node
/**
 * Pemeriksa kesiapan login (email + kata sandi) dan database.
 * Jalankan: npm run cek:auth
 *
 * Script ini TIDAK mengubah apa pun. Hanya memeriksa dan memberi tahu
 * langkah apa yang masih kurang.
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ENV_PATH = join(ROOT, ".env");

const OK = "✔";
const NO = "✖";
const WARN = "⚠";

let gagal = 0;
let peringatan = 0;

const lolos = (p) => console.log(`${OK} ${p}`);
const tolak = (p, s) => {
  gagal += 1;
  console.log(`${NO} ${p}`);
  if (s) console.log(`    → ${s}`);
};
const ingat = (p, s) => {
  peringatan += 1;
  console.log(`${WARN} ${p}`);
  if (s) console.log(`    → ${s}`);
};
const judul = (t) => {
  console.log(`\n${t}`);
  console.log("-".repeat(t.length));
};

// =========================================================
judul("1. Berkas .env");

if (!existsSync(ENV_PATH)) {
  tolak("Berkas .env tidak ditemukan.", "Salin .env.example menjadi .env lalu isi nilainya.");
  process.exit(1);
}
lolos("Berkas .env ditemukan.");

const env = {};
for (const baris of readFileSync(ENV_PATH, "utf8").split(/\r?\n/)) {
  const b = baris.trim();
  if (!b || b.startsWith("#")) continue;
  const i = b.indexOf("=");
  if (i === -1) continue;
  let v = b.slice(i + 1).trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  env[b.slice(0, i).trim()] = v;
}

const masihPlaceholder = (v) =>
  !v ||
  /^ganti/i.test(v) ||
  v.includes("USER:PASSWORD") ||
  v.includes("user:password@localhost");

// =========================================================
judul("2. Variabel lingkungan");

if (masihPlaceholder(env.AUTH_SECRET)) {
  tolak("AUTH_SECRET masih placeholder.", "Jalankan: npx auth secret");
} else if (env.AUTH_SECRET.length < 32) {
  tolak(
    `AUTH_SECRET terlalu pendek (${env.AUTH_SECRET.length} karakter).`,
    "Minimal 32 karakter. Jalankan: npx auth secret",
  );
} else {
  lolos(`AUTH_SECRET terisi (${env.AUTH_SECRET.length} karakter).`);
}

const urlApp = env.AUTH_URL || env.NEXTAUTH_URL || "http://localhost:3000";
try {
  lolos(`URL aplikasi: ${new URL(urlApp).origin}`);
} catch {
  tolak(`URL aplikasi tidak valid: ${urlApp}`, "Contoh yang benar: http://localhost:3000");
}

if (masihPlaceholder(env.DATABASE_URL)) {
  tolak(
    "DATABASE_URL masih placeholder.",
    "Buat database gratis di https://neon.tech lalu salin connection string-nya ke .env",
  );
} else {
  try {
    const u = new URL(env.DATABASE_URL);
    if (!u.protocol.startsWith("postgres")) {
      tolak(`DATABASE_URL bukan PostgreSQL (${u.protocol})`, "Skema project ini memakai PostgreSQL.");
    } else {
      lolos(`DATABASE_URL menunjuk ke ${u.hostname}${u.pathname}`);
      if (u.hostname.includes("neon.tech") && !env.DATABASE_URL.includes("sslmode=require")) {
        ingat(
          "Connection string Neon biasanya perlu ?sslmode=require",
          "Tambahkan di akhir DATABASE_URL bila koneksi gagal.",
        );
      }
    }
  } catch {
    tolak("DATABASE_URL tidak dapat dibaca sebagai URL.", "Salin ulang dari penyedia database.");
  }
}

// =========================================================
judul("3. Koneksi database & tabel");

if (masihPlaceholder(env.DATABASE_URL)) {
  ingat("Dilewati karena DATABASE_URL belum diisi.");
} else {
  process.env.DATABASE_URL = env.DATABASE_URL;
  try {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient({ log: [] });
    try {
      await prisma.$queryRaw`SELECT 1`;
      lolos("Berhasil terhubung ke database.");

      const tabel = await prisma.$queryRaw`
        SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public'
      `;
      const nama = new Set(tabel.map((t) => t.table_name));
      const wajib = ["User", "Attempt", "AttemptAnswer", "Comment", "Story"];
      const hilang = wajib.filter((t) => !nama.has(t));

      if (hilang.length > 0) {
        tolak(`Tabel belum dibuat: ${hilang.join(", ")}`, "Jalankan: npm run db:push");
      } else {
        lolos(`Seluruh tabel inti sudah ada (${nama.size} tabel di schema public).`);

        // Pastikan kolom kata sandi benar-benar ada (kalau skema lama belum di-push ulang).
        const kolom = await prisma.$queryRaw`
          SELECT column_name FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'User'
        `;
        const namaKolom = new Set(kolom.map((k) => k.column_name));
        if (!namaKolom.has("passwordHash")) {
          tolak(
            "Kolom passwordHash belum ada di tabel User.",
            "Skema database masih versi lama. Jalankan: npm run db:push",
          );
        } else {
          lolos("Kolom passwordHash tersedia.");
          const jumlahUser = await prisma.user.count();
          const jumlahAttempt = await prisma.attempt.count();
          console.log(`    Terdaftar: ${jumlahUser} pengguna, ${jumlahAttempt} sesi try out.`);
          const terkunci = await prisma.user.count({
            where: { terkunciSampai: { gt: new Date() } },
          });
          if (terkunci > 0) {
            ingat(
              `${terkunci} akun sedang terkunci sementara.`,
              "Buka kuncinya dengan: npm run reset:sandi -- <email>",
            );
          }
        }
      }
    } finally {
      await prisma.$disconnect();
    }
  } catch (e) {
    const pesan = String(e?.message ?? e).split("\n")[0];
    tolak(`Gagal terhubung ke database: ${pesan}`, "Periksa DATABASE_URL dan koneksi internet Anda.");
  }
}

// =========================================================
judul("Ringkasan");

let origin = "http://localhost:3000";
try {
  origin = new URL(urlApp).origin;
} catch {
  /* sudah dilaporkan */
}

if (gagal === 0) {
  console.log(`${OK} Siap dipakai${peringatan ? ` (dengan ${peringatan} peringatan)` : ""}.`);
  console.log(`   Jalankan: npm run dev`);
  console.log(`   Lalu buat akun pertama di ${origin}/daftar`);
  process.exit(0);
}

console.log(`${NO} Ada ${gagal} hal yang masih harus dibereskan (dan ${peringatan} peringatan).`);
console.log("   Perbaiki yang bertanda ✖ di atas, lalu jalankan ulang: npm run cek:auth");
process.exit(1);
