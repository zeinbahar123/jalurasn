import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PAKET, WARNA_TINGKAT } from "@/data/paket";
import { getSoalPaket } from "@/lib/soal";
import { AMBANG_TOTAL, SKOR_MAKS_TOTAL, TOTAL_SOAL, formatDurasiPanjang } from "@/lib/skd";
import { Badge, Card, ButtonLink, Callout, Meter } from "@/components/ui";
import { urlAbsolut, OG_GAMBAR } from "@/lib/situs";

export const metadata: Metadata = {
  title: "10 Paket Try Out SKD CPNS 2026 Gratis — 1.100 Soal Berpembahasan",
  description:
    "Kerjakan 10 paket try out SKD CPNS 2026 gratis: 110 soal per paket (TWK 30, TIU 35, TKP 45), durasi 100 menit, penilaian sesuai nilai ambang batas resmi, pembahasan tiap soal, dan analisis kelemahan otomatis.",
  keywords: [
    "try out SKD CPNS 2026 gratis",
    "simulasi CAT BKN",
    "latihan soal TWK TIU TKP",
    "try out CPNS online",
  ],
  alternates: { canonical: "/tryout" },
  openGraph: {
    url: urlAbsolut("/tryout"),
    title: "10 Paket Try Out SKD CPNS 2026 Gratis — 1.100 Soal Berpembahasan",
    description:
      "110 soal per paket, durasi 100 menit, penilaian sesuai ambang batas resmi, pembahasan lengkap. Gratis tanpa versi premium.",
    images: [...OG_GAMBAR],
  },
};

export const dynamic = "force-dynamic";

