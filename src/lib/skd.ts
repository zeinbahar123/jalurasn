/**
 * Aturan main SKD CPNS.
 *
 * Rujukan: PermenPANRB tentang Nilai Ambang Batas SKD CPNS
 * (formasi umum). Angka di bawah ini mengikuti pola yang dipakai
 * pada seleksi 2021, 2023, dan 2024:
 *
 *   TWK  30 soal  | benar 5, salah/kosong 0 | maks 150 | ambang batas  65
 *   TIU  35 soal  | benar 5, salah/kosong 0 | maks 175 | ambang batas  80
 *   TKP  45 soal  | skor 1–5, kosong 0      | maks 225 | ambang batas 166
 *   ----------------------------------------------------------------
 *   Total 110 soal | maks 550 | durasi 100 menit
 *
 * Catatan: peserta penyandang disabilitas sensorik netra mendapat
 * durasi 130 menit. Toggle-nya tersedia saat memulai try out.
 */

export type Kategori = "TWK" | "TIU" | "TKP";
export type OpsiKey = "A" | "B" | "C" | "D" | "E";

export const OPSI: OpsiKey[] = ["A", "B", "C", "D", "E"];

export interface AturanKategori {
  kode: Kategori;
  nama: string;
  namaPanjang: string;
  jumlahSoal: number;
  skorMaks: number;
  ambangBatas: number;
  warna: string; // kelas tailwind untuk aksen
  deskripsi: string;
}

export const ATURAN: Record<Kategori, AturanKategori> = {
  TWK: {
    kode: "TWK",
    nama: "TWK",
    namaPanjang: "Tes Wawasan Kebangsaan",
    jumlahSoal: 30,
    skorMaks: 150,
    ambangBatas: 65,
    warna: "emerald",
    deskripsi:
      "Nasionalisme, integritas, bela negara, pilar negara, dan bahasa Indonesia. Jawaban benar 5 poin, salah/kosong 0.",
  },
  TIU: {
    kode: "TIU",
    nama: "TIU",
    namaPanjang: "Tes Intelegensia Umum",
    jumlahSoal: 35,
    skorMaks: 175,
    ambangBatas: 80,
    warna: "sky",
    deskripsi:
      "Kemampuan verbal, numerik, dan figural. Jawaban benar 5 poin, salah/kosong 0.",
  },
  TKP: {
    kode: "TKP",
    nama: "TKP",
    namaPanjang: "Tes Karakteristik Pribadi",
    jumlahSoal: 45,
    skorMaks: 225,
    ambangBatas: 166,
    warna: "amber",
    deskripsi:
      "Pelayanan publik, jejaring kerja, sosial budaya, TIK, profesionalisme, anti radikalisme. Semua opsi bernilai 1–5, tidak dijawab 0.",
  },
};

export const URUTAN_KATEGORI: Kategori[] = ["TWK", "TIU", "TKP"];

export const TOTAL_SOAL = 110;
export const SKOR_MAKS_TOTAL = 550;
export const AMBANG_TOTAL =
  ATURAN.TWK.ambangBatas + ATURAN.TIU.ambangBatas + ATURAN.TKP.ambangBatas; // 311

export const DURASI_MENIT_UMUM = 100;
export const DURASI_MENIT_DISABILITAS = 130;

// =========================================================
// Tipe soal
// =========================================================

export interface OpsiSoal {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
}

/** Bentuk mentah di file JSON — ringkas supaya file soal tidak membengkak. */
export interface SoalMentah {
  id: string;
  kat: Kategori;
  sub: string;
  q: string;
  /** Teks tambahan berformat monospace (deret figural, tabel kecil). */
  pre?: string;
  o: OpsiSoal;
  /** Kunci jawaban — hanya untuk TWK & TIU. */
  k?: OpsiKey;
  /** Bobot 1–5 tiap opsi — hanya untuk TKP. */
  s?: Record<OpsiKey, number>;
  /** Pembahasan. */
  p: string;
}

/** Soal yang sudah dinormalisasi + diberi nomor urut 1..110. */
export interface Soal extends SoalMentah {
  nomor: number;
  paketId: string;
}

// =========================================================
// Penilaian
// =========================================================

/** Poin satu soal berdasarkan jawaban peserta. */
export function poinSoal(soal: SoalMentah, jawaban: string | null | undefined): number {
  if (!jawaban) return 0;
  const key = jawaban.toUpperCase() as OpsiKey;
  if (!OPSI.includes(key)) return 0;

  if (soal.kat === "TKP") {
    return soal.s?.[key] ?? 0;
  }
  return soal.k === key ? 5 : 0;
}

export function jawabanBenar(soal: SoalMentah, jawaban: string | null | undefined): boolean {
  if (!jawaban) return false;
  if (soal.kat === "TKP") return false; // TKP tidak mengenal benar/salah
  return soal.k === jawaban.toUpperCase();
}

/** Opsi terbaik pada soal TKP (bobot 5). */
export function opsiTerbaikTKP(soal: SoalMentah): OpsiKey | null {
  if (soal.kat !== "TKP" || !soal.s) return null;
  let best: OpsiKey = "A";
  for (const k of OPSI) if ((soal.s[k] ?? 0) > (soal.s[best] ?? 0)) best = k;
  return best;
}

export interface RingkasanNilai {
  skorTWK: number;
  skorTIU: number;
  skorTKP: number;
  skorTotal: number;
  benarTWK: number;
  benarTIU: number;
  lulusTWK: boolean;
  lulusTIU: boolean;
  lulusTKP: boolean;
  lulusSemua: boolean;
}

export function hitungNilai(
  soalList: SoalMentah[],
  jawaban: Record<string, string | null>,
): RingkasanNilai {
  let skorTWK = 0;
  let skorTIU = 0;
  let skorTKP = 0;
  let benarTWK = 0;
  let benarTIU = 0;

  for (const soal of soalList) {
    const j = jawaban[soal.id] ?? null;
    const poin = poinSoal(soal, j);
    if (soal.kat === "TWK") {
      skorTWK += poin;
      if (poin > 0) benarTWK += 1;
    } else if (soal.kat === "TIU") {
      skorTIU += poin;
      if (poin > 0) benarTIU += 1;
    } else {
      skorTKP += poin;
    }
  }

  const lulusTWK = skorTWK >= ATURAN.TWK.ambangBatas;
  const lulusTIU = skorTIU >= ATURAN.TIU.ambangBatas;
  const lulusTKP = skorTKP >= ATURAN.TKP.ambangBatas;

  return {
    skorTWK,
    skorTIU,
    skorTKP,
    skorTotal: skorTWK + skorTIU + skorTKP,
    benarTWK,
    benarTIU,
    lulusTWK,
    lulusTIU,
    lulusTKP,
    lulusSemua: lulusTWK && lulusTIU && lulusTKP,
  };
}

/** Format detik menjadi "01:39:12". */
export function formatDurasi(detik: number): string {
  const d = Math.max(0, Math.floor(detik));
  const j = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = d % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return j > 0 ? `${pad(j)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function formatDurasiPanjang(detik: number): string {
  const d = Math.max(0, Math.floor(detik));
  const j = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = d % 60;
  if (j > 0) return `${j} jam ${m} menit`;
  if (m > 0) return `${m} menit ${s} detik`;
  return `${s} detik`;
}
