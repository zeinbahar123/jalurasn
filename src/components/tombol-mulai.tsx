"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cx } from "@/components/ui";

export function TombolMulai({
  paketId,
  adaSesiBerjalan,
  sudahPernah,
}: {
  paketId: string;
  adaSesiBerjalan: boolean;
  sudahPernah: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [waktuTambahan, setWaktuTambahan] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function mulai() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/attempt/mulai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paketId, waktuTambahan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Gagal memulai try out.");
      router.push(`/ujian/${data.attemptId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={mulai}
        disabled={loading}
        className={cx(
          "w-full rounded-xl px-6 py-3.5 text-base font-bold text-white shadow-sm transition",
          adaSesiBerjalan
            ? "bg-amber-600 hover:bg-amber-500"
            : "bg-indigo-600 hover:bg-indigo-500",
          loading && "opacity-70",
        )}
      >
        {loading
          ? "Menyiapkan…"
          : adaSesiBerjalan
            ? "Lanjutkan Sesi yang Tertunda"
            : sudahPernah
              ? "Kerjakan Ulang Try Out Ini"
              : "Mulai Try Out Sekarang"}
      </button>

      {!adaSesiBerjalan ? (
        <label className="mt-3 flex cursor-pointer items-start gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3 text-sm dark:bg-slate-800/60">
          <input
            type="checkbox"
            checked={waktuTambahan}
            onChange={(e) => setWaktuTambahan(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600"
          />
          <span className="text-slate-600 dark:text-slate-300">
            Saya peserta penyandang disabilitas sensorik netra —{" "}
            <strong>berikan durasi 130 menit</strong> sesuai ketentuan seleksi.
          </span>
        </label>
      ) : null}

      {error ? (
        <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950/40 dark:text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}
