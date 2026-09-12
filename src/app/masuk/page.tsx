import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { FormMasuk } from "@/components/form-akun";
import { Card, Callout } from "@/components/ui";
import { LogoMark } from "@/components/logo";

export const metadata: Metadata = {
  title: "Masuk",
  description:
    "Masuk ke JalurASN untuk menyimpan riwayat try out, pembahasan, dan analisis kelemahan Anda.",
  alternates: { canonical: "/masuk" },
};

export const dynamic = "force-dynamic";

const PESAN_ERROR: Record<string, string> = {
  CredentialsSignin: "Email atau kata sandi salah.",
  Configuration:
    "Konfigurasi login belum lengkap di server. Periksa AUTH_SECRET dan DATABASE_URL.",
  MissingSecret:
    "AUTH_SECRET belum diisi di server. Jalankan `npx auth secret` lalu isikan ke berkas .env.",
  SessionRequired: "Anda perlu masuk untuk membuka halaman tersebut.",
  MissingCSRF:
    "Sesi keamanan kedaluwarsa. Muat ulang halaman ini lalu coba lagi.",
};

export default async function Masuk({
  searchParams,
}: {
  searchParams: Promise<{ lanjut?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const session = await auth();

  if (session?.user?.id) redirect(sp.lanjut ?? "/tryout");

  // Hanya izinkan tujuan internal
  const lanjut =
    sp.lanjut &&
    sp.lanjut.startsWith("/") &&
    !sp.lanjut.startsWith("//")
      ? sp.lanjut
      : "/tryout";

  const pesan = sp.error
    ? (PESAN_ERROR[sp.error] ??
      `Gagal masuk (kode: ${sp.error}). Jalankan "npm run cek:auth" untuk memeriksa konfigurasi.`)
    : null;

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{
        backgroundImage: "url('/images/background-tactix.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay tipis agar background tetap terlihat jelas */}
      <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-slate-950/45" />

      {/* Efek cahaya */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

      {/* Konten Login */}
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center">
          <LogoMark className="h-14 w-14 drop-shadow-lg" />
        </div>

        <h1 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Masuk ke JalurASN
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-slate-600 dark:text-slate-300">
          Gratis selamanya. Tidak ada versi berbayar, tidak ada iklan.
        </p>

        {pesan ? (
          <div className="mt-6">
            <Callout nada="peringatan">{pesan}</Callout>
          </div>
        ) : null}

        <Card className="mt-7 border-white/70 bg-white/95 p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900/95">
          <FormMasuk lanjut={lanjut} />
        </Card>

        <p className="mt-6 text-center text-xs leading-6 text-slate-600 dark:text-slate-300">
          Kata sandi Anda disimpan dalam bentuk acak (scrypt) dan tidak dapat
          dibaca siapa pun, termasuk pengelola situs. Kami tidak pernah meminta
          NIK atau nomor pendaftaran SSCASN.
        </p>

        <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
          <Link
            href="/"
            className="font-semibold transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            Kembali ke beranda
          </Link>
        </p>
      </div>
    </main>
  );
}
