"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cx } from "@/components/ui";

interface Komentar {
  id: string;
  isi: string;
  parentId: string | null;
  createdAt: string;
  milikSaya: boolean;
  penulis: {
    nama: string;
    foto: string | null;
    isMentor: boolean;
    instansiLolos: string | null;
    tahunLolos: number | null;
  };
  suka: number;
  sudahSuka: boolean;
}

export function DiskusiSoal({
  soalId,
  paketId,
  bisaKomentar,
}: {
  soalId: string;
  paketId: string;
  bisaKomentar: boolean;
}) {
  const [komentar, setKomentar] = useState<Komentar[] | null>(null);
  const [isi, setIsi] = useState("");
  const [balasKe, setBalasKe] = useState<string | null>(null);
  const [isiBalasan, setIsiBalasan] = useState("");
  const [kirim, setKirim] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const muat = useCallback(async () => {
    try {
      const res = await fetch(`/api/diskusi?soalId=${encodeURIComponent(soalId)}`);
      const data = await res.json();
      setKomentar(data.komentar ?? []);
    } catch {
      setKomentar([]);
    }
  }, [soalId]);

  useEffect(() => {
    void muat();
  }, [muat]);

  async function tambah(teks: string, parentId: string | null) {
    const bersih = teks.trim();
    if (bersih.length < 2) return;
    setKirim(true);
    setError(null);
    try {
      const res = await fetch("/api/diskusi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ soalId, paketId, isi: bersih, parentId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Gagal mengirim.");
      setIsi("");
      setIsiBalasan("");
      setBalasKe(null);
      await muat();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal mengirim komentar.");
    } finally {
      setKirim(false);
    }
  }

  async function toggleSuka(id: string) {
    setKomentar(
      (prev) =>
        prev?.map((k) =>
          k.id === id
            ? { ...k, sudahSuka: !k.sudahSuka, suka: k.suka + (k.sudahSuka ? -1 : 1) }
            : k,
        ) ?? prev,
    );
    try {
      await fetch(`/api/diskusi/${id}/suka`, { method: "POST" });
    } catch {
      void muat();
    }
  }

  async function hapus(id: string) {
    if (!confirm("Hapus komentar ini?")) return;
    try {
      await fetch(`/api/diskusi?id=${id}`, { method: "DELETE" });
      await muat();
    } catch {
      /* abaikan */
    }
  }

  const induk = (komentar ?? []).filter((k) => !k.parentId);
  const balasan = (komentar ?? []).filter((k) => k.parentId);

  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-700 dark:bg-slate-800/40">
      <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
        Diskusi soal ini
        {komentar ? (
          <span className="ml-1.5 font-normal text-slate-400">
            ({komentar.length})
          </span>
        ) : null}
      </p>

      {komentar === null ? (
        <p className="mt-3 text-sm text-slate-400">Memuat diskusi…</p>
      ) : komentar.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Belum ada yang berdiskusi di soal ini. Kalau ada bagian pembahasan yang
          masih membingungkan, tanyakan di sini — peserta lain dan mentor alumni
          bisa menjawab.
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {induk.map((k) => (
            <li key={k.id}>
              <ItemKomentar
                k={k}
                onSuka={() => toggleSuka(k.id)}
                onBalas={() => setBalasKe(balasKe === k.id ? null : k.id)}
                onHapus={() => hapus(k.id)}
                bisaKomentar={bisaKomentar}
              />

              {balasan
                .filter((b) => b.parentId === k.id)
                .map((b) => (
                  <div key={b.id} className="mt-3 ml-6 border-l-2 border-slate-200 pl-4 dark:border-slate-700">
                    <ItemKomentar
                      k={b}
                      onSuka={() => toggleSuka(b.id)}
                      onHapus={() => hapus(b.id)}
                      bisaKomentar={bisaKomentar}
                    />
                  </div>
                ))}

              {balasKe === k.id && bisaKomentar ? (
                <div className="mt-3 ml-6">
                  <textarea
                    value={isiBalasan}
                    onChange={(e) => setIsiBalasan(e.target.value)}
                    rows={2}
                    placeholder="Tulis balasan…"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      type="button"
                      disabled={kirim}
                      onClick={() => tambah(isiBalasan, k.id)}
                      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      Kirim balasan
                    </button>
                    <button
                      type="button"
                      onClick={() => setBalasKe(null)}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      {bisaKomentar ? (
        <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            rows={3}
            maxLength={1500}
            placeholder="Tanya atau bantu jelaskan soal ini… (contoh: kenapa opsi C tidak bisa dipakai?)"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-900"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-400">{isi.length}/1500</p>
            <button
              type="button"
              disabled={kirim || isi.trim().length < 2}
              onClick={() => tambah(isi, null)}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
            >
              {kirim ? "Mengirim…" : "Kirim"}
            </button>
          </div>
          {error ? (
            <p className="mt-2 text-xs font-medium text-rose-600">{error}</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
          Masuk atau daftar gratis untuk ikut berdiskusi di soal ini.
        </p>
      )}
    </div>
  );
}

function ItemKomentar({
  k,
  onSuka,
  onBalas,
  onHapus,
  bisaKomentar,
}: {
  k: Komentar;
  onSuka: () => void;
  onBalas?: () => void;
  onHapus: () => void;
  bisaKomentar: boolean;
}) {
  return (
    <div className="flex gap-3">
      {k.penulis.foto ? (
        <Image
          src={k.penulis.foto}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 shrink-0 rounded-full"
        />
      ) : (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
          {k.penulis.nama.charAt(0).toUpperCase()}
        </span>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {k.penulis.nama}
          </span>
          {k.penulis.isMentor ? (
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              MENTOR
              {k.penulis.tahunLolos ? ` ${k.penulis.tahunLolos}` : ""}
              {k.penulis.instansiLolos ? ` · ${k.penulis.instansiLolos}` : ""}
            </span>
          ) : null}
          <span className="text-xs text-slate-400">{waktuRelatif(k.createdAt)}</span>
        </div>

        <p className="mt-1 text-sm leading-6 whitespace-pre-line text-slate-700 dark:text-slate-200">
          {k.isi}
        </p>

        <div className="mt-1.5 flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={onSuka}
            disabled={!bisaKomentar}
            className={cx(
              "inline-flex items-center gap-1 font-semibold disabled:opacity-50",
              k.sudahSuka ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500",
            )}
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={k.sudahSuka ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M7 22V11l4.5-8a2 2 0 0 1 3.6 1.3L14 9h4.6a2.4 2.4 0 0 1 2.3 3l-1.8 7A2.4 2.4 0 0 1 16.8 21H7z" strokeLinejoin="round" />
            </svg>
            {k.suka > 0 ? k.suka : "Membantu"}
          </button>
          {onBalas && bisaKomentar ? (
            <button
              type="button"
              onClick={onBalas}
              className="font-semibold text-slate-500 hover:text-indigo-600"
            >
              Balas
            </button>
          ) : null}
          {k.milikSaya ? (
            <button
              type="button"
              onClick={onHapus}
              className="font-semibold text-slate-400 hover:text-rose-600"
            >
              Hapus
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function waktuRelatif(iso: string): string {
  const detik = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (detik < 60) return "baru saja";
  if (detik < 3600) return `${Math.floor(detik / 60)} menit lalu`;
  if (detik < 86400) return `${Math.floor(detik / 3600)} jam lalu`;
  if (detik < 2592000) return `${Math.floor(detik / 86400)} hari lalu`;
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
