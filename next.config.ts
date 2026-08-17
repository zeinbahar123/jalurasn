import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Build produksi tidak diblokir oleh lint; jalankan `npm run lint` terpisah.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
