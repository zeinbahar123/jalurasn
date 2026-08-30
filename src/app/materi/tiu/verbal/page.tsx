import Link from "next/link";

const materiVerbal = [
  {
    nomor: "01",
    judul: "Analogi",
    deskripsi:
      "Mempelajari hubungan antara dua kata atau konsep dan menentukan pasangan yang memiliki hubungan serupa.",
    materi: [
      "Hubungan kata",
      "Hubungan profesi",
      "Hubungan alat dan fungsi",
      "Hubungan sebab dan akibat",
    ],
    link: "/materi/tiu/verbal/analogi",
  },
  {
    nomor: "02",
    judul: "Silogisme",
    deskripsi:
      "Mempelajari penalaran berdasarkan beberapa pernyataan untuk mendapatkan kesimpulan yang logis.",
    materi: [
      "Premis",
      "Kesimpulan",
      "Hubungan logis",
      "Penalaran silogisme",
    ],
    link: "/materi/tiu/verbal/silogisme",
  },
  {
    nomor: "03",
    judul: "Analitis",
    deskripsi:
      "Melatih kemampuan menganalisis informasi, hubungan, kondisi, dan mengambil kesimpulan berdasarkan data yang diberikan.",
    materi: [
      "Analisis informasi",
      "Hubungan logis",
      "Urutan dan posisi",
      "Menentukan kemungkinan",
    ],
    link: "/materi/tiu/verbal/analitis",
  },
];

export default function VerbalPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-4">
            <Link
              href="/materi/tiu"
              className="text-sm text-blue-100 hover:text-white"
            >
              ← Kembali ke TIU
            </Link>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-200">
            Materi CPNS
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Kemampuan Verbal
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari materi kemampuan verbal TIU CPNS untuk meningkatkan
            kemampuan memahami hubungan kata, penalaran logis, dan analisis
            informasi.
          </p>
        </div>
      </section>

      {/* MATERI */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Materi Kemampuan Verbal
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Pilih materi verbal yang ingin kamu pelajari.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materiVerbal.map((item) => (
            <div
              key={item.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              {/* NOMOR & LABEL */}
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
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
                Pelajari Materi
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}