import type { MetadataRoute } from "next";
import { urlAbsolut } from "@/lib/situs";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Halaman milik pengguna dan endpoint internal tidak perlu diindeks.
        disallow: ["/api/", "/ujian/", "/hasil/", "/pembahasan/", "/riwayat", "/profil"],
      },
    ],
    sitemap: urlAbsolut("/sitemap.xml"),
    host: urlAbsolut("/"),
  };
}
