"use client";

import Link from "next/link";

const topikPerbandingan = [
  {
    nomor: "01",
    judul: "Konsep Perbandingan",
    deskripsi:
      "Mempelajari konsep dasar membandingkan dua atau lebih nilai berdasarkan hubungan kuantitasnya.",
    materi: [
      "Pengertian Perbandingan",
      "Rasio",
      "Menyederhanakan Rasio",
      "Membandingkan Nilai",
    ],
  },
  {
    nomor: "02",
    judul: "Perbandingan Senilai",
    deskripsi:
      "Mempelajari hubungan dua besaran yang berubah searah, yaitu ketika satu nilai bertambah maka nilai lainnya juga bertambah.",
    materi: [
      "Konsep Perbandingan Senilai",
      "Mencari Nilai yang Belum Diketahui",
      "Penerapan dalam Soal",
      "Perbandingan Tiga Besaran",
    ],
  },
  {
    nomor: "03",
    judul: "Perbandingan Berbalik Nilai",
    deskripsi:
      "Mempelajari hubungan dua besaran yang berubah berlawanan arah, yaitu ketika satu nilai bertambah maka nilai lainnya berkurang.",
    materi: [
      "Konsep Perbandingan Berbalik Nilai",
      "Mencari Nilai yang Belum Diketahui",
      "Penerapan dalam Soal",
      "Hubungan Jumlah dan Waktu",
    ],
  },
  {
    nomor: "04",
    judul: "Proporsi",
    deskripsi:
      "Mempelajari hubungan kesetaraan antara dua perbandingan dan penggunaannya untuk menentukan nilai yang belum diketahui.",
    materi: [
      "Konsep Proporsi",
      "Perkalian Silang",
      "Menentukan Nilai X",
      "Penerapan Proporsi",
    ],
  },
  {
    nomor: "05",
    judul: "Perbandingan Kuantitatif",
    deskripsi:
      "Mempelajari cara menentukan hubungan antara dua kuantitas untuk mengetahui mana yang lebih besar, lebih kecil, atau sama.",
    materi: [
      "Kuantitas A dan B",
      "A Lebih Besar dari B",
      "A Lebih Kecil dari B",
      "A Sama dengan B",
      "Informasi Tidak Cukup",
    ],
  },
];

export default function PerbandinganKuantitatifPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/materi/tiu/numerik"
              className="text-blue-100 transition hover:text-white"
            >
              ← Kembali ke Numerik
            </Link>

            <span className="text-blue-300">|</span>

            <Link
              href="/materi/tiu"
              className="text-blue-100 transition hover:text-white"
            >
              TIU
            </Link>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-200">
            Materi TIU CPNS
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Perbandingan Kuantitatif
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari cara membandingkan dua kuantitas secara cepat dan tepat,
            termasuk rasio, proporsi, perbandingan senilai, dan perbandingan
            berbalik nilai.
          </p>
        </div>
      </section>

      {/* Pengantar */}
      <section className="mx-auto max-w-6xl px-6 pt-12">
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Apa yang Dipelajari?
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600">
            Perbandingan kuantitatif menguji kemampuan dalam memahami hubungan
            antara dua nilai. Dalam soal TIU, kamu biasanya diminta menentukan
            apakah kuantitas A lebih besar, lebih kecil, sama dengan kuantitas
            B, atau informasinya belum cukup untuk menentukan hubungan tersebut.
          </p>
        </div>
      </section>

      {/* Strategi */}
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Strategi Mengerjakan
          </h2>

          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>
                Identifikasi terlebih dahulu kuantitas yang sedang dibandingkan.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>
                Sederhanakan bentuk perhitungan sebelum membandingkan nilainya.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>
                Gunakan rasio, proporsi, atau operasi hitung yang paling cepat.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>
                Pastikan informasi yang diberikan cukup untuk menentukan
                hubungan kedua kuantitas.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Topik */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Topik Perbandingan Kuantitatif
          </h2>

          <p className="mt-2 text-slate-600">
            Pelajari konsep perbandingan dari dasar hingga penerapannya dalam
            soal TIU.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {topikPerbandingan.map((item) => (
            <div
              key={item.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Nomor & Label */}
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                  {item.nomor}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  PERBANDINGAN
                </span>
              </div>

              {/* Judul */}
              <h3 className="text-xl font-bold text-slate-900">
                {item.judul}
              </h3>

              {/* Deskripsi */}
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.deskripsi}
              </p>

              {/* Pokok Materi */}
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Pokok Materi:
                </p>

                <ul className="space-y-2">
                  {item.materi.map((materi) => (
                    <li
                      key={materi}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {materi}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tombol */}
              <button
                type="button"
                disabled
                className="mt-6 w-full cursor-not-allowed rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
              >
                Materi Segera Hadir
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Navigasi */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/materi/tiu/numerik"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            ← Kembali ke Kemampuan Numerik
          </Link>

          <Link
            href="/materi/tiu"
            className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Kembali ke TIU
          </Link>
        </div>
      </section>
    </main>
  );
}