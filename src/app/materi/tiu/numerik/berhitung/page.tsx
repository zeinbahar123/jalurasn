"use client";

import Link from "next/link";

const topikBerhitung = [
  {
    nomor: "01",
    judul: "Operasi Hitung Dasar",
    deskripsi:
      "Mempelajari penjumlahan, pengurangan, perkalian, dan pembagian dengan cepat dan tepat.",
    materi: [
      "Penjumlahan",
      "Pengurangan",
      "Perkalian",
      "Pembagian",
      "Urutan Operasi Hitung",
    ],
  },
  {
    nomor: "02",
    judul: "Pecahan",
    deskripsi:
      "Mempelajari operasi dan perbandingan pecahan yang sering muncul dalam soal TIU.",
    materi: [
      "Pecahan Biasa",
      "Pecahan Campuran",
      "Pecahan Desimal",
      "Penjumlahan Pecahan",
      "Perkalian Pecahan",
    ],
  },
  {
    nomor: "03",
    judul: "Desimal",
    deskripsi:
      "Mempelajari cara menghitung, membandingkan, dan mengubah bentuk bilangan desimal.",
    materi: [
      "Operasi Desimal",
      "Desimal ke Pecahan",
      "Pecahan ke Desimal",
      "Perbandingan Desimal",
    ],
  },
  {
    nomor: "04",
    judul: "Persentase",
    deskripsi:
      "Mempelajari perhitungan persentase untuk menyelesaikan berbagai persoalan numerik.",
    materi: [
      "Menghitung Persentase",
      "Kenaikan Persentase",
      "Penurunan Persentase",
      "Diskon",
      "Keuntungan dan Kerugian",
    ],
  },
  {
    nomor: "05",
    judul: "Pangkat dan Akar",
    deskripsi:
      "Mempelajari konsep dasar perpangkatan dan akar serta penerapannya dalam soal TIU.",
    materi: [
      "Pangkat",
      "Sifat-Sifat Pangkat",
      "Pangkat Nol",
      "Akar Kuadrat",
      "Operasi Bentuk Akar",
    ],
  },
];

export default function BerhitungPage() {
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
            Berhitung
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari dasar-dasar kemampuan berhitung yang sering digunakan
            dalam soal Tes Intelegensi Umum (TIU), mulai dari operasi hitung
            hingga persentase, pangkat, dan akar.
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
            Kemampuan berhitung menguji ketelitian dan kecepatan dalam
            melakukan operasi matematika. Penguasaan konsep dasar sangat
            penting agar kamu dapat menyelesaikan soal TIU dengan waktu yang
            terbatas.
          </p>
        </div>
      </section>

      {/* Daftar Topik */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Topik Kemampuan Berhitung
          </h2>

          <p className="mt-2 text-slate-600">
            Pelajari setiap topik secara bertahap.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {topikBerhitung.map((item) => (
            <div
              key={item.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                  {item.nomor}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  BERHITUNG
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {item.judul}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.deskripsi}
              </p>

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

      {/* Navigasi Bawah */}
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