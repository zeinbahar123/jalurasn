import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPaket, WARNA_TINGKAT } from "@/data/paket";
import { statistikPaket } from "@/lib/soal";
import { ATURAN, SKOR_MAKS_TOTAL, URUTAN_KATEGORI, formatDurasiPanjang } from "@/lib/skd";
import { Badge, Card, Callout, ButtonLink } from "@/components/ui";
import { urlAbsolut, OG_GAMBAR } from "@/lib/situs";
import { TombolMulai } from "@/components/tombol-mulai";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paket = getPaket(slug);
  if (!paket) return { title: "Paket tidak ditemukan" };

  const judul = `${paket.nama} — Try Out SKD CPNS 2026 Gratis`;
  const ringkas = `${paket.tema}. 110 soal (TWK 30, TIU 35, TKP 45), 100 menit, lengkap dengan pembahasan tiap soal. Gratis.`;

  return {
    title: judul,
    description: ringkas,
    keywords: [...paket.fokus, "try out SKD CPNS 2026", "latihan soal CPNS gratis"],
    alternates: { canonical: `/tryout/${paket.slug}` },
    openGraph: {
      type: "article",
      url: urlAbsolut(`/tryout/${paket.slug}`),
      title: judul,
      description: ringkas,
      images: [...OG_GAMBAR],
    },
  };
}

