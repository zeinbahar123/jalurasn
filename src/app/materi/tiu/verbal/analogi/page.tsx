import Link from "next/link";

const jenisAnalogi = [
  {
    nomor: "01",
    judul: "Hubungan Profesi",
    contoh: "Dokter : Pasien = Guru : Murid",
    penjelasan:
      "Dokter berhubungan dengan pasien sebagai pihak yang dilayani dalam bidang kesehatan. Hubungan yang sama terdapat antara guru dan murid dalam bidang pendidikan.",
  },
  {
    nomor: "02",
    judul: "Hubungan Alat dan Fungsi",
    contoh: "Kunci : Membuka = Pisau : Memotong",
    penjelasan:
      "Kunci digunakan untuk membuka, sedangkan pisau digunakan untuk memotong.",
  },
  {
    nomor: "03",
    judul: "Hubungan Tempat dan Penghuni",
    contoh: "Kandang : Ayam = Akuarium : Ikan",
    penjelasan:
      "Kandang merupakan tempat ayam, sedangkan akuarium merupakan tempat ikan.",
  },
  {
    nomor: "04",
    judul: "Hubungan Sebab dan Akibat",
    contoh: "Hujan : Banjir = Api : Kebakaran",
    penjelasan:
      "Hujan yang berlebihan dapat menyebabkan banjir, sedangkan api yang tidak terkendali dapat menyebabkan kebakaran.",
  },
  {
    nomor: "05",
    judul: "Hubungan Bagian dan Keseluruhan",
    contoh: "Roda : Mobil = Halaman : Buku",
    penjelasan:
      "Roda merupakan bagian dari mobil, sedangkan halaman merupakan bagian dari buku.",
  },
  {
    nomor: "06",
    judul: "Hubungan Tingkatan",
    contoh: "Kecil : Besar = Rendah : Tinggi",
    penjelasan:
      "Kecil dan besar menunjukkan perbedaan ukuran, sedangkan rendah dan tinggi menunjukkan perbedaan tingkat atau posisi.",
  },
];

const strategi = [
  "Cari hubungan antara pasangan kata pertama terlebih dahulu.",
  "Jangan terpaku pada arti kata secara umum; perhatikan hubungan spesifiknya.",
  "Uji hubungan tersebut terhadap setiap pilihan jawaban.",
  "Pilih pasangan yang memiliki hubungan paling tepat dan paling setara.",
  "Jika ada dua pilihan yang terlihat mirip, pilih hubungan yang paling spesifik.",
];

const jebakan = [
  "Memilih jawaban hanya karena kedua kata memiliki arti yang mirip.",
  "Mengabaikan arah hubungan antara kata pertama dan kata kedua.",
  "Memilih hubungan yang hanya sebagian mirip.",
  "Terlalu cepat memilih tanpa menguji semua pilihan.",
  "Menggunakan hubungan yang berbeda jenis dengan pasangan soal.",
];

