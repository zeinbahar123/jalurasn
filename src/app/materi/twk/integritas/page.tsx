import Link from "next/link";

export default function MateriIntegritasPage() {
  const prinsip = [
    "Bersikap jujur dalam perkataan dan tindakan.",
    "Melaksanakan tugas sesuai aturan dan tanggung jawab.",
    "Konsisten antara nilai yang diyakini dengan tindakan.",
    "Tidak menyalahgunakan kewenangan untuk kepentingan pribadi.",
    "Berani menyampaikan keadaan yang sebenarnya.",
    "Menolak pemberian atau keuntungan yang dapat memengaruhi objektivitas.",
  ];

  const contoh = [
    "Mengakui kesalahan pekerjaan dan segera memperbaikinya.",
    "Tidak memanipulasi data untuk membuat hasil terlihat lebih baik.",
    "Menggunakan fasilitas kantor sesuai peruntukannya.",
    "Menolak titipan atau tekanan yang bertentangan dengan prosedur.",
    "Mengerjakan tugas dengan sungguh-sungguh meskipun tidak diawasi.",
    "Memberikan informasi sesuai fakta kepada masyarakat.",
  ];

  const jebakan = [
    "Memilih tindakan yang terlihat baik tetapi sebenarnya melanggar prosedur.",
    "Mengutamakan teman atau keluarga ketika keputusan seharusnya objektif.",
    "Menyembunyikan kesalahan demi menjaga citra pribadi.",
    "Menerima keuntungan kecil dengan alasan tidak merugikan orang lain.",
    "Mengikuti perintah atasan meskipun jelas bertentangan dengan aturan.",
  ];

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
              TWK · MATERI 02
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Integritas
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami kejujuran, konsistensi, tanggung jawab, dan sikap
              berpegang pada prinsip dalam kehidupan pribadi maupun
              kehidupan berbangsa dan bernegara.
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
                1. Pengertian Integritas
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Integritas merupakan sikap yang menunjukkan kesesuaian antara
                nilai, prinsip, perkataan, dan tindakan seseorang. Orang yang
                memiliki integritas berusaha melakukan hal yang benar dan
                bertanggung jawab atas tindakan yang dilakukannya.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam kehidupan berbangsa dan bernegara, integritas sangat
                penting karena kepercayaan masyarakat dibangun melalui
                kejujuran, tanggung jawab, keterbukaan, dan perilaku yang
                konsisten.
              </p>
            </section>

            {/* 2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                2. Nilai-Nilai Integritas
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Integritas dapat terlihat melalui beberapa nilai utama dalam
                perilaku sehari-hari.
              </p>

              <div className="mt-5 space-y-3">
                {prinsip.map((item) => (
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
                3. Kejujuran dan Tanggung Jawab
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Kejujuran berarti menyampaikan dan melakukan sesuatu sesuai
                dengan keadaan yang sebenarnya. Kejujuran tidak hanya berlaku
                ketika seseorang sedang diawasi, tetapi juga ketika tidak ada
                orang lain yang melihat.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Tanggung jawab berarti bersedia melaksanakan kewajiban dan
                menerima konsekuensi dari tindakan yang dilakukan. Dalam soal
                TWK, pilihan yang menunjukkan kesediaan mengakui kesalahan,
                memperbaikinya, dan menyelesaikan kewajiban biasanya lebih
                mencerminkan integritas.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Kunci berpikir
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Integritas bukan hanya berkata jujur. Integritas juga
                  terlihat dari kesediaan bertanggung jawab dan memperbaiki
                  kesalahan.
                </p>
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Contoh Integritas dalam Kehidupan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Integritas tidak hanya berkaitan dengan pekerjaan atau jabatan.
                Sikap tersebut dapat diterapkan dalam berbagai situasi.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contoh.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-slate-200 p-4 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Integritas dalam Pekerjaan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam lingkungan kerja, integritas dapat diwujudkan dengan
                menjalankan tugas sesuai ketentuan, menggunakan sumber daya
                secara bertanggung jawab, menjaga informasi yang dipercayakan,
                dan tidak memanfaatkan jabatan untuk kepentingan pribadi.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Seorang pegawai yang berintegritas tetap menjalankan tugas
                dengan baik meskipun tidak mendapatkan pengawasan langsung.
                Ia juga tidak mengubah data, memanipulasi laporan, atau
                menggunakan fasilitas organisasi untuk kepentingan pribadi.
              </p>
            </section>

            {/* 6 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                6. Konflik Kepentingan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Konflik kepentingan dapat terjadi ketika kepentingan pribadi
                atau hubungan tertentu berpotensi memengaruhi objektivitas
                seseorang dalam menjalankan tugas.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam situasi seperti ini, sikap yang mencerminkan integritas
                adalah menjaga objektivitas, menghindari penyalahgunaan
                kewenangan, serta mengikuti prosedur yang berlaku.
              </p>

              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  Perhatikan dalam soal
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Jika kepentingan pribadi bertentangan dengan kewajiban,
                  utamakan aturan, objektivitas, dan kepentingan tugas.
                </p>
              </div>
            </section>

            {/* 7 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                7. Jebakan yang Sering Muncul dalam Soal
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Soal TWK sering memberikan beberapa pilihan yang sama-sama
                terlihat baik. Karena itu, perhatikan apakah tindakan tersebut
                benar-benar sesuai prinsip integritas.
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

            {/* 8 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                8. Strategi Menjawab Soal Integritas
              </h2>

              <div className="mt-5 space-y-4">
                {[
                  "Baca situasi sampai selesai dan jangan langsung memilih jawaban pertama yang terlihat baik.",
                  "Cari pilihan yang paling jujur, bertanggung jawab, dan sesuai aturan.",
                  "Hindari pilihan yang mengandung manipulasi, kebohongan, atau penyalahgunaan kewenangan.",
                  "Jika terdapat konflik antara kepentingan pribadi dan tugas, perhatikan kepentingan tugas serta aturan yang berlaku.",
                  "Pilih tindakan yang menyelesaikan masalah, bukan sekadar menghindarinya.",
                ].map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-black text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
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
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Integritas
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Integritas berarti kesesuaian antara nilai, perkataan, dan tindakan.",
                  "Kejujuran merupakan salah satu dasar penting dalam integritas.",
                  "Orang berintegritas bersedia bertanggung jawab atas tindakannya.",
                  "Jabatan dan kewenangan tidak boleh digunakan untuk kepentingan pribadi.",
                  "Konflik kepentingan harus dihadapi dengan objektivitas dan mengikuti aturan.",
                  "Dalam soal TWK, perhatikan pilihan yang paling jujur, bertanggung jawab, dan sesuai prosedur.",
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
                Lanjutkan ke materi Bela Negara atau kembali ke daftar materi
                TWK.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/twk"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Daftar Materi
                </Link>

                <Link
                  href="/materi/twk/bela-negara"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                >
                  Bela Negara →
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
                    nomor: 1,
                    nama: "Nasionalisme",
                    href: "/materi/twk/nasionalisme",
                  },
                  {
                    nomor: 2,
                    nama: "Integritas",
                    href: "/materi/twk/integritas",
                  },
                  {
                    nomor: 3,
                    nama: "Bela Negara",
                    href: "/materi/twk/bela-negara",
                  },
                  {
                    nomor: 4,
                    nama: "Pilar Negara",
                    href: "/materi/twk/pilar-negara",
                  },
                  {
                    nomor: 5,
                    nama: "Bahasa Indonesia",
                    href: "/materi/twk/bahasa-indonesia",
                  },
                ].map((item) => (
                  <Link
                    key={item.nama}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                      item.nomor === 2
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
                  Pahami konsep terlebih dahulu, kemudian lanjutkan dengan
                  latihan soal untuk menguji pemahaman.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}