import Link from "next/link";

const konsep = [
  "Memahami pentingnya menjaga persatuan dan kesatuan dalam kehidupan bermasyarakat dan bernegara.",
  "Menghargai perbedaan suku, agama, budaya, pendapat, dan latar belakang.",
  "Menolak kekerasan sebagai cara untuk menyelesaikan perbedaan.",
  "Mengutamakan dialog, musyawarah, dan penyelesaian masalah secara damai.",
  "Menjaga komitmen terhadap Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan Negara Kesatuan Republik Indonesia.",
  "Bersikap kritis terhadap informasi atau ajakan yang dapat memecah belah masyarakat.",
];

const sikap = [
  "Menghormati orang lain yang memiliki pendapat berbeda.",
  "Tidak memaksakan keyakinan atau pendapat kepada orang lain.",
  "Menyelesaikan konflik melalui komunikasi dan musyawarah.",
  "Tidak mudah percaya pada informasi provokatif yang belum jelas kebenarannya.",
  "Menolak ajakan melakukan kekerasan atau tindakan yang melanggar hukum.",
  "Menjaga hubungan baik dengan rekan kerja yang memiliki latar belakang berbeda.",
  "Mengutamakan kepentingan persatuan dibanding kepentingan kelompok sempit.",
  "Melaporkan atau menyampaikan informasi yang mencurigakan melalui saluran yang tepat.",
];

const situasi = [
  "Mendapat pesan berisi ajakan membenci kelompok tertentu.",
  "Menemukan informasi provokatif di media sosial.",
  "Berdebat dengan seseorang yang memiliki pandangan berbeda.",
  "Mendengar ajakan untuk menyelesaikan masalah dengan kekerasan.",
  "Menghadapi rekan kerja yang berbeda latar belakang.",
  "Mendapat tekanan untuk mengikuti kelompok tertentu yang bertentangan dengan aturan.",
];

const ciri = [
  "Mendorong kebencian terhadap kelompok atau golongan tertentu.",
  "Membenarkan kekerasan untuk mencapai tujuan.",
  "Menyebarkan provokasi dan informasi yang dapat memecah persatuan.",
  "Memaksakan pandangan kepada orang lain.",
  "Menolak dialog dan menganggap hanya kelompoknya yang benar.",
  "Mengajak orang lain melakukan tindakan yang bertentangan dengan hukum.",
];

const jebakan = [
  "Membalas provokasi dengan provokasi yang lebih keras.",
  "Menyebarkan informasi sebelum memeriksa kebenarannya.",
  "Menganggap perbedaan pendapat sebagai alasan untuk bermusuhan.",
  "Memilih kekerasan karena dianggap sebagai cara tercepat menyelesaikan masalah.",
  "Mengikuti ajakan kelompok hanya karena merasa dekat atau memiliki hubungan pertemanan.",
  "Membiarkan tindakan yang berpotensi mengganggu persatuan tanpa mengambil sikap yang tepat.",
];

const strategi = [
  "Tetap tenang ketika menghadapi provokasi atau perbedaan pendapat.",
  "Periksa kebenaran informasi sebelum mempercayai atau menyebarkannya.",
  "Utamakan dialog, komunikasi, dan musyawarah dalam menyelesaikan perbedaan.",
  "Tolak kekerasan dan tindakan yang melanggar hukum.",
  "Hormati perbedaan tanpa harus menyetujui semua pendapat orang lain.",
  "Utamakan kepentingan persatuan dan kepentingan bersama.",
  "Jika menemukan tindakan yang berpotensi membahayakan, gunakan jalur pelaporan yang sesuai.",
  "Dalam soal TKP, pilih tindakan yang paling damai, objektif, bertanggung jawab, dan sesuai aturan.",
];

