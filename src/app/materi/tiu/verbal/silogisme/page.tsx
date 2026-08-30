import Link from "next/link";

export default function SilogismePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <Link href="/materi/tiu/verbal" className="text-sm text-blue-100 hover:text-white">
            ← Kembali ke Kemampuan Verbal
          </Link>

          <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-200">
            TIU - KEMAMPUAN VERBAL
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Silogisme
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-blue-100">
            Pelajari cara memahami premis dan menentukan kesimpulan yang tepat dalam soal Silogisme TIU CPNS.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="space-y-8">

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              1. Pengertian Silogisme
            </h2>
            <p className="mt-4 leading-8 text-slate-700">
              Silogisme adalah bentuk penalaran yang menggunakan beberapa pernyataan atau premis untuk memperoleh sebuah kesimpulan.
            </p>
            <p className="mt-4 leading-8 text-slate-700">
              Dalam soal TIU, kemampuan silogisme digunakan untuk menguji kemampuan memahami hubungan logis antara beberapa pernyataan.
            </p>
            <div className="mt-6 rounded-xl bg-blue-50 p-5">
              <p className="font-bold text-blue-700">Kunci utama</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Kesimpulan harus berdasarkan informasi yang diberikan dalam premis. Jangan menambahkan informasi dari luar soal.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Struktur Silogisme
            </h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900">Premis 1</h3>
                <p className="mt-2 text-slate-600">Berisi pernyataan umum yang menjadi dasar penalaran.</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-bold text-slate-900">Premis 2</h3>
                <p className="mt-2 text-slate-600">Berisi pernyataan khusus yang berkaitan dengan premis pertama.</p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
                <h3 className="font-bold text-blue-700">Kesimpulan</h3>
                <p className="mt-2 text-slate-700">Merupakan hasil penalaran yang diperoleh dari kedua premis.</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">3. Contoh Soal</h2>
            <div className="mt-5 rounded-2xl bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">Premis 1:</p>
              <p className="mt-2 text-slate-700">Semua peserta yang disiplin datang tepat waktu.</p>
              <p className="mt-4 font-semibold text-slate-900">Premis 2:</p>
              <p className="mt-2 text-slate-700">Rina adalah peserta yang disiplin.</p>
              <p className="mt-4 font-semibold text-slate-900">Kesimpulan:</p>
              <p className="mt-2 font-bold text-emerald-700">Rina datang tepat waktu.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">4. Cara Menjawab</h2>
            <div className="mt-5 space-y-4">
              <p className="text-slate-700">1. Baca semua premis dengan teliti.</p>
              <p className="text-slate-700">2. Cari hubungan antara objek atau kelompok.</p>
              <p className="text-slate-700">3. Perhatikan kata semua, sebagian, dan tidak ada.</p>
              <p className="text-slate-700">4. Tentukan kesimpulan yang benar-benar mengikuti premis.</p>
              <p className="text-slate-700">5. Jangan menambahkan informasi dari luar soal.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">Jebakan yang Sering Terjadi</h2>
            <div className="mt-5 space-y-3">
              <p className="rounded-xl bg-white p-4 text-sm text-slate-700">⚠ Menganggap sebagian berarti semua.</p>
              <p className="rounded-xl bg-white p-4 text-sm text-slate-700">⚠ Menambahkan informasi yang tidak terdapat dalam premis.</p>
              <p className="rounded-xl bg-white p-4 text-sm text-slate-700">⚠ Menentukan jawaban berdasarkan pendapat pribadi.</p>
              <p className="rounded-xl bg-white p-4 text-sm text-slate-700">⚠ Mengabaikan kata tidak atau tidak ada.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">Ringkasan</h2>
            <div className="mt-5 space-y-3">
              <p className="text-sm text-slate-700">✓ Silogisme menggunakan premis untuk memperoleh kesimpulan.</p>
              <p className="text-sm text-slate-700">✓ Kesimpulan harus mengikuti informasi dalam premis.</p>
              <p className="text-sm text-slate-700">✓ Perhatikan kata semua, sebagian, dan tidak ada.</p>
              <p className="text-sm text-slate-700">✓ Jangan menggunakan informasi di luar soal.</p>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Lanjut Materi</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/materi/tiu/verbal/analogi" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                ← Analogi
              </Link>
              <Link href="/materi/tiu/verbal" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Materi Verbal
              </Link>
              <Link href="/materi/tiu/verbal/analitis" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
                Analitis →
              </Link>
            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
