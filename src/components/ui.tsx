import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

// ---------------------------------------------------------
// Kartu
// ---------------------------------------------------------

export function Card({
  className,
  children,
  ...rest
}: ComponentProps<"div">) {
  return (
    <div
      {...rest}
      className={cx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        "dark:border-slate-800 dark:bg-slate-900",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  judul,
  sub,
  aksi,
}: {
  judul: ReactNode;
  sub?: ReactNode;
  aksi?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
      <div>
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {judul}
        </h2>
        {sub ? (
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{sub}</p>
        ) : null}
      </div>
      {aksi}
    </div>
  );
}

// ---------------------------------------------------------
// Tombol
// ---------------------------------------------------------

type Varian = "primer" | "sekunder" | "halus" | "bahaya" | "sukses";

const VARIAN: Record<Varian, string> = {
  primer:
    "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 disabled:bg-indigo-300",
  sekunder:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
  halus:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  bahaya: "bg-rose-600 text-white hover:bg-rose-500",
  sukses: "bg-emerald-600 text-white hover:bg-emerald-500",
};

const UKURAN = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
} as const;

export function Button({
  varian = "primer",
  ukuran = "md",
  className,
  ...rest
}: ComponentProps<"button"> & { varian?: Varian; ukuran?: keyof typeof UKURAN }) {
  return (
    <button
      {...rest}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
        "disabled:cursor-not-allowed disabled:opacity-60",
        VARIAN[varian],
        UKURAN[ukuran],
        className,
      )}
    />
  );
}

export function ButtonLink({
  varian = "primer",
  ukuran = "md",
  className,
  ...rest
}: ComponentProps<typeof Link> & {
  varian?: Varian;
  ukuran?: keyof typeof UKURAN;
}) {
  return (
    <Link
      {...rest}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
        VARIAN[varian],
        UKURAN[ukuran],
        className,
      )}
    />
  );
}

// ---------------------------------------------------------
// Badge
// ---------------------------------------------------------

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        className ??
          "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-400/20",
      )}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------
// Bar progres / meter nilai
// ---------------------------------------------------------

export function Meter({
  nilai,
  maks,
  ambang,
  warna = "indigo",
}: {
  nilai: number;
  maks: number;
  ambang?: number;
  warna?: "indigo" | "emerald" | "sky" | "amber" | "rose";
}) {
  const persen = maks > 0 ? Math.min(100, Math.max(0, (nilai / maks) * 100)) : 0;
  const persenAmbang =
    ambang !== undefined && maks > 0 ? Math.min(100, (ambang / maks) * 100) : null;

  const bg = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    sky: "bg-sky-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  }[warna];

  return (
    <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
      <div
        className={cx("h-full rounded-full transition-all", bg)}
        style={{ width: `${persen}%` }}
      />
      {persenAmbang !== null ? (
        <div
          className="absolute inset-y-0 w-0.5 bg-slate-900/70 dark:bg-white/70"
          style={{ left: `${persenAmbang}%` }}
          title={`Ambang batas ${ambang}`}
        />
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------
// Kosong / info
// ---------------------------------------------------------

export function KotakKosong({
  judul,
  pesan,
  aksi,
}: {
  judul: string;
  pesan: string;
  aksi?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center dark:border-slate-700 dark:bg-slate-900/40">
      <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">
        {judul}
      </h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-slate-500 dark:text-slate-400">
        {pesan}
      </p>
      {aksi ? <div className="mt-5 flex justify-center">{aksi}</div> : null}
    </div>
  );
}

export function Callout({
  nada = "info",
  judul,
  children,
}: {
  nada?: "info" | "peringatan" | "sukses";
  judul?: string;
  children: ReactNode;
}) {
  const gaya = {
    info: "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900/60 dark:bg-sky-950/40 dark:text-sky-200",
    peringatan:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-200",
    sukses:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200",
  }[nada];

  return (
    <div className={cx("rounded-xl border px-4 py-3 text-sm", gaya)}>
      {judul ? <p className="font-semibold">{judul}</p> : null}
      <div className={judul ? "mt-1" : undefined}>{children}</div>
    </div>
  );
}
