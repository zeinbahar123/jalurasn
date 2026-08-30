import Link from "next/link";

const materiTIU = [
  {
    nomor: "01",
    judul: "Kemampuan Verbal",
    deskripsi:
      "Mengukur kemampuan memahami informasi, hubungan kata, logika bahasa, dan penalaran verbal.",
    materi: ["Analogi", "Silogisme", "Analitis"],
    link: "/materi/tiu/verbal",
  },
  {
    nomor: "02",
    judul: "Kemampuan Numerik",
    deskripsi:
      "Mengukur kemampuan berhitung, memahami pola angka, perbandingan, dan menyelesaikan persoalan matematika.",
    materi: [
      "Berhitung",
      "Deret Angka",
      "Perbandingan Kuantitatif",
      "Soal Cerita",
    ],
    link: "/materi/tiu/numerik",
  },
  {
    nomor: "03",
    judul: "Kemampuan Figural",
    deskripsi:
      "Mengukur kemampuan memahami pola, hubungan, dan perubahan bentuk atau gambar.",
    materi: ["Analogi Figural", "Ketidaksamaan", "Serial"],
    link: "/materi/tiu/figural",
  },
];

export default function TIUPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/materi"
            className="text-sm text-blue-100 hover:text-white"
          >
            ← Kembali ke Materi
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-200">
            Materi CPNS
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Tes Intelegensi Umum
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari materi TIU CPNS secara bertahap untuk meningkatkan
            kemampuan verbal, numerik, dan figural dalam menghadapi seleksi
            CPNS.
          </p>
        </div>
      </section>

      {/* DAFTAR MATERI */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Materi Tes Intelegensi Umum
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Pilih materi yang ingin kamu pelajari.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {materiTIU.map((item) => (
            <article
              key={item.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              {/* NOMOR */}
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                  {item.nomor}
                </span>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  TIU
                </span>
              </div>

              {/* JUDUL */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.judul}
              </h3>

              {/* DESKRIPSI */}
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.deskripsi}
              </p>

              {/* POKOK MATERI */}
              <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
                <p className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Pokok Materi:
                </p>

                <ul className="space-y-2">
                  {item.materi.map((materi) => (
                    <li
                      key={materi}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                      {materi}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TOMBOL */}
              <Link
                href={item.link}
                className="mt-6 block w-full rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Pelajari Materi →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