export default function MateriAntiRadikalismePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* HEADER */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <Link
            href="/materi/tkp"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500"
          >
            ← Kembali ke Materi TKP
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
              TKP · MATERI
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Anti Radikalisme
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami sikap menjaga persatuan, menghargai perbedaan, menolak
              kekerasan, dan menyelesaikan konflik secara damai sesuai nilai
              kebangsaan dan aturan yang berlaku.
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
                Memahami Anti Radikalisme
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam konteks TKP, materi anti radikalisme berkaitan dengan
                kemampuan menjaga persatuan, menghargai perbedaan, menolak
                kekerasan, serta mengambil sikap yang sesuai dengan nilai
                Pancasila dan hukum yang berlaku.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Peserta juga perlu mampu menyikapi informasi provokatif secara
                kritis dan tidak mudah terpengaruh oleh ajakan yang dapat
                mengganggu persatuan atau ketertiban.
              </p>
            </section>

            {/* 1 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                1. Prinsip Dasar
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Sikap anti radikalisme tercermin dalam kemampuan menjaga
                persatuan dan menyelesaikan perbedaan secara konstruktif tanpa
                menggunakan kekerasan.
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

            {/* 2 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                2. Sikap yang Harus Dikembangkan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam kehidupan kerja maupun bermasyarakat, perbedaan
                merupakan hal yang wajar. Sikap yang tepat adalah menjaga
                komunikasi dan menghormati pihak lain.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
            </section>

            {/* 3 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                3. Mengenali Sikap yang Berpotensi Memecah Persatuan
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Salah satu kemampuan penting adalah mengenali tindakan yang
                dapat meningkatkan konflik, kebencian, atau perpecahan.
              </p>

              <div className="mt-5 space-y-3">
                {ciri.map((item) => (
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

            {/* 4 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                4. Menghadapi Provokasi dan Informasi Provokatif
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Informasi yang belum terverifikasi dapat memicu kesalahpahaman
                dan konflik. Karena itu, seseorang perlu berpikir kritis sebelum
                mengambil tindakan.
              </p>

              <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  Pola berpikir
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  Terima informasi → jangan langsung percaya → periksa sumber →
                  verifikasi kebenaran → hindari menyebarkan provokasi →
                  gunakan jalur yang tepat jika perlu ditindaklanjuti.
                </p>
              </div>
            </section>

            {/* 5 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                5. Menghadapi Perbedaan Pendapat
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Perbedaan pendapat tidak selalu berarti konflik. Perbedaan
                dapat diselesaikan melalui komunikasi yang baik, saling
                menghargai, dan mencari titik temu.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5 dark:border-indigo-900/40 dark:bg-indigo-950/30">
                <p className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
                  Prinsip penting
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                  Berbeda pendapat bukan alasan untuk membenci atau melakukan
                  kekerasan. Dengarkan pendapat pihak lain, sampaikan pendapat
                  secara santun, dan cari penyelesaian berdasarkan aturan serta
                  kepentingan bersama.
                </p>
              </div>
            </section>

            {/* 6 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                6. Jebakan yang Sering Muncul dalam Soal TKP
              </h2>

              <div className="mt-5 space-y-3">
                {jebakan.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70"
                  >
                    <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      ⚠ {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7 */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                7. Strategi Menjawab Soal Anti Radikalisme
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
                Ringkasan Anti Radikalisme
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Jaga persatuan dan kesatuan dalam kehidupan bermasyarakat dan bernegara.",
                  "Hormati perbedaan pendapat, latar belakang, dan kelompok.",
                  "Tolak kekerasan sebagai cara menyelesaikan masalah.",
                  "Jangan mudah percaya atau menyebarkan informasi provokatif.",
                  "Utamakan dialog, musyawarah, dan penyelesaian secara damai.",
                  "Pegang teguh nilai Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI.",
                  "Dalam soal TKP, pilih tindakan yang tenang, damai, bertanggung jawab, dan sesuai aturan.",
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
                Materi TKP selesai
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Kamu sudah mempelajari materi utama TKP. Kembali ke daftar
                materi untuk melihat seluruh materi yang tersedia.
              </p>

              <div className="mt-5">
                <Link
                  href="/materi/tkp"
                  className="inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
                >
                  ← Kembali ke Materi TKP
                </Link>
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
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
                    nama: "Profesionalisme",
                    href: "/materi/tkp/profesionalisme",
                  },
                  {
                    nomor: "03",
                    nama: "Anti Radikalisme",
                    href: "/materi/tkp/anti-radikalisme",
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
                  Pahami konsep, hindari provokasi, hormati perbedaan, dan
                  utamakan persatuan dalam setiap situasi.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}