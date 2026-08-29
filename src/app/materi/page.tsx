import Link from "next/link";

const MATERI = [
  {
    kode: "TWK",
    judul: "Tes Wawasan Kebangsaan",
    deskripsi:
      "Pelajari nasionalisme, integritas, bela negara, pilar negara, dan Bahasa Indonesia.",
    warna: "emerald",
    topik: [
      "Nasionalisme",
      "Integritas",
      "Bela Negara",
      "Pilar Negara",
      "Bahasa Indonesia",
    ],
  },
  {
    kode: "TIU",
    judul: "Tes Intelegensia Umum",
    deskripsi:
      "Pelajari kemampuan verbal, numerik, dan figural yang sering muncul dalam SKD.",
    warna: "sky",
    topik: [
      "Verbal",
      "Numerik",
      "Logika",
      "Analitis",
      "Figural",
    ],
  },
  {
    kode: "TKP",
    judul: "Tes Karakteristik Pribadi",
    deskripsi:
      "Pelajari materi pelayanan publik, jejaring kerja, sosial budaya, dan profesionalisme.",
    warna: "amber",
    topik: [
      "Pelayanan Publik",
      "Jejaring Kerja",
      "Sosial Budaya",
      "Teknologi Informasi",
      "Profesionalisme",
      "Anti Radikalisme",
    ],
  },
];

export default function MateriPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
              Materi SKD CPNS
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Belajar sebelum
              <span className="text-indigo-600"> ikut try out.</span>
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Pelajari materi dasar SKD CPNS berdasarkan tiga bagian utama:
              TWK, TIU, dan TKP.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {MATERI.map((materi) => (
            <article
              key={materi.kode}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-black text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {materi.kode}
                </span>

                <span className="text-sm font-medium text-slate-400">
                  SKD
                </span>
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-950 dark:text-white">
                {materi.judul}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {materi.deskripsi}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-5 dark:border-slate-800">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Topik
                </p>

                <ul className="space-y-2">
                  {materi.topik.map((topik) => (
                    <li
                      key={topik}
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      {topik}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/materi/${materi.kode.toLowerCase()}`}
                className="mt-6 block rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-indigo-500"
              >
                Pelajari Materi →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">
            Sudah siap menguji kemampuan?
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Setelah mempelajari materi, langsung coba kemampuanmu melalui
            try out SKD.
          </p>

          <Link
            href="/tryout"
            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            Mulai Try Out
          </Link>
        </div>
      </section>
    </main>
  );
}