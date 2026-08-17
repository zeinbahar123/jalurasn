import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket, PAKET } from "@/data/paket";
import { analisisSubMateri, getSoalPaket } from "@/lib/soal";
import {
  AMBANG_TOTAL,
  ATURAN,
  SKOR_MAKS_TOTAL,
  URUTAN_KATEGORI,
  formatDurasiPanjang,
} from "@/lib/skd";
import { Badge, ButtonLink, Card, KotakKosong, Meter, cx } from "@/components/ui";

export const metadata: Metadata = {
  title: "Riwayat & Analisis",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function Riwayat() {
  const session = await auth();
  if (!session?.user?.id) redirect("/masuk?lanjut=/riwayat");
  const userId = session.user.id;

  const attempts = await prisma.attempt.findMany({
    where: { userId },
    orderBy: { mulaiPada: "desc" },
    select: {
      id: true,
      paketId: true,
      status: true,
      mulaiPada: true,
      selesaiPada: true,
      durasiDetik: true,
      skorTotal: true,
      skorTWK: true,
      skorTIU: true,
      skorTKP: true,
      benarTWK: true,
      benarTIU: true,
      lulusTWK: true,
      lulusTIU: true,
      lulusTKP: true,
      lulusSemua: true,
      answers: { select: { soalId: true, jawaban: true } },
    },
  });

  const selesai = attempts.filter((a) => a.status !== "BERLANGSUNG");
  const berjalan = attempts.filter((a) => a.status === "BERLANGSUNG");

  if (attempts.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Riwayat &amp; Analisis
        </h1>
        <div className="mt-8">
          <KotakKosong
            judul="Belum ada try out yang dikerjakan"
            pesan="Mulai dari Paket 1 — kerjakan apa adanya tanpa belajar dulu, supaya Anda punya titik awal yang jujur untuk diukur nanti."
            aksi={<ButtonLink href="/tryout">Lihat daftar try out</ButtonLink>}
          />
        </div>
      </div>
    );
  }

  // ---------- Analisis gabungan seluruh try out ----------
  const rekap = new Map<
    string,
    { kategori: string; sub: string; poin: number; poinMaks: number; jumlah: number }
  >();

  for (const a of selesai) {
    const soal = getSoalPaket(a.paketId);
    if (soal.length === 0) continue;
    const peta: Record<string, string | null> = {};
    for (const ans of a.answers) peta[ans.soalId] = ans.jawaban;
    for (const baris of analisisSubMateri(soal, peta)) {
      const key = `${baris.kategori}|${baris.sub}`;
      const kini = rekap.get(key) ?? {
        kategori: baris.kategori,
        sub: baris.sub,
        poin: 0,
        poinMaks: 0,
        jumlah: 0,
      };
      kini.poin += baris.poin;
      kini.poinMaks += baris.poinMaks;
      kini.jumlah += baris.jumlah;
      rekap.set(key, kini);
    }
  }

  const daftarRekap = [...rekap.values()]
    .map((r) => ({ ...r, persen: r.poinMaks ? Math.round((r.poin / r.poinMaks) * 100) : 0 }))
    .sort((a, b) => a.persen - b.persen);

  const terlemah = daftarRekap.slice(0, 5);

  const skorTertinggi = selesai.reduce((m, a) => Math.max(m, a.skorTotal), 0);
  const rerataSkor = selesai.length
    ? Math.round(selesai.reduce((s, a) => s + a.skorTotal, 0) / selesai.length)
    : 0;
  const jumlahLulus = selesai.filter((a) => a.lulusSemua).length;

  // Tren: 6 pengerjaan terakhir (urut lama → baru)
  const tren = [...selesai].reverse().slice(-8);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Riwayat &amp; Analisis
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Semua data di halaman ini dihitung dari {selesai.length} try out yang
        sudah Anda selesaikan.
      </p>

      {berjalan.length > 0 ? (
        <Card className="mt-6 border-amber-300 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
          <h2 className="text-sm font-bold text-amber-900 dark:text-amber-200">
            Ada {berjalan.length} sesi yang belum diselesaikan
          </h2>
          <ul className="mt-3 space-y-2">
            {berjalan.map((b) => {
              const p = getPaket(b.paketId);
              return (
                <li key={b.id} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-amber-900 dark:text-amber-200">
                    {p?.nama ?? b.paketId} — dimulai{" "}
                    {b.mulaiPada.toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <ButtonLink href={`/ujian/${b.id}`} ukuran="sm" varian="sekunder">
                    Lanjutkan
                  </ButtonLink>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}

      {/* ---------- Ringkasan ---------- */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Skor tertinggi
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {skorTertinggi}
          </p>
          <div className="mt-3">
            <Meter nilai={skorTertinggi} maks={SKOR_MAKS_TOTAL} ambang={AMBANG_TOTAL} />
          </div>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Rerata skor
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {rerataSkor}
          </p>
          <p className="mt-2 text-xs text-slate-500">dari {SKOR_MAKS_TOTAL}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Lolos ambang batas
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {jumlahLulus}
            <span className="text-base font-semibold text-slate-400">
              {" "}
              / {selesai.length}
            </span>
          </p>
          <p className="mt-2 text-xs text-slate-500">try out</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Paket dikuasai
          </p>
          <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
            {new Set(selesai.map((a) => a.paketId)).size}
            <span className="text-base font-semibold text-slate-400">
              {" "}
              / {PAKET.length}
            </span>
          </p>
          <p className="mt-2 text-xs text-slate-500">paket berbeda</p>
        </Card>
      </div>

      {/* ---------- Grafik tren ---------- */}
      {tren.length >= 2 ? (
        <Card className="mt-6 p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Tren skor Anda
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Garis putus-putus adalah ambang batas kumulatif ({AMBANG_TOTAL}).
            Yang penting bukan satu skor tinggi, tapi arah garisnya.
          </p>
          <GrafikTren
            data={tren.map((t) => ({
              label: getPaket(t.paketId)?.nomor.toString() ?? "?",
              nilai: t.skorTotal,
            }))}
          />
        </Card>
      ) : null}

      {/* ---------- Materi terlemah ---------- */}
      {terlemah.length > 0 ? (
        <Card className="mt-6 p-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            5 sub-materi terlemah Anda (gabungan semua try out)
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Inilah daftar belajar Anda. Kerjakan dari atas, jangan dari materi
            yang paling Anda sukai.
          </p>
          <ol className="mt-5 space-y-4">
            {terlemah.map((r, i) => (
              <li key={`${r.kategori}-${r.sub}`} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-sm font-extrabold text-rose-700 dark:bg-rose-500/20 dark:text-rose-300">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      <span className="text-slate-400">{r.kategori}</span> · {r.sub}
                    </p>
                    <p className="shrink-0 text-sm font-bold text-slate-700 dark:text-slate-200">
                      {r.persen}%
                    </p>
                  </div>
                  <div className="mt-1.5">
                    <Meter
                      nilai={r.poin}
                      maks={r.poinMaks}
                      warna={r.persen >= 70 ? "emerald" : r.persen >= 50 ? "amber" : "rose"}
                    />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Total {r.jumlah} soal pernah Anda kerjakan di materi ini
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      ) : null}

      {/* ---------- Daftar riwayat ---------- */}
      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Semua pengerjaan
          </h2>
        </div>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {selesai.map((a) => {
            const p = getPaket(a.paketId);
            return (
              <li key={a.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {p?.nama ?? a.paketId}
                      </p>
                      <Badge
                        className={
                          a.lulusSemua
                            ? "bg-emerald-500/15 text-emerald-700 ring-emerald-600/25 dark:text-emerald-300"
                            : "bg-rose-500/15 text-rose-700 ring-rose-600/25 dark:text-rose-300"
                        }
                      >
                        {a.lulusSemua ? "Lolos ambang batas" : "Belum lolos"}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {a.selesaiPada
                        ? a.selesaiPada.toLocaleString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}{" "}
                      · {formatDurasiPanjang(a.durasiDetik)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {URUTAN_KATEGORI.map((kat) => {
                        const nilai =
                          kat === "TWK" ? a.skorTWK : kat === "TIU" ? a.skorTIU : a.skorTKP;
                        const lulus =
                          kat === "TWK" ? a.lulusTWK : kat === "TIU" ? a.lulusTIU : a.lulusTKP;
                        return (
                          <span
                            key={kat}
                            className={cx(
                              "rounded-lg px-2.5 py-1 text-xs font-bold",
                              lulus
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
                            )}
                          >
                            {kat} {nilai}
                            <span className="font-normal opacity-70">
                              /{ATURAN[kat].ambangBatas}
                            </span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        {a.skorTotal}
                      </p>
                      <p className="text-[11px] text-slate-400">/ {SKOR_MAKS_TOTAL}</p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Link
                        href={`/hasil/${a.id}`}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200"
                      >
                        Hasil
                      </Link>
                      <Link
                        href={`/pembahasan/${a.id}`}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-indigo-500"
                      >
                        Pembahasan
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

function GrafikTren({ data }: { data: { label: string; nilai: number }[] }) {
  const W = 640;
  const H = 200;
  const padX = 34;
  const padY = 20;
  const maks = SKOR_MAKS_TOTAL;

  const x = (i: number) =>
    data.length === 1
      ? W / 2
      : padX + (i * (W - padX * 2)) / (data.length - 1);
  const y = (v: number) => H - padY - (v / maks) * (H - padY * 2);

  const garis = data.map((d, i) => `${i === 0 ? "M" : "L"} ${x(i)} ${y(d.nilai)}`).join(" ");
  const area = `${garis} L ${x(data.length - 1)} ${H - padY} L ${x(0)} ${H - padY} Z`;

  return (
    <div className="mt-5 overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-52 w-full min-w-[420px]">
        <defs>
          <linearGradient id="isiTren" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* garis ambang batas */}
        <line
          x1={padX}
          x2={W - padX}
          y1={y(AMBANG_TOTAL)}
          y2={y(AMBANG_TOTAL)}
          stroke="currentColor"
          className="text-rose-400"
          strokeWidth="1.5"
          strokeDasharray="5 5"
        />
        <text
          x={W - padX}
          y={y(AMBANG_TOTAL) - 6}
          textAnchor="end"
          className="fill-rose-500 text-[10px] font-semibold"
        >
          ambang {AMBANG_TOTAL}
        </text>

        <path d={area} fill="url(#isiTren)" />
        <path
          d={garis}
          fill="none"
          stroke="rgb(79 70 229)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((d, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(d.nilai)} r="4.5" fill="rgb(79 70 229)" />
            <text
              x={x(i)}
              y={y(d.nilai) - 11}
              textAnchor="middle"
              className="fill-slate-600 text-[10px] font-bold dark:fill-slate-300"
            >
              {d.nilai}
            </text>
            <text
              x={x(i)}
              y={H - 4}
              textAnchor="middle"
              className="fill-slate-400 text-[10px]"
            >
              TO{d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
