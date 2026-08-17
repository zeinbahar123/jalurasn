#!/usr/bin/env node
/**
 * Validator bank soal JalurASN.
 *
 * Jalankan: npm run check:soal
 *
 * Memastikan tiap paket memenuhi aturan SKD:
 *  - 110 soal: TWK 30, TIU 35, TKP 45
 *  - id unik, 5 opsi terisi, pembahasan terisi
 *  - TWK/TIU punya kunci jawaban A–E dan TIDAK punya bobot
 *  - TKP punya bobot 1–5 yang merupakan permutasi {1,2,3,4,5}
 */

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "..", "src", "data", "soal");

const HARAP = { TWK: 30, TIU: 35, TKP: 45 };
const OPSI = ["A", "B", "C", "D", "E"];

let totalSoal = 0;
let totalError = 0;
const idGlobal = new Set();

const berkas = readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

if (berkas.length === 0) {
  console.error("✖ Tidak ada berkas soal di src/data/soal/");
  process.exit(1);
}

for (const nama of berkas) {
  const errors = [];
  const isi = JSON.parse(readFileSync(join(DIR, nama), "utf8"));

  if (!Array.isArray(isi)) {
    console.error(`✖ ${nama}: isi bukan array`);
    totalError += 1;
    continue;
  }

  const hitung = { TWK: 0, TIU: 0, TKP: 0 };
  const idLokal = new Set();
  const subPerKategori = { TWK: new Set(), TIU: new Set(), TKP: new Set() };

  for (const [i, s] of isi.entries()) {
    const tag = s?.id ?? `#${i + 1}`;

    if (!s.id || typeof s.id !== "string") errors.push(`${tag}: id kosong`);
    if (idLokal.has(s.id)) errors.push(`${tag}: id duplikat dalam paket`);
    idLokal.add(s.id);
    if (idGlobal.has(s.id)) errors.push(`${tag}: id duplikat lintas paket`);
    idGlobal.add(s.id);

    if (!["TWK", "TIU", "TKP"].includes(s.kat)) {
      errors.push(`${tag}: kategori tidak valid (${s.kat})`);
      continue;
    }
    hitung[s.kat] += 1;
    if (!s.sub || typeof s.sub !== "string") errors.push(`${tag}: sub kosong`);
    else subPerKategori[s.kat].add(s.sub);

    if (!s.q || s.q.trim().length < 10) errors.push(`${tag}: pertanyaan terlalu pendek`);
    if (!s.p || s.p.trim().length < 15) errors.push(`${tag}: pembahasan terlalu pendek`);

    if (!s.o || typeof s.o !== "object") {
      errors.push(`${tag}: opsi tidak ada`);
      continue;
    }
    for (const k of OPSI) {
      if (!s.o[k] || String(s.o[k]).trim().length === 0) {
        errors.push(`${tag}: opsi ${k} kosong`);
      }
    }
    if (Object.keys(s.o).length !== 5) errors.push(`${tag}: jumlah opsi bukan 5`);

    if (s.kat === "TKP") {
      if (s.k) errors.push(`${tag}: TKP tidak boleh punya kunci tunggal`);
      if (!s.s || typeof s.s !== "object") {
        errors.push(`${tag}: TKP tanpa bobot`);
      } else {
        const nilai = OPSI.map((k) => s.s[k]);
        if (nilai.some((v) => !Number.isInteger(v) || v < 1 || v > 5)) {
          errors.push(`${tag}: bobot TKP harus bilangan bulat 1–5`);
        } else {
          const urut = [...nilai].sort().join(",");
          if (urut !== "1,2,3,4,5") {
            errors.push(`${tag}: bobot TKP harus permutasi 1–5 (dapat: ${nilai.join(",")})`);
          }
        }
      }
    } else {
      if (s.s) errors.push(`${tag}: ${s.kat} tidak boleh punya bobot`);
      if (!OPSI.includes(s.k)) errors.push(`${tag}: kunci jawaban tidak valid (${s.k})`);
    }
  }

  for (const kat of Object.keys(HARAP)) {
    if (hitung[kat] !== HARAP[kat]) {
      errors.push(
        `jumlah ${kat} = ${hitung[kat]}, seharusnya ${HARAP[kat]}`,
      );
    }
  }
  if (isi.length !== 110) errors.push(`total soal = ${isi.length}, seharusnya 110`);

  totalSoal += isi.length;
  totalError += errors.length;

  if (errors.length === 0) {
    console.log(
      `✔ ${nama.padEnd(16)} ${isi.length} soal · TWK ${hitung.TWK} / TIU ${hitung.TIU} / TKP ${hitung.TKP} · ` +
        `sub: ${subPerKategori.TWK.size}+${subPerKategori.TIU.size}+${subPerKategori.TKP.size}`,
    );
  } else {
    console.error(`✖ ${nama} — ${errors.length} masalah`);
    for (const e of errors.slice(0, 30)) console.error(`    · ${e}`);
    if (errors.length > 30) console.error(`    · … dan ${errors.length - 30} lainnya`);
  }
}

console.log("");
console.log(`Total: ${berkas.length} paket · ${totalSoal} soal`);

if (totalError > 0) {
  console.error(`GAGAL: ${totalError} masalah ditemukan.`);
  process.exit(1);
}
console.log("Semua paket valid.");
