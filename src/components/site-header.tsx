import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { keluarAction } from "@/app/actions/auth";
import { NavDesktop, NavMobile, type ItemNav } from "@/components/nav-links";
import { LogoMark, Wordmark } from "@/components/logo";

const ITEM_UMUM: ItemNav[] = [
  { href: "/tryout", label: "Try Out SKD" },
  { href: "/peringkat", label: "Peta Persaingan" },
  { href: "/komunitas", label: "Komunitas" },
  { href: "/info", label: "Info CPNS 2026" },
];

export async function SiteHeader() {
  const session = await auth();
  const items = session?.user
    ? [...ITEM_UMUM, { href: "/riwayat", label: "Riwayat" }]
    : ITEM_UMUM;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <LogoMark />
          <Wordmark />
        </Link>

        <NavDesktop items={items} />

        <div className="flex items-center gap-2">
          {session?.user ? (
            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/profil"
                className="flex items-center gap-2 rounded-full border border-slate-200 py-1 pr-3 pl-1 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <Avatar src={session.user.image} nama={session.user.name} />
                <span className="max-w-28 truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                  {session.user.namaTampilan || session.user.name || "Pejuang"}
                </span>
              </Link>
              <form action={keluarAction}>
                <button
                  type="submit"
                  className="rounded-lg px-2.5 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Keluar
                </button>
              </form>
            </div>
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/masuk"
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Masuk
              </Link>
              <Link
                href="/daftar"
                className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
              >
                Daftar Gratis
              </Link>
            </div>
          )}

          <NavMobile items={items}>
            {session?.user ? (
              <div className="flex items-center justify-between gap-3">
                <Link href="/profil" className="flex items-center gap-2">
                  <Avatar src={session.user.image} nama={session.user.name} />
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                    {session.user.namaTampilan || session.user.name}
                  </span>
                </Link>
                <form action={keluarAction}>
                  <button
                    type="submit"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-rose-600"
                  >
                    Keluar
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/masuk"
                  className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
                >
                  Masuk
                </Link>
                <Link
                  href="/daftar"
                  className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Daftar Gratis
                </Link>
              </div>
            )}
          </NavMobile>
        </div>
      </div>
    </header>
  );
}

export function Avatar({
  src,
  nama,
  size = 28,
}: {
  src?: string | null;
  nama?: string | null;
  size?: number;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={nama ?? "Foto profil"}
        width={size}
        height={size}
        className="rounded-full ring-1 ring-slate-200 dark:ring-slate-700"
      />
    );
  }
  const inisial = (nama ?? "P").trim().charAt(0).toUpperCase();
  return (
    <span
      className="flex items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300"
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {inisial}
    </span>
  );
}
