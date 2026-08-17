import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { LogoMark, Wordmark } from "@/components/logo";
import { SITUS, urlAbsolut } from "@/lib/situs";
import { ATURAN, SKOR_MAKS_TOTAL, TOTAL_SOAL } from "@/lib/skd";
import { PAKET } from "@/data/paket";

export const metadata: Metadata = {
  metadataBase: new URL(SITUS.url),
  title: {
    default: "Try Out SKD CPNS 2026 Gratis — 1.100 Soal + Pembahasan | JalurASN",
    template: "%s · JalurASN",
  },
  description: SITUS.deskripsi,
  keywords: [...SITUS.kataKunci],
  applicationName: SITUS.nama,
  authors: [{ name: "JalurASN" }],
  creator: "JalurASN",
  publisher: "JalurASN",
  alternates: { canonical: "/" },
  category: "education",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITUS.url,
    siteName: SITUS.nama,
    title: "Try Out SKD CPNS 2026 Gratis — 1.100 Soal + Pembahasan",
    description: SITUS.deskripsi,
  },
  twitter: {
    card: "summary_large_image",
    title: "Try Out SKD CPNS 2026 Gratis — 1.100 Soal + Pembahasan",
    description: SITUS.deskripsiSingkat,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <DataTerstruktur />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

/**
 * Data terstruktur schema.org. Ini yang dibaca Google untuk memahami bahwa
 * situs ini menyediakan latihan soal, sehingga berpeluang tampil sebagai
 * hasil kaya (rich result) dan bukan sekadar tautan biru biasa.
 */
function DataTerstruktur() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": urlAbsolut("/#situs"),
        url: SITUS.url,
        name: SITUS.nama,
        description: SITUS.deskripsi,
        inLanguage: SITUS.bahasa,
        publisher: { "@id": urlAbsolut("/#organisasi") },
      },
      {
        "@type": "EducationalOrganization",
        "@id": urlAbsolut("/#organisasi"),
        name: SITUS.nama,
        url: SITUS.url,
        description: SITUS.deskripsiSingkat,
        slogan: "Jangan gugur cuma karena kurang informasi.",
        areaServed: { "@type": "Country", name: "Indonesia" },
      },
      {
        "@type": "Course",
        "@id": urlAbsolut("/tryout#kursus"),
        name: "Try Out SKD CPNS 2026",
        description: `Latihan Seleksi Kompetensi Dasar CPNS berisi ${PAKET.length} paket, masing-masing ${TOTAL_SOAL} soal (TWK ${ATURAN.TWK.jumlahSoal}, TIU ${ATURAN.TIU.jumlahSoal}, TKP ${ATURAN.TKP.jumlahSoal}) dengan pembahasan lengkap dan penilaian sesuai nilai ambang batas resmi.`,
        url: urlAbsolut("/tryout"),
        inLanguage: SITUS.bahasa,
        isAccessibleForFree: true,
        educationalLevel: "Persiapan seleksi CPNS",
        teaches: [
          "Tes Wawasan Kebangsaan (TWK)",
          "Tes Intelegensia Umum (TIU)",
          "Tes Karakteristik Pribadi (TKP)",
        ],
        provider: { "@id": urlAbsolut("/#organisasi") },
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "IDR",
          category: "Free",
          availability: "https://schema.org/InStock",
        },
        hasCourseInstance: PAKET.map((p) => ({
          "@type": "CourseInstance",
          name: p.nama,
          description: p.tema,
          url: urlAbsolut(`/tryout/${p.slug}`),
          courseMode: "online",
          courseWorkload: `PT${p.durasiMenit}M`,
        })),
      },
      {
        "@type": "Quiz",
        "@id": urlAbsolut("/tryout#kuis"),
        name: "Simulasi CAT SKD CPNS 2026",
        about: "Seleksi Kompetensi Dasar CPNS",
        educationalLevel: "Dasar hingga sulit",
        inLanguage: SITUS.bahasa,
        isAccessibleForFree: true,
        numberOfQuestions: PAKET.length * TOTAL_SOAL,
        typicalAgeRange: "18-40",
        url: urlAbsolut("/tryout"),
        assesses: `Skor maksimal ${SKOR_MAKS_TOTAL} dengan ambang batas TWK ${ATURAN.TWK.ambangBatas}, TIU ${ATURAN.TIU.ambangBatas}, TKP ${ATURAN.TKP.ambangBatas}.`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Data statis dari kode sendiri, bukan masukan pengguna.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function SiteFooter() {
  const tahun = new Date().getFullYear();
  return (
    <footer className="no-print mt-16 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <LogoMark />
            <Wordmark />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
            Dibuat oleh orang yang pernah gagal dua kali sebelum akhirnya lolos.
            Gratis selamanya, tanpa iklan, tanpa jualan bimbel — supaya tidak ada
            lagi yang gugur cuma karena kurang informasi.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Belajar
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/tryout" className="hover:text-indigo-600">
                Try Out SKD
              </Link>
            </li>
            <li>
              <Link href="/riwayat" className="hover:text-indigo-600">
                Riwayat &amp; Analisis
              </Link>
            </li>
            <li>
              <Link href="/peringkat" className="hover:text-indigo-600">
                Peta Persaingan
              </Link>
            </li>
            <li>
              <Link href="/info" className="hover:text-indigo-600">
                Panduan &amp; Info CPNS
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Komunitas
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li>
              <Link href="/komunitas" className="hover:text-indigo-600">
                Cerita Perjuangan
              </Link>
            </li>
            <li>
              <Link href="/komunitas/mentor" className="hover:text-indigo-600">
                Cari Mentor
              </Link>
            </li>
            <li>
              <Link href="/profil" className="hover:text-indigo-600">
                Profil Saya
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-6 text-center text-xs leading-6 text-slate-500 dark:border-slate-800 dark:text-slate-500 sm:px-6">
        <p className="mx-auto max-w-3xl">
          <strong>Disclaimer:</strong> JalurASN adalah platform belajar mandiri
          dan tidak berafiliasi dengan BKN, KemenPANRB, maupun instansi
          pemerintah mana pun. Soal try out disusun sebagai latihan berdasarkan
          kisi-kisi publik SKD, bukan soal resmi. Informasi jadwal dan kebijakan
          seleksi selalu wajib dipastikan ke sumber resmi{" "}
          <a
            href="https://sscasn.bkn.go.id"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
          >
            sscasn.bkn.go.id
          </a>
          .
        </p>
        <p className="mt-3">© {tahun} JalurASN · Dibangun untuk pejuang CPNS 2026</p>
      </div>
    </footer>
  );
}
