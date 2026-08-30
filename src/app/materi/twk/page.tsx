
import Link from "next/link";

const TOPIK_TWK = [
  {
    nomor: "01",
    judul: "Nasionalisme",
    deskripsi:
      "Memahami rasa cinta tanah air, persatuan, kepentingan bangsa, dan sikap menjaga keutuhan Negara Kesatuan Republik Indonesia.",
    isi: [
      "Pengertian dan prinsip nasionalisme",
      "Persatuan dan kesatuan bangsa",
      "Cinta tanah air",
      "Kepentingan nasional",
      "Contoh penerapan nasionalisme dalam kehidupan",
    ],
    link: "/materi/twk/nasionalisme",
  },
  {
    nomor: "02",
    judul: "Integritas",
    deskripsi:
      "Mempelajari nilai kejujuran, tanggung jawab, konsistensi, dan sikap yang sesuai dengan norma serta aturan.",
    isi: [
      "Pengertian integritas",
      "Kejujuran dan tanggung jawab",
      "Konsistensi antara perkataan dan tindakan",
      "Anti korupsi",
      "Contoh perilaku berintegritas",
    ],
    link: "/materi/twk/integritas",
  },
  {
    nomor: "03",
    judul: "Bela Negara",
    deskripsi:
      "Memahami sikap dan tindakan warga negara dalam menjaga bangsa, negara, dan kepentingan nasional.",
    isi: [
      "Pengertian bela negara",
      "Nilai dasar bela negara",
      "Kesadaran berbangsa dan bernegara",
      "Menjaga keutuhan NKRI",
      "Contoh bela negara dalam kehidupan sehari-hari",
    ],
    link: "/materi/twk/bela-negara",
  },
  {
    nomor: "04",
    judul: "Pilar Negara",
    deskripsi:
      "Memahami dasar dan pilar kehidupan berbangsa dan bernegara sebagai bagian penting dalam materi TWK.",
    isi: [
      "Pancasila",
      "Undang-Undang Dasar Negara Republik Indonesia Tahun 1945",
      "Negara Kesatuan Republik Indonesia",
      "Bhinneka Tunggal Ika",
      "Penerapan nilai-nilai pilar negara",
    ],
    link: "/materi/twk/pilar-negara",
  },
  {
    nomor: "05",
    judul: "Bahasa Indonesia",
    deskripsi:
      "Mempelajari penggunaan Bahasa Indonesia yang baik dan benar dalam konteks komunikasi serta kehidupan berbangsa.",
    isi: [
      "Kedudukan Bahasa Indonesia",
      "Kata baku dan tidak baku",
      "Kalimat efektif",
      "Ejaan dan penggunaan tanda baca",
      "Pemahaman teks",
    ],
    link: "/materi/twk/bahasa-indonesia",
  },
];

export default function MateriTWKPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Link
            href="/materi"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            ← Kembali ke Materi
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              TWK
            </div>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Tes Wawasan Kebangsaan
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Pelajari materi TWK secara bertahap untuk memperkuat pemahaman
              sebelum mengerjakan try out SKD.
            </p>
          </div>

          {/* RINGKASAN */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-black text-slate-950 dark:text-white">
                5
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Materi utama
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-black text-slate-950 dark:text-white">
                30
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Soal TWK pada SKD
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-black text-slate-950 dark:text-white">
                150
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Skor maksimal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DAFTAR MATERI */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Daftar Materi
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Kuasai materi TWK
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Mulai dari materi dasar kemudian lanjutkan ke materi berikutnya.
          </p>
        </div>

        <div className="space-y-5">
          {TOPIK_TWK.map((topik) => (
            <article
              key={topik.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                {/* NOMOR */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {topik.nomor}
                </div>

                {/* KONTEN */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold text-slate-950 dark:text-white">
                    {topik.judul}
                  </h3>

                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {topik.deskripsi}
                  </p>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    {topik.isi.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* TOMBOL LINK MATERI */}
                  <Link
                    href={topik.link}
                    className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-500"
                  >
                    Baca Materi →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Sudah belajar?
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">
            Uji pemahamanmu dengan Try Out SKD
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            Setelah mempelajari materi TWK, langsung kerjakan soal untuk
            mengetahui kemampuanmu.
          </p>

          <Link
            href="/tryout"
            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
          >
            Mulai Try Out →
          </Link>
        </div>
      </section>
    </main>
  );
}
