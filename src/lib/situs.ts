/**
 * Identitas situs untuk SEO, sitemap, dan data terstruktur.
 *
 * Urutan penentuan alamat situs:
 *   1. NEXT_PUBLIC_SITE_URL  → isi manual setelah punya domain sendiri
 *   2. VERCEL_PROJECT_PRODUCTION_URL → diisi Vercel secara otomatis
 *   3. http://localhost:3000 → saat pengembangan
 */

function tentukanUrl(): string {
  const manual = process.env.NEXT_PUBLIC_SITE_URL;
  if (manual) return manual.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITUS = {
  url: tentukanUrl(),
  nama: "JalurASN",
  namaPanjang: "JalurASN — Try Out SKD CPNS 2026 Gratis",
  deskripsi:
    "Try out SKD CPNS 2026 gratis: 10 paket, 1.100 soal TWK TIU TKP lengkap dengan pembahasan, penilaian sesuai ambang batas resmi, analisis kelemahan otomatis, dan peta persaingan antarpelamar.",
  deskripsiSingkat:
    "10 paket try out SKD CPNS 2026 gratis, 1.100 soal berpembahasan, plus komunitas pejuang CPNS.",
  bahasa: "id-ID",
  /** Kata kunci utama yang benar-benar dicari calon pelamar di mesin pencari. */
  kataKunci: [
    "try out SKD CPNS 2026",
    "try out CPNS gratis",
    "latihan soal SKD CPNS",
    "soal TWK TIU TKP",
    "pembahasan soal SKD",
    "passing grade SKD CPNS 2026",
    "nilai ambang batas SKD",
    "simulasi CAT BKN",
    "contoh soal CPNS 2026",
    "belajar CPNS gratis",
  ],
} as const;

/** Bangun URL absolut dari path relatif. */
export function urlAbsolut(path = "/"): string {
  return `${SITUS.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Gambar pratinjau bersama.
 *
 * Wajib disertakan ulang di setiap halaman yang menimpa `openGraph`, karena
 * Next.js TIDAK mewarisi gambar dari layout begitu sebuah halaman mendefinisikan
 * objek openGraph-nya sendiri. Tanpa ini, tautan yang dibagikan ke WhatsApp atau
 * media sosial tampil polos tanpa gambar.
 */
export const OG_GAMBAR = [
  {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: SITUS.namaPanjang,
  },
] as const;
