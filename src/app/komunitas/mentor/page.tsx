import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Badge, ButtonLink, Card, Callout, KotakKosong } from "@/components/ui";
import { Avatar } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Cari Mentor — Alumni Seleksi CPNS",
  description:
    "Daftar peserta JalurASN yang sudah lolos seleksi CPNS/PPPK dan bersedia menjawab pertanyaan pejuang CPNS 2026.",
  alternates: { canonical: "/komunitas/mentor" },
};

export const dynamic = "force-dynamic";

export default async function DaftarMentor() {
  const session = await auth();

  const mentor = await prisma.user.findMany({
    where: { isMentor: true },
    orderBy: [{ tahunLolos: "desc" }, { createdAt: "asc" }],
    take: 100,
    select: {
      id: true,
      name: true,
      namaTampilan: true,
      image: true,
      bio: true,
      tahunLolos: true,
      instansiLolos: true,
      targetProvinsi: true,
      _count: { select: { comments: true } },
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/komunitas"
        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        ← Komunitas
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Mentor Alumni Seleksi
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
        Mereka pernah berada di posisi Anda sekarang, dan berhasil melewatinya.
        Cara paling efektif bertanya: buka pembahasan soal yang membingungkan,
        lalu tulis pertanyaan Anda di kolom diskusi soal tersebut — mentor bisa
        menjawab langsung di konteks soalnya.
      </p>

      <div className="mt-6">
        <Callout nada="info" judul="Mentor di sini adalah relawan">
          Tidak ada mentor berbayar di JalurASN. Kalau ada yang meminta bayaran
          atau menjanjikan &quot;jalur dalam&quot;, itu penipuan — laporkan dan
          jangan diikuti. Proses seleksi CPNS tidak bisa dititipkan kepada
          siapa pun.
        </Callout>
      </div>

      {mentor.length === 0 ? (
        <div className="mt-8">
          <KotakKosong
            judul="Belum ada mentor terdaftar"
            pesan="Kalau Anda sudah pernah lolos seleksi CPNS atau PPPK, aktifkan status mentor di halaman profil. Satu jawaban Anda bisa menghemat berbulan-bulan waktu orang lain."
            aksi={
              session?.user ? (
                <ButtonLink href="/profil">Aktifkan status mentor</ButtonLink>
              ) : (
                <ButtonLink href="/masuk?lanjut=/profil">
                  Masuk untuk mendaftar
                </ButtonLink>
              )
            }
          />
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {mentor.map((m) => (
            <li key={m.id}>
              <Card className="h-full p-5">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={m.image}
                    nama={m.namaTampilan || m.name}
                    size={44}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-bold text-slate-900 dark:text-white">
                      {m.namaTampilan || m.name || "Mentor"}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {m.instansiLolos ?? "Instansi belum diisi"}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.tahunLolos ? (
                    <Badge className="bg-emerald-500/15 text-emerald-700 ring-emerald-600/25 dark:text-emerald-300">
                      Lolos {m.tahunLolos}
                    </Badge>
                  ) : null}
                  {m.targetProvinsi ? (
                    <Badge>{m.targetProvinsi}</Badge>
                  ) : null}
                  {m._count.comments > 0 ? (
                    <Badge>{m._count.comments} jawaban diskusi</Badge>
                  ) : null}
                </div>

                {m.bio ? (
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {m.bio}
                  </p>
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      )}

      <Card className="mt-8 p-6">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Sudah lolos? Bergabunglah jadi mentor
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Anda tidak perlu jadi ahli. Cukup jawab pertanyaan yang dulu juga
          membingungkan Anda — soal cara memilih formasi, cara membaca peta
          persaingan, dokumen yang paling sering bikin pelamar gugur di
          administrasi, atau strategi mengerjakan TIU saat waktu mepet.
        </p>
        <ButtonLink href="/profil" className="mt-4">
          Aktifkan status mentor di profil
        </ButtonLink>
      </Card>
    </div>
  );
}
