// Utilitas: menerapkan bobot TKP baru pada berkas soal tertentu.
// Pakai: node scripts/patch-tkp.mjs <namaBerkas> '<jsonPeta>'
// Contoh: node scripts/patch-tkp.mjs paket-07.json "{\"P7-TKP-09\":[4,5,3,1,2]}"

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const [berkas, petaJson] = process.argv.slice(2);

if (!berkas || !petaJson) {
  console.error("Pakai: node scripts/patch-tkp.mjs <namaBerkas> '<jsonPeta>'");
  process.exit(1);
}

const jalur = join(__dirname, "..", "src", "data", "soal", berkas);
const peta = JSON.parse(petaJson);
const data = JSON.parse(readFileSync(jalur, "utf8"));
const OPSI = ["A", "B", "C", "D", "E"];
let n = 0;

for (const s of data) {
  if (peta[s.id]) {
    s.s = Object.fromEntries(OPSI.map((k, i) => [k, peta[s.id][i]]));
    n += 1;
  }
}

writeFileSync(jalur, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log(`${n} soal diperbarui di ${berkas}.`);
