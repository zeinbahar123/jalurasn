import { DURASI_MENIT_UMUM } from "@/lib/skd";

export type Tingkat = "Dasar" | "Menengah" | "Sulit";

export interface Paket {
  id: string;
  nomor: number;
  slug: string;
  nama: string;
  tema: string;
  tingkat: Tingkat;
  durasiMenit: number;
  deskripsi: string;
  fokus: string[];
  /** Saran kapan paket ini dikerjakan dalam alur belajar. */
  saran: string;
}

export const PAKET: Paket[] = [
  {
    id: "paket-01",
    nomor: 1,
    slug: "paket-01-fondasi",
    nama: "Try Out 1 — Fondasi",
    tema: "Pemanasan & pemetaan kemampuan awal",
    tingkat: "Dasar",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Paket pembuka untuk mengukur posisi awal Anda. Soal dirancang mewakili semua sub-materi SKD dengan tingkat kesulitan standar, tanpa jebakan berlebihan. Kerjakan tanpa belajar dulu supaya hasilnya jujur menggambarkan titik start.",
    fokus: ["Pemetaan awal", "Semua sub-materi", "Manajemen waktu dasar"],
    saran: "Kerjakan paling pertama, sebelum belajar apa pun.",
  },
  {
    id: "paket-02",
    nomor: 2,
    slug: "paket-02-pilar-negara",
    nama: "Try Out 2 — Pilar Negara & Sejarah",
    tema: "TWK diperdalam: Pancasila, UUD 1945, NKRI, Bhinneka",
    tingkat: "Menengah",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Porsi TWK diisi materi yang paling sering keluar dan paling sering dilewatkan: pasal-pasal UUD 1945 hasil amandemen, lembaga negara, sejarah pergerakan nasional, dan penerapan sila Pancasila dalam kasus nyata.",
    fokus: ["UUD 1945 & amandemen", "Lembaga negara", "Sejarah kebangsaan"],
    saran: "Kerjakan setelah membaca ringkasan TWK.",
  },
  {
    id: "paket-03",
    nomor: 3,
    slug: "paket-03-numerik-intensif",
    nama: "Try Out 3 — Numerik Intensif",
    tema: "TIU numerik: deret, aljabar, perbandingan kuantitatif",
    tingkat: "Menengah",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Paket untuk membongkar bagian yang paling banyak memakan waktu peserta. Fokus pada deret angka, soal cerita, perbandingan kuantitatif, dan aritmetika cepat tanpa kalkulator.",
    fokus: ["Deret angka", "Soal cerita", "Perbandingan kuantitatif"],
    saran: "Ulang paket ini kalau skor TIU Anda di bawah 80.",
  },
  {
    id: "paket-04",
    nomor: 4,
    slug: "paket-04-verbal-logika",
    nama: "Try Out 4 — Verbal & Logika",
    tema: "TIU verbal: analogi, silogisme, penalaran analitis",
    tingkat: "Menengah",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Latihan padat untuk analogi kata, sinonim–antonim, silogisme, dan penalaran analitis (soal urutan/penempatan). Bagian ini paling cepat naik skornya kalau polanya sudah dikenali.",
    fokus: ["Analogi & padanan kata", "Silogisme", "Penalaran analitis"],
    saran: "Cocok untuk mengejar skor TIU dalam waktu singkat.",
  },
  {
    id: "paket-05",
    nomor: 5,
    slug: "paket-05-figural-analitis",
    nama: "Try Out 5 — Figural & Analitis",
    tema: "TIU figural + soal analitis multi-syarat",
    tingkat: "Sulit",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Soal figural (analogi gambar, ketidaksamaan, serial) disajikan dengan notasi simbol yang bisa dibaca di layar apa pun, dipadu soal analitis bersyarat banyak. Paket paling menantang untuk kecepatan berpikir.",
    fokus: ["Figural serial", "Ketidaksamaan", "Analitis bersyarat"],
    saran: "Jangan dikerjakan sebagai paket pertama.",
  },
  {
    id: "paket-06",
    nomor: 6,
    slug: "paket-06-simulasi-a",
    nama: "Try Out 6 — Simulasi Penuh A",
    tema: "Simulasi CAT apa adanya",
    tingkat: "Menengah",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Komposisi dan tingkat kesulitan dibuat semirip mungkin dengan CAT BKN: campuran merata, tanpa tema khusus. Kerjakan penuh 100 menit tanpa jeda untuk melatih stamina.",
    fokus: ["Simulasi penuh", "Stamina 100 menit", "Distribusi merata"],
    saran: "Kerjakan di jam yang sama dengan sesi ujian Anda nanti.",
  },
  {
    id: "paket-07",
    nomor: 7,
    slug: "paket-07-simulasi-b",
    nama: "Try Out 7 — Simulasi Penuh B",
    tema: "Simulasi CAT apa adanya (varian kedua)",
    tingkat: "Menengah",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Varian kedua dari simulasi penuh dengan bank soal yang sama sekali berbeda. Dipakai untuk mengukur konsistensi: skor yang stabil di dua paket ini lebih bisa dipercaya daripada satu kali skor tinggi.",
    fokus: ["Uji konsistensi", "Simulasi penuh", "Distribusi merata"],
    saran: "Kerjakan 3–7 hari setelah Paket 6.",
  },
  {
    id: "paket-08",
    nomor: 8,
    slug: "paket-08-hots",
    nama: "Try Out 8 — HOTS & Jebakan",
    tema: "Soal bernalar tinggi dan pengecoh khas SKD",
    tingkat: "Sulit",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Berisi soal yang butuh dua langkah berpikir dan opsi pengecoh yang mirip. TKP-nya memakai dilema kerja yang tidak punya jawaban 'jelas benar' — melatih Anda memilih respons paling adaptif, bukan paling normatif.",
    fokus: ["HOTS", "Pengecoh & jebakan", "TKP dilematis"],
    saran: "Kerjakan setelah skor Anda stabil melewati ambang batas.",
  },
  {
    id: "paket-09",
    nomor: 9,
    slug: "paket-09-prediksi-a",
    nama: "Try Out 9 — Prediksi SKD 2026 A",
    tema: "Isu kekinian & materi yang diprediksi menguat",
    tingkat: "Sulit",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Menyertakan materi yang porsinya menguat beberapa tahun terakhir: transformasi digital pemerintahan, keterbukaan informasi publik, netralitas ASN, literasi data, dan anti radikalisme kontekstual.",
    fokus: ["Digitalisasi pemerintahan", "Netralitas ASN", "Isu kontemporer"],
    saran: "Masuk fase H-30 sebelum ujian.",
  },
  {
    id: "paket-10",
    nomor: 10,
    slug: "paket-10-prediksi-b",
    nama: "Try Out 10 — Prediksi SKD 2026 B (Final)",
    tema: "Ujian pamungkas, kesulitan penuh",
    tingkat: "Sulit",
    durasiMenit: DURASI_MENIT_UMUM,
    deskripsi:
      "Paket penutup dengan tekanan waktu paling terasa. Kalau Anda lolos ambang batas di paket ini dalam waktu di bawah 90 menit, kesiapan Anda sudah di atas rata-rata pelamar.",
    fokus: ["Tekanan waktu", "Kesulitan penuh", "Tolok ukur akhir"],
    saran: "Kerjakan H-7 sampai H-3 sebelum ujian, lalu istirahat.",
  },
];

export function getPaket(idOrSlug: string): Paket | undefined {
  return PAKET.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

export const WARNA_TINGKAT: Record<Tingkat, string> = {
  Dasar: "bg-emerald-500/10 text-emerald-700 ring-emerald-600/20 dark:text-emerald-300 dark:ring-emerald-400/30",
  Menengah: "bg-sky-500/10 text-sky-700 ring-sky-600/20 dark:text-sky-300 dark:ring-sky-400/30",
  Sulit: "bg-rose-500/10 text-rose-700 ring-rose-600/20 dark:text-rose-300 dark:ring-rose-400/30",
};
