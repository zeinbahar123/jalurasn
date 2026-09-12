import { DefaultSession } from "next-auth";
import type { SubscriptionPlan } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      subscription: SubscriptionPlan;
      namaTampilan?: string | null;
      targetInstansi?: string | null;
      targetFormasi?: string | null;
      isMentor?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    subscription?: SubscriptionPlan;
    namaTampilan?: string | null;
    targetInstansi?: string | null;
    targetFormasi?: string | null;
    isMentor?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}