export default async function DetailPaket({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paket = getPaket(slug);
  if (!paket) notFound();

  const session = await auth();
  const userId = session?.user?.id;
  const stat = statistikPaket(paket.id);

  const riwayat = userId
    ? await prisma.attempt.findMany({
        where: { userId, paketId: paket.id },
        orderBy: { mulaiPada: "desc" },
        take: 5,
        select: {
          id: true,
          status: true,
          skorTotal: true,
          skorTWK: true,
          skorTIU: true,
          skorTKP: true,
          lulusSemua: true,
          durasiDetik: true,
          selesaiPada: true,
        },
      })
    : [];

  const sesiBerjalan = riwayat.find((r) => r.status === "BERLANGSUNG");
  const selesai = riwayat.filter((r) => r.status !== "BERLANGSUNG");

  const [pesertaLain, rerata] = await Promise.all([
    prisma.attempt
      .count({ where: { paketId: paket.id, status: "SELESAI" } })
      .catch(() => 0),
    prisma.attempt
      .aggregate({
        where: { paketId: paket.id, status: "SELESAI" },
        _avg: { skorTotal: true },
      })
      .catch(() => ({ _avg: { skorTotal: null } })),
  ]);

  // Remah roti (breadcrumb) untuk mesin pencari — membantu Google menampilkan
  // jalur navigasi di bawah judul hasil pencarian.
  const remah = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: urlAbsolut("/") },
      { "@type": "ListItem", position: 2, name: "Try Out SKD", item: urlAbsolut("/tryout") },
      {
        "@type": "ListItem",
        position: 3,
        name: paket.nama,
        item: urlAbsolut(`/tryout/${paket.slug}`),
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(remah) }}
      />
      <Link
        href="/tryout"
        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        ← Semua paket try out
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 font-extrabold text-white dark:bg-indigo-600">
              {String(paket.nomor).padStart(2, "0")}
            </span>
            <Badge className={WARNA_TINGKAT[paket.tingkat]}>{paket.tingkat}</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {paket.nama}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-500 dark:text-slate-400">
            {paket.tema}
          </p>
          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300">
            {paket.deskripsi}
          </p>

          <Callout nada="info" judul="Saran pemakaian">
            {paket.saran}
          </Callout>

          {/* Komposisi soal */}
          <Card className="mt-8">
            <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Komposisi &amp; sub-materi dalam paket ini
              </h2>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {stat.total} soal · {paket.durasiMenit} menit · skor maksimal{" "}
                {SKOR_MAKS_TOTAL}
              </p>
            </div>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {URUTAN_KATEGORI.map((kat) => {
                const a = ATURAN[kat];
                return (
                  <div key={kat} className="px-5 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-bold text-slate-900 dark:text-white">
                        {a.nama}{" "}
                        <span className="font-normal text-slate-500">
                          — {a.namaPanjang}
                        </span>
                      </p>
                      <p className="text-sm font-semibold text-slate-500">
                        {stat.perKategori[kat]} soal · maks {a.skorMaks} · ambang{" "}
                        {a.ambangBatas}
                      </p>
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {stat.subKategori[kat].map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Aturan */}
          <Card className="mt-6 p-5">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Yang perlu Anda tahu sebelum mulai
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <li className="flex gap-2.5">
                <Centang />
                Timer berjalan di server. Menutup tab tidak menghentikan waktu —
                sama seperti CAT sungguhan.
              </li>
              <li className="flex gap-2.5">
                <Centang />
                Jawaban tersimpan otomatis setiap beberapa detik dan dicadangkan
                di perangkat Anda, jadi aman jika koneksi terputus sesaat.
              </li>
              <li className="flex gap-2.5">
                <Centang />
                Soal yang dikosongkan bernilai 0 pada ketiga komponen. Menebak
                selalu lebih menguntungkan daripada mengosongkan.
              </li>
              <li className="flex gap-2.5">
                <Centang />
                Pada TKP tidak ada jawaban salah — setiap opsi bernilai 1 sampai
                5. Yang dinilai adalah tingkat kematangan sikap Anda.
              </li>
              <li className="flex gap-2.5">
                <Centang />
                Pembahasan lengkap terbuka segera setelah Anda submit, bukan
                setelah menunggu atau membayar.
              </li>
            </ul>
          </Card>
        </div>

        {/* Panel aksi */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-6">
            {userId ? (
              <>
                {sesiBerjalan ? (
                  <div className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                    Anda punya sesi yang belum diselesaikan pada paket ini.
                    Waktunya tetap berjalan sejak awal dimulai.
                  </div>
                ) : null}
                <TombolMulai
                  paketId={paket.id}
                  adaSesiBerjalan={!!sesiBerjalan}
                  sudahPernah={selesai.length > 0}
                />
              </>
            ) : (
              <>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Masuk untuk mulai
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-300">
                  Buat akun gratis dengan email dan kata sandi. Hasil serta
                  pembahasan Anda tersimpan otomatis.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <ButtonLink
                    href={`/daftar?lanjut=${encodeURIComponent(`/tryout/${paket.slug}`)}`}
                    className="w-full"
                  >
                    Daftar Gratis
                  </ButtonLink>
                  <ButtonLink
                    href={`/masuk?lanjut=${encodeURIComponent(`/tryout/${paket.slug}`)}`}
                    varian="sekunder"
                    className="w-full"
                  >
                    Sudah punya akun
                  </ButtonLink>
                </div>
              </>
            )}

            <dl className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm dark:border-slate-800">
              <BarisInfo label="Jumlah soal" nilai={`${stat.total} soal`} />
              <BarisInfo label="Durasi" nilai={`${paket.durasiMenit} menit`} />
              <BarisInfo label="Skor maksimal" nilai={String(SKOR_MAKS_TOTAL)} />
              <BarisInfo
                label="Ambang batas"
                nilai={`${ATURAN.TWK.ambangBatas} / ${ATURAN.TIU.ambangBatas} / ${ATURAN.TKP.ambangBatas}`}
              />
              <BarisInfo
                label="Sudah dikerjakan"
                nilai={`${pesertaLain.toLocaleString("id-ID")} kali`}
              />
              {rerata._avg.skorTotal ? (
                <BarisInfo
                  label="Rerata skor peserta"
                  nilai={Math.round(rerata._avg.skorTotal).toString()}
                />
              ) : null}
            </dl>
          </Card>

          {selesai.length > 0 ? (
            <Card className="mt-5">
              <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Riwayat Anda di paket ini
                </h2>
              </div>
              <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                {selesai.map((r) => (
                  <li key={r.id} className="px-5 py-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {r.skorTotal}
                          <span className="font-normal text-slate-400">
                            {" "}
                            / {SKOR_MAKS_TOTAL}
                          </span>{" "}
                          {r.lulusSemua ? (
                            <span className="ml-1 text-xs font-semibold text-emerald-600">
                              lolos
                            </span>
                          ) : (
                            <span className="ml-1 text-xs font-semibold text-rose-500">
                              belum lolos
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {r.skorTWK}/{r.skorTIU}/{r.skorTKP} ·{" "}
                          {formatDurasiPanjang(r.durasiDetik)}
                          {r.selesaiPada
                            ? ` · ${r.selesaiPada.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`
                            : ""}
                        </p>
                      </div>
                      <ButtonLink
                        href={`/pembahasan/${r.id}`}
                        varian="halus"
                        ukuran="sm"
                      >
                        Pembahasan
                      </ButtonLink>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function BarisInfo({ label, nilai }: { label: string; nilai: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
      <dd className="text-right font-semibold text-slate-900 dark:text-white">
        {nilai}
      </dd>
    </div>
  );
}

function Centang() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-1 h-4 w-4 shrink-0 text-emerald-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
