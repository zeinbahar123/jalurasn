import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Memastikan user sudah login dan memiliki paket PREMIUM.
 *
 * FREE      → diarahkan ke /upgrade
 * PREMIUM   → boleh melanjutkan
 * Belum login → diarahkan ke /masuk
 */
export async function wajibPremium() {
  const session = await auth();

  // Belum login
  if (!session?.user?.id) {
    redirect("/masuk");
  }

  // Ambil status terbaru langsung dari database.
  // Dengan cara ini status PREMIUM tidak hanya bergantung
  // pada isi JWT/session yang mungkin masih lama.
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      subscription: true,
    },
  });

  // User sudah tidak ditemukan.
  if (!user) {
    redirect("/masuk");
  }

  // Belum PREMIUM.
  if (user.subscription !== "PREMIUM") {
    redirect("/upgrade");
  }

  return user;
}