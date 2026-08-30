import Link from "next/link";

const materi = [
  {
    judul: "Pengertian Perbandingan Kuantitatif",
    isi: "Perbandingan kuantitatif adalah kemampuan untuk menentukan hubungan antara dua besaran atau nilai. Hubungan tersebut dapat berupa lebih besar, lebih kecil, atau sama dengan.",
  },
  {
    judul: "Membandingkan Dua Nilai",
    isi: "Dalam soal TIU, peserta biasanya diberikan dua besaran yang harus dibandingkan. Fokus utama bukan selalu menghitung sampai hasil akhir, tetapi menentukan hubungan kedua besaran secara cepat dan tepat.",
  },
  {
    judul: "Menggunakan Rasio",
    isi: "Rasio digunakan untuk menunjukkan hubungan antara dua besaran. Sebelum membandingkan, sederhanakan rasio jika memungkinkan agar perhitungan menjadi lebih mudah.",
  },
  {
    judul: "Perhatikan Satuan",
    isi: "Dua besaran harus menggunakan satuan yang sesuai sebelum dibandingkan. Jangan membandingkan nilai yang memiliki satuan berbeda tanpa melakukan konversi terlebih dahulu.",
  },
];

const strategi = [
  "Baca kedua besaran dengan teliti.",
  "Pastikan satuan kedua besaran sudah sama.",
  "Sederhanakan angka atau rasio jika memungkinkan.",
  "Cari hubungan kedua besaran tanpa melakukan perhitungan yang tidak diperlukan.",
  "Gunakan perkiraan apabila hasil perbandingan sudah dapat diketahui.",
  "Periksa kembali jawaban sebelum berpindah ke soal berikutnya.",
];

export default function PerbandinganKuantitatifPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tiu/numerik"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Kembali ke Kemampuan Numerik
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              TIU · NUMERIK
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Perbandingan Kuantitatif
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Pelajari cara membandingkan dua besaran secara cepat, tepat, dan
              efisien dalam soal Kemampuan Numerik TIU CPNS.
            </p>
          </div>
        </div>
      </section>

      {/* ISI */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* KONTEN */}
          <article className="space-y-8">
            {/* PENGANTAR */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Memahami Perbandingan Kuantitatif
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Perbandingan kuantitatif menguji kemampuan peserta dalam
                menentukan hubungan antara dua besaran. Kita harus menentukan
                apakah besaran pertama lebih besar, lebih kecil, atau sama
                dengan besaran kedua.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Kemampuan utama yang dibutuhkan adalah ketelitian membaca,
                memahami hubungan angka, dan memilih cara perhitungan yang
                paling efisien.
              </p>
            </section>

            {/* MATERI */}
            {materi.map((item, index) => (
              <section
                key={item.judul}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                    {index + 1}
                  </span>

                  <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                    {item.judul}
                  </h2>
                </div>

                <p className="mt-5 text-base leading-8 text-slate-700 dark:text-slate-300">
                  {item.isi}
                </p>
              </section>
            ))}

            {/* CONTOH */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Contoh Sederhana
              </h2>

              <div className="mt-5 rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Contoh:
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                  Nilai A = 75
                  <br />
                  Nilai B = 60
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  Karena 75 lebih besar daripada 60, maka nilai A lebih besar
                  daripada nilai B.
                </p>

                <div className="mt-4 rounded-lg bg-blue-50 p-4 text-center font-black text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                  A &gt; B
                </div>
              </div>
            </section>

            {/* STRATEGI */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Strategi Menjawab
              </h2>

              <div className="mt-5 space-y-4">
                {strategi.map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* TIPS */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Tips Penting
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Jangan langsung melakukan perhitungan panjang. Perhatikan
                apakah hubungan kedua besaran sebenarnya dapat diketahui
                melalui penyederhanaan atau perbandingan sederhana.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam ujian TIU, kemampuan menemukan cara yang cepat dan tepat
                dapat menghemat waktu untuk soal lainnya.
              </p>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan
              </h2>

              <div className="mt-5 space-y-3">
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  ✓ Bandingkan dua besaran secara langsung jika memungkinkan.
                </p>

                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  ✓ Pastikan satuan kedua besaran sama.
                </p>

                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  ✓ Sederhanakan rasio sebelum melakukan perhitungan.
                </p>

                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  ✓ Gunakan cara tercepat yang tetap akurat.
                </p>

                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  ✓ Selalu periksa kembali hasil sebelum memilih jawaban.
                </p>
              </div>
            </section>

            {/* NAVIGASI */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Lanjut Belajar
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Kembali ke materi Kemampuan Numerik atau lanjut ke materi Soal
                Cerita.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/tiu/numerik"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Kemampuan Numerik
                </Link>

                <Link
                  href="/materi/tiu/numerik/soal-cerita"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  Soal Cerita →
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                Materi Numerik
              </p>

              <nav className="mt-4 space-y-1">
                <Link
                  href="/materi/tiu/numerik"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  ← Kemampuan Numerik
                </Link>

                <div className="rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  Perbandingan Kuantitatif
                </div>

                <Link
                  href="/materi/tiu/numerik/soal-cerita"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Soal Cerita
                </Link>
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Pahami hubungan antarbesaran dan gunakan cara perhitungan
                  yang efisien untuk menghemat waktu.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
