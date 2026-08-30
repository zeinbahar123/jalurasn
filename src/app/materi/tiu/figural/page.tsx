import Link from "next/link";

const materiFigural = [
  {
    nomor: "01",
    judul: "Analogi Figural",
    deskripsi:
      "Menganalisis hubungan antara bentuk atau gambar dan menentukan pasangan yang memiliki hubungan serupa.",
  },
  {
    nomor: "02",
    judul: "Ketidaksamaan",
    deskripsi:
      "Menentukan gambar yang berbeda atau tidak memiliki pola yang sama dengan kelompok gambar lainnya.",
  },
  {
    nomor: "03",
    judul: "Serial",
    deskripsi:
      "Menentukan gambar berikutnya berdasarkan pola perubahan bentuk, posisi, jumlah, atau arah.",
  },
];

export default function MateriFiguralPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tiu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Kembali ke Materi TIU
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              TIU · MATERI 03
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Kemampuan Figural
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Mempelajari pola, hubungan, perubahan bentuk, dan penalaran
              visual yang sering digunakan dalam soal TIU CPNS.
            </p>
          </div>
        </div>
      </section>

      {/* MATERI */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Materi Kemampuan Figural
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Pilih materi yang ingin kamu pelajari.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {materiFigural.map((item) => (
            <div
              key={item.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  {item.nomor}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  TIU
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.judul}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.deskripsi}
              </p>

              <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Materi pembelajaran akan berisi konsep, contoh soal,
                  pembahasan, dan strategi menjawab.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="mt-6 w-full cursor-not-allowed rounded-xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-500"
              >
                Segera Hadir
              </button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Selesai melihat materi?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Kembali ke daftar materi TIU untuk mempelajari Kemampuan Verbal
            atau Kemampuan Numerik.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/materi/tiu"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ← Daftar Materi TIU
            </Link>

            <Link
              href="/materi/tiu/numerik"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Kemampuan Numerik →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
