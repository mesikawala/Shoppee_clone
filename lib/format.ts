// lib/format.ts

export function formatRupiah(value: number): string {
  return "Rp" + Math.round(value).toLocaleString("id-ID");
}

export function formatSold(value: number): string {
  if (value >= 1000) {
    const rb = value / 1000;
    return `${rb % 1 === 0 ? rb.toFixed(0) : rb.toFixed(1)}rb terjual`;
  }
  return `${value} terjual`;
}

export function clampQuantity(qty: number, max: number): number {
  if (Number.isNaN(qty)) return 1;
  return Math.min(Math.max(1, qty), Math.max(1, max));
}
