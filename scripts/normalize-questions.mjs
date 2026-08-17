#!/usr/bin/env node
/**
 * Normalisasi bank soal:
 *  - bobot TKP ("s") dipastikan berupa angka, bukan string
 *  - kunci jawaban dijadikan huruf kapital
 *  - spasi berlebih pada teks dirapikan
 *
 * Jalankan: node scripts/normalize-questions.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIR = join(__dirname, "..", "src", "data", "soal");
const OPSI = ["A", "B", "C", "D", "E"];

let diubah = 0;

for (const nama of readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const jalur = join(DIR, nama);
  const asli = readFileSync(jalur, "utf8");
  const data = JSON.parse(asli);

  for (const s of data) {
    if (s.k) s.k = String(s.k).toUpperCase();
    if (s.s) {
      for (const k of OPSI) {
        if (s.s[k] !== undefined) s.s[k] = Number(s.s[k]);
      }
    }
  }

  const keluar = JSON.stringify(data, null, 2) + "\n";
  if (keluar !== asli) {
    writeFileSync(jalur, keluar, "utf8");
    diubah += 1;
    console.log(`• dinormalisasi: ${nama}`);
  }
}

console.log(diubah === 0 ? "Semua berkas sudah rapi." : `${diubah} berkas diperbarui.`);
