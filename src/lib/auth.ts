import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import {
  BATAS_GAGAL,
  MENIT_KUNCI,
  cocokkanSandi,
  emailValid,
  rapikanEmail,
} from "@/lib/sandi";

/**
 * Login memakai email + kata sandi.
 *
 * Catatan penting: Auth.js v5 TIDAK mendukung session berbasis database untuk
 * provider Credentials, sehingga strategi sesi di sini wajib "jwt". Karena itu
 * tabel Account/Session/VerificationToken tidak diperlukan dan sudah dihapus
 * dari skema.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Email dan kata sandi",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Kata sandi", type: "password" },
      },
      async authorize(credentials) {
        const email = rapikanEmail(credentials?.email);
        const sandi =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (!emailValid(email) || sandi.length === 0) return null;

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            passwordHash: true,
            gagalMasuk: true,
            terkunciSampai: true,
          },
        });

        // Akun tidak ada → tolak tanpa membocorkan bahwa emailnya belum terdaftar.
        if (!user) return null;

        // Sedang terkunci karena terlalu banyak percobaan gagal.
        if (user.terkunciSampai && user.terkunciSampai.getTime() > Date.now()) {
          return null;
        }

        const cocok = await cocokkanSandi(sandi, user.passwordHash);

        if (!cocok) {
          const gagalBaru = user.gagalMasuk + 1;
          await prisma.user.update({
            where: { id: user.id },
            data: {
              gagalMasuk: gagalBaru,
              terkunciSampai:
                gagalBaru >= BATAS_GAGAL
                  ? new Date(Date.now() + MENIT_KUNCI * 60_000)
                  : null,
            },
          });
          return null;
        }

        // Berhasil → nolkan kembali penghitung kegagalan.
        if (user.gagalMasuk !== 0 || user.terkunciSampai) {
          await prisma.user.update({
            where: { id: user.id },
            data: { gagalMasuk: 0, terkunciSampai: null },
          });
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30, // 30 hari
  },
  pages: {
    signIn: "/masuk",
    error: "/masuk",
  },
  callbacks: {
    jwt({ token, user }) {
      // `user` hanya terisi pada saat login berhasil.
      if (user?.id) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      const id = typeof token.id === "string" ? token.id : null;
      if (!id || !session.user) return session;

      // Ambil profil terbaru dari database supaya perubahan di halaman Profil
      // langsung terlihat tanpa perlu keluar-masuk akun.
      const profil = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          namaTampilan: true,
          targetInstansi: true,
          targetFormasi: true,
          isMentor: true,
        },
      });

      // Akun sudah dihapus tetapi token masih ada → kosongkan identitasnya.
      if (!profil) {
        session.user.id = "";
        return session;
      }

      session.user.id = profil.id;
      session.user.name = profil.name;
      session.user.email = profil.email;
      session.user.image = profil.image;
      session.user.namaTampilan = profil.namaTampilan;
      session.user.targetInstansi = profil.targetInstansi;
      session.user.targetFormasi = profil.targetFormasi;
      session.user.isMentor = profil.isMentor;
      return session;
    },
  },
});

/** Ambil sesi; mengembalikan null bila belum masuk. */
export async function wajibLogin() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session;
}
