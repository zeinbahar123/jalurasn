import type { MetadataRoute } from "next";
import { PAKET } from "@/data/paket";
import { urlAbsolut } from "@/lib/situs";

/**
 * Hanya halaman publik yang dimasukkan. Halaman yang butuh login
 * (hasil, pembahasan, riwayat, profil, ujian) sengaja dikecualikan
 * karena isinya milik masing-masing pengguna.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const sekarang = new Date();

  const utama: MetadataRoute.Sitemap = [
    { url: urlAbsolut("/"), lastModified: sekarang, changeFrequency: "weekly", priority: 1 },
    { url: urlAbsolut("/tryout"), lastModified: sekarang, changeFrequency: "weekly", priority: 0.9 },
    { url: urlAbsolut("/info"), lastModified: sekarang, changeFrequency: "monthly", priority: 0.9 },
    { url: urlAbsolut("/peringkat"), lastModified: sekarang, changeFrequency: "daily", priority: 0.6 },
    { url: urlAbsolut("/komunitas"), lastModified: sekarang, changeFrequency: "daily", priority: 0.6 },
    { url: urlAbsolut("/komunitas/mentor"), lastModified: sekarang, changeFrequency: "weekly", priority: 0.5 },
    { url: urlAbsolut("/daftar"), lastModified: sekarang, changeFrequency: "yearly", priority: 0.5 },
    { url: urlAbsolut("/masuk"), lastModified: sekarang, changeFrequency: "yearly", priority: 0.3 },
  ];

  const paket: MetadataRoute.Sitemap = PAKET.map((p) => ({
    url: urlAbsolut(`/tryout/${p.slug}`),
    lastModified: sekarang,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...utama, ...paket];
}
