"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { cx } from "@/components/ui";
import {
  daftarAction,
  masukAction,
  gantiSandiAction,
  type StatusForm,
} from "@/app/actions/auth";

// =========================================================
// Bagian dasar
// =========================================================

function Isian({
  label,
  nama,
  tipe = "text",
  placeholder,
  bantuan,
  autoComplete,
  required = true,
  defaultValue,
}: {
  label: string;
  nama: string;
  tipe?: string;
  placeholder?: string;
  bantuan?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  const { pending } = useFormStatus();
  const [lihat, setLihat] = useState(false);
  const sandi = tipe === "password";
  const tipeAkhir = sandi && lihat ? "text" : tipe;

  return (
    <div>
      <label
        htmlFor={nama}
        className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={nama}
          name={nama}
          type={tipeAkhir}
          required={required}
          disabled={pending}
          placeholder={placeholder}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          className={cx(
            "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm",
            "disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900",
            sandi && "pr-20",
          )}
        />
        {sandi ? (
          <button
            type="button"
            onClick={() => setLihat((v) => !v)}
            className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-slate-500 hover:text-indigo-600"
            aria-label={lihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          >
            {lihat ? "Sembunyikan" : "Lihat"}
          </button>
        ) : null}
      </div>
      {bantuan ? (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{bantuan}</p>
      ) : null}
    </div>
  );
}

function TombolKirim({ label, labelSibuk }: { label: string; labelSibuk: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          {labelSibuk}
        </>
      ) : (
        label
      )}
    </button>
  );
}

function Pesan({ status }: { status: StatusForm }) {
  if (!status?.error && !status?.sukses) return null;
  const gagal = !!status.error;
  return (
    <div
      role="alert"
      className={cx(
        "rounded-xl border px-4 py-3 text-sm",
        gagal
          ? "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-200"
          : "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200",
      )}
    >
      {status.error ?? status.sukses}
    </div>
  );
}

// =========================================================
// Form masuk
// =========================================================

export function FormMasuk({ lanjut }: { lanjut: string }) {
  const [status, aksi] = useActionState<StatusForm, FormData>(masukAction, null);

  return (
    <form action={aksi} className="space-y-4">
      <input type="hidden" name="redirectTo" value={lanjut} />
      <Pesan status={status} />

      <Isian
        label="Email"
        nama="email"
        tipe="email"
        placeholder="nama@email.com"
        autoComplete="email"
      />
      <Isian
        label="Kata sandi"
        nama="password"
        tipe="password"
        autoComplete="current-password"
      />

      <TombolKirim label="Masuk" labelSibuk="Memeriksa…" />

      <p className="pt-1 text-center text-sm text-slate-600 dark:text-slate-300">
        Belum punya akun?{" "}
        <Link
          href={`/daftar?lanjut=${encodeURIComponent(lanjut)}`}
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Daftar gratis
        </Link>
      </p>
    </form>
  );
}

// =========================================================
// Form daftar
// =========================================================

export function FormDaftar({ lanjut }: { lanjut: string }) {
  const [status, aksi] = useActionState<StatusForm, FormData>(daftarAction, null);

  return (
    <form action={aksi} className="space-y-4">
      <input type="hidden" name="redirectTo" value={lanjut} />
      <Pesan status={status} />

      <Isian
        label="Nama"
        nama="nama"
        placeholder="Nama yang tampil di diskusi"
        bantuan="Boleh nama panggilan. Bisa diubah kapan saja di halaman profil."
        autoComplete="name"
      />
      <Isian
        label="Email"
        nama="email"
        tipe="email"
        placeholder="nama@email.com"
        autoComplete="email"
      />
      <Isian
        label="Kata sandi"
        nama="password"
        tipe="password"
        bantuan="Minimal 8 karakter, jangan hanya angka."
        autoComplete="new-password"
      />
      <Isian
        label="Ulangi kata sandi"
        nama="passwordUlang"
        tipe="password"
        autoComplete="new-password"
      />

      <TombolKirim label="Buat Akun" labelSibuk="Membuat akun…" />

      <p className="pt-1 text-center text-sm text-slate-600 dark:text-slate-300">
        Sudah punya akun?{" "}
        <Link
          href={`/masuk?lanjut=${encodeURIComponent(lanjut)}`}
          className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}

// =========================================================
// Form ganti kata sandi (halaman profil)
// =========================================================

export function FormGantiSandi() {
  const [status, aksi] = useActionState<StatusForm, FormData>(gantiSandiAction, null);

  return (
    <form action={aksi} className="space-y-4">
      <Pesan status={status} />
      <Isian
        label="Kata sandi saat ini"
        nama="sandiLama"
        tipe="password"
        autoComplete="current-password"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Isian
          label="Kata sandi baru"
          nama="sandiBaru"
          tipe="password"
          bantuan="Minimal 8 karakter."
          autoComplete="new-password"
        />
        <Isian
          label="Ulangi kata sandi baru"
          nama="sandiBaruUlang"
          tipe="password"
          autoComplete="new-password"
        />
      </div>
      <div className="pt-1">
        <TombolKirim label="Perbarui Kata Sandi" labelSibuk="Menyimpan…" />
      </div>
    </form>
  );
}
