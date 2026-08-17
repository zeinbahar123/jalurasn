import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PAKET, getPaket } from "@/data/paket";
import { AMBANG_TOTAL, SKOR_MAKS_TOTAL } from "@/lib/skd";
import { Badge, ButtonLink, Card, Callout, KotakKosong, Meter, cx } from "@/components/ui";
import { Avatar } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Peta Persaingan & Peringkat",
  description:
    "Lihat posisi skor SKD Anda dibanding pejuang CPNS 2026 lain, dan pantau seberapa ramai formasi yang Anda incar.",
  alternates: { canonical: "/peringkat" },
};

export const dynamic = "force-dynamic";

interface Peserta {
  userId: string;
  nama: string;
  foto: string | null;
  skor: number;
  instansi: string | null;
  formasi: string | null;
  tampil: boolean;
}

export default async function Peringkat({
  searchParams,
}: {
  searchParams: Promise<{ paket?: string }>;
}) {
  const sp = await searchParams;
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const paketDipilih = sp.paket ? getPaket(sp.paket) : undefined;

  // Skor terbaik tiap peserta (global atau per paket)
  const terbaik = await prisma.attempt.groupBy({
    by: ["userId"],
    where: {
      status: "SELESAI",
      ...(paketDipilih ? { paketId: paketDipilih.id } : {}),
    },
    _max: { skorTotal: true },
    _count: { _all: true },
  });

  const idPeserta = terbaik.map((t) => t.userId);
  const users =
    idPeserta.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: idPeserta } },
          select: {
            id: true,
            name: true,
            namaTampilan: true,
            image: true,
            targetInstansi: true,
            targetFormasi: true,
            tampilDiPeringkat: true,
          },
        })
      : [];

  const petaUser = new Map(users.map((u) => [u.id, u]));

  const peserta: Peserta[] = terbaik
    .map((t) => {
      const u = petaUser.get(t.userId);
      return {
        userId: t.userId,
        nama: u?.namaTampilan || u?.name || "Pejuang CPNS",
        foto: u?.image ?? null,
        skor: t._max.skorTotal ?? 0,
        instansi: u?.targetInstansi ?? null,
        formasi: u?.targetFormasi ?? null,
        tampil: u?.tampilDiPeringkat ?? true,
      };
    })
    .sort((a, b) => b.skor - a.skor);

  const posisiSaya = userId ? peserta.findIndex((p) => p.userId === userId) : -1;
  const saya = posisiSaya >= 0 ? peserta[posisiSaya] : null;

  // ---------- Peta persaingan per formasi ----------
  const petaFormasi = new Map<
    string,
    { instansi: string; formasi: string; jumlah: number; skor: number[] }
  >();

  for (const p of peserta) {
    if (!p.instansi || !p.formasi) continue;
    const key = `${p.instansi}||${p.formasi}`;
    const kini =
      petaFormasi.get(key) ??
      { instansi: p.instansi, formasi: p.formasi, jumlah: 0, skor: [] as number[] };
    kini.jumlah += 1;
    kini.skor.push(p.skor);
    petaFormasi.set(key, kini);
  }

  const daftarFormasi = [...petaFormasi.values()]
    .map((f) => {
      const urut = [...f.skor].sort((a, b) => b - a);
      const rerata = Math.round(urut.reduce((s, v) => s + v, 0) / urut.length);
      return {
        ...f,
        rerata,
        tertinggi: urut[0] ?? 0,
        lolosAmbang: f.skor.filter((s) => s >= AMBANG_TOTAL).length,
      };
    })
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 12);

  // Persaingan di formasi saya
  const formasiSaya =
    saya?.instansi && saya?.formasi
      ? petaFormasi.get(`${saya.instansi}||${saya.formasi}`)
      : undefined;

  const peringkatDiFormasi = formasiSaya
    ? [...formasiSaya.skor].sort((a, b) => b - a).indexOf(saya!.skor) + 1
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Peta Persaingan
      </h1>
      <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Kelulusan CPNS ditentukan <strong>peringkat</strong>, bukan sekadar lolos
        ambang batas. SSCASN hanya memberi tahu berapa <em>jumlah</em> pelamar di
        formasi Anda — di sini Anda bisa melihat gambaran{" "}
        <em>kualitasnya</em>: sebaran skor try out pejuang lain yang mengincar
        formasi serupa.
      </p>

      {/* ---------- Posisi saya ---------- */}
      {saya ? (
        <Card className="mt-7 overflow-hidden">
          <div className="grid gap-px bg-slate-200 sm:grid-cols-3 dark:bg-slate-800">
            <div className="bg-white p-5 dark:bg-slate-900">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Skor terbaik Anda
              </p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                {saya.skor}
                <span className="text-base font-semibold text-slate-400">
                  {" "}
                  / {SKOR_MAKS_TOTAL}
                </span>
              </p>
              <div className="mt-3">
                <Meter
                  nilai={saya.skor}
                  maks={SKOR_MAKS_TOTAL}
                  ambang={AMBANG_TOTAL}
                  warna={saya.skor >= AMBANG_TOTAL ? "emerald" : "rose"}
                />
              </div>
            </div>
            <div className="bg-white p-5 dark:bg-slate-900">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Peringkat keseluruhan
              </p>
              <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                #{posisiSaya + 1}
                <span className="text-base font-semibold text-slate-400">
                  {" "}
                  dari {peserta.length}
                </span>
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                {peserta.length > 1
                  ? `Lebih tinggi dari ${Math.round(((peserta.length - posisiSaya - 1) / (peserta.length - 1)) * 100)}% peserta`
                  : "Anda peserta pertama di sini"}
              </p>
            </div>
            <div className="bg-white p-5 dark:bg-slate-900">
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Di formasi incaran Anda
              </p>
              {formasiSaya ? (
                <>
                  <p className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
                    #{peringkatDiFormasi}
                    <span className="text-base font-semibold text-slate-400">
                      {" "}
                      dari {formasiSaya.jumlah}
                    </span>
                  </p>
                  <p className="mt-2 truncate text-xs text-slate-500 dark:text-slate-400">
                    {saya.formasi} · {saya.instansi}
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Isi instansi &amp; formasi incaran Anda di profil untuk masuk
                    peta persaingan.
                  </p>
                  <ButtonLink href="/profil" ukuran="sm" varian="halus" className="mt-3">
                    Lengkapi profil
                  </ButtonLink>
                </>
              )}
            </div>
          </div>
        </Card>
      ) : null}

      {/* ---------- Filter paket ---------- */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/peringkat"
          className={cx(
            "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
            !paketDipilih
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
          )}
        >
          Skor terbaik keseluruhan
        </Link>
        {PAKET.map((p) => (
          <Link
            key={p.id}
            href={`/peringkat?paket=${p.slug}`}
            className={cx(
              "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
              paketDipilih?.id === p.id
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
            )}
          >
            TO {p.nomor}
          </Link>
        ))}
      </div>

      {/* ---------- Papan peringkat ---------- */}
      <Card className="mt-4 overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Papan Peringkat{paketDipilih ? ` — ${paketDipilih.nama}` : " Keseluruhan"}
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Menampilkan skor terbaik tiap peserta. Peserta yang menyembunyikan
            diri lewat pengaturan profil tampil sebagai anonim.
          </p>
        </div>

        {peserta.length === 0 ? (
          <div className="p-6">
            <KotakKosong
              judul="Belum ada peserta yang menyelesaikan try out"
              pesan="Jadilah yang pertama mengisi papan peringkat ini."
              aksi={<ButtonLink href="/tryout">Mulai try out</ButtonLink>}
            />
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800">
            {peserta.slice(0, 50).map((p, i) => {
              const sayaSendiri = p.userId === userId;
              const anonim = !p.tampil && !sayaSendiri;
              return (
                <li
                  key={p.userId}
                  className={cx(
                    "flex items-center gap-4 px-5 py-3.5",
                    sayaSendiri && "bg-indigo-50/60 dark:bg-indigo-950/25",
                  )}
                >
                  <span
                    className={cx(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-extrabold",
                      i === 0
                        ? "bg-amber-400 text-white"
                        : i === 1
                          ? "bg-slate-300 text-slate-700"
                          : i === 2
                            ? "bg-amber-700 text-white"
                            : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
                    )}
                  >
                    {i + 1}
                  </span>

                  {anonim ? (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-500 dark:bg-slate-700">
                      ?
                    </span>
                  ) : (
                    <Avatar src={p.foto} nama={p.nama} />
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {anonim ? "Peserta anonim" : p.nama}
                      {sayaSendiri ? (
                        <span className="ml-2 rounded bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                          ANDA
                        </span>
                      ) : null}
                    </p>
                    {!anonim && (p.formasi || p.instansi) ? (
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {[p.formasi, p.instansi].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {p.skor}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {p.skor >= AMBANG_TOTAL ? "lolos ambang" : "belum lolos"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* ---------- Formasi paling ramai ---------- */}
      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Formasi paling ramai diincar pengguna JalurASN
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Semakin banyak yang mengisi profil, semakin akurat gambarannya.
          </p>
        </div>

        {daftarFormasi.length === 0 ? (
          <div className="p-6">
            <KotakKosong
              judul="Data formasi belum terkumpul"
              pesan="Isi instansi dan formasi incaran Anda di halaman profil. Data ini yang membuat peta persaingan bisa terbentuk untuk semua orang."
              aksi={<ButtonLink href="/profil">Isi profil saya</ButtonLink>}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-xs tracking-wider text-slate-500 uppercase dark:bg-slate-800/50">
                <tr>
                  <th className="px-5 py-3 font-semibold">Formasi</th>
                  <th className="px-5 py-3 font-semibold">Instansi</th>
                  <th className="px-5 py-3 text-center font-semibold">Pesaing</th>
                  <th className="px-5 py-3 text-center font-semibold">Rerata</th>
                  <th className="px-5 py-3 text-center font-semibold">Tertinggi</th>
                  <th className="px-5 py-3 text-center font-semibold">Lolos ambang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {daftarFormasi.map((f) => {
                  const milikSaya =
                    saya?.instansi === f.instansi && saya?.formasi === f.formasi;
                  return (
                    <tr
                      key={`${f.instansi}-${f.formasi}`}
                      className={milikSaya ? "bg-indigo-50/60 dark:bg-indigo-950/25" : undefined}
                    >
                      <td className="px-5 py-3 font-semibold text-slate-800 dark:text-slate-100">
                        {f.formasi}
                        {milikSaya ? (
                          <Badge className="ml-2 bg-indigo-600 text-white ring-indigo-600">
                            formasi Anda
                          </Badge>
                        ) : null}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        {f.instansi}
                      </td>
                      <td className="px-5 py-3 text-center font-bold text-slate-800 dark:text-slate-100">
                        {f.jumlah}
                      </td>
                      <td className="px-5 py-3 text-center text-slate-600 dark:text-slate-300">
                        {f.rerata}
                      </td>
                      <td className="px-5 py-3 text-center text-slate-600 dark:text-slate-300">
                        {f.tertinggi}
                      </td>
                      <td className="px-5 py-3 text-center">
                        <span
                          className={cx(
                            "rounded-md px-2 py-0.5 text-xs font-bold",
                            f.lolosAmbang > 0
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800",
                          )}
                        >
                          {f.lolosAmbang}/{f.jumlah}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <div className="mt-6">
        <Callout nada="info" judul="Cara membaca angka ini">
          Peta ini menggambarkan pengguna JalurASN, bukan seluruh pelamar formasi
          tersebut — anggap sebagai <em>sampel</em>, bukan data resmi. Yang paling
          berguna bukan angka absolutnya, melainkan arahnya: kalau rerata pesaing
          di formasi Anda naik terus sementara skor Anda datar, itu peringatan
          dini yang tidak akan Anda dapat dari mana pun sebelum pengumuman.
        </Callout>
      </div>
    </div>
  );
}
