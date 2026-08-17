import type { Metadata } from "next";
import Link from "next/link";
import { ATURAN, AMBANG_TOTAL, SKOR_MAKS_TOTAL, URUTAN_KATEGORI } from "@/lib/skd";
import { urlAbsolut, OG_GAMBAR } from "@/lib/situs";
import { Badge, ButtonLink, Card, Callout } from "@/components/ui";

export const metadata: Metadata = {
  title: "Panduan Seleksi CPNS 2026: Tahapan, Passing Grade SKD, & Cara Pilih Formasi",
  description:
    "Panduan lengkap seleksi CPNS 2026: 8 tahapan dari pengumuman formasi sampai NIP, nilai ambang batas SKD (TWK 65, TIU 80, TKP 166), strategi mengerjakan 110 soal dalam 100 menit, daftar dokumen, dan 5 kesalahan yang paling sering menggugurkan pelamar.",
  keywords: [
    "tahapan seleksi CPNS 2026",
    "passing grade SKD CPNS",
    "nilai ambang batas SKD",
    "cara memilih formasi CPNS",
    "dokumen pendaftaran CPNS",
    "bobot SKD SKB 40 60",
  ],
  alternates: { canonical: "/info" },
  openGraph: {
    type: "article",
    url: urlAbsolut("/info"),
    title: "Panduan Seleksi CPNS 2026 — Tahapan, Passing Grade, & Pemilihan Formasi",
    description:
      "Dari pengumuman formasi sampai penetapan NIP: aturan nilai SKD, strategi pengerjaan, dokumen, dan kesalahan yang paling sering menggugurkan pelamar.",
    images: [...OG_GAMBAR],
  },
};

/**
 * Pertanyaan yang benar-benar sering diketikkan calon pelamar di mesin pencari.
 * Disimpan sebagai data agar sekaligus bisa dikirim sebagai FAQPage schema.org,
 * yang berpeluang tampil langsung di halaman hasil pencarian Google.
 */
const DAFTAR_FAQ: { q: string; a: string }[] = [
  {
    q: "Kalau nilai saya lewat ambang batas, otomatis lanjut SKB?",
    a: "Tidak. Melewati ambang batas hanya membuat Anda memenuhi syarat. Selanjutnya Anda diurutkan berdasarkan nilai, dan hanya sejumlah peringkat teratas — umumnya tiga kali jumlah kebutuhan formasi — yang berlanjut ke SKB.",
  },
  {
    q: "Boleh mendaftar dua formasi sekaligus untuk berjaga-jaga?",
    a: "Tidak boleh. Satu pelamar hanya untuk satu instansi dan satu formasi dalam satu periode. Karena itu pemilihan formasi jauh lebih menentukan daripada yang dibayangkan kebanyakan pelamar.",
  },
  {
    q: "Berapa lama waktu ideal persiapan SKD CPNS?",
    a: "Kalau mulai dari nol, tiga bulan konsisten jauh lebih efektif daripada dua minggu maraton. Yang menentukan bukan lama belajar, melainkan apakah Anda belajar tepat di materi yang lemah. Karena itu kerjakan try out lebih dulu untuk mengetahui sub-materi terlemah Anda, baru susun jadwal belajarnya.",
  },
  {
    q: "Ada yang menawarkan bocoran soal atau jaminan lulus CPNS, aman tidak?",
    a: "Tidak, dan itu penipuan. Soal SKD tersimpan di sistem CAT BKN dan nilai langsung tampil di layar begitu peserta selesai, sehingga tidak ada ruang untuk titipan. Yang paling sering terjadi: uang hilang, dan pelamar ikut terseret masalah hukum.",
  },
  {
    q: "Gagal dua atau tiga kali, apa masih masuk akal mencoba lagi?",
    a: "Masuk akal, asal ada yang diubah. Mengulang cara yang sama sambil berharap hasil berbeda adalah kesalahan paling umum. Ubah salah satu dari tiga hal ini: pilihan formasi, cara belajar, atau kesungguhan niat memutuskan.",
  },
  {
    q: "Apakah usia dan IPK berpengaruh ke nilai SKD?",
    a: "Tidak. SKD murni menilai jawaban Anda di hari itu. Usia dan IPK hanya relevan sebagai syarat administrasi bila memang dicantumkan di pengumuman formasi.",
  },
  {
    q: "Berapa nilai ambang batas SKD CPNS?",
    a: "Mengikuti pola beberapa tahun terakhir untuk formasi umum: TWK 65, TIU 80, dan TKP 166. Ketiganya harus dilewati sekaligus. Nilai total yang tinggi tidak menolong bila salah satu komponen berada di bawah ambang batasnya.",
  },
  {
    q: "Bagaimana perhitungan nilai akhir SKD dan SKB?",
    a: "Nilai akhir umumnya menggabungkan SKD dan SKB dengan bobot 40 persen berbanding 60 persen. Artinya keunggulan tipis di SKD masih bisa terkejar di SKB, dan sebaliknya SKD tinggi bukan jaminan bila SKB jeblok.",
  },
];

