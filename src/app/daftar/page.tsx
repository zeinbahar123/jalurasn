import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { FormDaftar } from "@/components/form-akun";
import { Card } from "@/components/ui";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Daftar Akun Gratis",
  description:
    "Buat akun JalurASN gratis untuk mengerjakan 10 paket try out SKD CPNS 2026 lengkap dengan pembahasan dan analisis kelemahan.",
  alternates: { canonical: "/daftar" },
};

export const dynamic = "force-dynamic";

export default async function Daftar({
  searchParams,
}: {
  searchParams: Promise<{ lanjut?: string }>;
}) {
  const sp = await searchParams;
  const session = await auth();
  if (session?.user?.id) redirect(sp.lanjut ?? "/tryout");

  const lanjut =
    sp.lanjut && sp.lanjut.startsWith("/") && !sp.lanjut.startsWith("//")
      ? sp.lanjut
      : "/tryout";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="flex justify-center">
        <LogoMark className="h-12 w-12" />
      </div>

      <h1 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Buat Akun Gratis
      </h1>
      <p className="mt-3 text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
        Cukup nama, email, dan kata sandi. Tidak ada biaya dan tidak ada verifikasi
        berbelit.
      </p>

      <Card className="mt-7 p-6">
        <FormDaftar lanjut={lanjut} />
      </Card>

      <ul className="mt-7 space-y-3 text-sm text-slate-600 dark:text-slate-300">
        <li className="flex gap-2.5">
          <Titik /> Riwayat pengerjaan &amp; skor tiap paket tersimpan permanen.
        </li>
        <li className="flex gap-2.5">
          <Titik /> Pembahasan tiap soal terbuka segera setelah submit.
        </li>
        <li className="flex gap-2.5">
          <Titik /> Bisa ikut berdiskusi di kolom diskusi tiap soal.
        </li>
        <li className="flex gap-2.5">
          <Titik /> Masuk peta persaingan sesuai formasi yang Anda incar.
        </li>
      </ul>

      <p className="mt-7 text-center text-xs leading-6 text-slate-500 dark:text-slate-400">
        Yang kami simpan hanya nama, email, dan isian profil yang Anda masukkan
        sendiri. Kata sandi disimpan dalam bentuk acak (scrypt) sehingga tidak dapat
        dibaca siapa pun. Kami tidak pernah meminta NIK maupun nomor pendaftaran
        SSCASN.
      </p>
      <p className="mt-3 text-center text-xs text-slate-400">
        <Link href="/" className="font-semibold hover:text-indigo-600">
          Kembali ke beranda
        </Link>
      </p>
    </div>
  );
}

function Titik() {
  return <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />;
}
