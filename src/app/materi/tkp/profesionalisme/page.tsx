import Link from "next/link";

const prinsip = [
  "Melaksanakan tugas sesuai aturan, standar, dan tanggung jawab yang diberikan.",
  "Mengutamakan kepentingan organisasi dan masyarakat dalam menjalankan pekerjaan.",
  "Bekerja secara jujur, disiplin, objektif, dan dapat dipertanggungjawabkan.",
  "Menjaga kualitas pekerjaan meskipun berada dalam tekanan atau menghadapi banyak tugas.",
  "Terus meningkatkan pengetahuan dan kemampuan untuk mendukung pekerjaan.",
  "Mampu memisahkan kepentingan pribadi dari kepentingan pekerjaan.",
];

const sikap = [
  "Datang tepat waktu dan menyelesaikan pekerjaan sesuai target.",
  "Mengikuti prosedur yang berlaku tanpa mencari jalan pintas yang tidak sesuai aturan.",
  "Menerima kritik dan masukan secara terbuka.",
  "Mengakui kesalahan dan segera melakukan perbaikan.",
  "Tidak menyalahgunakan jabatan, fasilitas, atau kewenangan.",
  "Menjaga kerahasiaan informasi yang memang harus dilindungi.",
  "Memberikan pelayanan secara adil tanpa membeda-bedakan orang.",
  "Tetap tenang dan profesional ketika menghadapi konflik.",
];

const situasi = [
  "Mendapat tugas tambahan ketika pekerjaan utama belum selesai.",
  "Menemukan kesalahan dalam pekerjaan sendiri setelah pekerjaan dikirim.",
  "Mendapat tekanan dari pihak lain untuk melanggar prosedur.",
  "Menerima kritik dari atasan atau rekan kerja.",
  "Menangani masyarakat yang sedang marah atau kecewa.",
  "Melihat rekan kerja melakukan tindakan yang tidak sesuai aturan.",
];

const jebakan = [
  "Menganggap profesional berarti selalu mengikuti keinginan atasan meskipun bertentangan dengan aturan.",
  "Memilih jawaban yang terlihat paling cepat tetapi mengabaikan prosedur.",
  "Membela rekan kerja meskipun tindakan tersebut jelas tidak benar.",
  "Mengutamakan kepentingan pribadi ketika mengambil keputusan.",
  "Menghindari tanggung jawab ketika terjadi kesalahan.",
  "Menjadi emosional ketika mendapatkan kritik atau menghadapi masyarakat yang sulit.",
];

const strategi = [
  "Pilih tindakan yang sesuai aturan dan tetap berorientasi pada penyelesaian masalah.",
  "Utamakan kepentingan pekerjaan dan masyarakat dibanding kepentingan pribadi.",
  "Tunjukkan sikap bertanggung jawab terhadap tugas yang diberikan.",
  "Jika melakukan kesalahan, akui, perbaiki, dan jadikan sebagai pembelajaran.",
  "Hadapi kritik secara terbuka dan gunakan sebagai bahan evaluasi.",
  "Dalam konflik, tetap tenang, objektif, dan gunakan komunikasi yang baik.",
  "Jangan mengambil keputusan berdasarkan tekanan, emosi, atau hubungan pribadi.",
  "Cari solusi yang paling tepat tanpa mengorbankan integritas dan aturan.",
];