export default function InfoCPNS() {
  const faqTerstruktur = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DAFTAR_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqTerstruktur) }}
      />
      <Badge className="bg-amber-500/10 text-amber-700 ring-amber-600/25 dark:text-amber-300">
        Kumpulan informasi yang dulu saya cari terpisah-pisah
      </Badge>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Panduan Seleksi CPNS 2026
      </h1>
      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
        Halaman ini merangkum pola seleksi CPNS beberapa tahun terakhir sebagai
        bekal persiapan. <strong>Jadwal dan ketentuan resmi tahun 2026 tetap
        wajib Anda pastikan sendiri</strong> di kanal resmi, karena detailnya
        bisa berubah tiap periode.
      </p>

      <div className="mt-6">
        <Callout nada="peringatan" judul="Sumber resmi — hanya percaya ini">
          <ul className="mt-1 space-y-1">
            <li>
              Portal pendaftaran:{" "}
              <TautanLuar href="https://sscasn.bkn.go.id">
                sscasn.bkn.go.id
              </TautanLuar>
            </li>
            <li>
              Kebijakan &amp; regulasi:{" "}
              <TautanLuar href="https://www.menpan.go.id">menpan.go.id</TautanLuar>
            </li>
            <li>
              Pelaksanaan seleksi:{" "}
              <TautanLuar href="https://www.bkn.go.id">bkn.go.id</TautanLuar>
            </li>
            <li>
              Pengumuman formasi: situs resmi masing-masing instansi
            </li>
          </ul>
        </Callout>
      </div>

      {/* ============ TAHAPAN ============ */}
      <Bagian judul="1. Tahapan seleksi dari awal sampai NIP" nomor="01">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Banyak pelamar gugur bukan di ujian, tapi di tahap-tahap sebelum dan
          sesudahnya. Kenali seluruh rangkaiannya sejak awal.
        </p>

        <ol className="mt-6 space-y-5">
          <Tahap
            no={1}
            judul="Pengumuman formasi"
            isi="Setiap instansi mengumumkan jumlah formasi, kualifikasi pendidikan, dan persyaratan khusus. Baca pengumuman instansi versi PDF-nya, bukan hanya ringkasan di media sosial — persyaratan detail hampir selalu hanya ada di sana."
          />
          <Tahap
            no={2}
            judul="Pendaftaran di SSCASN"
            isi="Buat akun dengan NIK dan nomor KK yang sesuai data Dukcapil. Satu pelamar hanya boleh memilih satu instansi dan satu formasi dalam satu periode — pilihan yang sudah dikunci tidak bisa diubah. Ini keputusan paling menentukan sepanjang proses."
          />
          <Tahap
            no={3}
            judul="Seleksi administrasi"
            isi="Verifikator memeriksa kesesuaian dokumen dengan syarat formasi. Penyebab gugur terbanyak: dokumen salah unggah, ijazah/prodi tidak sesuai kualifikasi, surat lamaran tidak sesuai format, dan materai/tanda tangan tidak ada."
          />
          <Tahap
            no={4}
            judul="Masa sanggah"
            isi="Kalau dinyatakan tidak memenuhi syarat padahal Anda yakin sudah sesuai, ajukan sanggah dalam tenggat yang ditentukan. Sanggah hanya berhasil bila kesalahan ada di pihak verifikator — bukan untuk memperbaiki berkas yang memang Anda unggah keliru."
          />
          <Tahap
            no={5}
            judul="SKD dengan sistem CAT"
            isi="Ujian berbasis komputer, nilai langsung terlihat begitu selesai. 110 soal, 100 menit. Anda harus melewati ambang batas ketiga komponen sekaligus, lalu bersaing memperebutkan tempat di peringkat teratas."
          />
          <Tahap
            no={6}
            judul="SKB (Seleksi Kompetensi Bidang)"
            isi="Hanya peserta dengan peringkat terbaik yang lanjut — umumnya sebanyak tiga kali jumlah kebutuhan formasi. Bentuk SKB berbeda-beda per instansi: CAT bidang, wawancara, praktik kerja, tes fisik, psikotes, atau kombinasi."
          />
          <Tahap
            no={7}
            judul="Integrasi nilai & pengumuman"
            isi="Nilai akhir umumnya menggabungkan SKD dan SKB dengan bobot 40% : 60%. Artinya SKD yang unggul tipis bisa terkejar di SKB — dan sebaliknya, SKD tinggi bukan jaminan kalau SKB Anda jeblok."
          />
          <Tahap
            no={8}
            judul="Pemberkasan & penetapan NIP"
            isi="Tahap administratif terakhir: melengkapi dokumen asli, pemeriksaan kesehatan, SKCK, dan penetapan NIP oleh BKN. Jangan anggap remeh — kelalaian dokumen di tahap ini bisa membatalkan kelulusan."
          />
        </ol>
      </Bagian>

      {/* ============ ATURAN SKD ============ */}
      <Bagian judul="2. Aturan nilai SKD yang wajib Anda hafal" nomor="02">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Kesalahan strategi paling mahal di SKD berasal dari tidak paham cara
          penilaiannya.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs tracking-wider text-slate-500 uppercase dark:bg-slate-800/50">
              <tr>
                <th className="px-4 py-3 font-semibold">Komponen</th>
                <th className="px-4 py-3 text-center font-semibold">Soal</th>
                <th className="px-4 py-3 text-center font-semibold">Skor maks</th>
                <th className="px-4 py-3 text-center font-semibold">Ambang batas</th>
                <th className="px-4 py-3 font-semibold">Cara penilaian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {URUTAN_KATEGORI.map((k) => {
                const a = ATURAN[k];
                return (
                  <tr key={k}>
                    <td className="px-4 py-3">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {a.nama}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {a.namaPanjang}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {a.jumlahSoal}
                    </td>
                    <td className="px-4 py-3 text-center">{a.skorMaks}</td>
                    <td className="px-4 py-3 text-center font-bold text-indigo-600 dark:text-indigo-400">
                      {a.ambangBatas}
                    </td>
                    <td className="px-4 py-3 text-xs leading-6 text-slate-600 dark:text-slate-300">
                      {k === "TKP"
                        ? "Semua opsi bernilai 1–5. Tidak ada jawaban salah, tapi ada jawaban yang kurang matang. Tidak dijawab = 0."
                        : "Benar 5 poin, salah 0, tidak dijawab 0. Tidak ada nilai minus."}
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-slate-50 font-bold dark:bg-slate-800/50">
                <td className="px-4 py-3 text-slate-900 dark:text-white">Total</td>
                <td className="px-4 py-3 text-center">110</td>
                <td className="px-4 py-3 text-center">{SKOR_MAKS_TOTAL}</td>
                <td className="px-4 py-3 text-center text-indigo-600 dark:text-indigo-400">
                  {AMBANG_TOTAL}
                </td>
                <td className="px-4 py-3 text-xs font-normal text-slate-600 dark:text-slate-300">
                  Durasi 100 menit (130 menit untuk peserta disabilitas sensorik
                  netra).
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5">
          <Callout nada="peringatan" judul="Yang paling sering disalahpahami">
            Melewati ambang batas <em>tidak sama dengan</em> lulus. Anda tetap
            harus masuk peringkat terbaik di formasi Anda untuk lanjut ke SKB.
            Karena itu skor 320 bisa aman di satu formasi dan tidak berarti apa-apa
            di formasi lain. Total nilai juga tidak bisa saling menutup: TKP 220
            tidak menolong kalau TIU Anda 75.
          </Callout>
        </div>
      </Bagian>

      {/* ============ STRATEGI ============ */}
      <Bagian judul="3. Strategi mengerjakan 110 soal dalam 100 menit" nomor="03">
        <div className="grid gap-4 sm:grid-cols-2">
          <KartuTips
            judul="Kerjakan TKP lebih dulu"
            isi="TKP tidak punya jawaban salah dan tidak perlu berhitung, tapi porsinya paling besar (225 poin). Menyelesaikannya di awal saat pikiran masih segar mengunci skor besar sebelum energi terkuras di TIU."
          />
          <KartuTips
            judul="Patok jatah waktu per komponen"
            isi="Contoh pembagian aman: TKP 30 menit, TWK 20 menit, TIU 45 menit, sisa 5 menit untuk menyapu soal kosong. Begitu jatah habis, pindah — jangan menunggu 'sebentar lagi ketemu'."
          />
          <KartuTips
            judul="Satu soal maksimal 55 detik"
            isi="Rata-rata Anda hanya punya 54 detik per soal. Kalau lewat satu menit dan belum ada arah, tandai ragu dan lanjut. Satu soal deret yang bandel bisa memakan jatah lima soal lain."
          />
          <KartuTips
            judul="Jangan pernah mengosongkan"
            isi="Tidak ada nilai minus di SKD. Soal kosong dan soal salah sama-sama nol, tetapi soal yang ditebak punya peluang 20%. Sisakan 3 menit terakhir khusus untuk mengisi semua yang masih kosong."
          />
          <KartuTips
            judul="TWK: yang ditanya sering penerapan, bukan hafalan"
            isi="Soal Pancasila dan UUD makin sering berbentuk kasus. Pahami maknanya, jangan cuma hafal bunyi pasalnya — pertanyaannya biasanya 'sikap mana yang mencerminkan sila ke-...', bukan 'sila ke-3 berbunyi...'."
          />
          <KartuTips
            judul="TKP: pilih yang paling mandiri & solutif"
            isi="Pola jawaban bernilai 5 hampir selalu: menyelesaikan masalah sendiri lebih dulu, tanpa melanggar aturan, tanpa melempar ke orang lain, dan tetap menjaga hubungan kerja. Jawaban yang terdengar paling 'sopan' belum tentu paling tinggi."
          />
        </div>
      </Bagian>

      {/* ============ MEMILIH FORMASI ============ */}
      <Bagian judul="4. Memilih formasi — keputusan paling menentukan" nomor="04">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Ini bagian yang dulu paling saya remehkan. Kemampuan Anda mungkin sama
          di dua formasi, tapi peluangnya bisa berbeda sepuluh kali lipat.
        </p>

        <ol className="mt-5 space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <Langkah no="1" judul="Saring dulu berdasarkan kualifikasi, bukan minat">
            Formasi menyebut program studi secara spesifik. Kalau prodi Anda tidak
            tercantum persis, Anda akan gugur di administrasi berapa pun nilai
            SKD Anda. Buat daftar semua formasi yang menerima prodi Anda lebih
            dulu, baru pilih di antara itu.
          </Langkah>
          <Langkah no="2" judul="Bandingkan rasio pelamar terhadap kebutuhan">
            SSCASN menampilkan jumlah pelamar per formasi selama masa pendaftaran.
            Formasi dengan 1 kebutuhan dan 400 pelamar jauh lebih berat daripada 3
            kebutuhan dengan 150 pelamar. Pantau menjelang penutupan, bukan di
            hari pertama.
          </Langkah>
          <Langkah no="3" judul="Perhitungkan lokasi secara jujur">
            Instansi pusat di kota besar hampir selalu paling ramai. Pemda di luar
            kota besar sering jauh lebih longgar. Pertanyaannya bukan sekadar
            &quot;bisa lolos di mana&quot;, tapi &quot;siap tinggal dan bekerja di
            mana selama bertahun-tahun&quot;.
          </Langkah>
          <Langkah no="4" judul="Cek bentuk SKB-nya sejak sekarang">
            SKB beberapa formasi berupa praktik kerja atau tes fisik yang butuh
            persiapan berbulan-bulan. Mengetahuinya sejak awal memberi Anda waktu;
            mengetahuinya setelah lulus SKD sering sudah terlambat.
          </Langkah>
          <Langkah no="5" judul="Putuskan lebih awal, jangan di hari terakhir">
            Mendaftar di menit-menit akhir adalah sumber dua masalah sekaligus:
            server padat dan keputusan tergesa. Tetapkan pilihan sebelum masa
            pendaftaran dibuka, lalu daftar di minggu pertama.
          </Langkah>
        </ol>
      </Bagian>

      {/* ============ DOKUMEN ============ */}
      <Bagian judul="5. Dokumen yang biasanya diminta" nomor="05">
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          Persyaratan pasti mengikuti pengumuman instansi. Daftar ini untuk Anda
          siapkan dari sekarang supaya tidak panik saat pendaftaran dibuka.
        </p>
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {[
            "KTP elektronik (atau surat keterangan Dukcapil)",
            "Kartu Keluarga",
            "Ijazah asli sesuai kualifikasi formasi",
            "Transkrip nilai asli",
            "Pas foto latar merah, format & ukuran sesuai ketentuan",
            "Swafoto/selfie memegang KTP dan kartu informasi akun",
            "Surat lamaran bermeterai, ditujukan sesuai format instansi",
            "Surat pernyataan bermeterai (format dari instansi)",
            "Bukti akreditasi prodi/perguruan tinggi bila diminta",
            "Dokumen tambahan khusus (disabilitas, putra/putri daerah, cumlaude, dsb.)",
          ].map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/60 dark:text-slate-200"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <Callout nada="peringatan" judul="Lima kesalahan yang paling sering menggugurkan">
            <ol className="mt-1 list-decimal space-y-1 pl-5">
              <li>Mengunggah dokumen ke kolom yang salah (ijazah masuk kolom transkrip).</li>
              <li>Surat lamaran tidak memakai format/tujuan yang diminta instansi.</li>
              <li>Meterai atau tanda tangan tidak ada, atau tanda tangan hasil tempel gambar.</li>
              <li>File tidak terbaca: buram, terpotong, atau melebihi batas ukuran.</li>
              <li>Prodi di ijazah tidak persis sama dengan yang disyaratkan formasi.</li>
            </ol>
          </Callout>
        </div>
      </Bagian>

      {/* ============ FAQ ============ */}
      <Bagian judul="6. Pertanyaan yang paling sering muncul" nomor="06">
        <div className="space-y-3">
          {DAFTAR_FAQ.map((item) => (
            <Faq key={item.q} q={item.q}>
              {item.a}
            </Faq>
          ))}
        </div>
      </Bagian>

      <Card className="mt-10 bg-slate-900 p-8 text-center dark:bg-indigo-950">
        <h2 className="text-2xl font-extrabold text-white">
          Informasi saja tidak cukup — ukur kemampuan Anda sekarang
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-300">
          Kerjakan satu paket try out hari ini juga. Tiga bulan lagi, angka hari
          ini akan jadi pembanding yang membuat Anda tahu apakah cara belajar Anda
          benar-benar bekerja.
        </p>
        <div className="mt-6 flex justify-center">
          <ButtonLink href="/tryout" ukuran="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            Mulai Try Out Gratis
          </ButtonLink>
        </div>
      </Card>
    </div>
  );
}

// =========================================================

function Bagian({
  judul,
  nomor,
  children,
}: {
  judul: string;
  nomor: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white">
          {nomor}
        </span>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {judul}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Tahap({ no, judul, isi }: { no: number; judul: string; isi: string }) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-slate-700">
          {no}
        </span>
        <span className="mt-1 w-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="pb-1">
        <h3 className="font-bold text-slate-900 dark:text-white">{judul}</h3>
        <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {isi}
        </p>
      </div>
    </li>
  );
}

function KartuTips({ judul, isi }: { judul: string; isi: string }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{judul}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {isi}
      </p>
    </Card>
  );
}

function Langkah({
  no,
  judul,
  children,
}: {
  no: string;
  judul: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
      <p className="font-bold text-slate-900 dark:text-white">
        <span className="mr-2 text-indigo-600 dark:text-indigo-400">{no}.</span>
        {judul}
      </p>
      <div className="mt-1.5">{children}</div>
    </li>
  );
}

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
      <summary className="cursor-pointer list-none text-sm font-bold text-slate-900 marker:content-none dark:text-white">
        <span className="flex items-center justify-between gap-3">
          {q}
          <span className="text-indigo-600 transition group-open:rotate-45 dark:text-indigo-400">
            +
          </span>
        </span>
      </summary>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
        {children}
      </p>
    </details>
  );
}

function TautanLuar({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold underline underline-offset-2"
    >
      {children}
    </a>
  );
}
