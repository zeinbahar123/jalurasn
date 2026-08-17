import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { simpanCeritaAction, hapusCeritaAction } from "@/app/actions/profil";
import { Badge, Button, ButtonLink, Card, Callout, KotakKosong } from "@/components/ui";
import { Avatar } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Komunitas — Cerita Perjuangan CPNS",
  description:
    "Ruang cerita pejuang CPNS: yang lolos dan yang belum. Karena yang paling melemahkan mental adalah merasa gagal sendirian.",
  alternates: { canonical: "/komunitas" },
};

export const dynamic = "force-dynamic";

export default async function Komunitas() {
  const session = await auth();
  const userId = session?.user?.id ?? null;

  const [cerita, jumlahMentor] = await Promise.all([
    prisma.story.findMany({
      where: { tayang: true },
      orderBy: { createdAt: "desc" },
      take: 40,
      select: {
        id: true,
        judul: true,
        isi: true,
        tahunUjian: true,
        instansi: true,
        hasilnya: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            name: true,
            namaTampilan: true,
            image: true,
            isMentor: true,
            targetFormasi: true,
          },
        },
      },
    }),
    prisma.user.count({ where: { isMentor: true } }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Cerita Perjuangan
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Tempat pejuang CPNS bercerita apa adanya — termasuk yang belum lolos.
        Yang paling melemahkan mental bukan kegagalannya, tapi perasaan bahwa
        hanya kita yang gagal.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href="/komunitas/mentor" varian="sekunder">
          Cari mentor ({jumlahMentor})
        </ButtonLink>
        <ButtonLink href="/info" varian="halus">
          Panduan &amp; info seleksi
        </ButtonLink>
      </div>

      {/* ---------- Cerita pendiri (disematkan) ---------- */}
      <Card className="mt-8 border-indigo-200 bg-indigo-50/40 p-6 dark:border-indigo-900 dark:bg-indigo-950/20">
        <Badge className="bg-indigo-600 text-white ring-indigo-600">
          Cerita pendiri · disematkan
        </Badge>
        <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
          Lima tahun, tiga kali daftar, dan satu pelajaran yang telat saya sadari
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-200">
          <p>
            <strong>2019 — Kementerian Kominfo.</strong> Saya masuk 7 besar di
            SKD. Dekat, tapi tidak cukup. Waktu itu saya pikir masalahnya cuma
            kurang beruntung.
          </p>
          <p>
            <strong>2021 — Kejaksaan, Jawa Barat.</strong> Hasilnya justru lebih
            jauh dari 2019. Di titik ini saya sadar sesuatu yang tidak enak
            didengar: saya mendaftar tanpa niat yang benar-benar bulat, dan
            memilih formasi tanpa membaca peta persaingannya.
          </p>
          <p>
            <strong>2024 — Diskominfo Pemkab Pringsewu.</strong> Alhamdulillah,
            lolos. Yang berubah bukan tiba-tiba saya jadi jauh lebih pintar. Yang
            berubah: saya memutuskan lebih awal, mencari informasi sampai tuntas,
            dan berlatih terukur — bukan asal banyak.
          </p>
          <p className="border-t border-indigo-200 pt-4 dark:border-indigo-900">
            Dua hal yang bikin perjalanan saya panjang: <strong>niat yang
            setengah-setengah</strong> dan <strong>informasi yang
            berserakan</strong>. Keduanya bisa diperbaiki, dan keduanya tidak
            butuh biaya. Itulah kenapa situs ini ada, dan kenapa gratis.
          </p>
        </div>
      </Card>

      {/* ---------- Form cerita ---------- */}
      {userId ? (
        <Card className="mt-8">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Tulis cerita Anda
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Cerita gagal sama berharganya dengan cerita lolos — sering kali
              lebih berguna.
            </p>
          </div>
          <form action={simpanCeritaAction} className="space-y-5 p-5">
            <div>
              <label
                htmlFor="judul"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Judul
              </label>
              <input
                id="judul"
                name="judul"
                required
                maxLength={140}
                placeholder="Contoh: Gagal 2 kali di TIU, ini yang akhirnya saya ubah"
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label
                  htmlFor="tahunUjian"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Tahun seleksi
                </label>
                <input
                  id="tahunUjian"
                  name="tahunUjian"
                  placeholder="2024"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <div>
                <label
                  htmlFor="instansi"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Instansi
                </label>
                <input
                  id="instansi"
                  name="instansi"
                  placeholder="Contoh: Pemkab Pringsewu"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                />
              </div>
              <div>
                <label
                  htmlFor="hasilnya"
                  className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
                >
                  Hasilnya
                </label>
                <select
                  id="hasilnya"
                  name="hasilnya"
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="">— pilih —</option>
                  <option value="LOLOS">Lolos</option>
                  <option value="BELUM LOLOS">Belum lolos</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="isi"
                className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Ceritanya
              </label>
              <textarea
                id="isi"
                name="isi"
                required
                rows={7}
                maxLength={6000}
                placeholder="Apa yang Anda lakukan, apa yang salah, dan apa yang akan Anda lakukan berbeda kalau bisa mengulang. Minimal 40 karakter."
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm leading-7 dark:border-slate-700 dark:bg-slate-900"
              />
              <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                Jangan menuliskan NIK, nomor peserta, atau data pribadi orang
                lain. Cerita bisa Anda hapus kapan saja.
              </p>
            </div>

            <Button type="submit">Terbitkan cerita</Button>
          </form>
        </Card>
      ) : (
        <Card className="mt-8 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Ingin ikut bercerita?
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Buat akun gratis untuk menulis cerita dan ikut berdiskusi.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <ButtonLink href="/masuk?lanjut=%2Fkomunitas" varian="sekunder">
              Masuk
            </ButtonLink>
            <ButtonLink href="/daftar?lanjut=%2Fkomunitas">Daftar Gratis</ButtonLink>
          </div>
        </Card>
      )}

      {/* ---------- Daftar cerita ---------- */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Cerita dari pejuang lain
        </h2>

        {cerita.length === 0 ? (
          <div className="mt-5">
            <KotakKosong
              judul="Belum ada cerita yang ditulis"
              pesan="Cerita pertama biasanya yang paling berat ditulis — dan yang paling banyak menolong orang lain."
              aksi={
                userId ? undefined : (
                  <ButtonLink href="/masuk?lanjut=/komunitas">
                    Masuk untuk menulis
                  </ButtonLink>
                )
              }
            />
          </div>
        ) : (
          <ul className="mt-5 space-y-5">
            {cerita.map((c) => (
              <li key={c.id}>
                <Card className="p-6">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={c.user.image}
                      nama={c.user.namaTampilan || c.user.name}
                      size={36}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {c.user.namaTampilan || c.user.name || "Pejuang CPNS"}
                        {c.user.isMentor ? (
                          <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                            MENTOR
                          </span>
                        ) : null}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        {[
                          c.tahunUjian ? `Seleksi ${c.tahunUjian}` : null,
                          c.instansi,
                          c.createdAt.toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    {c.hasilnya ? (
                      <Badge
                        className={
                          c.hasilnya === "LOLOS"
                            ? "bg-emerald-500/15 text-emerald-700 ring-emerald-600/25 dark:text-emerald-300"
                            : "bg-slate-500/15 text-slate-600 ring-slate-500/25 dark:text-slate-300"
                        }
                      >
                        {c.hasilnya === "LOLOS" ? "Lolos" : "Belum lolos"}
                      </Badge>
                    ) : null}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">
                    {c.judul}
                  </h3>
                  <p className="mt-2 text-sm leading-7 whitespace-pre-line text-slate-700 dark:text-slate-200">
                    {c.isi}
                  </p>

                  {c.userId === userId ? (
                    <form action={hapusCeritaAction} className="mt-4">
                      <input type="hidden" name="id" value={c.id} />
                      <button
                        type="submit"
                        className="text-xs font-semibold text-slate-400 hover:text-rose-600"
                      >
                        Hapus cerita saya
                      </button>
                    </form>
                  ) : null}
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-10">
        <Callout nada="info" judul="Aturan main ruang ini">
          Boleh kecewa, boleh curhat, boleh mengkritik proses. Tidak boleh:
          menuduh tanpa bukti, membocorkan data pribadi orang lain, menjual jasa
          &quot;joki&quot; atau &quot;bocoran&quot;. Konten seperti itu akan
          dihapus.{" "}
          <Link href="/info" className="font-semibold underline">
            Baca panduan seleksi
          </Link>{" "}
          kalau Anda butuh informasi teknisnya.
        </Callout>
      </div>
    </div>
  );
}
