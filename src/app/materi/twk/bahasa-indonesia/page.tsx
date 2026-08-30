import Link from "next/link";

const materi = [
  {
    nomor: "01",
    judul: "Kedudukan Bahasa Indonesia",
    isi: "Bahasa Indonesia memiliki kedudukan penting sebagai bahasa nasional dan bahasa negara. Pemahaman mengenai kedudukan bahasa Indonesia menjadi bagian penting dalam materi TWK.",
    poin: [
      "Bahasa Indonesia sebagai bahasa nasional.",
      "Bahasa Indonesia sebagai bahasa negara.",
      "Bahasa Indonesia sebagai alat pemersatu bangsa.",
      "Bahasa Indonesia digunakan dalam penyelenggaraan kehidupan bernegara.",
    ],
  },
  {
    nomor: "02",
    judul: "Fungsi Bahasa Indonesia",
    isi: "Bahasa Indonesia memiliki berbagai fungsi dalam kehidupan masyarakat dan negara, baik sebagai sarana komunikasi maupun sebagai identitas nasional.",
    poin: [
      "Sebagai alat komunikasi.",
      "Sebagai alat pemersatu bangsa.",
      "Sebagai identitas nasional.",
      "Sebagai sarana pengembangan ilmu pengetahuan dan teknologi.",
      "Sebagai sarana penyelenggaraan administrasi negara.",
    ],
  },
  {
    nomor: "03",
    judul: "Kata Baku dan Tidak Baku",
    isi: "Kata baku merupakan kata yang penggunaannya sesuai dengan kaidah bahasa Indonesia yang telah ditetapkan. Dalam soal TWK, kemampuan membedakan kata baku dan tidak baku sering diuji.",
    poin: [
      "Kata baku mengikuti kaidah bahasa Indonesia.",
      "Kata baku digunakan dalam situasi resmi.",
      "Kata tidak baku umumnya digunakan dalam percakapan sehari-hari.",
      "Perhatikan bentuk kata yang sesuai dengan Kamus Besar Bahasa Indonesia.",
    ],
  },
  {
    nomor: "04",
    judul: "Ejaan Bahasa Indonesia",
    isi: "Ejaan berkaitan dengan aturan penulisan bahasa Indonesia, termasuk penggunaan huruf kapital, tanda baca, kata depan, dan penulisan kata.",
    poin: [
      "Penggunaan huruf kapital harus sesuai aturan.",
      "Penggunaan tanda baca harus tepat.",
      "Kata depan di, ke, dan dari harus diperhatikan penulisannya.",
      "Penulisan imbuhan harus dibedakan dengan kata depan.",
      "Penulisan singkatan dan akronim mengikuti kaidah yang berlaku.",
    ],
  },
  {
    nomor: "05",
    judul: "Kalimat Efektif",
    isi: "Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan secara jelas, tepat, dan mudah dipahami. Kalimat efektif harus memenuhi prinsip kejelasan, ketepatan, dan kehematan.",
    poin: [
      "Memiliki struktur yang jelas.",
      "Menggunakan kata secara tepat.",
      "Menghindari penggunaan kata yang tidak diperlukan.",
      "Memiliki hubungan antargagasan yang logis.",
      "Tidak menimbulkan makna ganda.",
    ],
  },
  {
    nomor: "06",
    judul: "Paragraf",
    isi: "Paragraf merupakan kumpulan kalimat yang membahas satu gagasan utama. Dalam soal TWK, pemahaman paragraf dapat digunakan untuk menentukan gagasan utama, kalimat utama, dan kesimpulan.",
    poin: [
      "Gagasan utama menjadi inti pembahasan paragraf.",
      "Kalimat utama berisi gagasan utama.",
      "Kalimat penjelas mendukung gagasan utama.",
      "Paragraf yang baik memiliki keterkaitan antarkalimat.",
    ],
  },
];