export default async function DaftarTryOut() {
  const session = await auth();
  const userId = session?.user?.id;

  let attempts: {
    paketId: string;
    status: string;
    skorTotal: number;
    lulusSemua: boolean;
    id: string;
    durasiDetik: number;
  }[] = [];

  if (userId) {
    attempts = await prisma.attempt.findMany({
      where: { userId },
      select: {
        id: true,
        paketId: true,
        status: true,
        skorTotal: true,
        lulusSemua: true,
        durasiDetik: true,
      },
      orderBy: { mulaiPada: "desc" },
    });
  }

  const perPaket = new Map<
    string,
    { terbaik: number; jumlah: number; lulus: boolean; berjalan?: string; durasiTerbaik: number }
  >();

  for (const a of attempts) {
    const kini = perPaket.get(a.paketId) ?? {
      terbaik: -1,
      jumlah: 0,
      lulus: false,
      durasiTerbaik: 0,
    };
    if (a.status === "BERLANGSUNG") {
      kini.berjalan = kini.berjalan ?? a.id;
    } else {
      kini.jumlah += 1;
      if (a.skorTotal > kini.terbaik) {
        kini.terbaik = a.skorTotal;
        kini.durasiTerbaik = a.durasiDetik;
      }
      if (a.lulusSemua) kini.lulus = true;
    }
    perPaket.set(a.paketId, kini);
  }

  const totalSelesai = attempts.filter((a) => a.status !== "BERLANGSUNG").length;
  const skorTertinggi = attempts.reduce((m, a) => Math.max(m, a.skorTotal), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-3xl">
        <Badge className="bg-indigo-500/10 text-indigo-700 ring-indigo-600/20 dark:text-indigo-300 dark:ring-indigo-400/30">
          Gratis · {PAKET.length} paket · {PAKET.length * TOTAL_SOAL} soal
        </Badge>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Try Out SKD CPNS 2026
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          Setiap paket berisi {TOTAL_SOAL} soal dengan durasi 100 menit dan
          penilaian yang sama persis dengan aturan CAT: TWK dan TIU bernilai 5
          per jawaban benar, TKP berbobot 1–5 di setiap opsi. Anda dinyatakan
          lulus bila <strong>ketiga</strong> nilai melewati ambang batasnya
          masing-masing — total {AMBANG_TOTAL} dari {SKOR_MAKS_TOTAL} belum tentu
          cukup kalau salah satu komponen jeblok.
        </p>
      </div>

      {!userId ? (
        <Card className="mt-8 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Masuk dulu supaya hasilnya tersimpan
            </h2>
            <p className="mt-1 max-w-xl text-sm text-slate-600 dark:text-slate-300">
              Dengan akun gratis, riwayat pengerjaan, pembahasan, dan analisis
              kelemahan Anda tersimpan permanen dan bisa dibuka dari perangkat
              mana pun. Cukup nama, email, dan kata sandi.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <ButtonLink href="/masuk?lanjut=%2Ftryout" varian="sekunder">
              Masuk
            </ButtonLink>
            <ButtonLink href="/daftar?lanjut=%2Ftryout">Daftar Gratis</ButtonLink>
          </div>
        </Card>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Try out selesai
            </p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              {totalSelesai}
              <span className="text-base font-semibold text-slate-400">
                {" "}
                / {PAKET.length}
              </span>
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Skor tertinggi
            </p>
            <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              {skorTertinggi || "—"}
              <span className="text-base font-semibold text-slate-400">
                {" "}
                / {SKOR_MAKS_TOTAL}
              </span>
            </p>
            <div className="mt-3">
              <Meter nilai={skorTertinggi} maks={SKOR_MAKS_TOTAL} ambang={AMBANG_TOTAL} />
            </div>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Langkah berikutnya
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {totalSelesai === 0
                ? "Kerjakan Paket 1 tanpa belajar dulu — supaya tahu titik start yang jujur."
                : totalSelesai < PAKET.length
                  ? "Lanjutkan ke paket berikutnya, lalu buka Riwayat untuk melihat materi terlemah Anda."
                  : "Semua paket selesai. Ulangi paket dengan skor terendah dan bandingkan hasilnya."}
            </p>
            <ButtonLink href="/riwayat" varian="halus" ukuran="sm" className="mt-3">
              Lihat analisis saya
            </ButtonLink>
          </Card>
        </div>
      )}

      <div className="mt-10 space-y-4">
        {PAKET.map((p) => {
          const info = perPaket.get(p.id);
          const soal = getSoalPaket(p.id);
          const sudahPernah = (info?.jumlah ?? 0) > 0;

          return (
            <Card key={p.id} className="overflow-hidden">
              <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-extrabold text-white dark:bg-indigo-600">
                      {String(p.nomor).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {p.nama}
                    </h2>
                    <Badge className={WARNA_TINGKAT[p.tingkat]}>{p.tingkat}</Badge>
                    {info?.berjalan ? (
                      <Badge className="bg-amber-500/15 text-amber-700 ring-amber-600/25 dark:text-amber-300">
                        Sesi tertunda
                      </Badge>
                    ) : null}
                    {info?.lulus ? (
                      <Badge className="bg-emerald-500/15 text-emerald-700 ring-emerald-600/25 dark:text-emerald-300">
                        Pernah lolos ambang batas
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {p.deskripsi}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">{soal.length} soal</span>
                    <span>{p.durasiMenit} menit</span>
                    <span>TWK 30 · TIU 35 · TKP 45</span>
                    {sudahPernah ? (
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        Skor terbaik Anda: {info!.terbaik} · {formatDurasiPanjang(info!.durasiTerbaik)}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.fokus.map((f) => (
                      <span
                        key={f}
                        className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2 lg:w-56">
                  <ButtonLink href={`/tryout/${p.slug}`} className="w-full">
                    {info?.berjalan ? "Lanjutkan" : sudahPernah ? "Kerjakan ulang" : "Buka paket"}
                  </ButtonLink>
                  {sudahPernah ? (
                    <Link
                      href="/riwayat"
                      className="text-center text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
                    >
                      Lihat riwayat &amp; pembahasan
                    </Link>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-10">
        <Callout nada="peringatan" judul="Soal ini latihan, bukan bocoran">
          Semua soal disusun mandiri berdasarkan kisi-kisi SKD yang terbuka untuk
          umum. Tidak ada satu pun soal resmi BKN di sini — siapa pun yang
          menjanjikan bocoran soal CPNS patut Anda curigai.
        </Callout>
      </div>
    </div>
  );
}
