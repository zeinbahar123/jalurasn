"use client";

import Link from "next/link";
import { useState } from "react";

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePayment() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.sudahPremium) {
          window.location.href = "/tryout";
          return;
        }

        throw new Error(
          data.error || "Gagal membuat transaksi pembayaran.",
        );
      }

      if (!data.redirectUrl) {
        throw new Error("Link pembayaran dari Midtrans tidak tersedia.");
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat membuat pembayaran.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <span className="inline-flex rounded-xl bg-indigo-500/10 px-3 py-2 text-xs font-black uppercase tracking-wider text-indigo-700 ring-1 ring-indigo-600/20 dark:text-indigo-300">
            TACTIX Premium
          </span>

          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Jangan berhenti di Try Out 1.
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Kuasai seluruh latihan TACTIX.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Try Out 1 bisa Anda gunakan secara gratis. Dengan TACTIX Premium,
            seluruh Try Out 2–10 terbuka dan dapat digunakan untuk latihan
            berulang kali.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Apa yang Anda dapatkan?
            </h2>

            <div className="mt-6 space-y-3">
              {[
                {
                  judul: "Try Out 2–10 terbuka",
                  deskripsi:
                    "Satu akses Premium membuka seluruh paket Try Out Premium.",
                },
                {
                  judul: "1.100 soal latihan",
                  deskripsi:
                    "Latihan lengkap dari 10 paket dengan 110 soal per paket.",
                },
                {
                  judul: "Simulasi bergaya CAT",
                  deskripsi:
                    "Latihan dengan pembagian TWK, TIU, dan TKP serta batas waktu.",
                },
                {
                  judul: "Pembahasan soal",
                  deskripsi:
                    "Pelajari kembali soal yang sudah Anda kerjakan.",
                },
                {
                  judul: "Analisis perkembangan",
                  deskripsi:
                    "Gunakan riwayat dan hasil try out untuk melihat perkembangan.",
                },
                {
                  judul: "Strategi & trik cepat TACTIX",
                  deskripsi:
                    "Belajar bukan hanya lebih banyak, tetapi juga lebih cepat dan tepat.",
                },
              ].map((item) => (
                <div
                  key={item.judul}
                  className="flex gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/70"
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.judul}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-lg shadow-indigo-500/10 dark:border-indigo-900 dark:bg-slate-900 sm:p-8">
            <div className="text-center">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                AKSES PREMIUM
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-950 dark:text-white">
                TACTIX Premium
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Satu kali pembelian untuk membuka seluruh Try Out 2–10.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-indigo-50 p-5 text-center dark:bg-indigo-950/40">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                Harga Premium
              </p>

              <p className="mt-2 text-4xl font-black text-slate-950 dark:text-white">
                Rp100.000
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Sekali bayar · akses Try Out 2–10
              </p>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
                {error}
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handlePayment}
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-black text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Menyiapkan Pembayaran..." : "Beli Premium Rp100.000"}
              </button>

              <Link
                href="/tryout"
                className="block w-full rounded-xl border border-slate-300 px-6 py-3.5 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Kembali ke Try Out
              </Link>
            </div>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
              Pembayaran diproses melalui Midtrans. Setelah pembayaran
              dikonfirmasi, akses Premium akan diaktifkan pada akun Anda.
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Sudah punya akses Premium?
          </p>

          <Link
            href="/tryout"
            className="mt-2 inline-block text-sm font-black text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Buka halaman Try Out →
          </Link>
        </div>
      </section>
    </main>
  );
}