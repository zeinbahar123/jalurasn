"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/components/ui";

export interface ItemNav {
  href: string;
  label: string;
}

export function NavDesktop({ items }: { items: ItemNav[] }) {
  const path = usePathname();
  return (
    <nav className="hidden items-center gap-1 lg:flex">
      {items.map((it) => {
        const aktif = path === it.href || path.startsWith(it.href + "/");
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cx(
              "rounded-lg px-3 py-2 text-sm font-medium transition",
              aktif
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
            )}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function NavMobile({
  items,
  children,
}: {
  items: ItemNav[];
  children?: React.ReactNode;
}) {
  const [buka, setBuka] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setBuka(false);
  }, [path]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setBuka((v) => !v)}
        aria-label="Buka menu"
        aria-expanded={buka}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          {buka ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {buka ? (
        <div className="absolute inset-x-0 top-full z-50 border-b border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <nav className="flex flex-col gap-1">
            {items.map((it) => {
              const aktif = path === it.href || path.startsWith(it.href + "/");
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className={cx(
                    "rounded-lg px-3 py-2.5 text-sm font-medium",
                    aktif
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800",
                  )}
                >
                  {it.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}
