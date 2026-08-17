import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { simpanProfilAction } from "@/app/actions/profil";
import { Card, Callout, Button } from "@/components/ui";
import { FormGantiSandi } from "@/components/form-akun";
import { Avatar } from "@/components/site-header";
import { SKOR_MAKS_TOTAL } from "@/lib/skd";

export const metadata: Metadata = {
  title: "Profil Saya",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Kepulauan Riau", "Jambi",
  "Sumatera Selatan", "Bangka Belitung", "Bengkulu", "Lampung", "DKI Jakarta",
  "Jawa Barat", "Banten", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Bali",
  "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat",
  "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur",
  "Kalimantan Utara", "Sulawesi Utara", "Gorontalo", "Sulawesi Tengah",
  "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tenggara", "Maluku",
  "Maluku Utara", "Papua", "Papua Barat", "Papua Barat Daya", "Papua Tengah",
  "Papua Pegunungan", "Papua Selatan",
];

const PENDIDIKAN = ["SMA/SMK sederajat", "D-III", "D-IV", "S-1", "S-2", "S-3"];

export default async function Profil() {
  const session = await auth();
  if (!session?.user?.id) redirect("/masuk?lanjut=/profil");

  const [user, ringkas] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        name: true,
        email: true,
        image: true,
        namaTampilan: true,
        targetInstansi: true,
        targetFormasi: true,
        targetProvinsi: true,
        pendidikan: true,
        bio: true,
        tampilDiPeringkat: true,
        isMentor: true,
        tahunLolos: true,
        instansiLolos: true,
        createdAt: true,
      },
    }),
    prisma.attempt.aggregate({
      where: { userId: session.user.id, status: "SELESAI" },
      _count: { _all: true },
      _max: { skorTotal: true },
    }),
  ]);

  if (!user) redirect("/masuk");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center gap-4">
        <Avatar src={user.image} nama={user.name} size={56} />
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {user.namaTampilan || user.name || "Pejuang CPNS"}
          </h1>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            {user.email}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Try out selesai
          </p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
            {ringkas._count._all}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Skor terbaik
          </p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
            {ringkas._max.skorTotal ?? 0}
            <span className="text-sm font-semibold text-slate-400">
              {" "}
              / {SKOR_MAKS_TOTAL}
            </span>
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
            Bergabung
          </p>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
            {user.createdAt.toLocaleDateString("id-ID", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </Card>
      </div>

      <form action={simpanProfilAction} className="mt-8 space-y-6">
        {/* ---------- Target seleksi ---------- */}
        <Card>
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Target seleksi Anda
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Data ini yang membentuk Peta Persaingan. Semakin banyak yang
              mengisi, semakin berguna untuk semua orang.
            </p>
          </div>
          <div className="grid gap-5 p-5 sm:grid-cols-2">
            <Isian
              label="Nama tampilan"
              nama="namaTampilan"
              nilai={user.namaTampilan ?? ""}
              placeholder={user.name ?? "Nama yang tampil di diskusi"}
              bantuan="Boleh nama panggilan. Ini yang muncul di diskusi & papan peringkat."
            />
            <Isian
              label="Instansi yang diincar"
              nama="targetInstansi"
              nilai={user.targetInstansi ?? ""}
              placeholder="Contoh: Pemkab Pringsewu"
            />
            <Isian
              label="Formasi / jabatan"
              nama="targetFormasi"
              nilai={user.targetFormasi ?? ""}
              placeholder="Contoh: Pranata Komputer Ahli Pertama"
            />
            <Pilihan
              label="Provinsi"
              nama="targetProvinsi"
              nilai={user.targetProvinsi ?? ""}
              opsi={PROVINSI}
            />
            <Pilihan
              label="Pendidikan terakhir"
              nama="pendidikan"
              nilai={user.pendidikan ?? ""}
              opsi={PENDIDIKAN}
            />
          </div>
        </Card>

        {/* ---------- Tentang saya ---------- */}
        <Card>
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Tentang Anda
            </h2>
          </div>
          <div className="p-5">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Cerita singkat
            </label>
            <textarea
              name="bio"
              defaultValue={user.bio ?? ""}
              rows={4}
              maxLength={600}
              placeholder="Contoh: Percobaan ke-2. 2024 gagal di TIU tipis 5 poin. Sekarang fokus benerin deret angka dan silogisme."
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Ditampilkan di halaman komunitas. Jangan tulis NIK, nomor
              pendaftaran, atau data pribadi lain.
            </p>
          </div>
        </Card>

        {/* ---------- Mentor ---------- */}
        <Card>
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Sudah pernah lolos? Jadi mentor
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              Jawaban Anda di kolom diskusi akan diberi lencana MENTOR, dan nama
              Anda masuk daftar mentor yang bisa ditanya pejuang lain.
            </p>
          </div>
          <div className="p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="isMentor"
                defaultChecked={user.isMentor}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Saya sudah pernah dinyatakan lolos seleksi CPNS/PPPK dan bersedia
                membantu menjawab pertanyaan peserta lain.
              </span>
            </label>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Isian
                label="Tahun lolos"
                nama="tahunLolos"
                nilai={user.tahunLolos ? String(user.tahunLolos) : ""}
                placeholder="2024"
                tipe="text"
              />
              <Isian
                label="Instansi tempat lolos"
                nama="instansiLolos"
                nilai={user.instansiLolos ?? ""}
                placeholder="Contoh: Diskominfo Pemkab Pringsewu"
              />
            </div>
          </div>
        </Card>

        {/* ---------- Privasi ---------- */}
        <Card>
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Privasi
            </h2>
          </div>
          <div className="p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                name="tampilDiPeringkat"
                defaultChecked={user.tampilDiPeringkat}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Tampilkan nama dan foto saya di papan peringkat.
                <span className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  Jika dimatikan, skor Anda tetap ikut dihitung dalam statistik
                  peta persaingan tapi identitas Anda tampil sebagai
                  &quot;Peserta anonim&quot;.
                </span>
              </span>
            </label>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button type="submit" ukuran="lg">
            Simpan Profil
          </Button>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Perubahan langsung berlaku di seluruh halaman.
          </p>
        </div>
      </form>

      {/* ---------- Ganti kata sandi (form terpisah) ---------- */}
      <Card className="mt-6">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Ganti kata sandi
          </h2>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            Anda akan tetap masuk di perangkat ini setelah menggantinya.
          </p>
        </div>
        <div className="p-5">
          <FormGantiSandi />
        </div>
      </Card>

      <div className="mt-8">
        <Callout nada="info" judul="Kenapa perlu mengisi formasi?">
          Tanpa data formasi, papan peringkat cuma jadi daftar angka. Dengan data
          formasi, Anda bisa tahu apakah skor 380 Anda itu aman atau justru masih
          di bawah rata-rata pesaing di jabatan yang sama — informasi yang selama
          ini baru diketahui pelamar setelah pengumuman.
        </Callout>
      </div>
    </div>
  );
}

function Isian({
  label,
  nama,
  nilai,
  placeholder,
  bantuan,
  tipe = "text",
}: {
  label: string;
  nama: string;
  nilai: string;
  placeholder?: string;
  bantuan?: string;
  tipe?: string;
}) {
  return (
    <div>
      <label
        htmlFor={nama}
        className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <input
        id={nama}
        name={nama}
        type={tipe}
        defaultValue={nilai}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
      />
      {bantuan ? (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">{bantuan}</p>
      ) : null}
    </div>
  );
}

function Pilihan({
  label,
  nama,
  nilai,
  opsi,
}: {
  label: string;
  nama: string;
  nilai: string;
  opsi: string[];
}) {
  return (
    <div>
      <label
        htmlFor={nama}
        className="block text-sm font-semibold text-slate-700 dark:text-slate-200"
      >
        {label}
      </label>
      <select
        id={nama}
        name={nama}
        defaultValue={nilai}
        className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <option value="">— pilih —</option>
        {opsi.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
