import { ImageResponse } from "next/og";

export const alt = "JalurASN — Try Out SKD CPNS 2026 Gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Gambar pratinjau saat tautan dibagikan di WhatsApp, X, Facebook, dan LinkedIn.
 * Dibuat dari kode agar selalu konsisten dan tidak perlu menyimpan berkas gambar.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 55%, #4338ca 100%)",
          padding: 72,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 20,
              background: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: 800,
            }}
          >
            J
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>JalurASN</div>
          <div
            style={{
              marginLeft: 12,
              padding: "8px 18px",
              borderRadius: 999,
              background: "rgba(251,191,36,0.16)",
              color: "#fcd34d",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            100% Gratis
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 74, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
            Try Out SKD CPNS 2026
          </div>
          <div style={{ fontSize: 36, color: "#c7d2fe", lineHeight: 1.35, maxWidth: 940 }}>
            10 paket · 1.100 soal TWK TIU TKP · pembahasan lengkap · analisis kelemahan
          </div>
        </div>

        <div style={{ display: "flex", gap: 48, fontSize: 27, color: "#a5b4fc" }}>
          <div style={{ display: "flex" }}>Ambang batas TWK 65 · TIU 80 · TKP 166</div>
          <div style={{ display: "flex" }}>110 soal / 100 menit</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
