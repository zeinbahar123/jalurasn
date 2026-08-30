"use client";

import Link from "next/link";

const topikDeret = [
  {
    nomor: "01",
    judul: "Pola Selisih",
    deskripsi:
      "Mempelajari deret angka berdasarkan selisih antara satu bilangan dengan bilangan berikutnya.",
    materi: [
      "Selisih Tetap",
      "Selisih Bertingkat",
      "Selisih Positif",
      "Selisih Negatif",
    ],
  },
  {
    nomor: "02",
    judul: "Deret Aritmetika",
    deskripsi:
      "Mempelajari deret bilangan yang memiliki beda atau selisih tetap pada setiap suku.",
    materi: [
      "Mengenali Beda",
      "Menentukan Suku Berikutnya",
      "Rumus Suku ke-n",
      "Jumlah Suku",
    ],
  },
  {
    nomor: "03",
    judul: "Deret Geometri",
    deskripsi:
      "Mempelajari deret bilangan yang memiliki rasio tetap antara satu suku dengan suku berikutnya.",
    materi: [
      "Mengenali Rasio",
      "Menentukan Suku Berikutnya",
      "Rumus Suku ke-n",
      "Pola Perkalian",
    ],
  },
  {
    nomor: "04",
    judul: "Pola Bilangan",
    deskripsi:
      "Mempelajari berbagai pola bilangan yang digunakan untuk menentukan angka yang hilang atau angka berikutnya.",
    materi: [
      "Bilangan Ganjil",
      "Bilangan Genap",
      "Bilangan Prima",
      "Bilangan Kuadrat",
      "Bilangan Kubik",
    ],
  },
  {
    nomor: "05",
    judul: "Deret Campuran",
    deskripsi:
      "Mempelajari deret yang menggunakan lebih dari satu pola operasi matematika secara bergantian.",
    materi: [
      "Pola Tambah dan Kurang",
      "Pola Kali dan Bagi",
      "Pola Bergantian",
      "Pola Kombinasi",
    ],
  },
];

export default function DeretAngkaPage() {
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
            Deret Angka
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari cara mengenali pola deret angka, menentukan hubungan
            antarbilangan, dan menemukan angka berikutnya dengan cepat dan
            tepat.
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
            Deret angka merupakan salah satu materi penting dalam kemampuan
            numerik TIU. Kamu perlu menemukan pola hubungan antarangka untuk
            menentukan nilai yang belum diketahui atau angka berikutnya.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-bold text-slate-900">
            Tips Mengerjakan Deret Angka
          </h2>

          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
            <li className="flex gap-3">
              <span className="font-bold text-blue-600">1.</span>
              <span>
                Periksa terlebih dahulu selisih antarangka secara berurutan.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">2.</span>
              <span>
                Jika selisih tidak tetap, periksa kemungkinan pola perkalian
                atau pembagian.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">3.</span>
              <span>
                Perhatikan pola bergantian, misalnya tambah lalu kali atau
                kurang lalu bagi.
              </span>
            </li>

            <li className="flex gap-3">
              <span className="font-bold text-blue-600">4.</span>
              <span>
                Jangan langsung menggunakan rumus sebelum mengetahui pola
                deretnya.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Daftar Topik */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Topik Deret Angka
          </h2>

          <p className="mt-2 text-slate-600">
            Pelajari pola deret angka dari dasar hingga pola campuran.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {topikDeret.map((item) => (
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
                  DERET ANGKA
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