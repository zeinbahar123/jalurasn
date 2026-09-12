import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket } from "@/data/paket";
import { analisisSubMateri, getSoalPaket } from "@/lib/soal";
import {
  AMBANG_TOTAL,
  ATURAN,
  SKOR_MAKS_TOTAL,
  URUTAN_KATEGORI,
  formatDurasiPanjang,
  type Kategori,
} from "@/lib/skd";
import { Badge, ButtonLink, Card, Callout, Meter, cx } from "@/components/ui";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hasil Try Out SKD",
  robots: { index: false, follow: false },
};

export default async function HalamanHasil({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect(`/masuk?lanjut=/hasil/${id}`);
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id },
    include: {
      answers: {
        select: {
          soalId: true,
          jawaban: true,
          detikDipakai: true,
          raguRagu: true,
          benar: true,
        },
      },
    },
  });

  if (!attempt || attempt.userId !== session.user.id) {
    notFound();
  }

  if (attempt.status === "BERLANGSUNG") {
    redirect(`/ujian/${attempt.id}`);
  }

  const paket = getPaket(attempt.paketId);

  if (!paket) {
    notFound();
  }

  // ============================================================
  // PROTEKSI PREMIUM
  // Paket 1 = Gratis
  // Paket 2–10 = Premium
  // ============================================================
  const paketPremium = paket.nomor > 1;

  if (paketPremium) {
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        subscription: true,
      },
    });

    if (!user || user.subscription !== "PREMIUM") {
      redirect("/upgrade");
    }
  }

  const soal = getSoalPaket(attempt.paketId);

  const petaJawaban: Record<string, string | null> = {};

  for (const a of attempt.answers) {
    petaJawaban[a.soalId] = a.jawaban;
  }

  const analisis = analisisSubMateri(soal, petaJawaban);

  const terlemah = [...analisis]
    .sort((a, b) => a.persen - b.persen)
    .slice(0, 3);

  const terkuat = [...analisis]
    .sort((a, b) => b.persen - a.persen)
    .slice(0, 3);

  const dikosongkan = soal.filter((s) => !petaJawaban[s.id]).length;

  const raguCount = attempt.answers.filter(
    (a) => a.raguRagu,
  ).length;

  // Posisi relatif terhadap peserta lain di paket yang sama
  const [totalPeserta, dibawahAnda, rerata] = await Promise.all([
    prisma.attempt.count({
      where: {
        paketId: paket.id,
        status: "SELESAI",
      },
    }),

    prisma.attempt.count({
      where: {
        paketId: paket.id,
        status: "SELESAI",
        skorTotal: {
          lt: attempt.skorTotal,
        },
      },
    }),

    prisma.attempt.aggregate({
      where: {
        paketId: paket.id,
        status: "SELESAI",
      },
      _avg: {
        skorTotal: true,
      },
    }),
  ]);

  const persentil =
    totalPeserta > 1
      ? Math.round((dibawahAnda / totalPeserta) * 100)
      : null;

  const skorKategori: Record<Kategori, number> = {
    TWK: attempt.skorTWK,
    TIU: attempt.skorTIU,
    TKP: attempt.skorTKP,
  };

  const lulusKategori: Record<Kategori, boolean> = {
    TWK: attempt.lulusTWK,
    TIU: attempt.lulusTIU,
    TKP: attempt.lulusTKP,
  };

  const gagalDi = URUTAN_KATEGORI.filter(
    (k) => !lulusKategori[k],
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link
        href="/riwayat"
        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        ← Riwayat try out
      </Link>

      {/* ---------- Kartu hasil utama ---------- */}
      <Card className="mt-5 overflow-hidden">
        <div
          className={cx(
            "px-6 py-8 text-center sm:px-10",
            attempt.lulusSemua
              ? "bg-gradient-to-br from-emerald-500 to-teal-600"
              : "bg-gradient-to-br from-slate-700 to-slate-900",
          )}
        >
          <p className="text-xs font-bold tracking-widest text-white/70 uppercase">
            {paket.nama}
          </p>

          <p className="mt-4 text-6xl font-extrabold text-white sm:text-7xl">
            {attempt.skorTotal}
          </p>

          <p className="mt-1 text-sm font-medium text-white/70">
            dari {SKOR_MAKS_TOTAL} · ambang batas kumulatif{" "}
            {AMBANG_TOTAL}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white">
            {attempt.lulusSemua ? (
              <>
                <IkonCentang />
                Lolos ambang batas semua komponen
              </>
            ) : (
              <>
                <IkonSilang />
                Belum lolos — {gagalDi.join(" & ")} di bawah ambang
                batas
              </>
            )}
          </div>

          <p className="mt-5 text-sm text-white/70">
            Waktu pengerjaan{" "}
            {formatDurasiPanjang(attempt.durasiDetik)}
            {persentil !== null
              ? ` · lebih tinggi dari ${persentil}% peserta paket ini`
              : ""}
          </p>
        </div>

        {/* Rincian per komponen */}
        <div className="grid gap-px bg-slate-200 sm:grid-cols-3 dark:bg-slate-800">
          {URUTAN_KATEGORI.map((kat) => {
            const a = ATURAN[kat];
            const skor = skorKategori[kat];
            const lulus = lulusKategori[kat];

            return (
              <div
                key={kat}
                className="bg-white p-5 dark:bg-slate-900"
              >
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {a.nama}
                  </p>

                  <Badge
                    className={
                      lulus
                        ? "bg-emerald-500/15 text-emerald-700 ring-emerald-600/25 dark:text-emerald-300"
                        : "bg-rose-500/15 text-rose-700 ring-rose-600/25 dark:text-rose-300"
                    }
                  >
                    {lulus ? "Lolos" : "Belum"}
                  </Badge>
                </div>

                <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
                  {skor}
                  <span className="text-sm font-semibold text-slate-400">
                    {" "}
                    / {a.skorMaks}
                  </span>
                </p>

                <div className="mt-3">
                  <Meter
                    nilai={skor}
                    maks={a.skorMaks}
                    ambang={a.ambangBatas}
                    warna={lulus ? "emerald" : "rose"}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Ambang batas {a.ambangBatas}
                  {kat !== "TKP"
                    ? ` · benar ${
                        kat === "TWK"
                          ? attempt.benarTWK
                          : attempt.benarTIU
                      }/${a.jumlahSoal}`
                    : ` · rata-rata ${(skor / a.jumlahSoal).toFixed(
                        2,
                      )} poin/soal`}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mt-5 flex flex-wrap gap-3">
        <ButtonLink
          href={`/pembahasan/${attempt.id}`}
          ukuran="lg"
        >
          Buka Pembahasan Lengkap
        </ButtonLink>

        <ButtonLink
          href={`/tryout/${paket.slug}`}
          varian="sekunder"
          ukuran="lg"
        >
          Kerjakan Ulang
        </ButtonLink>

        <ButtonLink
          href="/peringkat"
          varian="sekunder"
          ukuran="lg"
        >
          Lihat Peta Persaingan
        </ButtonLink>
      </div>

      {/* ---------- Diagnosis ---------- */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            3 materi yang paling merugikan skor Anda
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Perbaiki ini dulu sebelum menambah paket try out baru.
          </p>

          <ul className="mt-4 space-y-4">
            {terlemah.map((r) => (
              <li key={`${r.kategori}-${r.sub}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <span className="text-slate-400">
                      {r.kategori}
                    </span>{" "}
                    · {r.sub}
                  </p>

                  <p className="shrink-0 text-sm font-bold text-rose-600">
                    {r.persen}%
                  </p>
                </div>

                <div className="mt-1.5">
                  <Meter
                    nilai={r.poin}
                    maks={r.poinMaks}
                    warna="rose"
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {r.benar} dari {r.jumlah} soal terjawab baik
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Yang sudah kuat — pertahankan
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Jangan habiskan waktu belajar di sini lagi.
          </p>

          <ul className="mt-4 space-y-4">
            {terkuat.map((r) => (
              <li key={`${r.kategori}-${r.sub}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <span className="text-slate-400">
                      {r.kategori}
                    </span>{" "}
                    · {r.sub}
                  </p>

                  <p className="shrink-0 text-sm font-bold text-emerald-600">
                    {r.persen}%
                  </p>
                </div>

                <div className="mt-1.5">
                  <Meter
                    nilai={r.poin}
                    maks={r.poinMaks}
                    warna="emerald"
                  />
                </div>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {r.benar} dari {r.jumlah} soal terjawab baik
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* ---------- Tabel lengkap sub-materi ---------- */}
      <Card className="mt-5 overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Rincian per sub-materi
          </h2>

          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Pada TKP, &quot;terjawab baik&quot; berarti Anda memilih
            opsi bernilai 4 atau 5.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs tracking-wider text-slate-500 uppercase dark:bg-slate-800/50">
              <tr>
                <th className="px-5 py-3 font-semibold">
                  Komponen
                </th>
                <th className="px-5 py-3 font-semibold">
                  Sub-materi
                </th>
                <th className="px-5 py-3 text-center font-semibold">
                  Soal
                </th>
                <th className="px-5 py-3 text-center font-semibold">
                  Baik
                </th>
                <th className="px-5 py-3 text-center font-semibold">
                  Poin
                </th>
                <th className="px-5 py-3 font-semibold">
                  Penguasaan
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {analisis.map((r) => (
                <tr key={`${r.kategori}-${r.sub}`}>
                  <td className="px-5 py-3 font-semibold text-slate-500">
                    {r.kategori}
                  </td>

                  <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-100">
                    {r.sub}
                  </td>

                  <td className="px-5 py-3 text-center text-slate-500">
                    {r.jumlah}
                  </td>

                  <td className="px-5 py-3 text-center text-slate-500">
                    {r.benar}
                  </td>

                  <td className="px-5 py-3 text-center text-slate-500">
                    {r.poin}/{r.poinMaks}
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-28">
                        <Meter
                          nilai={r.poin}
                          maks={r.poinMaks}
                          warna={
                            r.persen >= 70
                              ? "emerald"
                              : r.persen >= 50
                                ? "amber"
                                : "rose"
                          }
                        />
                      </div>

                      <span className="w-10 text-right text-xs font-bold text-slate-600 dark:text-slate-300">
                        {r.persen}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ---------- Catatan strategi ---------- */}
      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Soal dikosongkan
          </p>

          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {dikosongkan}
          </p>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {dikosongkan === 0
              ? "Bagus. Tidak ada poin yang hangus percuma."
              : `Potensi hilang sampai ${
                  dikosongkan * 5
                } poin. Di SKD tidak ada nilai minus — selalu tebak.`}
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Ditandai ragu-ragu
          </p>

          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {raguCount}
          </p>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Cek soal-soal ini di pembahasan; keraguan biasanya
            menandakan konsep yang belum utuh, bukan sekadar kurang
            teliti.
          </p>
        </Card>

        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Rerata peserta
          </p>

          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {rerata._avg.skorTotal
              ? Math.round(rerata._avg.skorTotal)
              : "—"}
          </p>

          <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {totalPeserta.toLocaleString("id-ID")} peserta pernah
            mengerjakan paket ini.
          </p>
        </Card>
      </div>

      <div className="mt-6">
        {attempt.lulusSemua ? (
          <Callout nada="sukses" judul="Langkah berikutnya">
            Skor Anda sudah melewati ambang batas, tapi ingat:
            kelulusan CPNS ditentukan{" "}
            <strong>peringkat</strong>, bukan sekadar lolos ambang
            batas. Buka{" "}
            <Link
              href="/peringkat"
              className="font-semibold underline"
            >
              Peta Persaingan
            </Link>{" "}
            untuk melihat posisi Anda di antara pejuang lain yang
            mengincar formasi serupa.
          </Callout>
        ) : (
          <Callout nada="peringatan" judul="Belum lolos — dan itu wajar">
            {gagalDi.length === 1
              ? `Hanya ${gagalDi[0]} yang perlu diperbaiki. Fokuskan latihan Anda ke sana selama 1–2 minggu ke depan, jangan ke semua materi sekaligus.`
              : `Ada ${gagalDi.length} komponen di bawah ambang batas (${gagalDi.join(
                  ", ",
                )}). Kerjakan satu per satu, mulai dari yang selisihnya paling kecil ke ambang batas.`}{" "}
            Buka pembahasan dan diskusikan soal yang membingungkan
            bersama peserta lain.
          </Callout>
        )}
      </div>
    </div>
  );
}

function IkonCentang() {
  return (
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
  );
}

function IkonSilang() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path
        d="M6 6l12 12M18 6L6 18"
        strokeLinecap="round"
      />
    </svg>
  );
}