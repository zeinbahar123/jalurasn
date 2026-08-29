import Link from "next/link";

export default function MateriNasionalismePage() {
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
            <span className="inline-flex rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              TWK · MATERI 01
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Nasionalisme
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami rasa cinta tanah air, persatuan, kepentingan bangsa,
              serta sikap menjaga keutuhan Negara Kesatuan Republik Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* ISI MATERI */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* KONTEN UTAMA */}
          <article className="space-y-8">
            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Pengertian Nasionalisme
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Nasionalisme merupakan sikap dan kesadaran untuk mencintai
                bangsa dan tanah air serta menempatkan kepentingan bangsa dan
                negara sebagai bagian penting dalam kehidupan bermasyarakat,
                berbangsa, dan bernegara.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam konteks Indonesia, nasionalisme tidak hanya ditunjukkan
                melalui rasa bangga terhadap bangsa, tetapi juga melalui
                tindakan nyata untuk menjaga persatuan, menghormati
                keberagaman, menaati aturan, dan ikut menjaga keutuhan NKRI.
              </p>
            </section>

            {/* 2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                2. Prinsip Nasionalisme
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Nasionalisme dalam kehidupan berbangsa dapat tercermin melalui
                beberapa sikap berikut:
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Mengutamakan kepentingan bangsa dan negara.",
                  "Menjaga persatuan dan kesatuan.",
                  "Menghargai perbedaan suku, agama, budaya, dan daerah.",
                  "Mencintai dan menjaga tanah air.",
                  "Menghormati simbol-simbol negara.",
                  "Berpartisipasi dalam kehidupan bermasyarakat dan bernegara.",
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
                3. Nasionalisme Indonesia
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Nasionalisme Indonesia berkembang dalam semangat persatuan
                seluruh rakyat Indonesia. Perbedaan yang ada di Indonesia
                bukan menjadi alasan untuk terpecah, tetapi menjadi kekuatan
                untuk membangun kehidupan bangsa.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Ingat untuk TWK
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Nasionalisme harus mendorong persatuan dan kepentingan
                  nasional, bukan merendahkan bangsa atau kelompok lain.
                </p>
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Persatuan dan Kesatuan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Persatuan dan kesatuan merupakan bagian penting dalam
                kehidupan bangsa Indonesia. Masyarakat Indonesia terdiri atas
                berbagai latar belakang, sehingga diperlukan sikap saling
                menghormati dan bekerja sama.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Sikap yang mendukung persatuan antara lain menghargai pendapat
                orang lain, menghindari diskriminasi, menyelesaikan perbedaan
                secara baik, serta tidak mudah terprovokasi oleh informasi
                yang dapat memecah belah masyarakat.
              </p>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Cinta Tanah Air
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Cinta tanah air dapat diwujudkan melalui tindakan sederhana
                dalam kehidupan sehari-hari. Seorang warga negara dapat
                menunjukkan kecintaannya terhadap Indonesia dengan menjaga
                lingkungan, menaati aturan, menghargai budaya Indonesia, serta
                memberikan kontribusi positif bagi masyarakat.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Menjaga lingkungan sekitar.",
                  "Menghargai budaya dan produk Indonesia.",
                  "Menjaga fasilitas umum.",
                  "Menaati peraturan.",
                  "Menghormati keberagaman.",
                  "Berprestasi dan memberikan kontribusi positif.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>

            {/* 6 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                6. Kepentingan Nasional
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Kepentingan nasional berkaitan dengan tujuan dan kepentingan
                yang harus dijaga demi keberlangsungan serta kemajuan bangsa
                dan negara.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam soal TWK, perhatikan pilihan yang menunjukkan sikap
                mengutamakan kepentingan bersama dibandingkan kepentingan
                pribadi atau kelompok ketika keduanya bertentangan.
              </p>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Nasionalisme
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Nasionalisme berkaitan dengan kecintaan terhadap bangsa dan tanah air.",
                  "Persatuan dan kesatuan merupakan bagian penting dari nasionalisme Indonesia.",
                  "Perbedaan bukan alasan untuk terpecah.",
                  "Cinta tanah air harus diwujudkan melalui tindakan nyata.",
                  "Kepentingan bangsa dan negara perlu diperhatikan dalam kehidupan bersama.",
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
                Lanjutkan ke materi berikutnya atau langsung uji kemampuanmu
                dengan try out SKD.
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
                  "Nasionalisme",
                  "Integritas",
                  "Bela Negara",
                  "Pilar Negara",
                  "Bahasa Indonesia",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2.5 text-sm ${
                      index === 0
                        ? "bg-indigo-50 font-bold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {index + 1}. {item}
                  </div>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Baca materi secara bertahap sebelum mengerjakan soal try out.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}