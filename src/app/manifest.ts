import type { MetadataRoute } from "next";
import { SITUS } from "@/lib/situs";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITUS.namaPanjang,
    short_name: SITUS.nama,
    description: SITUS.deskripsiSingkat,
    start_url: "/tryout",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#4f46e5",
    lang: "id",
    categories: ["education"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
