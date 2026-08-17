# JalurASN — Platform Pejuang CPNS 2026

Platform gratis berisi **10 paket try out SKD (1.100 soal berpembahasan)**, analisis
kelemahan otomatis, peta persaingan antarpelamar, dan ruang komunitas — dengan
login email + kata sandi supaya seluruh riwayat pengerjaan tersimpan.

> Dibangun dari pengalaman nyata: gagal 2019 (Kominfo), gagal 2021 (Kejaksaan Jabar),
> lolos 2024 (Diskominfo Pemkab Pringsewu). Dua penyebab jalan memutar itu — niat
> yang belum bulat dan informasi yang berserakan — persis yang coba dijawab platform ini.

---

## 1. Isi platform

| Menu | Kegunaan |
|---|---|
| `/tryout` | Daftar 10 paket try out, progres, dan skor terbaik Anda |
| `/ujian/[id]` | Ruang pengerjaan CAT: timer server, autosave, tandai ragu, navigator 110 soal |
| `/hasil/[id]` | Skor per komponen vs ambang batas, 3 materi terlemah, persentil peserta |
| `/pembahasan/[id]` | Pembahasan tiap soal + **kolom diskusi per soal** |
| `/riwayat` | Grafik tren skor, 5 sub-materi terlemah gabungan, seluruh riwayat |
| `/peringkat` | Papan peringkat + **Peta Persaingan per formasi** |
| `/komunitas` | Cerita perjuangan (termasuk cerita gagal) |
| `/komunitas/mentor` | Daftar mentor alumni seleksi |
| `/info` | Panduan tahapan seleksi, aturan nilai SKD, strategi, dokumen, FAQ |
| `/profil` | Target instansi & formasi, status mentor, pengaturan privasi |

### Aturan penilaian try out

Mengikuti pola SKD CPNS (formasi umum):

| Komponen | Soal | Skor maks | Ambang batas | Penilaian |
|---|---:|---:|---:|---|
| TWK | 30 | 150 | **65** | Benar 5, salah/kosong 0 |
| TIU | 35 | 175 | **80** | Benar 5, salah/kosong 0 |
| TKP | 45 | 225 | **166** | Tiap opsi bernilai 1–5, kosong 0 |
| **Total** | **110** | **550** | **311** | Durasi 100 menit (130 menit untuk disabilitas sensorik netra) |

Lulus **hanya bila ketiga komponen** melewati ambang batasnya masing-masing.

---

## 2. Yang perlu disiapkan

