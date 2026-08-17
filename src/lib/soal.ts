import type { Kategori, Soal, SoalMentah } from "@/lib/skd";
import { URUTAN_KATEGORI } from "@/lib/skd";
import { PAKET } from "@/data/paket";

import p01 from "@/data/soal/paket-01.json";
import p02 from "@/data/soal/paket-02.json";
import p03 from "@/data/soal/paket-03.json";
import p04 from "@/data/soal/paket-04.json";
import p05 from "@/data/soal/paket-05.json";
import p06 from "@/data/soal/paket-06.json";
import p07 from "@/data/soal/paket-07.json";
import p08 from "@/data/soal/paket-08.json";
import p09 from "@/data/soal/paket-09.json";
import p10 from "@/data/soal/paket-10.json";

const BANK: Record<string, unknown[]> = {
  "paket-01": p01,
  "paket-02": p02,
  "paket-03": p03,
  "paket-04": p04,
  "paket-05": p05,
  "paket-06": p06,
  "paket-07": p07,
  "paket-08": p08,
  "paket-09": p09,
  "paket-10": p10,
};

const cache = new Map<string, Soal[]>();

/**
 * Ambil seluruh soal satu paket, sudah diurutkan TWK → TIU → TKP
 * dan diberi nomor 1..110 seperti tampilan CAT.
 */
export function getSoalPaket(paketId: string): Soal[] {
  const cached = cache.get(paketId);
  if (cached) return cached;

  const raw = BANK[paketId] as SoalMentah[] | undefined;
  if (!raw) return [];

  const urut = [...raw].sort((a, b) => {
    const ka = URUTAN_KATEGORI.indexOf(a.kat);
    const kb = URUTAN_KATEGORI.indexOf(b.kat);
    if (ka !== kb) return ka - kb;
    return a.id.localeCompare(b.id, "en", { numeric: true });
  });

  const hasil: Soal[] = urut.map((s, i) => ({ ...s, nomor: i + 1, paketId }));
  cache.set(paketId, hasil);
  return hasil;
}

export function getSoalById(paketId: string, soalId: string): Soal | undefined {
  return getSoalPaket(paketId).find((s) => s.id === soalId);
}

/** Versi tanpa kunci jawaban & pembahasan — dikirim ke halaman pengerjaan. */
export type SoalUjian = Omit<Soal, "k" | "s" | "p">;

export function tanpaKunci(soal: Soal[]): SoalUjian[] {
  return soal.map(({ k: _k, s: _s, p: _p, ...sisa }) => sisa);
}

export interface StatistikPaket {
  paketId: string;
  total: number;
  perKategori: Record<Kategori, number>;
  subKategori: Record<Kategori, string[]>;
}

export function statistikPaket(paketId: string): StatistikPaket {
  const soal = getSoalPaket(paketId);
  const perKategori = { TWK: 0, TIU: 0, TKP: 0 } as Record<Kategori, number>;
  const subSet: Record<Kategori, Set<string>> = {
    TWK: new Set(),
    TIU: new Set(),
    TKP: new Set(),
  };
  for (const s of soal) {
    perKategori[s.kat] += 1;
    subSet[s.kat].add(s.sub);
  }
  return {
    paketId,
    total: soal.length,
    perKategori,
    subKategori: {
      TWK: [...subSet.TWK].sort(),
      TIU: [...subSet.TIU].sort(),
      TKP: [...subSet.TKP].sort(),
    },
  };
}

export function totalSoalSemuaPaket(): number {
  return PAKET.reduce((acc, p) => acc + getSoalPaket(p.id).length, 0);
}

/** Rekap akurasi per sub-materi untuk halaman analisis hasil. */
export interface BarisAnalisis {
  kategori: Kategori;
  sub: string;
  jumlah: number;
  benar: number;
  poin: number;
  poinMaks: number;
  persen: number;
}

export function analisisSubMateri(
  soal: Soal[],
  jawaban: Record<string, string | null>,
): BarisAnalisis[] {
  const map = new Map<string, BarisAnalisis>();

  for (const s of soal) {
    const key = `${s.kat}|${s.sub}`;
    let row = map.get(key);
    if (!row) {
      row = {
        kategori: s.kat,
        sub: s.sub,
        jumlah: 0,
        benar: 0,
        poin: 0,
        poinMaks: 0,
        persen: 0,
      };
      map.set(key, row);
    }
    row.jumlah += 1;
    row.poinMaks += 5;

    const j = jawaban[s.id] ?? null;
    if (s.kat === "TKP") {
      const poin = j ? (s.s?.[j as keyof typeof s.s] ?? 0) : 0;
      row.poin += poin;
      if (poin >= 4) row.benar += 1;
    } else {
      const benar = !!j && j === s.k;
      if (benar) {
        row.benar += 1;
        row.poin += 5;
      }
    }
  }

  const rows = [...map.values()];
  for (const r of rows) r.persen = r.poinMaks ? Math.round((r.poin / r.poinMaks) * 100) : 0;
  rows.sort((a, b) => {
    const ka = URUTAN_KATEGORI.indexOf(a.kategori);
    const kb = URUTAN_KATEGORI.indexOf(b.kategori);
    if (ka !== kb) return ka - kb;
    return a.sub.localeCompare(b.sub, "id");
  });
  return rows;
}
