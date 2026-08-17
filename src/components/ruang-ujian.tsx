"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { cx } from "@/components/ui";
import { ATURAN, OPSI, URUTAN_KATEGORI, formatDurasi, type Kategori, type OpsiKey } from "@/lib/skd";

export interface SoalUjianKlien {
  id: string;
  nomor: number;
  kat: Kategori;
  sub: string;
  q: string;
  pre?: string;
  o: Record<OpsiKey, string>;
}

export interface JawabanAwal {
  jawaban: string | null;
  raguRagu: boolean;
  detikDipakai: number;
}

interface Props {
  attemptId: string;
  paketNama: string;
  paketSlug: string;
  soal: SoalUjianKlien[];
  batasPadaISO: string;
  jawabanAwal: Record<string, JawabanAwal>;
}

const INTERVAL_SIMPAN_MS = 5000;

export function RuangUjian({
  attemptId,
  paketNama,
  paketSlug,
  soal,
  batasPadaISO,
  jawabanAwal,
}: Props) {
  const router = useRouter();
  const batasMs = useMemo(() => new Date(batasPadaISO).getTime(), [batasPadaISO]);

  const [idx, setIdx] = useState(0);
  const [jawaban, setJawaban] = useState<Record<string, string | null>>(() => {
    const awal: Record<string, string | null> = {};
    for (const s of soal) awal[s.id] = jawabanAwal[s.id]?.jawaban ?? null;
    return awal;
  });
  const [ragu, setRagu] = useState<Record<string, boolean>>(() => {
    const awal: Record<string, boolean> = {};
    for (const s of soal) awal[s.id] = jawabanAwal[s.id]?.raguRagu ?? false;
    return awal;
  });
  const waktuSoal = useRef<Record<string, number>>(
    Object.fromEntries(soal.map((s) => [s.id, jawabanAwal[s.id]?.detikDipakai ?? 0])),
  );

  const [sisaDetik, setSisaDetik] = useState<number | null>(null);
  const [statusSimpan, setStatusSimpan] = useState<"aman" | "menyimpan" | "gagal">("aman");
  const [bukaNavigator, setBukaNavigator] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [pesanError, setPesanError] = useState<string | null>(null);

  const kotor = useRef<Set<string>>(new Set());
  const sudahSubmit = useRef(false);
  const idxRef = useRef(0);
  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  const soalAktif = soal[idx];

  // ------------------------------------------------------
  // Cadangan lokal (kalau jaringan mati total)
  // ------------------------------------------------------
  const kunciLokal = `jalurasn:attempt:${attemptId}`;

  useEffect(() => {
    try {
      const mentah = localStorage.getItem(kunciLokal);
      if (!mentah) return;
      const data = JSON.parse(mentah) as {
        jawaban?: Record<string, string | null>;
        ragu?: Record<string, boolean>;
      };
      if (data.jawaban) {
        setJawaban((prev) => {
          const gabung = { ...prev };
          for (const [k, v] of Object.entries(data.jawaban!)) {
            if (gabung[k] === null && v) {
              gabung[k] = v;
              kotor.current.add(k);
            }
          }
          return gabung;
        });
      }
      if (data.ragu) setRagu((prev) => ({ ...data.ragu, ...prev }));
    } catch {
      /* abaikan */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const simpanLokal = useCallback(
    (j: Record<string, string | null>, r: Record<string, boolean>) => {
      try {
        localStorage.setItem(kunciLokal, JSON.stringify({ jawaban: j, ragu: r }));
      } catch {
        /* kuota penuh — abaikan */
      }
    },
    [kunciLokal],
  );

  // ------------------------------------------------------
  // Kirim jawaban ke server
  // ------------------------------------------------------
  const kirimKotor = useCallback(async () => {
    if (kotor.current.size === 0 || sudahSubmit.current) return;
    const ids = [...kotor.current];
    kotor.current.clear();

    const muatan = ids.map((id) => ({
      soalId: id,
      jawaban: jawaban[id] ?? null,
      raguRagu: !!ragu[id],
      detikDipakai: waktuSoal.current[id] ?? 0,
    }));

    setStatusSimpan("menyimpan");
    try {
      const res = await fetch(`/api/attempt/${attemptId}/jawab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jawaban: muatan }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.selesai || data?.habis) {
          setStatusSimpan("aman");
          return;
        }
        throw new Error("gagal");
      }
      setStatusSimpan("aman");
    } catch {
      // Kembalikan ke antrean supaya dicoba lagi.
      for (const id of ids) kotor.current.add(id);
      setStatusSimpan("gagal");
    }
  }, [attemptId, jawaban, ragu]);

  useEffect(() => {
    const t = setInterval(kirimKotor, INTERVAL_SIMPAN_MS);
    return () => clearInterval(t);
  }, [kirimKotor]);

  // ------------------------------------------------------
  // Penghitung waktu
  // ------------------------------------------------------
  const kirimSelesai = useCallback(
    async (otomatis: boolean) => {
      if (sudahSubmit.current) return;
      sudahSubmit.current = true;
      setMengirim(true);

      const semua = soal.map((s) => ({
        soalId: s.id,
        jawaban: jawaban[s.id] ?? null,
        raguRagu: !!ragu[s.id],
        detikDipakai: waktuSoal.current[s.id] ?? 0,
      }));

      try {
        const res = await fetch(`/api/attempt/${attemptId}/selesai`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ jawaban: semua, otomatis }),
        });
        if (!res.ok) throw new Error("gagal");
        try {
          localStorage.removeItem(kunciLokal);
        } catch {
          /* abaikan */
        }
        router.replace(`/hasil/${attemptId}`);
      } catch {
        sudahSubmit.current = false;
        setMengirim(false);
        setPesanError(
          "Gagal mengirim jawaban. Periksa koneksi lalu tekan 'Selesai & Kirim' lagi. Jawaban Anda tersimpan di perangkat ini.",
        );
      }
    },
    [attemptId, jawaban, kunciLokal, ragu, router, soal],
  );

  useEffect(() => {
    const tick = () => {
      const sisa = Math.round((batasMs - Date.now()) / 1000);
      setSisaDetik(sisa);

      const aktif = soal[idxRef.current];
      if (aktif && sisa > 0) {
        waktuSoal.current[aktif.id] = (waktuSoal.current[aktif.id] ?? 0) + 1;
      }
      if (sisa <= 0 && !sudahSubmit.current) {
        void kirimSelesai(true);
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [batasMs, kirimSelesai, soal]);

  // Peringatan saat menutup tab
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (sudahSubmit.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // Simpan terakhir saat halaman disembunyikan
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === "hidden") void kirimKotor();
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [kirimKotor]);

  // ------------------------------------------------------
  // Aksi
  // ------------------------------------------------------
  const pilih = useCallback(
    (soalId: string, opsi: OpsiKey) => {
      setJawaban((prev) => {
        const baru = { ...prev, [soalId]: prev[soalId] === opsi ? null : opsi };
        kotor.current.add(soalId);
        simpanLokal(baru, ragu);
        return baru;
      });
    },
    [ragu, simpanLokal],
  );

  const toggleRagu = useCallback(
    (soalId: string) => {
      setRagu((prev) => {
        const baru = { ...prev, [soalId]: !prev[soalId] };
        kotor.current.add(soalId);
        simpanLokal(jawaban, baru);
        return baru;
      });
    },
    [jawaban, simpanLokal],
  );

  // Pintasan keyboard: A–E memilih, panah pindah soal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (konfirmasi) return;
      const target = e.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;

      const k = e.key.toUpperCase();
      if (OPSI.includes(k as OpsiKey) && soalAktif) {
        e.preventDefault();
        pilih(soalAktif.id, k as OpsiKey);
      } else if (e.key === "ArrowRight") {
        setIdx((i) => Math.min(soal.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        setIdx((i) => Math.max(0, i - 1));
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [konfirmasi, pilih, soal.length, soalAktif]);

  // ------------------------------------------------------
  // Ringkasan
  // ------------------------------------------------------
  const ringkas = useMemo(() => {
    let terjawab = 0;
    let raguCount = 0;
    const perKategori: Record<Kategori, { total: number; terjawab: number }> = {
      TWK: { total: 0, terjawab: 0 },
      TIU: { total: 0, terjawab: 0 },
      TKP: { total: 0, terjawab: 0 },
    };
    for (const s of soal) {
      perKategori[s.kat].total += 1;
      if (jawaban[s.id]) {
        terjawab += 1;
        perKategori[s.kat].terjawab += 1;
      }
      if (ragu[s.id]) raguCount += 1;
    }
    return { terjawab, raguCount, kosong: soal.length - terjawab, perKategori };
  }, [jawaban, ragu, soal]);

  const kritis = sisaDetik !== null && sisaDetik <= 300;

  return (
    <div className="min-h-dvh bg-slate-100 pb-28 dark:bg-slate-950">
      {/* ---------- Bilah atas ---------- */}
      <div
        className={cx(
          "sticky top-0 z-30 border-b backdrop-blur",
          kritis
            ? "border-rose-300 bg-rose-50/95 dark:border-rose-900 dark:bg-rose-950/90"
            : "border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-900/95",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-900 dark:text-white">
              {paketNama}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Terjawab {ringkas.terjawab}/{soal.length} · Ragu {ringkas.raguCount}
              {statusSimpan === "menyimpan" ? " · menyimpan…" : null}
              {statusSimpan === "gagal" ? (
                <span className="font-semibold text-rose-600"> · gagal simpan, mencoba lagi</span>
              ) : null}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={cx(
                "rounded-xl px-4 py-2 text-center tabular-nums",
                kritis
                  ? "bg-rose-600 text-white"
                  : "bg-slate-900 text-white dark:bg-slate-800",
              )}
            >
              <p className="text-[10px] leading-none font-semibold tracking-widest uppercase opacity-70">
                Sisa waktu
              </p>
              <p className="text-xl leading-tight font-extrabold">
                {sisaDetik === null ? "--:--" : formatDurasi(Math.max(0, sisaDetik))}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setBukaNavigator((v) => !v)}
              className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
            >
              Soal
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_310px]">
        {/* ---------- Soal ---------- */}
        <div>
          {soalAktif ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white">
                  No. {soalAktif.nomor}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {soalAktif.kat}
                </span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {soalAktif.sub}
                </span>
              </div>

              <p className="mt-5 text-[15px] leading-8 whitespace-pre-line text-slate-800 sm:text-base dark:text-slate-100">
                {soalAktif.q}
              </p>

              {soalAktif.pre ? (
                <pre className="blok-figural">{soalAktif.pre}</pre>
              ) : null}

              <div className="mt-6 space-y-2.5">
                {OPSI.map((k) => {
                  const dipilih = jawaban[soalAktif.id] === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => pilih(soalAktif.id, k)}
                      className={cx(
                        "flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition sm:p-4",
                        dipilih
                          ? "border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500 dark:border-indigo-400 dark:bg-indigo-500/10"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800",
                      )}
                    >
                      <span
                        className={cx(
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                          dipilih
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
                        )}
                      >
                        {k}
                      </span>
                      <span className="pt-0.5 text-[15px] leading-7 text-slate-700 dark:text-slate-200">
                        {soalAktif.o[k]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => toggleRagu(soalAktif.id)}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold transition",
                    ragu[soalAktif.id]
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 3v18M5 4h13l-2.5 4L18 12H5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {ragu[soalAktif.id] ? "Ditandai ragu-ragu" : "Tandai ragu-ragu"}
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => setIdx((i) => Math.max(0, i - 1))}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
                  >
                    Sebelumnya
                  </button>
                  {idx === soal.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setKonfirmasi(true)}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                    >
                      Selesai &amp; Kirim
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIdx((i) => Math.min(soal.length - 1, i + 1))}
                      className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Selanjutnya
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Pintasan: tekan <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono dark:bg-slate-800">A</kbd>–
                <kbd className="rounded bg-slate-100 px-1.5 py-0.5 font-mono dark:bg-slate-800">E</kbd> untuk memilih,
                panah kiri/kanan untuk pindah soal. Menekan huruf yang sama membatalkan pilihan.
              </p>
            </div>
          ) : null}

          {pesanError ? (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-200">
              {pesanError}
            </div>
          ) : null}
        </div>

        {/* ---------- Navigator ---------- */}
        <aside
          className={cx(
            "lg:sticky lg:top-24 lg:block lg:self-start",
            bukaNavigator ? "block" : "hidden",
          )}
        >
          <div className="scroll-tipis max-h-[calc(100dvh-8rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Navigasi Soal
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <Legenda kelas="bg-indigo-600" label="Terjawab" />
              <Legenda kelas="bg-amber-500" label="Ragu-ragu" />
              <Legenda kelas="bg-slate-200 dark:bg-slate-700" label="Kosong" />
            </div>

            {URUTAN_KATEGORI.map((kat) => {
              const daftar = soal.filter((s) => s.kat === kat);
              if (daftar.length === 0) return null;
              const info = ringkas.perKategori[kat];
              return (
                <div key={kat} className="mt-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {kat}{" "}
                      <span className="font-normal text-slate-400">
                        {ATURAN[kat].namaPanjang}
                      </span>
                    </p>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {info.terjawab}/{info.total}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-8 gap-1.5 sm:grid-cols-10 lg:grid-cols-6">
                    {daftar.map((s) => {
                      const posisi = soal.findIndex((x) => x.id === s.id);
                      const dijawab = !!jawaban[s.id];
                      const isRagu = !!ragu[s.id];
                      const aktif = posisi === idx;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setIdx(posisi);
                            setBukaNavigator(false);
                          }}
                          className={cx(
                            "aspect-square rounded-md text-[11px] font-bold transition",
                            aktif && "ring-2 ring-slate-900 ring-offset-1 dark:ring-white dark:ring-offset-slate-900",
                            isRagu
                              ? "bg-amber-500 text-white"
                              : dijawab
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-200 text-slate-600 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200",
                          )}
                        >
                          {s.nomor}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => setKonfirmasi(true)}
              className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-500"
            >
              Selesai &amp; Kirim Jawaban
            </button>
            <p className="mt-2 text-center text-[11px] text-slate-400">
              Paket: {paketSlug}
            </p>
          </div>
        </aside>
      </div>

      {/* ---------- Dialog konfirmasi ---------- */}
      {konfirmasi ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Kirim jawaban sekarang?
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Setelah dikirim, jawaban tidak bisa diubah. Anda akan langsung
              melihat skor dan pembahasannya.
            </p>

            <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
              <RingkasKotak angka={ringkas.terjawab} label="Terjawab" warna="text-indigo-600" />
              <RingkasKotak angka={ringkas.kosong} label="Kosong" warna="text-rose-600" />
              <RingkasKotak angka={ringkas.raguCount} label="Ragu-ragu" warna="text-amber-600" />
            </dl>

            {ringkas.kosong > 0 ? (
              <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
                Masih ada {ringkas.kosong} soal kosong. Di SKD, soal kosong
                bernilai 0 — <strong>selalu lebih baik menebak</strong> daripada
                dikosongkan.
              </p>
            ) : null}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setKonfirmasi(false)}
                disabled={mengirim}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200"
              >
                Periksa lagi
              </button>
              <button
                type="button"
                onClick={() => void kirimSelesai(false)}
                disabled={mengirim}
                className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 disabled:opacity-60"
              >
                {mengirim ? "Mengirim…" : "Ya, kirim"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Legenda({ kelas, label }: { kelas: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cx("h-3 w-3 rounded", kelas)} />
      {label}
    </span>
  );
}

function RingkasKotak({
  angka,
  label,
  warna,
}: {
  angka: number;
  label: string;
  warna: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 py-3 dark:bg-slate-800">
      <dt className={cx("text-2xl font-extrabold", warna)}>{angka}</dt>
      <dd className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
        {label}
      </dd>
    </div>
  );
}
