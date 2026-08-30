import Link from "next/link";

const materiTKP = [
  {
    nomor: "01",
    judul: "Pelayanan Publik",
    deskripsi:
      "Mempelajari cara menghadapi masyarakat, memberikan pelayanan yang baik, serta menentukan respons yang tepat dalam berbagai situasi pelayanan.",
    materi: [
      "Orientasi pelayanan",
      "Kepuasan masyarakat",
      "Sikap profesional",
      "Penanganan keluhan",
    ],
    link: "/materi/tkp/pelayanan-publik",
  },
  {
    nomor: "02",
    judul: "Jejaring Kerja",
    deskripsi:
      "Mempelajari kemampuan membangun hubungan kerja, bekerja sama dengan orang lain, dan menjaga komunikasi dalam lingkungan organisasi.",
    materi: [
      "Kerja sama",
      "Komunikasi",
      "Membangun hubungan kerja",
      "Koordinasi",
    ],
    link: "/materi/tkp/jejaring-kerja",
  },
  {
    nomor: "03",
    judul: "Sosial Budaya",
    deskripsi:
      "Mempelajari kemampuan beradaptasi dan bekerja secara efektif dengan orang yang memiliki latar belakang sosial dan budaya yang berbeda.",
    materi: [
      "Keberagaman",
      "Toleransi",
      "Adaptasi lingkungan",
      "Menghargai perbedaan",
    ],
    link: "/materi/tkp/sosial-budaya",
  },
  {
    nomor: "04",
    judul: "Teknologi Informasi dan Komunikasi",
    deskripsi:
      "Mempelajari kemampuan memanfaatkan teknologi dan informasi secara tepat untuk mendukung pekerjaan dan meningkatkan efektivitas kerja.",
    materi: [
      "Pemanfaatan teknologi",
      "Informasi digital",
      "Komunikasi digital",
      "Keamanan informasi",
    ],
    link: "/materi/tkp/teknologi-informasi-komunikasi",
  },
  {
    nomor: "05",
    judul: "Profesionalisme",
    deskripsi:
      "Mempelajari sikap bertanggung jawab, disiplin, berintegritas, dan mampu menyelesaikan pekerjaan secara profesional.",
    materi: [
      "Tanggung jawab",
      "Disiplin",
      "Integritas",
      "Komitmen terhadap pekerjaan",
    ],
    link: "/materi/tkp/profesionalisme",
  },
  {
    nomor: "06",
    judul: "Anti Radikalisme",
    deskripsi:
      "Mempelajari sikap yang menunjukkan komitmen terhadap persatuan, toleransi, dan kehidupan berbangsa yang harmonis.",
    materi: [
      "Persatuan",
      "Toleransi",
      "Komitmen kebangsaan",
      "Menolak kekerasan",
    ],
    link: "/materi/tkp/anti-radikalisme",
  },
];

export default function TKPPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-4">
            <Link
              href="/materi"
              className="text-sm text-emerald-100 hover:text-white"
            >
              ← Kembali ke Materi
            </Link>
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-200">
            Materi CPNS
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Tes Karakteristik Pribadi
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-emerald-100">
            Pelajari materi TKP CPNS untuk memahami karakteristik perilaku
            kerja, pelayanan publik, kerja sama, profesionalisme, dan
            kemampuan menghadapi berbagai situasi dalam pekerjaan.
          </p>
        </div>
      </section>

      {/* MATERI */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Materi Tes Karakteristik Pribadi
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Pilih materi TKP yang ingin kamu pelajari.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {materiTKP.map((item) => (
            <div
              key={item.nomor}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  {item.nomor}
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                  TKP
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {item.judul}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.deskripsi}
              </p>

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
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      {materi}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={item.link}
                className="mt-6 block w-full rounded-xl bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
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