export default function AnalogiPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link
            href="/materi/tiu/verbal"
            className="text-sm text-blue-100 transition hover:text-white"
          >
            ← Kembali ke Kemampuan Verbal
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-200">
            TIU · KEMAMPUAN VERBAL
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Analogi
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari cara menemukan hubungan antara dua kata dan menerapkan
            hubungan tersebut pada pasangan kata lainnya dalam soal TIU CPNS.
          </p>
        </div>
      </section>

      {/* ISI */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* KONTEN UTAMA */}
          <article className="space-y-8">
            {/* PENGERTIAN */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                1. Pengertian Analogi
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700">
                Analogi merupakan kemampuan untuk memahami hubungan antara dua
                kata atau konsep kemudian mencari pasangan kata lain yang
                memiliki hubungan serupa.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700">
                Dalam soal TIU, kemampuan analogi digunakan untuk mengukur
                kemampuan seseorang dalam memahami hubungan logis, fungsi,
                sebab-akibat, bagian-keseluruhan, maupun hubungan lainnya.
              </p>

              <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-bold text-blue-700">
                  Kunci utama
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  Jangan mencari kata yang sekadar memiliki arti mirip.
                  Temukan terlebih dahulu <strong>hubungan</strong> antara
                  pasangan kata pertama.
                </p>
              </div>
            </section>

            {/* POLA */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                2. Pola Hubungan Analogi
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700">
                Hubungan dalam soal analogi dapat berbentuk berbagai pola.
                Berikut beberapa hubungan yang sering digunakan.
              </p>

              <div className="mt-6 space-y-4">
                {jenisAnalogi.map((item) => (
                  <div
                    key={item.nomor}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                        {item.nomor}
                      </span>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {item.judul}
                        </h3>

                        <p className="mt-2 rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-800">
                          {item.contoh}
                        </p>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {item.penjelasan}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CARA MENJAWAB */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                3. Cara Menjawab Soal Analogi
              </h2>

              <div className="mt-6 space-y-5">
                {[
                  {
                    nomor: "1",
                    judul: "Identifikasi hubungan",
                    isi: "Tentukan hubungan yang paling tepat antara kata pertama dan kata kedua.",
                  },
                  {
                    nomor: "2",
                    judul: "Buat kalimat sederhana",
                    isi: "Jika hubungan sulit ditemukan, buat kalimat yang menghubungkan kedua kata.",
                  },
                  {
                    nomor: "3",
                    judul: "Terapkan hubungan",
                    isi: "Gunakan hubungan tersebut untuk menguji pasangan kata pada pilihan jawaban.",
                  },
                  {
                    nomor: "4",
                    judul: "Bandingkan semua pilihan",
                    isi: "Jangan langsung memilih pilihan pertama yang terasa benar. Bandingkan tingkat kesamaan hubungannya.",
                  },
                  {
                    nomor: "5",
                    judul: "Pilih hubungan paling tepat",
                    isi: "Jawaban terbaik adalah pasangan yang memiliki hubungan paling sama secara logis.",
                  },
                ].map((item) => (
                  <div key={item.nomor} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                      {item.nomor}
                    </span>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        {item.judul}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {item.isi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CONTOH SOAL */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                4. Contoh Soal Analogi
              </h2>

              <div className="mt-6 rounded-2xl bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Contoh
                </p>

                <p className="mt-3 text-lg font-bold text-slate-900">
                  Dokter : Pasien = Guru : ...
                </p>

                <div className="mt-5 space-y-2 text-sm text-slate-700">
                  <p>A. Sekolah</p>
                  <p>B. Buku</p>
                  <p>C. Murid</p>
                  <p>D. Kelas</p>
                  <p>E. Pelajaran</p>
                </div>

                <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
                  <p className="font-bold text-emerald-700">
                    Jawaban: C. Murid
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Dokter memberikan pelayanan kepada pasien. Hubungan yang
                    sama adalah guru memberikan pendidikan kepada murid.
                  </p>
                </div>
              </div>
            </section>

            {/* STRATEGI */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                5. Strategi Cepat Mengerjakan Analogi
              </h2>

              <div className="mt-5 space-y-3">
                {strategi.map((item, index) => (
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

            {/* JEBAKAN */}
            <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                ⚠️ Jebakan yang Sering Muncul
              </h2>

              <div className="mt-5 space-y-3">
                {jebakan.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-rose-100 bg-white p-4"
                  >
                    <p className="text-sm leading-6 text-slate-700">
                      ⚠ {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Ringkasan Analogi
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Analogi menguji kemampuan menemukan hubungan antara dua pasangan kata.",
                  "Hubungan dapat berupa profesi, fungsi, tempat, sebab-akibat, bagian-keseluruhan, dan hubungan lainnya.",
                  "Fokus utama bukan pada kemiripan kata, tetapi pada hubungan logisnya.",
                  "Gunakan kalimat sederhana untuk membantu menemukan hubungan.",
                  "Bandingkan seluruh pilihan sebelum menentukan jawaban.",
                  "Pilih pasangan yang memiliki hubungan paling tepat dan setara.",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="font-bold text-blue-600">✓</span>

                    <p className="text-sm leading-6 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Lanjut ke materi berikutnya
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Setelah memahami analogi, lanjutkan ke materi Silogisme untuk
                mempelajari penalaran berdasarkan premis dan kesimpulan.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/tiu/verbal"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  ← Materi Verbal
                </Link>

                <Link
                  href="/materi/tiu/verbal/silogisme"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Silogisme →
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Kemampuan Verbal
              </p>

              <nav className="mt-4 space-y-1">
                <Link
                  href="/materi/tiu/verbal/analogi"
                  className="block rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-bold text-blue-700"
                >
                  01. Analogi
                </Link>

                <Link
                  href="/materi/tiu/verbal/silogisme"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  02. Silogisme
                </Link>

                <Link
                  href="/materi/tiu/verbal/analitis"
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  03. Analitis
                </Link>
              </nav>

              <div className="mt-5 border-t border-slate-200 pt-5">
                <p className="text-xs leading-5 text-slate-500">
                  Pahami pola hubungan terlebih dahulu sebelum mengerjakan
                  latihan soal.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}