- **Node.js 20.11 atau lebih baru** — cek dengan `node -v`
- **Database PostgreSQL** — gratis di [Neon](https://neon.tech) atau [Supabase](https://supabase.com)

Itu saja. Login memakai **email + kata sandi**, jadi tidak ada layanan pihak ketiga
yang perlu didaftarkan.

### Bagaimana kata sandi disimpan

Kata sandi **tidak pernah** disimpan apa adanya. Yang tersimpan hanya hasil
**scrypt** — fungsi turunan kunci yang bersifat *memory-hard*, jadi jauh lebih tahan
serangan GPU dibanding hash biasa seperti SHA-256. Setiap kata sandi mendapat *salt*
acak sendiri, dan pencocokannya memakai perbandingan waktu-tetap.

Scrypt dipilih karena sudah tersedia di dalam Node.js: tanpa dependensi tambahan dan
tanpa kompilasi native yang sering bermasalah di Windows.

Pengaman lain yang aktif:

| Pengaman | Perilaku |
|---|---|
| Kunci sementara | Setelah **5** percobaan gagal, akun dikunci **15 menit** |
| Anti penebakan email | Email yang belum terdaftar dan kata sandi salah memberi pesan yang sama |
| Aturan kata sandi | Minimal 8 karakter, tidak boleh hanya angka, tidak boleh sama dengan email |
| Sesi | JWT bertanda tangan, berlaku 30 hari |

---

## 3. Pemasangan langkah demi langkah

### Langkah 1 — Pasang dependensi

```bash
npm install
```

### Langkah 2 — Siapkan database PostgreSQL

Cara tercepat memakai **Neon** (tanpa kartu kredit):

1. Daftar di <https://neon.tech>, buat project baru.
2. Pilih region terdekat (mis. **Singapore / ap-southeast-1**).
3. Salin **Connection string** yang berbentuk:
   `postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`

### Langkah 3 — Isi berkas `.env`

Buka `.env` lalu ganti **satu** nilai saja, yaitu `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.aws.neon.tech/neondb?sslmode=require"
AUTH_SECRET="(sudah terisi otomatis)"
NEXTAUTH_URL="http://localhost:3000"
```

`AUTH_SECRET` sudah dibuatkan. Kalau suatu saat perlu membuat yang baru:

```bash
npx auth secret
```

> Mengganti `AUTH_SECRET` akan mengeluarkan semua pengguna yang sedang masuk,
> tetapi tidak menghapus akun maupun riwayat try out mereka.

### Langkah 4 — Buat tabel di database

```bash
npm run db:push
```

Perintah ini membuat seluruh tabel (User, Attempt, AttemptAnswer, Comment, Story, dll.)
sesuai `prisma/schema.prisma`. Untuk melihat isinya secara visual:

```bash
npm run db:studio
```

### Langkah 5 — Periksa kesiapan

```bash
npm run cek:auth
```

Perintah ini memeriksa: `.env` sudah terisi (bukan placeholder), `AUTH_SECRET` cukup
panjang, database bisa dihubungi, seluruh tabel sudah ada, dan kolom `passwordHash`
tersedia. Perbaiki semua yang bertanda `✖`, lalu jalankan ulang sampai bersih.

### Langkah 6 — Jalankan

```bash
npm run dev
```

Buka <http://localhost:3000/daftar>, buat akun pertama, lalu kerjakan Try Out 1.

---

## 3b. Menyelesaikan masalah login

| Yang terlihat | Penyebab | Perbaikan |
|---|---|---|
| **"Email atau kata sandi salah"** padahal yakin benar | Kata sandi memang keliru, atau akun didaftarkan dengan email lain | Reset dari terminal: `npm run reset:sandi -- email@anda.com` |
| **"Akun dikunci sementara…"** | 5 percobaan gagal beruntun | Tunggu 15 menit, atau buka paksa dengan `npm run reset:sandi -- email@anda.com` |
| Pesan tentang **kolom `passwordHash`** | Skema database masih versi lama | `npm run db:push` |
| Pesan tentang **database** saat daftar/masuk | `DATABASE_URL` salah atau tabel belum dibuat | `npm run db:push`, lalu `npm run cek:auth` |
| **"Konfigurasi login belum lengkap"** | `AUTH_SECRET` kosong | Isi di `.env`, hentikan server, `npm run dev` lagi |
| Tiba-tiba semua pengguna keluar | `AUTH_SECRET` berubah | Kembalikan nilai lamanya; akun & riwayat tidak hilang |

**Yang sering terlewat:** perubahan `.env` baru terbaca setelah server di-restart.
Tekan `Ctrl+C` lalu jalankan `npm run dev` lagi.

### Pengguna lupa kata sandi

Platform ini belum punya pemulihan lewat email (butuh layanan SMTP). Sebagai
gantinya, pengelola dapat menyetel ulang dari terminal:

```bash
npm run reset:sandi -- pengguna@email.com
```

Script akan membuatkan kata sandi acak, menampilkannya sekali di layar, dan sekaligus
membuka kunci akun. Sampaikan lewat jalur yang aman dan minta yang bersangkutan
segera menggantinya di halaman **Profil**.

Untuk menetapkan kata sandi tertentu:

```bash
npm run reset:sandi -- pengguna@email.com KataSandiBaru123
```

---

## 4. Menayangkan ke internet (Vercel)

1. Unggah project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "JalurASN: platform try out SKD CPNS 2026"
   git branch -M main
   git remote add origin https://github.com/USERNAME/jalurasn.git
   git push -u origin main
   ```
   > `.env` **tidak** ikut terunggah karena sudah masuk `.gitignore`. Itu memang disengaja.

2. Buka <https://vercel.com> → **Add New Project** → pilih repo tersebut.

3. Di **Environment Variables**, isi **dua** nilai ini (salin dari `.env`):
   - `DATABASE_URL`
   - `AUTH_SECRET`

   `NEXTAUTH_URL` tidak perlu diisi — Vercel mengisinya otomatis.

4. **Deploy**. Selesai — tidak ada langkah pendaftaran domain di layanan pihak ketiga,
   karena login memakai email dan kata sandi.

> Kalau `AUTH_SECRET` di Vercel berbeda dari yang di komputer Anda, itu tidak masalah.
> Yang penting nilainya **konsisten di satu lingkungan**; mengubahnya sewaktu-waktu
> hanya membuat pengguna harus masuk ulang.

---

## 5. Struktur project

```
src/
├── app/
│   ├── page.tsx                    # Beranda
│   ├── tryout/                     # Daftar & detail paket
│   ├── ujian/[id]/                 # Ruang pengerjaan CAT
│   ├── hasil/[id]/                 # Skor & analisis
│   ├── pembahasan/[id]/            # Pembahasan + diskusi
│   ├── riwayat/                    # Tren & sub-materi terlemah
│   ├── peringkat/                  # Papan peringkat & peta persaingan
│   ├── komunitas/                  # Cerita perjuangan & mentor
│   ├── info/                       # Panduan seleksi
│   ├── profil/                     # Target formasi & privasi
│   ├── actions/                    # Server action (auth, profil, cerita)
│   └── api/                        # Route handler (attempt, diskusi, auth)
├── components/
│   ├── form-akun.tsx               # Form masuk, daftar, ganti kata sandi
│   ├── ruang-ujian.tsx             # Mesin CAT (timer, autosave, navigator)
│   ├── panel-pembahasan.tsx        # Filter & kartu pembahasan
│   ├── diskusi-soal.tsx            # Komentar & balasan per soal
│   └── ui.tsx                      # Komponen dasar
├── data/
│   ├── paket.ts                    # Metadata 10 paket
│   └── soal/paket-01..10.json      # 1.100 soal + pembahasan
├── lib/
│   ├── skd.ts                      # Aturan & penilaian SKD
│   ├── soal.ts                     # Loader & analisis sub-materi
│   ├── auth.ts                     # Auth.js: Credentials + sesi JWT
│   ├── sandi.ts                    # Hash scrypt, validasi, aturan kunci akun
│   └── prisma.ts                   # Klien database
prisma/schema.prisma                # Skema database
scripts/
├── validate-questions.mjs          # Validator bank soal
├── normalize-questions.mjs         # Perapian format soal
├── patch-tkp.mjs                   # Utilitas ubah bobot TKP
├── cek-auth.mjs                    # Diagnosa login & database
└── reset-sandi.mjs                 # Setel ulang kata sandi pengguna
```

---

## 6. Menambah atau mengubah soal

Semua soal ada di `src/data/soal/paket-XX.json`. Formatnya:

**TWK / TIU** — punya kunci jawaban tunggal:

```json
{
  "id": "P1-TWK-01",
  "kat": "TWK",
  "sub": "Nasionalisme",
  "q": "Pertanyaannya di sini...",
  "o": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
  "k": "B",
  "p": "Pembahasan mengapa B benar dan mengapa opsi lain keliru."
}
```

**TKP** — tidak punya kunci, tetapi bobot 1–5 di setiap opsi:

```json
{
  "id": "P1-TKP-01",
  "kat": "TKP",
  "sub": "Pelayanan Publik",
  "q": "Situasinya di sini...",
  "o": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
  "s": { "A": 2, "B": 5, "C": 3, "D": 1, "E": 4 },
  "p": "Alasan mengapa B paling matang."
}
```

Soal figural boleh menambahkan `"pre"` berisi teks monospace (deret simbol).

Setelah mengubah, **wajib** jalankan validator:

```bash
npm run check:soal
```

Validator memastikan: 110 soal per paket (TWK 30 / TIU 35 / TKP 45), id unik lintas
paket, 5 opsi terisi, pembahasan ada, kunci TWK/TIU valid, dan **bobot TKP berupa
permutasi 1–5**.

---

## 7. Perintah yang tersedia

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Jalankan mode pengembangan |
| `npm run build` | Build produksi |
| `npm start` | Jalankan hasil build |
| `npm run db:push` | Terapkan skema ke database |
| `npm run db:studio` | Buka penjelajah database |
| `npm run check:soal` | Validasi seluruh bank soal |
| `npm run cek:auth` | Periksa kesiapan login & database |
| `npm run reset:sandi -- <email>` | Setel ulang kata sandi & buka kunci akun |

---

## 8. Catatan penting

- **Soal di sini adalah latihan, bukan soal resmi BKN.** Disusun mandiri berdasarkan
  kisi-kisi SKD yang terbuka untuk umum. Siapa pun yang menjanjikan bocoran soal CPNS
  patut dicurigai.
- **Angka ambang batas dan durasi** mengikuti pola seleksi 2021–2024. Ketentuan resmi
  2026 wajib dipastikan ke <https://sscasn.bkn.go.id>.
- **Data pengguna** yang disimpan hanya nama, email, dan hash kata sandi, ditambah
  isian profil yang dimasukkan sendiri oleh pengguna. Jangan menambahkan kolom NIK atau
  nomor pendaftaran — risikonya jauh lebih besar daripada manfaatnya.
- Peta Persaingan menggambarkan **pengguna JalurASN**, bukan seluruh pelamar formasi.
  Perlakukan sebagai sampel, bukan data resmi.

---

## 9. Lisensi & semangatnya

Gratis dipakai, disalin, dan dikembangkan siapa pun yang tujuannya membantu pejuang
CPNS. Kalau Anda memakainya, satu permintaan: **jangan pernah dijadikan berbayar dan
jangan dipakai menjual janji kelulusan.**
