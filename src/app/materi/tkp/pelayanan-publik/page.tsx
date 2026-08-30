import Link from "next/link";

const prinsip = [
  "Memberikan pelayanan secara ramah, sopan, dan profesional.",
  "Mengutamakan kepentingan masyarakat sebagai penerima layanan.",
  "Memberikan informasi yang jelas, benar, dan mudah dipahami.",
  "Melayani masyarakat secara adil dan tidak diskriminatif.",
  "Bekerja sesuai aturan dan prosedur yang berlaku.",
  "Menjaga kecepatan dan ketepatan dalam memberikan pelayanan.",
];

const sikap = [
  "Mendengarkan kebutuhan masyarakat dengan baik.",
  "Tetap tenang ketika menghadapi masyarakat yang marah atau kecewa.",
  "Tidak membeda-bedakan masyarakat berdasarkan latar belakang.",
  "Memberikan solusi sesuai kewenangan dan aturan.",
  "Jika tidak mengetahui jawaban, mencari informasi yang benar terlebih dahulu.",
  "Tidak memberikan janji yang tidak dapat dipenuhi.",
];

const situasi = [
  {
    judul: "Masyarakat Marah",
    isi: "Dengarkan keluhan dengan tenang, jangan membalas dengan emosi, kemudian jelaskan solusi yang dapat diberikan sesuai aturan.",
  },
  {
    judul: "Permintaan di Luar Aturan",
    isi: "Tolak dengan sopan dan jelaskan alasan serta prosedur yang benar tanpa mencari jalan pintas.",
  },
  {
    judul: "Antrean Panjang",
    isi: "Tetap memberikan pelayanan secara tertib dan efisien tanpa mengurangi ketelitian maupun kualitas pelayanan.",
  },
  {
    judul: "Informasi Belum Diketahui",
    isi: "Jangan memberikan informasi berdasarkan perkiraan. Periksa sumber yang benar atau tanyakan kepada pihak yang berwenang.",
  },
];

const jebakan = [
  "Memilih jawaban yang terlalu emosional ketika menghadapi masyarakat.",
  "Mengutamakan kepentingan pribadi dibandingkan kebutuhan masyarakat.",
  "Memberikan pelayanan berbeda kepada orang tertentu.",
  "Melanggar prosedur hanya untuk mempercepat urusan.",
  "Memberikan informasi yang belum dipastikan kebenarannya.",
  "Mengabaikan keluhan masyarakat tanpa memberikan solusi.",
];

const strategi = [
  "Pilih tindakan yang paling berorientasi pada pelayanan masyarakat.",
  "Utamakan sikap sopan, tenang, dan profesional.",
  "Tetap berpegang pada aturan meskipun menghadapi tekanan.",
  "Cari solusi yang membantu masyarakat tanpa melanggar prosedur.",
  "Hindari tindakan diskriminatif dan pilih perlakuan yang adil.",
  "Jika menghadapi masalah, komunikasikan dengan baik dan cari penyelesaian.",
  "Pilih jawaban yang menunjukkan tanggung jawab dan kepedulian terhadap kualitas pelayanan.",
];

export default function PelayananPublikPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tkp"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-500"
          >
            ← Kembali ke Materi TKP
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              TKP · MATERI
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Pelayanan Publik
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Mempelajari sikap dan perilaku yang tepat dalam memberikan
              pelayanan kepada masyarakat secara profesional, adil, ramah,
              dan sesuai dengan aturan.
            </p>
          </div>
        </div>
      </section>

      {/* ISI */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* KONTEN UTAMA */}
          <article className="space-y-8">
            {/* PENGANTAR */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Memahami Pelayanan Publik
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Pelayanan publik merupakan kemampuan memberikan layanan kepada
                masyarakat dengan mengutamakan kepentingan masyarakat,
                profesionalitas, keadilan, ketepatan, serta kepatuhan terhadap
                aturan.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam soal TKP, peserta biasanya dihadapkan pada situasi yang
                membutuhkan pilihan tindakan. Jawaban terbaik umumnya
                menunjukkan sikap profesional, bertanggung jawab, membantu
                masyarakat, dan tetap mengikuti prosedur yang berlaku.
              </p>
            </section>

            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Prinsip Pelayanan Publik
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Pelayanan yang baik tidak hanya berfokus pada menyelesaikan
                pekerjaan, tetapi juga memastikan masyarakat memperoleh
                pelayanan yang layak dan profesional.
              </p>

              <div className="mt-5 space-y-3">
                {prinsip.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />

                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                2. Sikap dalam Melayani Masyarakat
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Sikap petugas sangat menentukan kualitas pelayanan. Dalam
                situasi sulit sekalipun, seorang pelayan publik harus mampu
                menjaga sikap dan memberikan respons yang tepat.
              </p>

              <div className="mt-5 space-y-3">
                {sikap.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <span className="font-black text-emerald-600">✓</span>

                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                3. Menghadapi Situasi Pelayanan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Soal TKP sering memberikan situasi yang menguji kemampuan
                peserta dalam menghadapi masalah pelayanan. Perhatikan contoh
                berikut.
              </p>

              <div className="mt-5 space-y-4">
                {situasi.map((item) => (
                  <div
                    key={item.judul}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20"
                  >
                    <h3 className="font-black text-slate-900 dark:text-white">
                      {item.judul}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item.isi}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Profesionalitas dan Aturan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Pelayanan publik harus dilakukan sesuai dengan ketentuan yang
                berlaku. Membantu masyarakat bukan berarti mengabaikan aturan.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Prinsip penting
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <span className="font-black">
                    Membantu masyarakat + mengikuti aturan + mencari solusi
                  </span>{" "}
                  merupakan kombinasi yang kuat dalam soal TKP pelayanan
                  publik.
                </p>
              </div>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Jebakan yang Sering Muncul
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Beberapa pilihan jawaban terlihat baik karena ingin membantu
                masyarakat, tetapi sebenarnya kurang tepat karena mengabaikan
                aturan atau profesionalitas.
              </p>

              <div className="mt-5 space-y-3">
                {jebakan.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-rose-100 bg-rose-50 p-4 dark:border-rose-900/40 dark:bg-rose-950/20"
                  >
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      ⚠ {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                6. Strategi Menjawab Soal TKP
              </h2>

              <div className="mt-5 space-y-4">
                {strategi.map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Pelayanan Publik
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Utamakan kepentingan masyarakat.",
                  "Berikan pelayanan dengan sopan dan profesional.",
                  "Jangan membeda-bedakan masyarakat.",
                  "Tetap ikuti aturan dan prosedur.",
                  "Hadapi keluhan dengan tenang.",
                  "Berikan informasi yang benar dan jelas.",
                  "Cari solusi tanpa melanggar kewenangan.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="font-black text-emerald-600">✓</span>

                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Sudah selesai membaca?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Kembali ke daftar materi TKP untuk mempelajari materi
                berikutnya.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/tkp"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Daftar Materi
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Materi TKP
              </p>

              <nav className="mt-4 space-y-1">
                {[
                  {
                    nama: "Pelayanan Publik",
                    href: "/materi/tkp/pelayanan-publik",
                  },
                  {
                    nama: "Jejaring Kerja",
                    href: "/materi/tkp/jejaring-kerja",
                  },
                  {
                    nama: "Sosial Budaya",
                    href: "/materi/tkp/sosial-budaya",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                      item.href === "/materi/tkp/pelayanan-publik"
                        ? "bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.nama}
                  </Link>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Pahami situasi, pilih tindakan yang profesional, tetap
                  berorientasi pada masyarakat, dan jangan melanggar aturan.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}