import Link from "next/link";

export default function MateriBelaNegaraPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/twk"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            ← Kembali ke Materi TWK
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-rose-50 px-3 py-2 text-sm font-black text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
              TWK · MATERI 03
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Bela Negara
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami sikap, kesadaran, dan tindakan warga negara dalam
              menjaga kedaulatan, keutuhan wilayah, serta keselamatan bangsa
              dan negara.
            </p>
          </div>
        </div>
      </section>

      {/* ISI */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <article className="space-y-8">

            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Pengertian Bela Negara
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Bela negara merupakan sikap dan perilaku warga negara yang
                dijiwai oleh kecintaan kepada Negara Kesatuan Republik
                Indonesia berdasarkan Pancasila dan Undang-Undang Dasar Negara
                Republik Indonesia Tahun 1945.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Bela negara tidak selalu berarti ikut berperang. Dalam
                kehidupan sehari-hari, bela negara dapat diwujudkan melalui
                tindakan yang menjaga persatuan, menaati hukum, menjaga
                keamanan, serta memberikan kontribusi positif bagi bangsa dan
                negara.
              </p>
            </section>

            {/* 2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                2. Nilai-Nilai Dasar Bela Negara
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam memahami bela negara, terdapat beberapa nilai penting
                yang perlu diperhatikan.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Cinta tanah air.",
                  "Kesadaran berbangsa dan bernegara.",
                  "Keyakinan terhadap Pancasila sebagai ideologi negara.",
                  "Rela berkorban untuk bangsa dan negara.",
                  "Memiliki kemampuan awal bela negara.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
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
                3. Contoh Bela Negara
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Menaati peraturan dan hukum yang berlaku.",
                  "Menjaga persatuan dan kesatuan.",
                  "Menghormati simbol negara.",
                  "Menjaga keamanan lingkungan.",
                  "Mengikuti kegiatan sosial kemasyarakatan.",
                  "Belajar dengan sungguh-sungguh.",
                  "Menjaga nama baik bangsa.",
                  "Menggunakan kemampuan untuk kepentingan masyarakat.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Bela Negara dalam Kehidupan Sehari-hari
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Bela negara dapat dilakukan oleh siapa saja sesuai dengan
                peran dan tanggung jawabnya. Pelajar dapat menunjukkan bela
                negara dengan belajar secara disiplin dan menjaga lingkungan.
                Pekerja dapat menjalankan tugas secara profesional dan
                bertanggung jawab.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Sebagai warga negara, kita juga dapat menjaga kerukunan,
                menghormati perbedaan, tidak menyebarkan informasi yang
                memecah belah, serta ikut menjaga ketertiban masyarakat.
              </p>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Rela Berkorban
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Rela berkorban berarti bersedia memberikan waktu, tenaga,
                pikiran, kemampuan, atau kepentingan pribadi untuk kepentingan
                yang lebih besar bagi bangsa, negara, dan masyarakat.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Ingat untuk TWK
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Dalam soal TWK, perhatikan tindakan yang menunjukkan
                  tanggung jawab, kepedulian, pengabdian, dan kesediaan
                  mendahulukan kepentingan bangsa serta masyarakat.
                </p>
              </div>
            </section>

            {/* 6 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                6. Bela Negara dan ASN
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Bagi aparatur negara, bela negara dapat diwujudkan melalui
                pelaksanaan tugas secara profesional, berintegritas,
                bertanggung jawab, serta mengutamakan kepentingan masyarakat,
                bangsa, dan negara.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Seorang ASN harus menjalankan tugas sesuai aturan dan tidak
                menyalahgunakan kewenangan untuk kepentingan pribadi atau
                kelompok.
              </p>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Bela Negara
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Bela negara merupakan sikap dan perilaku warga negara untuk menjaga bangsa dan negara.",
                  "Bela negara tidak selalu berarti perjuangan fisik atau peperangan.",
                  "Cinta tanah air merupakan salah satu nilai penting bela negara.",
                  "Rela berkorban berarti mendahulukan kepentingan yang lebih besar.",
                  "Bela negara dapat dilakukan melalui pekerjaan dan tanggung jawab sehari-hari.",
                  "ASN dapat menunjukkan bela negara melalui pelayanan dan pengabdian kepada masyarakat.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="font-black text-indigo-600">✓</span>
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
                Lanjutkan mempelajari materi TWK lainnya atau uji kemampuanmu
                melalui try out SKD.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/twk"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Daftar Materi
                </Link>

                <Link
                  href="/tryout"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                >
                  Coba Try Out →
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-wider text-indigo-600">
                Materi TWK
              </p>

              <nav className="mt-4 space-y-1">
                {[
                  {
                    nomor: "01",
                    nama: "Nasionalisme",
                    href: "/materi/twk/nasionalisme",
                  },
                  {
                    nomor: "02",
                    nama: "Integritas",
                    href: "/materi/twk/integritas",
                  },
                  {
                    nomor: "03",
                    nama: "Bela Negara",
                    href: "/materi/twk/bela-negara",
                  },
                  {
                    nomor: "04",
                    nama: "Pilar Negara",
                    href: "/materi/twk/pilar-negara",
                  },
                  {
                    nomor: "05",
                    nama: "Bahasa Indonesia",
                    href: "/materi/twk/bahasa-indonesia",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm ${
                      item.nomor === "03"
                        ? "bg-indigo-50 font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.nomor}. {item.nama}
                  </Link>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Pelajari materi secara bertahap sebelum mengerjakan soal
                  try out.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}