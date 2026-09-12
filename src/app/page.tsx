import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PAKET, WARNA_TINGKAT } from "@/data/paket";
import {
  ATURAN,
  TOTAL_SOAL,
  SKOR_MAKS_TOTAL,
  URUTAN_KATEGORI,
} from "@/lib/skd";
import { Badge, ButtonLink, Card } from "@/components/ui";

export const revalidate = 300;

async function statistik() {
  try {
    const [pengguna, attempt, diskusi] = await Promise.all([
      prisma.user.count(),
      prisma.attempt.count({ where: { status: "SELESAI" } }),
      prisma.comment.count({ where: { dihapus: false } }),
    ]);

    return { pengguna, attempt, diskusi };
  } catch {
    return { pengguna: 0, attempt: 0, diskusi: 0 };
  }
}

export default async function Beranda() {
  const [session, stat] = await Promise.all([auth(), statistik()]);
  const masuk = !!session?.user;

  return (
    <>
      {/* ================= HERO ================= */}
      <section
        className="relative overflow-hidden border-b border-slate-200 dark:border-slate-800"
        style={{
          backgroundImage: "url('/images/background-tactix.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay tipis — background tetap terlihat tajam */}
        <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-slate-950/45" />

        {/* Efek cahaya dekorasi */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge className="bg-amber-500/10 text-amber-700 ring-amber-600/25 dark:text-amber-300 dark:ring-amber-400/30">
                100% Gratis · Tanpa Iklan · Tanpa Jualan Bimbel
              </Badge>

              <h1 className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                Jangan gugur cuma karena{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  kurang informasi
                </span>
                .
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {TOTAL_SOAL} soal per try out, {PAKET.length} paket lengkap
                dengan pembahasan, penilaian persis aturan CAT BKN, plus peta
                persaingan supaya Anda tahu posisi Anda{" "}
                <em>sebelum</em> pengumuman — bukan sesudahnya.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {masuk ? (
                  <ButtonLink href="/tryout" ukuran="lg">
                    Mulai Try Out Sekarang
                    <PanahKanan />
                  </ButtonLink>
                ) : (
                  <ButtonLink href="/daftar" ukuran="lg">
                    Daftar Gratis &amp; Mulai Try Out
                    <PanahKanan />
                  </ButtonLink>
                )}

                <ButtonLink href="/tryout" varian="sekunder" ukuran="lg">
                  Lihat 10 Paket Try Out
                </ButtonLink>
              </div>

              <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
                <AngkaStat
                  angka={`${PAKET.length * TOTAL_SOAL}+`}
                  label="soal berpembahasan"
                />

                <AngkaStat
                  angka={
                    stat.attempt > 0
                      ? stat.attempt.toLocaleString("id-ID")
                      : "—"
                  }
                  label="try out dikerjakan"
                />

                <AngkaStat
                  angka={
                    stat.pengguna > 0
                      ? stat.pengguna.toLocaleString("id-ID")
                      : "—"
                  }
                  label="pejuang bergabung"
                />
              </dl>
            </div>

            {/* ================= CERITA PENDIRI ================= */}
            <Card className="relative overflow-hidden bg-white/90 p-6 shadow-xl sm:p-8 dark:bg-slate-900/90">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-bl-[3rem] bg-indigo-500/10" />

              <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
                Kenapa situs ini ada
              </p>

              <ol className="mt-5 space-y-5">
                <BarisPerjalanan
                  tahun="2019"
                  instansi="Kementerian Kominfo"
                  hasil="7 besar di SKD, belum lolos"
                  nada="gagal"
                />

                <BarisPerjalanan
                  tahun="2021"
                  instansi="Kejaksaan — Jawa Barat"
                  hasil="Hasil lebih jauh dari target"
                  nada="gagal"
                />

                <BarisPerjalanan
                  tahun="2024"
                  instansi="Diskominfo Pemda Pringsewu"
                  hasil="Alhamdulillah, lolos"
                  nada="lolos"
                />
              </ol>

              <p className="mt-6 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:text-slate-300">
                Lima tahun, tiga kali daftar. Yang bikin lama bukan soal yang
                terlalu sulit — tapi <strong>niat yang belum bulat</strong> dan{" "}
                <strong>informasi yang berserakan</strong>. JalurASN dibangun
                supaya Anda tidak mengulang jalan memutar yang sama.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= FORMAT SKD ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <HeaderSeksi
          kicker="Aturan main"
          judul="Try out-nya mengikuti aturan resmi SKD, bukan kira-kira"
          sub={`Penilaian, jumlah soal, durasi, dan nilai ambang batas disamakan dengan pola CAT BKN. Skor maksimal ${SKOR_MAKS_TOTAL}.`}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {URUTAN_KATEGORI.map((kode) => {
            const a = ATURAN[kode];

            const aksen = {
              TWK: "from-emerald-500 to-teal-500",
              TIU: "from-sky-500 to-indigo-500",
              TKP: "from-amber-500 to-orange-500",
            }[kode];

            return (
              <Card key={kode} className="overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${aksen}`} />

                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {a.nama}
                    </h3>

                    <span className="text-sm font-semibold text-slate-400">
                      {a.jumlahSoal} soal
                    </span>
                  </div>

                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {a.namaPanjang}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {a.deskripsi}
                  </p>

                  <div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60">
                    <div>
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        Ambang batas
                      </p>

                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {a.ambangBatas}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                        Skor maks
                      </p>

                      <p className="text-2xl font-extrabold text-slate-400">
                        {a.skorMaks}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ================= FITUR PEMBEDA ================= */}
      <section className="border-y border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <HeaderSeksi
            kicker="Yang tidak ada di tempat lain"
            judul="Try out itu baru setengah cerita"
            sub="Setengahnya lagi: tahu posisi Anda di antara pesaing, dan punya orang untuk ditanya."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Fitur
              ikon={<IkonPeta />}
              judul="Peta Persaingan Formasi"
              teks="Isi formasi incaran Anda, lihat berapa pejuang lain yang mengincar formasi sama, sebaran skor mereka, dan estimasi peringkat Anda. SSCASN cuma memberi jumlah pelamar — di sini Anda dapat kualitasnya."
              href="/peringkat"
            />

            <Fitur
              ikon={<IkonDiskusi />}
              judul="Ruang Diskusi per Soal"
              teks="Setiap soal punya kolom diskusinya sendiri. Bingung kenapa jawabannya B? Tanya di soal itu juga. Yang sudah paham menjawab, yang sudah lolos ikut mengoreksi."
              href="/tryout"
            />

            <Fitur
              ikon={<IkonRadar />}
              judul="Analisis Kelemahan Otomatis"
              teks="Setelah submit, skor dipecah sampai ke sub-materi: analogi, silogisme, deret angka, pilar negara, integritas. Anda langsung tahu 3 materi yang paling merugikan skor Anda."
              href="/riwayat"
            />

            <Fitur
              ikon={<IkonMentor />}
              judul="Mentor Alumni Seleksi"
              teks="Peserta yang sudah lolos bisa menandai diri sebagai mentor beserta instansi dan tahun lolosnya. Anda bisa bertanya ke orang yang benar-benar pernah melewatinya."
              href="/komunitas/mentor"
            />

            <Fitur
              ikon={<IkonCerita />}
              judul="Cerita Gagal, Bukan Cuma Sukses"
              teks="Ruang khusus untuk cerita yang belum lolos. Karena yang paling melemahkan mental pejuang CPNS adalah merasa dirinya satu-satunya yang gagal."
              href="/komunitas"
            />

            <Fitur
              ikon={<IkonKalender />}
              judul="Linimasa & Info Seleksi"
              teks="Tahapan seleksi, dokumen yang disiapkan, cara baca formasi, sampai kesalahan administratif yang paling sering menggugurkan pelamar — dirangkum di satu halaman."
              href="/info"
            />
          </div>
        </div>
      </section>

      {/* ================= DAFTAR PAKET ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <HeaderSeksi
          kicker={`${PAKET.length} paket try out`}
          judul="Bukan 10 paket acak — ini urutan latihan yang punya alur"
          sub="Dari pemetaan awal, perbaikan per materi, sampai simulasi penuh dan paket prediksi. Kerjakan berurutan untuk hasil terbaik."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PAKET.map((p) => (
            <Link key={p.id} href={`/tryout/${p.slug}`} className="group">
              <Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-indigo-300 group-hover:shadow-md dark:group-hover:border-indigo-700">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-extrabold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {String(p.nomor).padStart(2, "0")}
                  </span>

                  <Badge className={WARNA_TINGKAT[p.tingkat]}>
                    {p.tingkat}
                  </Badge>
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-300">
                  {p.nama}
                </h3>

                <p className="mt-1.5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {p.tema}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.fokus.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= AJAKAN ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center sm:px-12 dark:bg-indigo-950">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-indigo-500/25 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Yang membedakan lolos dan tidak sering cuma satu: mulai lebih awal.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Cukup daftar dengan email dan kata sandi, lalu seluruh riwayat
              pengerjaan, pembahasan, serta analisis kelemahan Anda tersimpan
              otomatis. Tidak ada biaya, tidak ada versi premium.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {masuk ? (
                <ButtonLink
                  href="/tryout"
                  ukuran="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100"
                >
                  Buka Daftar Try Out
                  <PanahKanan />
                </ButtonLink>
              ) : (
                <>
                  <ButtonLink
                    href="/daftar"
                    ukuran="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100"
                  >
                    Daftar Gratis
                    <PanahKanan />
                  </ButtonLink>

                  <ButtonLink
                    href="/masuk"
                    ukuran="lg"
                    className="border border-white/30 bg-transparent text-white hover:bg-white/10"
                  >
                    Sudah punya akun
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// =========================================================
// Komponen kecil
// =========================================================

function HeaderSeksi({
  kicker,
  judul,
  sub,
}: {
  kicker: string;
  judul: string;
  sub: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-bold tracking-widest text-indigo-600 uppercase dark:text-indigo-400">
        {kicker}
      </p>

      <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        {judul}
      </h2>

      <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
        {sub}
      </p>
    </div>
  );
}

function AngkaStat({
  angka,
  label,
}: {
  angka: string;
  label: string;
}) {
  return (
    <div>
      <dt className="text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
        {angka}
      </dt>

      <dd className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
        {label}
      </dd>
    </div>
  );
}

function BarisPerjalanan({
  tahun,
  instansi,
  hasil,
  nada,
}: {
  tahun: string;
  instansi: string;
  hasil: string;
  nada: "gagal" | "lolos";
}) {
  return (
    <li className="flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={
            nada === "lolos"
              ? "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white"
              : "flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
          }
        >
          {nada === "lolos" ? (
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className="text-xs font-bold">·</span>
          )}
        </span>
      </div>

      <div className="-mt-0.5">
        <p className="text-sm font-bold text-slate-900 dark:text-white">
          {tahun} · {instansi}
        </p>

        <p
          className={
            nada === "lolos"
              ? "text-sm font-medium text-emerald-600 dark:text-emerald-400"
              : "text-sm text-slate-500 dark:text-slate-400"
          }
        >
          {hasil}
        </p>
      </div>
    </li>
  );
}

function Fitur({
  ikon,
  judul,
  teks,
  href,
}: {
  ikon: React.ReactNode;
  judul: string;
  teks: string;
  href: string;
}) {
  return (
    <Link href={href} className="group">
      <Card className="h-full border-slate-200 p-6 transition group-hover:-translate-y-0.5 group-hover:border-indigo-300 group-hover:shadow-md dark:group-hover:border-indigo-700">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
          {ikon}
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
          {judul}
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {teks}
        </p>
      </Card>
    </Link>
  );
}

function PanahKanan() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const svgProps = {
  className: "h-6 w-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IkonPeta() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4z" />
      <path d="M9 4v13M15 6.5v13" />
    </svg>
  );
}

function IkonDiskusi() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path d="M20 12a7 7 0 0 1-7 7H8l-4 3v-5.5A7 7 0 0 1 8 5h5a7 7 0 0 1 7 7z" />
      <path d="M9 11h6M9 14h4" />
    </svg>
  );
}

function IkonRadar() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 18 7" />
    </svg>
  );
}

function IkonMentor() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M17 8.5 18.4 11l2.6.4-1.9 1.9.5 2.7-2.6-1.4-2.6 1.4.5-2.7" />
    </svg>
  );
}

function IkonCerita() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <path d="M5 4h9l5 5v11H5z" />
      <path d="M14 4v5h5M8 13h8M8 16.5h5" />
    </svg>
  );
}

function IkonKalender() {
  return (
    <svg viewBox="0 0 24 24" {...svgProps}>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3M8 14h3" />
    </svg>
  );
}