export default function MateriProfesionalismePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tkp"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Kembali ke Materi TKP
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              TKP · MATERI
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Profesionalisme
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami sikap profesional dalam bekerja, menjalankan tanggung
              jawab, menghadapi masalah, dan memberikan pelayanan secara
              objektif, disiplin, serta berintegritas.
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
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Memahami Profesionalisme
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Profesionalisme adalah sikap dan perilaku seseorang dalam
                menjalankan pekerjaan dengan penuh tanggung jawab, disiplin,
                kompeten, objektif, dan sesuai dengan aturan yang berlaku.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam soal TKP, profesionalisme biasanya diuji melalui situasi
                pekerjaan yang membutuhkan pilihan antara kepentingan pribadi,
                kepentingan orang lain, dan tanggung jawab terhadap pekerjaan.
              </p>
            </section>

            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Prinsip Profesionalisme
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Seorang yang profesional tidak hanya mampu menyelesaikan
                pekerjaan, tetapi juga memperhatikan proses, tanggung jawab,
                etika, dan kualitas hasil pekerjaan.
              </p>

              <div className="mt-5 space-y-3">
                {prinsip.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />

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
                2. Sikap Profesional di Tempat Kerja
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Profesionalisme terlihat dari kebiasaan sehari-hari ketika
                menjalankan tugas dan berinteraksi dengan rekan kerja maupun
                masyarakat.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {sikap.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      ✓ {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                3. Menghadapi Situasi Kerja
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Soal TKP sering memberikan situasi yang tidak ideal. Peserta
                harus memilih tindakan yang menunjukkan tanggung jawab,
                kedewasaan, dan kemampuan menyelesaikan masalah.
              </p>

              <div className="mt-5 space-y-3">
                {situasi.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    • {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Prinsip penting
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Ketika menghadapi masalah, jangan menghindari tanggung jawab.
                  Pahami masalah, komunikasikan dengan pihak yang tepat, lalu
                  ambil tindakan yang paling sesuai dengan aturan dan tujuan
                  pekerjaan.
                </p>
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Menghadapi Kritik dan Kesalahan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Kesalahan dalam pekerjaan dapat terjadi. Sikap profesional
                ditunjukkan dengan kesediaan menerima kritik, mengakui
                kesalahan, dan melakukan perbaikan.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Pola berpikir
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  Temukan kesalahan → akui secara bertanggung jawab → cari
                  penyebab → lakukan perbaikan → cegah agar kesalahan tidak
                  terulang.
                </p>
              </div>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Jebakan yang Sering Muncul
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Beberapa pilihan jawaban mungkin terlihat baik, tetapi belum
                tentu menunjukkan profesionalisme yang kuat.
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
                6. Strategi Menjawab Soal Profesionalisme
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

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Profesionalisme
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Profesionalisme berarti bekerja dengan tanggung jawab, disiplin, kompetensi, dan integritas.",
                  "Utamakan aturan dan kepentingan pekerjaan dibanding kepentingan pribadi.",
                  "Terima kritik dengan terbuka dan gunakan sebagai bahan evaluasi.",
                  "Jika melakukan kesalahan, bertanggung jawab dan segera melakukan perbaikan.",
                  "Hadapi konflik secara tenang, objektif, dan komunikatif.",
                  "Jangan mengorbankan aturan hanya karena tekanan dari pihak lain.",
                  "Pilih tindakan yang menyelesaikan masalah sekaligus menjaga kualitas dan integritas pekerjaan.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="font-black text-blue-600">✓</span>

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
                Kembali ke daftar materi TKP atau lanjutkan ke materi
                Anti Radikalisme.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/tkp"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Daftar Materi
                </Link>

                <Link
                  href="/materi/tkp/anti-radikalisme"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  Anti Radikalisme →
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                Materi TKP
              </p>

              <nav className="mt-4 space-y-1">
                {[
                  {
                    nomor: "01",
                    nama: "Pelayanan Publik",
                    href: "/materi/tkp/pelayanan-publik",
                  },
                  {
                    nomor: "02",
                    nama: "Profesionalisme",
                    href: "/materi/tkp/profesionalisme",
                  },
                  {
                    nomor: "03",
                    nama: "Anti Radikalisme",
                    href: "/materi/tkp/anti-radikalisme",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                      item.nomor === "02"
                        ? "bg-blue-50 font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.nomor}. {item.nama}
                  </Link>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Pahami sikap profesional, kemudian latih kemampuan memilih
                  tindakan terbaik dalam berbagai situasi kerja.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}