"use client";

import { useMemo, useState } from "react";
import { cx } from "@/components/ui";
import { DiskusiSoal } from "@/components/diskusi-soal";
import { OPSI, URUTAN_KATEGORI, type Kategori, type OpsiKey } from "@/lib/skd";

export interface SoalPembahasan {
  id: string;
  nomor: number;
  kat: Kategori;
  sub: string;
  q: string;
  pre?: string;
  o: Record<OpsiKey, string>;
  kunci?: OpsiKey;
  bobot?: Record<OpsiKey, number>;
  pembahasan: string;
  jawabanSaya: string | null;
  poin: number;
  ragu: boolean;
  jumlahKomentar: number;
}

type Filter = "semua" | "belum-optimal" | "kosong" | "ragu";

const LABEL_FILTER: Record<Filter, string> = {
  semua: "Semua soal",
  "belum-optimal": "Belum optimal",
  kosong: "Dikosongkan",
  ragu: "Ditandai ragu",
};

export function PanelPembahasan({
  paketId,
  soal,
  bisaKomentar,
}: {
  paketId: string;
  soal: SoalPembahasan[];
  bisaKomentar: boolean;
}) {
  const [filter, setFilter] = useState<Filter>("semua");
  const [kategori, setKategori] = useState<Kategori | "SEMUA">("SEMUA");
  const [diskusiTerbuka, setDiskusiTerbuka] = useState<Record<string, boolean>>({});

  const jumlah = useMemo(() => {
    return {
      semua: soal.length,
      "belum-optimal": soal.filter((s) => s.poin < 5).length,
      kosong: soal.filter((s) => !s.jawabanSaya).length,
      ragu: soal.filter((s) => s.ragu).length,
    } as Record<Filter, number>;
  }, [soal]);

  const tampil = useMemo(() => {
    return soal.filter((s) => {
      if (kategori !== "SEMUA" && s.kat !== kategori) return false;
      if (filter === "belum-optimal") return s.poin < 5;
      if (filter === "kosong") return !s.jawabanSaya;
      if (filter === "ragu") return s.ragu;
      return true;
    });
  }, [filter, kategori, soal]);

  return (
    <div>
      {/* Penyaring */}
      <div className="sticky top-16 z-20 -mx-4 mb-6 border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(LABEL_FILTER) as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cx(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                filter === f
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
              )}
            >
              {LABEL_FILTER[f]}
              <span className="ml-1.5 opacity-70">{jumlah[f]}</span>
            </button>
          ))}

          <span className="mx-1 hidden h-5 w-px bg-slate-200 sm:block dark:bg-slate-700" />

          {(["SEMUA", ...URUTAN_KATEGORI] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKategori(k)}
              className={cx(
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition",
                kategori === k
                  ? "bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
              )}
            >
              {k === "SEMUA" ? "Semua komponen" : k}
            </button>
          ))}
        </div>
      </div>

      {tampil.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-500 dark:border-slate-700">
          Tidak ada soal pada filter ini. Bagus — berarti tidak ada yang terlewat
          di kategori tersebut.
        </p>
      ) : (
        <ul className="space-y-5">
          {tampil.map((s) => (
            <li key={s.id}>
              <KartuPembahasan
                s={s}
                paketId={paketId}
                bisaKomentar={bisaKomentar}
                diskusiTerbuka={!!diskusiTerbuka[s.id]}
                toggleDiskusi={() =>
                  setDiskusiTerbuka((prev) => ({ ...prev, [s.id]: !prev[s.id] }))
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KartuPembahasan({
  s,
  paketId,
  bisaKomentar,
  diskusiTerbuka,
  toggleDiskusi,
}: {
  s: SoalPembahasan;
  paketId: string;
  bisaKomentar: boolean;
  diskusiTerbuka: boolean;
  toggleDiskusi: () => void;
}) {
  const isTKP = s.kat === "TKP";
  const opsiTerbaik = isTKP && s.bobot
    ? (OPSI.reduce((best, k) => ((s.bobot![k] ?? 0) > (s.bobot![best] ?? 0) ? k : best), "A" as OpsiKey))
    : s.kunci;

  const status: "benar" | "kurang" | "salah" | "kosong" = !s.jawabanSaya
    ? "kosong"
    : isTKP
      ? s.poin === 5
        ? "benar"
        : "kurang"
      : s.poin === 5
        ? "benar"
        : "salah";

  const gayaStatus = {
    benar: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    kurang: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    salah: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
    kosong: "bg-slate-500/15 text-slate-600 dark:text-slate-300",
  }[status];

  const labelStatus = {
    benar: isTKP ? `Poin penuh (5)` : "Jawaban benar",
    kurang: `Poin ${s.poin} dari 5`,
    salah: "Jawaban salah",
    kosong: "Tidak dijawab (0 poin)",
  }[status];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-slate-900 px-2.5 py-1 text-xs font-bold text-white dark:bg-slate-700">
          No. {s.nomor}
        </span>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {s.kat}
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {s.sub}
        </span>
        <span className={cx("ml-auto rounded-lg px-2.5 py-1 text-xs font-bold", gayaStatus)}>
          {labelStatus}
        </span>
        {s.ragu ? (
          <span className="rounded-lg bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
            RAGU
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-[15px] leading-8 whitespace-pre-line text-slate-800 dark:text-slate-100">
        {s.q}
      </p>

      {s.pre ? <pre className="blok-figural">{s.pre}</pre> : null}

      <ul className="mt-4 space-y-2">
        {OPSI.map((k) => {
          const dipilih = s.jawabanSaya === k;
          const terbaik = opsiTerbaik === k;
          const bobot = s.bobot?.[k];

          return (
            <li
              key={k}
              className={cx(
                "flex items-start gap-3 rounded-xl border px-3.5 py-3",
                terbaik
                  ? "border-emerald-400 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/30"
                  : dipilih
                    ? "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/30"
                    : "border-slate-200 dark:border-slate-700",
              )}
            >
              <span
                className={cx(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold",
                  terbaik
                    ? "bg-emerald-600 text-white"
                    : dipilih
                      ? "bg-rose-500 text-white"
                      : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300",
                )}
              >
                {k}
              </span>
              <span className="flex-1 pt-0.5 text-sm leading-6 text-slate-700 dark:text-slate-200">
                {s.o[k]}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 pt-0.5">
                {isTKP && bobot !== undefined ? (
                  <span
                    className={cx(
                      "rounded-md px-1.5 py-0.5 text-[11px] font-bold",
                      bobot === 5
                        ? "bg-emerald-600 text-white"
                        : bobot >= 3
                          ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-200"
                          : "bg-slate-100 text-slate-400 dark:bg-slate-800",
                    )}
                  >
                    {bobot}
                  </span>
                ) : null}
                {dipilih ? (
                  <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-slate-200 dark:text-slate-900">
                    PILIHAN ANDA
                  </span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 rounded-xl border-l-4 border-indigo-500 bg-indigo-50/60 px-4 py-3.5 dark:bg-indigo-950/25">
        <p className="text-xs font-bold tracking-wider text-indigo-700 uppercase dark:text-indigo-300">
          Pembahasan
        </p>
        <p className="mt-1.5 text-sm leading-7 whitespace-pre-line text-slate-700 dark:text-slate-200">
          {s.pembahasan}
        </p>
      </div>

      <button
        type="button"
        onClick={toggleDiskusi}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 12a7 7 0 0 1-7 7H8l-4 3v-5.5A7 7 0 0 1 8 5h5a7 7 0 0 1 7 7z" strokeLinejoin="round" />
        </svg>
        {diskusiTerbuka ? "Tutup diskusi" : "Diskusi"}
        {s.jumlahKomentar > 0 ? (
          <span className="rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {s.jumlahKomentar}
          </span>
        ) : null}
      </button>

      {diskusiTerbuka ? (
        <DiskusiSoal soalId={s.id} paketId={paketId} bisaKomentar={bisaKomentar} />
      ) : null}
    </div>
  );
}
