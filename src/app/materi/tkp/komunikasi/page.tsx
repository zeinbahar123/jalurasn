import Link from "next/link";

export default function MateriKomunikasiPage() {
  const prinsip = [
    "Menyampaikan informasi dengan jelas, sopan, dan mudah dipahami.",
    "Mendengarkan lawan bicara sebelum memberikan tanggapan.",
    "Menyesuaikan cara komunikasi dengan situasi dan karakter orang lain.",
    "Menghindari bahasa yang dapat menimbulkan kesalahpahaman.",
    "Tetap tenang ketika menghadapi perbedaan pendapat.",
    "Memastikan informasi penting telah dipahami dengan benar.",
  ];

  const situasi = [
    "Berkomunikasi dengan rekan kerja yang memiliki pendapat berbeda.",
    "Menjelaskan informasi kepada masyarakat dengan bahasa sederhana.",
    "Menerima kritik atau masukan dari orang lain.",
    "Menghadapi orang yang sedang marah atau kecewa.",
    "Menyampaikan kesalahan secara profesional tanpa menyalahkan pihak lain.",
    "Berkoordinasi dengan tim untuk menyelesaikan pekerjaan.",
  ];

  const kesalahan = [
    "Memotong pembicaraan sebelum orang lain selesai berbicara.",
    "Menggunakan nada bicara yang terkesan merendahkan.",
    "Langsung menyalahkan orang lain ketika terjadi masalah.",
    "Menyampaikan informasi tanpa memastikan kebenarannya.",
    "Memaksakan pendapat sendiri dalam diskusi.",
    "Mengabaikan perasaan dan kondisi lawan bicara.",
  ];

  const strategi = [
    "Dengarkan terlebih dahulu sebelum memberikan respons.",
    "Gunakan bahasa yang sopan, jelas, dan objektif.",
    "Fokus pada penyelesaian masalah, bukan mencari siapa yang salah.",
    "Jika terjadi perbedaan pendapat, cari titik temu yang dapat diterima bersama.",
    "Tetap profesional ketika menghadapi kritik atau emosi dari orang lain.",
    "Pastikan informasi yang disampaikan benar dan tidak menyesatkan.",
    "Dalam situasi sulit, utamakan kepentingan pekerjaan dan pelayanan.",
  ];

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
              Komunikasi
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami cara berkomunikasi secara efektif, sopan, dan profesional
              dalam berbagai situasi kerja serta pelayanan kepada masyarakat.
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
                Memahami Komunikasi dalam TKP
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Komunikasi merupakan kemampuan menyampaikan dan menerima
                informasi secara efektif sehingga pesan dapat dipahami dengan
                baik oleh semua pihak.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam soal TKP, komunikasi biasanya berkaitan dengan bagaimana
                seseorang menghadapi perbedaan pendapat, memberikan informasi,
                menerima kritik, menangani konflik, dan bekerja sama dengan
                orang lain.
              </p>
            </section>

            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Prinsip Komunikasi Efektif
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Komunikasi yang baik tidak hanya bergantung pada kemampuan
                berbicara, tetapi juga kemampuan mendengarkan dan memahami
                situasi.
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
                2. Komunikasi dalam Berbagai Situasi
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam lingkungan kerja, komunikasi dapat terjadi dalam berbagai
                kondisi. Respons yang tepat harus tetap profesional dan
                berorientasi pada penyelesaian masalah.
              </p>

              <div className="mt-5 space-y-3">
                {situasi.map((item) => (
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
                3. Menghadapi Perbedaan Pendapat
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Perbedaan pendapat merupakan hal yang wajar dalam pekerjaan.
                Yang dinilai adalah bagaimana seseorang menyikapi perbedaan
                tersebut secara dewasa dan profesional.
              </p>

              <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/40 dark:bg-blue-950/30">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  Prinsip penting
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Jangan menjadikan perbedaan pendapat sebagai konflik pribadi.
                  Dengarkan alasan pihak lain, sampaikan pendapat berdasarkan
                  fakta, kemudian cari solusi yang paling baik untuk pekerjaan.
                </p>
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Kesalahan yang Sering Terjadi
              </h2>

              <div className="mt-5 space-y-3">
                {kesalahan.map((item) => (
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

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Strategi Menjawab Soal TKP Komunikasi
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
                Ringkasan Komunikasi
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Komunikasi efektif membutuhkan kemampuan berbicara dan mendengarkan.",
                  "Gunakan bahasa yang sopan, jelas, dan mudah dipahami.",
                  "Hadapi perbedaan pendapat secara profesional.",
                  "Jangan menjadikan masalah pekerjaan sebagai konflik pribadi.",
                  "Terima kritik dan masukan secara terbuka.",
                  "Utamakan penyelesaian masalah dan kepentingan pekerjaan.",
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
                Kembali ke daftar materi TKP untuk melanjutkan materi berikutnya.
              </p>

              <div className="mt-5">
                <Link
                  href="/materi/tkp"
                  className="inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  ← Daftar Materi TKP
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
                    nomor: "01",
                    nama: "Pelayanan Publik",
                    href: "/materi/tkp/pelayanan-publik",
                  },
                  {
                    nomor: "02",
                    nama: "Komunikasi",
                    href: "/materi/tkp/komunikasi",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                      item.nomor === "02"
                        ? "bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.nomor}. {item.nama}
                  </Link>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Dalam TKP, pilih respons yang paling profesional,
                  konstruktif, dan berorientasi pada kepentingan pekerjaan.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}