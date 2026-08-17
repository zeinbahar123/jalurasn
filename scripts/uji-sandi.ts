/**
 * Uji fungsi keamanan kata sandi.
 * Jalankan: npm run uji:sandi
 */

import {
  buatHashSandi,
  cocokkanSandi,
  emailValid,
  periksaSandi,
  rapikanEmail,
  sisaMenitKunci,
} from "../src/lib/sandi.ts";

let gagal = 0;
let lulus = 0;

function cek(nama: string, syarat: boolean) {
  if (syarat) {
    lulus += 1;
    console.log(`✔ ${nama}`);
  } else {
    gagal += 1;
    console.log(`✖ ${nama}`);
  }
}

console.log("\nHashing kata sandi");
console.log("------------------");

const sandi = "KataSandiRahasia123";
const hash = await buatHashSandi(sandi);

cek("format hash 'scrypt:<salt>:<hash>'", /^scrypt:[0-9a-f]{32}:[0-9a-f]{128}$/.test(hash));
cek("kata sandi asli tidak tersimpan di dalam hash", !hash.includes(sandi));
cek("kata sandi benar diterima", await cocokkanSandi(sandi, hash));
cek("kata sandi salah ditolak", !(await cocokkanSandi("KataSandiRahasia124", hash)));
cek("kata sandi kosong ditolak", !(await cocokkanSandi("", hash)));
cek("beda huruf besar-kecil ditolak", !(await cocokkanSandi("katasandirahasia123", hash)));

const hash2 = await buatHashSandi(sandi);
cek("salt acak: dua hash dari sandi sama tetap berbeda", hash !== hash2);
cek("kedua hash tetap sama-sama valid", await cocokkanSandi(sandi, hash2));

cek("hash rusak ditolak", !(await cocokkanSandi(sandi, "bukan-format-benar")));
cek("hash kosong ditolak", !(await cocokkanSandi(sandi, "")));
cek(
  "skema selain scrypt ditolak",
  !(await cocokkanSandi(sandi, `md5:${"0".repeat(32)}:${"0".repeat(128)}`)),
);

const sandiUnicode = "Sandi🔐Aman2026";
const hashUnicode = await buatHashSandi(sandiUnicode);
cek("kata sandi berisi emoji tetap cocok", await cocokkanSandi(sandiUnicode, hashUnicode));

console.log("\nNormalisasi email");
console.log("-----------------");

cek("spasi & huruf besar dirapikan", rapikanEmail("  Budi@Gmail.COM ") === "budi@gmail.com");
cek("nilai bukan string jadi string kosong", rapikanEmail(undefined) === "");
cek("email wajar diterima", emailValid("pejuang.cpns@email.co.id"));
cek("email tanpa @ ditolak", !emailValid("bukanemail.com"));
cek("email tanpa domain ditolak", !emailValid("budi@"));
cek("email berisi spasi ditolak", !emailValid("budi @mail.com"));
cek("email sangat panjang ditolak", !emailValid("a".repeat(250) + "@mail.com"));

console.log("\nAturan kata sandi");
console.log("-----------------");

cek("kurang dari 8 karakter ditolak", periksaSandi("Abc123") !== null);
cek("tepat 8 karakter diterima", periksaSandi("Abcd1234") === null);
cek("hanya angka ditolak", periksaSandi("12345678") !== null);
cek("sama dengan email ditolak", periksaSandi("budi@mail.com", "budi@mail.com") !== null);
cek("kata sandi umum ditolak", periksaSandi("password") !== null);
cek("kata sandi umum (huruf besar) tetap ditolak", periksaSandi("PASSWORD") !== null);
cek("lebih dari 200 karakter ditolak", periksaSandi("A1" + "b".repeat(220)) !== null);
cek("kata sandi wajar diterima", periksaSandi("PejuangCPNS2026") === null);

console.log("\nKunci akun");
console.log("----------");

cek("tanpa kunci → 0 menit", sisaMenitKunci(null) === 0);
cek("kunci sudah lewat → 0 menit", sisaMenitKunci(new Date(Date.now() - 60_000)) === 0);
cek("kunci 15 menit lagi → 15 menit", sisaMenitKunci(new Date(Date.now() + 15 * 60_000)) === 15);

console.log("\nRingkasan");
console.log("---------");
console.log(`${lulus} lulus, ${gagal} gagal.`);
process.exit(gagal === 0 ? 0 : 1);
