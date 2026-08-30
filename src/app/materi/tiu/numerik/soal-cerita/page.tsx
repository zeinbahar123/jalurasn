import Link from "next/link";

const langkah = [
  "Baca soal sampai selesai sebelum melakukan perhitungan.",
  "Tentukan informasi yang diketahui dari soal.",
  "Tentukan apa yang sebenarnya ditanyakan.",
  "Ubah informasi dalam cerita menjadi bentuk matematika.",
  "Pilih operasi atau rumus yang sesuai.",
  "Lakukan perhitungan dengan teliti.",
  "Periksa kembali apakah jawaban sesuai dengan konteks soal.",
];

const jenisSoal = [
  {
    judul: "Jarak, Waktu, dan Kecepatan",
    isi: "Soal biasanya meminta jarak, waktu, atau kecepatan berdasarkan informasi yang diberikan.",
    rumus: "Jarak = Kecepatan × Waktu",
  },
  {
    judul: "Persentase",
    isi: "Digunakan untuk menghitung kenaikan, penurunan, keuntungan, diskon, atau bagian tertentu dari suatu nilai.",
    rumus: "Persentase = Bagian ÷ Total × 100%",
  },
  {
    judul: "Perbandingan",
    isi: "Digunakan ketika soal membandingkan jumlah atau ukuran beberapa objek dengan rasio tertentu.",
    rumus: "a : b = a/b",
  },
  {
    judul: "Rata-Rata",
    isi: "Digunakan untuk menentukan nilai rata-rata dari beberapa data.",
    rumus: "Rata-rata = Jumlah seluruh data ÷ Banyak data",
  },
];

const kesalahan = [
  "Tidak membaca soal sampai selesai.",
  "Salah menentukan informasi yang diketahui.",
  "Salah memahami apa yang ditanyakan.",
  "Menggunakan rumus yang tidak sesuai.",
  "Mengabaikan satuan.",
  "Terlalu cepat menghitung tanpa membuat model matematika.",
  "Tidak memeriksa kembali hasil akhir.",
];

export default function SoalCeritaPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tiu/numerik"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Kembali ke Kemampuan Numerik
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              TIU · NUMERIK
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Soal Cerita
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Pelajari cara memahami informasi dalam soal cerita, mengubahnya
              menjadi model matematika, dan menyelesaikannya secara cepat dan
              tepat.
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
                Memahami Soal Cerita
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Soal cerita menyajikan persoalan matematika dalam bentuk
                situasi atau kejadian sehari-hari. Tantangan utama bukan hanya
                menghitung, tetapi memahami informasi yang diberikan dan
                menentukan operasi matematika yang tepat.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam TIU, peserta harus mampu mengubah kalimat dalam soal
                menjadi model matematika sebelum melakukan perhitungan.
              </p>
            </section>

            {/* LANGKAH */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Langkah Menyelesaikan Soal Cerita
              </h2>

              <div className="mt-6 space-y-4">
                {langkah.map((item, index) => (
                  <div key={item} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                      {index + 1}
                    </span>

                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTOH CARA BERPIKIR */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Contoh Cara Berpikir
              </h2>

              <div className="mt-5 rounded-xl bg-white p-5 shadow-sm dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Soal:
                </p>

                <p className="mt-2 text-base leading-7 text-slate-800 dark:text-slate-200">
                  Sebuah kendaraan menempuh jarak 120 km dengan kecepatan
                  rata-rata 60 km/jam. Berapa waktu yang diperlukan kendaraan
                  tersebut?
                </p>

                <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-700">
                  <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                    Diketahui
                  </p>

                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    Jarak = 120 km
                    <br />
                    Kecepatan = 60 km/jam
                  </p>

                  <p className="mt-4 text-sm font-bold text-indigo-700 dark:text-indigo-300">
                    Ditanyakan
                  </p>

                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
                    Waktu = ?
                  </p>

                  <p className="mt-4 text-sm font-bold text-indigo-700 dark:text-indigo-300">
                    Penyelesaian
                  </p>

                  <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                    Waktu = Jarak ÷ Kecepatan
                    <br />
                    Waktu = 120 ÷ 60
                    <br />
                    Waktu = 2 jam
                  </p>

                  <div className="mt-4 rounded-xl bg-blue-50 p-4 text-center font-black text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    Jawaban: 2 jam
                  </div>
                </div>
              </div>
            </section>

            {/* JENIS SOAL */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Jenis Soal Cerita yang Sering Muncul
              </h2>

              <div className="mt-6 grid gap-4">
                {jenisSoal.map((item, index) => (
                  <div
                    key={item.judul}
                    className="rounded-xl border border-slate-200 p-5 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-xs font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                        {index + 1}
                      </span>

                      <h3 className="font-black text-slate-900 dark:text-white">
                        {item.judul}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.isi}
                    </p>

                    <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.rumus}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* STRATEGI */}
            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/20">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Strategi Cepat
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Jangan langsung menghitung begitu melihat angka. Pahami dulu
                hubungan antar informasi. Banyak soal cerita dapat diselesaikan
                dengan operasi sederhana setelah informasi penting ditemukan.
              </p>

              <div className="mt-5 space-y-3">
                {[
                  "Tandai angka penting dalam soal.",
                  "Cari kata kunci seperti total, selisih, sisa, rata-rata, persen, atau perbandingan.",
                  "Tentukan operasi matematika yang sesuai.",
                  "Gunakan cara paling singkat tanpa mengurangi ketelitian.",
                  "Periksa apakah satuan jawaban sudah benar.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>

            {/* KESALAHAN */}
            <section className="rounded-2xl border border-rose-100 bg-rose-50 p-6 dark:border-rose-900/40 dark:bg-rose-950/20">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Kesalahan yang Sering Terjadi
              </h2>

              <div className="mt-5 space-y-3">
                {kesalahan.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-rose-100 bg-white p-4 dark:border-rose-900/40 dark:bg-slate-900"
                  >
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      ⚠ {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/40 dark:bg-blue-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Soal Cerita
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Pahami cerita sebelum menghitung.",
                  "Pisahkan informasi yang diketahui dan yang ditanyakan.",
                  "Ubah informasi menjadi model matematika.",
                  "Pilih operasi atau rumus yang tepat.",
                  "Perhatikan satuan.",
                  "Hitung dengan teliti dan efisien.",
                  "Periksa kembali apakah jawaban masuk akal.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="font-black text-blue-600">✓</span>

                    <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* NAVIGASI */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-xl font-black text-slate-950 dark:text-white">
                Lanjut Belajar
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Kembali ke Kemampuan Numerik atau lanjutkan ke materi
                Kemampuan Figural.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/tiu/numerik"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Kemampuan Numerik
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
                Materi Numerik
              </p>

              <nav className="mt-4 space-y-1">
                <Link
                  href="/materi/tiu/numerik"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  ← Kemampuan Numerik
                </Link>

                <Link
                  href="/materi/tiu/numerik/perbandingan-kuantitatif"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Perbandingan Kuantitatif
                </Link>

                <div className="rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                  Soal Cerita
                </div>
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5 dark:border-slate-800">
                <p className="text-xs leading-5 text-slate-500">
                  Pahami informasi, ubah menjadi model matematika, kemudian
                  selesaikan dengan cara yang paling efisien.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
