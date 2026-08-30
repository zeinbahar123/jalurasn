"use client";

import Link from "next/link";

const konsep = [
"Memahami dan menghargai keberagaman masyarakat.",
"Menghormati perbedaan suku, agama, budaya, bahasa, dan kebiasaan.",
"Menjaga sikap toleransi dalam lingkungan kerja dan masyarakat.",
"Mampu beradaptasi dengan lingkungan yang memiliki latar belakang berbeda.",
"Menghindari tindakan diskriminatif terhadap orang lain.",
"Mengutamakan persatuan dan kepentingan bersama.",
];

const sikap = [
"Menghargai pendapat orang lain meskipun berbeda dengan pendapat pribadi.",
"Tidak membeda-bedakan seseorang berdasarkan latar belakangnya.",
"Bersikap terbuka terhadap kebiasaan dan budaya yang berbeda.",
"Menyesuaikan cara berkomunikasi dengan kondisi dan karakter orang lain.",
"Membangun hubungan yang harmonis dengan lingkungan sekitar.",
"Menunjukkan sikap toleran tanpa mengabaikan aturan yang berlaku.",
];

const situasi = [
"Tetap menghormati rekan kerja yang memiliki kebiasaan berbeda.",
"Menggunakan bahasa yang sopan dan mudah dipahami ketika berkomunikasi.",
"Mencari titik temu ketika terdapat perbedaan pandangan.",
"Tidak membuat lelucon yang dapat menyinggung identitas atau latar belakang orang lain.",
"Membantu menciptakan lingkungan kerja yang nyaman bagi semua pihak.",
"Menyelesaikan kesalahpahaman melalui komunikasi yang baik.",
];

const jebakan = [
"Menganggap budaya atau kebiasaan sendiri paling benar.",
"Menghindari seseorang hanya karena memiliki latar belakang berbeda.",
"Membuat stereotip terhadap kelompok tertentu.",
"Menggunakan perbedaan sebagai alasan untuk tidak bekerja sama.",
"Memaksakan kebiasaan pribadi kepada orang lain.",
"Mengutamakan kelompok sendiri sehingga mengabaikan kepentingan bersama.",
];

const strategi = [
"Pilih jawaban yang menunjukkan toleransi dan penghargaan terhadap perbedaan.",
"Utamakan persatuan dan kepentingan bersama.",
"Hindari tindakan diskriminatif atau membeda-bedakan orang lain.",
"Jika terjadi perbedaan, gunakan komunikasi yang sopan dan terbuka.",
"Tunjukkan kemampuan beradaptasi dengan lingkungan yang beragam.",
"Tetap berpegang pada aturan dan nilai profesional dalam menghadapi perbedaan.",
"Pilih tindakan yang menciptakan suasana kerja harmonis dan inklusif.",
];

export default function SosialBudayaPage() {
return ( <main className="min-h-screen bg-slate-50 dark:bg-slate-950"> <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"> <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6"> <Link
         href="/materi/tkp"
         className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
       >
← Kembali ke Materi TKP </Link>

```
      <div className="mt-8">
        <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          TKP · MATERI 03
        </span>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          Sosial Budaya
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Memahami keberagaman, toleransi, kemampuan beradaptasi, dan
          sikap menghargai perbedaan dalam lingkungan kerja maupun
          masyarakat.
        </p>
      </div>
    </div>
  </section>

  <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <article className="space-y-8">
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Memahami Sosial Budaya
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Kemampuan sosial budaya berkaitan dengan kemampuan seseorang
            untuk memahami, menghargai, dan beradaptasi dengan keberagaman
            yang terdapat di lingkungan masyarakat maupun tempat kerja.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Dalam soal TKP, aspek ini dapat terlihat dari cara peserta
            menghadapi perbedaan budaya, kebiasaan, karakter, maupun
            pandangan orang lain.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            1. Konsep Dasar Sosial Budaya
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Indonesia memiliki masyarakat yang beragam. Karena itu,
            kemampuan menghargai perbedaan menjadi bagian penting dalam
            kehidupan bermasyarakat dan bekerja sebagai aparatur negara.
          </p>

          <div className="mt-5 space-y-3">
            {konsep.map((item) => (
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

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            2. Toleransi dan Menghargai Perbedaan
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Toleransi berarti mampu menghormati perbedaan tanpa harus
            kehilangan prinsip dan tetap menjalankan aturan yang berlaku.
          </p>

          <div className="mt-5 space-y-3">
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

          <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              Prinsip penting
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Menghargai perbedaan bukan berarti menyetujui semua hal.
              Tetap hormati orang lain dan ikuti aturan yang berlaku.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            3. Menghadapi Keberagaman di Tempat Kerja
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Lingkungan kerja dapat terdiri dari orang-orang dengan
            karakter dan latar belakang yang berbeda. Sikap profesional
            diperlukan agar perbedaan tersebut tidak menghambat kerja
            sama.
          </p>

          <div className="mt-5 space-y-3">
            {situasi.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
              >
                <span className="font-black text-blue-600">✓</span>

                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            4. Jebakan yang Sering Muncul
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Pilihan jawaban dalam TKP terkadang terlihat tegas, tetapi
            justru menunjukkan sikap tidak toleran atau tidak mampu
            beradaptasi dengan keberagaman.
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

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            5. Strategi Menjawab Soal Sosial Budaya
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

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Ringkasan Sosial Budaya
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Hormati keberagaman dan perbedaan yang ada.",
              "Tunjukkan sikap toleran dalam lingkungan kerja.",
              "Hindari diskriminasi dan stereotip.",
              "Mampu beradaptasi dengan karakter dan budaya yang berbeda.",
              "Selesaikan perbedaan melalui komunikasi yang baik.",
              "Utamakan persatuan, kerja sama, dan kepentingan bersama.",
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

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">
            Sudah selesai membaca?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Kembali ke daftar materi TKP atau lanjutkan ke materi
            berikutnya.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/materi/tkp"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ← Daftar Materi
            </Link>

            <Link
              href="/materi/tkp/teknologi-informasi-komunikasi"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Teknologi Informasi dan Komunikasi →
            </Link>
          </div>
        </section>
      </article>

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
                nama: "Jejaring Kerja",
                href: "/materi/tkp/jejaring-kerja",
              },
              {
                nomor: "03",
                nama: "Sosial Budaya",
                href: "/materi/tkp/sosial-budaya",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                  item.nomor === "03"
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
              Pahami keberagaman, latih toleransi, dan biasakan memilih
              tindakan yang menciptakan lingkungan kerja yang harmonis.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</main>

);
}