const strategi = [
  "Baca seluruh kalimat sebelum menentukan jawaban.",
  "Perhatikan kata yang dicetak atau digunakan dalam konteks kalimat.",
  "Jika ditanya kata baku, pilih bentuk yang sesuai dengan kaidah bahasa Indonesia.",
  "Jika ditanya kalimat efektif, perhatikan kejelasan, ketepatan, kehematan, dan kepaduan.",
  "Untuk soal paragraf, tentukan terlebih dahulu gagasan utama sebelum memilih kesimpulan.",
];

const jebakan = [
  "Menganggap kata yang sering digunakan sehari-hari pasti merupakan kata baku.",
  "Mengabaikan penggunaan huruf kapital.",
  "Menyamakan kata depan dengan imbuhan.",
  "Memilih kalimat yang panjang meskipun tidak efektif.",
  "Menentukan gagasan utama hanya berdasarkan kalimat pertama tanpa memahami seluruh paragraf.",
];

const ringkasan = [
  "Bahasa Indonesia berkedudukan sebagai bahasa nasional dan bahasa negara.",
  "Kata baku mengikuti kaidah bahasa Indonesia yang berlaku.",
  "Ejaan mengatur penulisan huruf, kata, dan tanda baca.",
  "Kalimat efektif harus jelas, tepat, hemat, dan logis.",
  "Paragraf memiliki gagasan utama yang didukung oleh kalimat penjelas.",
  "Soal TWK Bahasa Indonesia membutuhkan ketelitian dalam memahami penggunaan bahasa.",
];

const daftarMateri = [
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
];

export default function MateriBahasaIndonesiaPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/twk"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
          >
            &larr; Kembali ke Materi TWK
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-emerald-50 px-3 py-2 text-sm font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
              TWK &middot; MATERI 05
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Bahasa Indonesia
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami kaidah Bahasa Indonesia, kata baku, ejaan, kalimat
              efektif, dan paragraf sebagai bekal menghadapi soal TWK.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <article className="space-y-8">
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Pentingnya Bahasa Indonesia dalam TWK
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Materi Bahasa Indonesia dalam TWK menguji kemampuan peserta
                dalam memahami penggunaan bahasa yang baik dan benar. Materi
                yang sering muncul antara lain kata baku, ejaan, kalimat
                efektif, paragraf, gagasan utama, dan pemahaman terhadap
                penggunaan bahasa dalam konteks resmi.
              </p>
            </section>

            {materi.map((item) => (
              <section
                key={item.nomor}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-black text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    {item.nomor}
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                      {item.judul}
                    </h2>

                    <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                      {item.isi}
                    </p>

                    <h3 className="mt-6 text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Hal Penting
                    </h3>

                    <ul className="mt-3 space-y-3">
                      {item.poin.map((poin) => (
                        <li key={poin} className="flex gap-3">
                          <span className="font-black text-emerald-600 dark:text-emerald-400">
                            &bull;
                          </span>

                          <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                            {poin}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            ))}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Strategi Menjawab Soal
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

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Jebakan yang Sering Muncul
              </h2>

              <ul className="mt-5 space-y-3">
                {jebakan.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-black text-amber-600">
                      &bull;
                    </span>

                    <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Bahasa Indonesia
              </h2>

              <div className="mt-5 space-y-3">
                {ringkasan.map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      &#10003;
                    </span>

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
                Lanjutkan ke latihan soal atau kembali ke daftar materi TWK.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/twk"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  &larr; Daftar Materi
                </Link>

                <Link
                  href="/tryout"
                  className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  Mulai Latihan &rarr;
                </Link>
              </div>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Materi TWK
              </p>

              <nav className="mt-4 space-y-1">
                {daftarMateri.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                      item.nomor === "05"
                        ? "bg-emerald-50 font-bold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                        : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                    }`}
                  >
                    {item.nomor}. {item.nama}
                  </Link>
                ))}
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Pahami kaidah bahasa, kemudian lanjutkan dengan latihan soal
                  untuk meningkatkan ketelitian.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}