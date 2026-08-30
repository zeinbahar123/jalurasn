import Link from "next/link";

const langkahAnalitis = [
{
nomor: "01",
judul: "Pahami informasi",
isi: "Baca seluruh informasi yang diberikan sebelum menarik kesimpulan.",
},
{
nomor: "02",
judul: "Identifikasi hubungan",
isi: "Cari hubungan antara orang, benda, tempat, waktu, posisi, atau kondisi yang terdapat dalam soal.",
},
{
nomor: "03",
judul: "Susun informasi",
isi: "Gunakan tabel, urutan, atau pola sederhana untuk membantu mengorganisasi informasi.",
},
{
nomor: "04",
judul: "Uji setiap kemungkinan",
isi: "Bandingkan setiap pilihan jawaban dengan seluruh informasi yang tersedia.",
},
{
nomor: "05",
judul: "Tentukan jawaban",
isi: "Pilih jawaban yang paling sesuai dengan semua informasi dan tidak bertentangan dengan kondisi soal.",
},
];

const tips = [
"Baca soal secara perlahan pada bagian informasi penting.",
"Tandai kata seperti sebelum, sesudah, lebih tinggi, lebih rendah, semua, sebagian, dan tidak.",
"Jangan membuat asumsi yang tidak diberikan dalam soal.",
"Jika soal memiliki banyak informasi, susun dalam tabel atau daftar.",
"Periksa kembali jawaban sebelum memilih.",
];

const jebakan = [
"Mengabaikan salah satu informasi dalam soal.",
"Membuat kesimpulan berdasarkan asumsi pribadi.",
"Salah membaca urutan atau posisi.",
"Terlalu cepat memilih jawaban yang terlihat benar.",
"Tidak memeriksa apakah jawaban bertentangan dengan informasi lain.",
];

export default function AnalitisPage() {
return ( <main className="min-h-screen bg-slate-50"> <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white"> <div className="mx-auto max-w-6xl px-6 py-12"> <Link
         href="/materi/tiu/verbal"
         className="text-sm text-blue-100 hover:text-white"
       >
← Kembali ke Kemampuan Verbal </Link>

      <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-200">
        TIU - KEMAMPUAN VERBAL
      </p>

      <h1 className="mt-2 text-4xl font-bold md:text-5xl">
        Analitis
      </h1>

      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
        Pelajari cara menganalisis informasi, menemukan hubungan logis,
        menyusun kemungkinan, dan menentukan kesimpulan yang tepat dalam
        soal TIU CPNS.
      </p>
    </div>
  </section>

  <section className="mx-auto max-w-6xl px-6 py-12">
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <article className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            1. Pengertian Analitis
          </h2>

          <p className="mt-4 leading-8 text-slate-700">
            Kemampuan analitis adalah kemampuan untuk memahami informasi,
            menghubungkan beberapa fakta, membandingkan kondisi, dan
            menarik kesimpulan berdasarkan informasi yang tersedia.
          </p>

          <p className="mt-4 leading-8 text-slate-700">
            Dalam soal TIU, kemampuan analitis digunakan untuk menguji
            ketelitian dan kemampuan berpikir logis ketika menghadapi
            beberapa informasi sekaligus.
          </p>

          <div className="mt-6 rounded-xl bg-blue-50 p-5">
            <p className="font-bold text-blue-700">
              Kunci utama
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-700">
              Gunakan hanya informasi yang diberikan dalam soal. Jangan
              menambahkan asumsi yang tidak disebutkan.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            2. Cara Mengerjakan Soal Analitis
          </h2>

          <div className="mt-6 space-y-4">
            {langkahAnalitis.map((item) => (
              <div
                key={item.nomor}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                    {item.nomor}
                  </span>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.judul}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.isi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            3. Contoh Soal Analitis
          </h2>

          <div className="mt-6 rounded-2xl bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Contoh
            </p>

            <p className="mt-3 leading-7 text-slate-800">
              Andi lebih tinggi daripada Budi. Budi lebih tinggi daripada
              Candra. Siapakah yang paling tinggi?
            </p>

            <div className="mt-5 space-y-2 text-sm text-slate-700">
              <p>A. Andi</p>
              <p>B. Budi</p>
              <p>C. Candra</p>
              <p>D. Tidak dapat ditentukan</p>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
              <p className="font-bold text-emerald-700">
                Jawaban: A. Andi
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-700">
                Dari informasi soal diketahui bahwa Andi lebih tinggi
                daripada Budi, sedangkan Budi lebih tinggi daripada
                Candra. Urutannya adalah Andi, Budi, kemudian Candra.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            4. Bentuk Soal Analitis
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">
                Urutan
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Menentukan urutan berdasarkan beberapa kondisi.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">
                Posisi
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Menentukan posisi atau letak suatu objek.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">
                Perbandingan
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Membandingkan beberapa objek berdasarkan informasi yang
                tersedia.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">
                Kemungkinan
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Menentukan kemungkinan yang sesuai dengan semua kondisi.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            5. Tips Cepat
          </h2>

          <div className="mt-5 space-y-3">
            {tips.map((item, index) => (
              <div
                key={item}
                className="flex gap-3 rounded-xl bg-slate-50 p-4"
              >
                <span className="font-bold text-blue-600">
                  {index + 1}.
                </span>

                <p className="text-sm leading-6 text-slate-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Jebakan yang Sering Terjadi
          </h2>

          <div className="mt-5 space-y-3">
            {jebakan.map((item) => (
              <p
                key={item}
                className="rounded-xl bg-white p-4 text-sm leading-6 text-slate-700"
              >
                ⚠ {item}
              </p>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Ringkasan Analitis
          </h2>

          <div className="mt-5 space-y-3">
            <p className="text-sm leading-6 text-slate-700">
              ✓ Pahami seluruh informasi sebelum menjawab.
            </p>

            <p className="text-sm leading-6 text-slate-700">
              ✓ Cari hubungan antara setiap informasi.
            </p>

            <p className="text-sm leading-6 text-slate-700">
              ✓ Gunakan tabel atau urutan jika informasi cukup banyak.
            </p>

            <p className="text-sm leading-6 text-slate-700">
              ✓ Jangan membuat asumsi di luar informasi soal.
            </p>

            <p className="text-sm leading-6 text-slate-700">
              ✓ Pilih jawaban yang memenuhi seluruh kondisi.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Lanjut Materi
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/materi/tiu/verbal/silogisme"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Silogisme
            </Link>

            <Link
              href="/materi/tiu/verbal/analogi"
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Analogi
            </Link>

            <Link
              href="/materi/tiu/verbal"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Semua Materi Verbal
            </Link>
          </div>
        </section>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Kemampuan Verbal
          </p>

          <nav className="mt-4 space-y-1">
            <Link
              href="/materi/tiu/verbal/analogi"
              className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              01. Analogi
            </Link>

            <Link
              href="/materi/tiu/verbal/silogisme"
              className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
            >
              02. Silogisme
            </Link>

            <Link
              href="/materi/tiu/verbal/analitis"
              className="block rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-700"
            >
              03. Analitis
            </Link>
          </nav>

          <div className="mt-5 border-t border-slate-200 pt-5">
            <p className="text-xs leading-5 text-slate-500">
              Analitis membutuhkan ketelitian dalam membaca dan
              menghubungkan setiap informasi.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</main>

);
}

