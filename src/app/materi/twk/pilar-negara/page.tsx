import Link from "next/link";

export default function MateriPilarNegaraPage() {
  const pilar = [
    {
      nomor: "01",
      judul: "Pancasila",
      isi: "Pancasila merupakan dasar negara dan ideologi negara Republik Indonesia. Nilai-nilai Pancasila menjadi landasan dalam kehidupan bermasyarakat, berbangsa, dan bernegara.",
      poin: [
        "Menjadi dasar negara Indonesia.",
        "Menjadi ideologi dan pandangan hidup bangsa.",
        "Menjadi sumber nilai dalam kehidupan berbangsa dan bernegara.",
        "Menjadi pedoman dalam menjaga persatuan dan kesatuan bangsa.",
      ],
    },
    {
      nomor: "02",
      judul: "Undang-Undang Dasar Negara Republik Indonesia Tahun 1945",
      isi: "UUD Negara Republik Indonesia Tahun 1945 merupakan hukum dasar tertulis yang menjadi landasan konstitusional dalam penyelenggaraan kehidupan bernegara.",
      poin: [
        "Menjadi hukum dasar tertulis negara.",
        "Menjadi landasan konstitusional penyelenggaraan negara.",
        "Mengatur dasar dan sistem ketatanegaraan Indonesia.",
        "Memuat ketentuan mengenai lembaga negara serta hak dan kewajiban warga negara.",
      ],
    },
    {
      nomor: "03",
      judul: "Negara Kesatuan Republik Indonesia",
      isi: "Negara Kesatuan Republik Indonesia merupakan bentuk negara Indonesia. Keutuhan wilayah dan persatuan seluruh rakyat Indonesia harus dijaga sebagai bagian dari kehidupan berbangsa dan bernegara.",
      poin: [
        "Indonesia berbentuk negara kesatuan.",
        "Keutuhan wilayah NKRI harus dijaga.",
        "Persatuan dan kesatuan merupakan hal penting dalam kehidupan berbangsa.",
        "Setiap warga negara memiliki tanggung jawab untuk menjaga keutuhan bangsa dan negara.",
      ],
    },
    {
      nomor: "04",
      judul: "Bhinneka Tunggal Ika",
      isi: "Bhinneka Tunggal Ika berarti berbeda-beda tetapi tetap satu. Semboyan ini mencerminkan semangat persatuan Indonesia di tengah keberagaman suku, agama, ras, budaya, bahasa, dan golongan.",
      poin: [
        "Menghargai keberagaman masyarakat Indonesia.",
        "Menjaga persatuan di tengah perbedaan.",
        "Tidak melakukan diskriminasi terhadap kelompok lain.",
        "Mengutamakan kepentingan bersama daripada kepentingan kelompok.",
      ],
    },
  ];

  const jebakan = [
    "Menganggap Pancasila hanya sebagai simbol negara tanpa menerapkan nilai-nilainya.",
    "Menganggap perbedaan sebagai alasan untuk memecah persatuan.",
    "Mengutamakan kepentingan kelompok di atas kepentingan bangsa dan negara.",
    "Tidak menghormati konstitusi dan hukum yang berlaku.",
    "Menganggap keberagaman sebagai ancaman, bukan sebagai kekayaan bangsa.",
  ];

  const strategi = [
    "Jika soal membahas dasar atau ideologi negara, perhatikan kaitannya dengan Pancasila.",
    "Jika soal membahas hukum dasar dan sistem ketatanegaraan, perhatikan UUD Negara Republik Indonesia Tahun 1945.",
    "Jika soal membahas keutuhan wilayah dan persatuan nasional, perhatikan konsep NKRI.",
    "Jika soal membahas keberagaman dan persatuan dalam perbedaan, perhatikan Bhinneka Tunggal Ika.",
    "Pilih tindakan yang mengutamakan persatuan, kepentingan bangsa, hukum, dan kehidupan bersama.",
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
            <span className="inline-flex rounded-xl bg-violet-50 px-3 py-2 text-sm font-black text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
              TWK · MATERI 04
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white">
              Pilar Negara
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Memahami empat pilar kehidupan berbangsa dan bernegara sebagai
              dasar dalam menjaga persatuan, keutuhan, dan kehidupan
              berkonstitusi di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* ISI MATERI */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          {/* KONTEN UTAMA */}
          <article className="space-y-8">
            {/* PENGANTAR */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Memahami Pilar Negara
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Dalam materi TWK, pemahaman mengenai pilar negara penting untuk
                mengetahui dasar kehidupan berbangsa dan bernegara Indonesia.
                Pancasila, UUD Negara Republik Indonesia Tahun 1945, NKRI, dan
                Bhinneka Tunggal Ika merupakan konsep penting yang perlu
                dipahami dalam menghadapi berbagai persoalan kebangsaan.
              </p>
            </section>

            {/* EMPAT PILAR */}
            {pilar.map((item) => (
              <section
                key={item.nomor}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-sm font-black text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    {item.nomor}
                  </span>

                  <div className="min-w-0">
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                      {item.judul}
                    </h2>

                    <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                      {item.isi}
                    </p>

                    <h3 className="mt-6 text-sm font-black uppercase tracking-wider text-indigo-600">
                      Hal Penting
                    </h3>

                    <ul className="mt-3 space-y-3">
                      {item.poin.map((poin) => (
                        <li key={poin} className="flex gap-3">
                          <span className="font-black text-indigo-600">✓</span>

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

            {/* HUBUNGAN ANTAR PILAR */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Hubungan Keempat Pilar
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-700 dark:text-slate-300">
                Keempat konsep tersebut saling berkaitan dalam kehidupan
                berbangsa dan bernegara. Pancasila menjadi dasar negara dan
                ideologi, UUD Negara Republik Indonesia Tahun 1945 menjadi
                landasan konstitusional, NKRI merupakan bentuk negara, sedangkan
                Bhinneka Tunggal Ika menjadi semboyan yang mencerminkan
                persatuan dalam keberagaman.
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Pancasila → dasar negara dan ideologi.",
                  "UUD 1945 → hukum dasar dan landasan konstitusional.",
                  "NKRI → bentuk negara dan keutuhan wilayah.",
                  "Bhinneka Tunggal Ika → persatuan dalam keberagaman.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* KUNCI TWK */}
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/40 dark:bg-amber-950/20">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Kunci Memahami Soal TWK
              </h2>

              <div className="mt-5 space-y-4">
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white">
                    Pancasila
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    Fokus pada nilai dasar Pancasila dan penerapannya dalam
                    kehidupan sehari-hari.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 dark:text-white">
                    UUD 1945
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    Fokus pada konstitusi, hukum dasar, hak, kewajiban, dan
                    penyelenggaraan negara.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 dark:text-white">
                    NKRI
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    Fokus pada keutuhan wilayah, persatuan, kesatuan, dan
                    kepentingan bangsa.
                  </p>
                </div>

                <div>
                  <h3 className="font-black text-slate-900 dark:text-white">
                    Bhinneka Tunggal Ika
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    Fokus pada penghormatan terhadap keberagaman dan persatuan
                    dalam perbedaan.
                  </p>
                </div>
              </div>
            </section>

            {/* STRATEGI */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Strategi Menjawab Soal Pilar Negara
              </h2>

              <div className="mt-5 space-y-4">
                {strategi.map((item, index) => (
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

            {/* JEBakan */}
            <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6 dark:border-rose-900/40 dark:bg-rose-950/20">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                ⚠️ Jebakan yang Sering Muncul
              </h2>

              <ul className="mt-5 space-y-3">
                {jebakan.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-black text-rose-600">•</span>

                    <span className="text-sm leading-6 text-slate-700 dark:text-slate-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* RINGKASAN */}
            <section className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <h2 className="text-2xl font-black text-slate-950 dark:text-white">
                Ringkasan Pilar Negara
              </h2>

              <div className="mt-5 space-y-3">
                {[
                  "Pancasila merupakan dasar negara dan ideologi negara Indonesia.",
                  "UUD Negara Republik Indonesia Tahun 1945 merupakan hukum dasar tertulis.",
                  "NKRI merupakan bentuk negara Indonesia yang keutuhannya harus dijaga.",
                  "Bhinneka Tunggal Ika mengajarkan persatuan dalam keberagaman.",
                  "Keempat konsep tersebut saling berkaitan dalam kehidupan berbangsa dan bernegara.",
                  "Dalam soal TWK, pilih sikap yang sesuai dengan persatuan, konstitusi, hukum, dan kepentingan bangsa.",
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
                Lanjutkan ke materi Bahasa Indonesia atau kembali ke daftar
                materi TWK.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/materi/twk"
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  ← Daftar Materi
                </Link>

                <Link
                  href="/materi/twk/bahasa-indonesia"
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-indigo-500"
                >
                  Bahasa Indonesia →
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
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                      item.nomor === "04"
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