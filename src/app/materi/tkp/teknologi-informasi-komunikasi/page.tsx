"use client";

import Link from "next/link";

const konsep = [
"Memahami penggunaan teknologi untuk mendukung pekerjaan.",
"Mampu menggunakan perangkat dan aplikasi digital secara efektif.",
"Memanfaatkan teknologi untuk meningkatkan efisiensi kerja.",
"Menjaga keamanan data dan informasi organisasi.",
"Menggunakan teknologi sesuai aturan dan etika.",
"Mampu beradaptasi dengan perkembangan teknologi.",
];

const penggunaan = [
"Menggunakan aplikasi perkantoran untuk menyelesaikan pekerjaan.",
"Memanfaatkan sistem informasi yang disediakan organisasi.",
"Menggunakan komunikasi digital secara efektif dan profesional.",
"Menyimpan dan mengelola dokumen secara teratur.",
"Memanfaatkan teknologi untuk mempercepat pelayanan.",
"Mempelajari aplikasi atau sistem baru ketika diperlukan.",
];

const keamanan = [
"Menjaga kerahasiaan kata sandi dan akun.",
"Tidak membagikan data organisasi kepada pihak yang tidak berwenang.",
"Memastikan informasi sebelum menyebarkannya.",
"Menggunakan perangkat dan akun sesuai kewenangan.",
"Melakukan pencadangan data penting sesuai prosedur.",
"Segera melaporkan indikasi masalah keamanan kepada pihak terkait.",
];

const etika = [
"Menggunakan fasilitas teknologi untuk kepentingan pekerjaan.",
"Tidak menyalahgunakan akses terhadap sistem atau data.",
"Tidak menyebarkan informasi yang belum terverifikasi.",
"Menghormati privasi dan kerahasiaan informasi.",
"Berkomunikasi secara sopan melalui media digital.",
"Menggunakan teknologi secara bertanggung jawab.",
];

const jebakan = [
"Menggunakan fasilitas kantor untuk kepentingan pribadi secara berlebihan.",
"Membagikan password kepada rekan kerja.",
"Menyebarkan informasi tanpa memastikan kebenarannya.",
"Mengakses data yang bukan menjadi kewenangannya.",
"Menolak teknologi baru tanpa berusaha mempelajarinya.",
"Mengabaikan keamanan data karena mengejar kecepatan pekerjaan.",
];

const strategi = [
"Pilih tindakan yang menunjukkan kemampuan beradaptasi terhadap teknologi.",
"Utamakan keamanan dan kerahasiaan data.",
"Gunakan teknologi untuk meningkatkan efektivitas dan efisiensi pekerjaan.",
"Ikuti aturan penggunaan sistem dan fasilitas organisasi.",
"Jangan mengakses atau membagikan informasi di luar kewenangan.",
"Jika menemukan masalah teknologi, cari solusi atau bantuan yang tepat.",
"Pilih jawaban yang menunjukkan sikap profesional, bertanggung jawab, dan terbuka terhadap perubahan.",
];

export default function TeknologiInformasiKomunikasiPage() {
return ( <main className="min-h-screen bg-slate-50 dark:bg-slate-950"> <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"> <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6"> <Link
         href="/materi/tkp"
         className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
       >
← Kembali ke Materi TKP </Link>

```
      <div className="mt-8">
        <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
          TKP · MATERI 04
        </span>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
          Teknologi Informasi dan Komunikasi
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Memahami pemanfaatan teknologi, komunikasi digital, keamanan
          informasi, serta kemampuan beradaptasi dengan perkembangan
          teknologi di lingkungan kerja.
        </p>
      </div>
    </div>
  </section>

  <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <article className="space-y-8">
        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            Memahami Teknologi Informasi dan Komunikasi
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Teknologi informasi dan komunikasi merupakan kemampuan
            menggunakan teknologi dan sistem informasi untuk mendukung
            pekerjaan, komunikasi, pelayanan, serta pencapaian tujuan
            organisasi.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Dalam soal TKP, peserta dapat dihadapkan pada situasi yang
            berkaitan dengan penggunaan teknologi, keamanan data,
            perubahan sistem, dan komunikasi melalui media digital.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            1. Konsep Dasar TIK
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Teknologi seharusnya digunakan sebagai alat untuk membantu
            pekerjaan menjadi lebih efektif, efisien, dan terorganisir.
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
            2. Pemanfaatan Teknologi dalam Pekerjaan
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Pemanfaatan teknologi yang tepat dapat membantu meningkatkan
            produktivitas dan memberikan pelayanan yang lebih cepat serta
            terorganisir.
          </p>

          <div className="mt-5 space-y-3">
            {penggunaan.map((item) => (
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

          <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
              Prinsip penting
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Gunakan teknologi untuk menyelesaikan pekerjaan dengan lebih
              baik, bukan sekadar mengikuti tren teknologi.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            3. Keamanan Informasi
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Informasi dan data organisasi harus dijaga sesuai tingkat
            kewenangan dan aturan yang berlaku. Kemudahan teknologi tidak
            boleh mengurangi perhatian terhadap keamanan informasi.
          </p>

          <div className="mt-5 space-y-3">
            {keamanan.map((item) => (
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

          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
              Ingat
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
              Jangan mengorbankan keamanan data hanya demi menyelesaikan
              pekerjaan dengan lebih cepat.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            4. Etika Penggunaan Teknologi
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Penggunaan teknologi harus tetap memperhatikan etika,
            kewenangan, privasi, dan aturan organisasi.
          </p>

          <div className="mt-5 space-y-3">
            {etika.map((item) => (
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

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-black text-slate-950 dark:text-white">
            5. Jebakan yang Sering Muncul
          </h2>

          <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
            Dalam soal TKP, pilihan yang terlihat praktis belum tentu
            merupakan pilihan terbaik apabila mengabaikan keamanan,
            kewenangan, atau aturan organisasi.
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
            6. Strategi Menjawab Soal TIK
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
            Ringkasan TIK
          </h2>

          <div className="mt-5 space-y-3">
            {[
              "Gunakan teknologi untuk meningkatkan efektivitas dan efisiensi pekerjaan.",
              "Mampu beradaptasi dengan sistem dan teknologi baru.",
              "Jaga keamanan, kerahasiaan, dan privasi informasi.",
              "Gunakan fasilitas teknologi sesuai aturan dan kewenangan.",
              "Jangan menyebarkan informasi yang belum terverifikasi.",
              "Tetap profesional dalam komunikasi digital.",
              "Utamakan tanggung jawab dan keamanan ketika menggunakan teknologi.",
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
            Profesionalisme.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/materi/tkp"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              ← Daftar Materi
            </Link>

            <Link
              href="/materi/tkp/profesionalisme"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Profesionalisme →
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
              {
                nomor: "04",
                nama: "Teknologi Informasi dan Komunikasi",
                href: "/materi/tkp/teknologi-informasi-komunikasi",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                  item.nomor === "04"
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
              Pahami penggunaan teknologi, keamanan informasi, dan etika
              digital sebelum mengerjakan latihan soal TKP.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</main>

);
}
