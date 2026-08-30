import Link from "next/link";

export default function MateriNumerikPage() {
  const dasarNumerik = [
    "Operasi hitung dasar: penjumlahan, pengurangan, perkalian, dan pembagian.",
    "Pecahan, desimal, dan persen.",
    "Perbandingan dan proporsi.",
    "Kelipatan dan faktor bilangan.",
    "Operasi campuran dan prioritas perhitungan.",
    "Perhitungan cepat dan pendekatan nilai.",
  ];

  const deret = [
    "Deret aritmetika dengan selisih tetap.",
    "Deret geometri dengan rasio tetap.",
    "Pola penjumlahan atau pengurangan bertingkat.",
    "Pola perkalian atau pembagian bertingkat.",
    "Pola gabungan operasi.",
    "Pola angka yang berselang-seling.",
  ];

  const perbandingan = [
    "Membandingkan dua nilai atau besaran.",
    "Menentukan hubungan lebih besar, lebih kecil, atau sama.",
    "Menggunakan rasio untuk membandingkan kuantitas.",
    "Menyederhanakan perbandingan sebelum menghitung.",
    "Menggunakan informasi yang tersedia tanpa menghitung seluruh nilai jika tidak diperlukan.",
    "Memperhatikan satuan sebelum membandingkan dua besaran.",
  ];

  const soalCerita = [
    "Membaca informasi soal secara keseluruhan sebelum menghitung.",
    "Menentukan apa yang diketahui dan apa yang ditanyakan.",
    "Mengubah informasi cerita menjadi bentuk matematika.",
    "Memilih operasi hitung yang sesuai.",
    "Memeriksa kembali apakah jawaban sesuai dengan konteks soal.",
    "Menghindari perhitungan yang tidak diperlukan.",
  ];

  const jebakan = [
    "Terburu-buru menghitung tanpa memahami apa yang sebenarnya ditanyakan.",
    "Salah membaca tanda operasi atau satuan.",
    "Mengabaikan urutan operasi hitung.",
    "Salah menentukan pola pada deret angka.",
    "Membandingkan angka tanpa memperhatikan satuannya.",
    "Memilih jawaban hanya karena hasil perhitungan terlihat masuk akal tanpa mengecek kembali.",
  ];

  const strategi = [
    "Baca soal sampai selesai dan tentukan informasi yang benar-benar diperlukan.",
    "Tuliskan angka atau informasi penting agar tidak salah membaca data.",
    "Gunakan cara hitung yang paling sederhana dan efisien.",
    "Untuk deret angka, cari selisih, rasio, atau pola operasi terlebih dahulu.",
    "Untuk perbandingan, sederhanakan rasio sebelum melakukan perhitungan.",
    "Untuk soal cerita, ubah informasi menjadi model matematika.",
    "Periksa kembali satuan dan tanda operasi sebelum menentukan jawaban.",
    "Jika waktu terbatas, jangan terlalu lama pada satu soal yang membutuhkan perhitungan panjang.",
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tiu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Kembali ke Materi TIU
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              TIU · MATERI 02
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Kemampuan Numerik
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami konsep berhitung, pola angka, perbandingan kuantitatif,
              dan penyelesaian soal matematika yang sering muncul dalam TIU
              CPNS.
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
                Memahami Kemampuan Numerik
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Kemampuan numerik merupakan kemampuan menggunakan angka,
                operasi matematika, pola, dan hubungan kuantitatif untuk
                menyelesaikan suatu persoalan secara tepat dan efisien.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam soal TIU, kemampuan numerik tidak hanya menguji
                kemampuan menghitung. Peserta juga dituntut mampu memahami
                pola, memilih metode yang tepat, dan menggunakan waktu secara
                efisien.
              </p>
            </section>

            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Dasar-Dasar Berhitung
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Penguasaan operasi hitung dasar menjadi fondasi penting dalam
                mengerjakan soal numerik. Semakin cepat memahami operasi dasar,
                semakin banyak waktu yang dapat digunakan untuk menyelesaikan
                soal lainnya.
              </p>

              <div className="mt-5 space-y-3">
                {dasarNumerik.map((item) => (
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

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Kunci berpikir
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Jangan hanya mengejar hasil akhir. Biasakan mencari cara
                  perhitungan yang paling sederhana dan cepat.
                </p>
              </div>
            </section>

            {/* 2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                2. Pecahan, Desimal, dan Persentase
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Pecahan, desimal, dan persentase sering digunakan dalam soal
                numerik. Ketiganya dapat mewakili nilai yang sama dengan bentuk
                penulisan berbeda.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    judul: "Pecahan",
                    isi: "Contoh: 1/2, 3/4, dan 5/8.",
                  },
                  {
                    judul: "Desimal",
                    isi: "Contoh: 0,5; 0,75; dan 0,625.",
                  },
                  {
                    judul: "Persentase",
                    isi: "Contoh: 50%, 75%, dan 62,5%.",
                  },
                ].map((item) => (
                  <div
                    key={item.judul}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-700"
                  >
                    <h3 className="font-black text-slate-900 dark:text-white">
                      {item.judul}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.isi}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-5 dark:bg-slate-800/70">
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <span className="font-black text-blue-600">Tips:</span>{" "}
                  Biasakan mengingat beberapa bentuk sederhana, seperti 1/2 =
                  50%, 1/4 = 25%, 3/4 = 75%, dan 1/5 = 20%.
                </p>
              </div>
            </section>

            {/* 3 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                3. Deret Angka
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Deret angka menguji kemampuan menemukan pola hubungan antara
                satu angka dengan angka lainnya. Pola dapat berupa penjumlahan,
                pengurangan, perkalian, pembagian, maupun kombinasi beberapa
                operasi.
              </p>

              <div className="mt-5 space-y-3">
                {deret.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  Cara mencari pola
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Mulailah dengan mencari selisih antarangka. Jika tidak
                  ditemukan pola yang jelas, coba periksa rasio atau pola
                  operasi yang berselang-seling.
                </p>
              </div>
            </section>

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Perbandingan Kuantitatif
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Perbandingan kuantitatif menguji kemampuan menentukan hubungan
                antara dua besaran. Peserta perlu mengetahui apakah suatu nilai
                lebih besar, lebih kecil, atau sama dengan nilai lainnya.
              </p>

              <div className="mt-5 space-y-3">
                {perbandingan.map((item) => (
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

              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Prinsip penting
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Tidak semua soal harus dihitung sampai mendapatkan nilai
                  akhir. Jika hubungan dua besaran sudah dapat diketahui dari
                  perbandingan, gunakan informasi tersebut untuk menghemat
                  waktu.
                </p>
              </div>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Soal Cerita
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Soal cerita menyajikan persoalan matematika dalam bentuk
                situasi sehari-hari. Tantangan utamanya adalah mengubah
                informasi dalam cerita menjadi bentuk matematika yang tepat.
              </p>

              <div className="mt-5 space-y-3">
                {soalCerita.map((item) => (
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
                  Rumus sederhana
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  Diketahui → Ditanyakan → Operasi yang diperlukan → Hitung →
                  Periksa jawaban.
                </p>
              </div>
            </section>

            {/* 6 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                6. Kecepatan Berhitung
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam ujian TIU, waktu merupakan faktor penting. Karena itu,
                kemampuan melakukan perhitungan sederhana secara cepat dapat
                membantu menyelesaikan lebih banyak soal.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Hafalkan perkalian dasar.",
                  "Kenali hubungan pecahan dan persentase.",
                  "Gunakan penyederhanaan sebelum menghitung.",
                  "Manfaatkan pembulatan jika soal memungkinkan pendekatan.",
                  "Hindari menulis langkah yang tidak diperlukan.",
                  "Periksa hasil dengan perkiraan sederhana.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>

            {/* 7 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                7. Jebakan yang Sering Muncul
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Kesalahan dalam soal numerik sering terjadi bukan karena
                konsepnya sulit, tetapi karena peserta terburu-buru membaca
                atau menghitung.
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
                8. Strategi Menjawab Soal Numerik
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
                Ringkasan Kemampuan Numerik
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Kemampuan numerik menguji kemampuan menggunakan angka dan hubungan kuantitatif.",
                  "Kuasai operasi hitung dasar, pecahan, desimal, dan persentase.",
                  "Pada deret angka, cari selisih, rasio, atau pola operasi.",
                  "Pada perbandingan kuantitatif, tentukan hubungan antarbesaran secara efisien.",
                  "Pada soal cerita, ubah informasi menjadi model matematika.",
                  "Kecepatan dan ketelitian sama-sama penting dalam mengerjakan TIU.",
                  "Selalu periksa kembali satuan, tanda operasi, dan kesesuaian jawaban dengan soal.",
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
                Kembali ke daftar materi TIU atau lanjutkan mempelajari
                Kemampuan Figural.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/tiu"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Daftar Materi
                </Link>

                <Link
                  href="/materi/tiu/figural"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  Kemampuan Figural →
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                Materi TIU
              </p>

              <nav className="mt-4 space-y-1">
                {[
                  {
                    nomor: "01",
                    nama: "Kemampuan Verbal",
                    href: "/materi/tiu/verbal",
                  },
                  {
                    nomor: "02",
                    nama: "Kemampuan Numerik",
                    href: "/materi/tiu/numerik",
                  },
                  {
                    nomor: "03",
                    nama: "Kemampuan Figural",
                    href: "/materi/tiu/figural",
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
                  Pahami konsep, kuasai cara cepat menghitung, kemudian
                  lanjutkan dengan latihan soal TIU.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}