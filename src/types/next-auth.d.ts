import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      namaTampilan?: string | null;
      targetInstansi?: string | null;
      targetFormasi?: string | null;
      isMentor?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** Id pengguna, diisi saat login berhasil. */
    id?: string;
  }
}

export {};
