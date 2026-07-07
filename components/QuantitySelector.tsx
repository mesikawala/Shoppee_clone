"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  quantity,
  max,
  onChange,
}: {
  quantity: number;
  max: number;
  onChange: (value: number) => void;
}) {
  function set(value: number) {
    onChange(Math.min(Math.max(1, value), Math.max(1, max)));
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label="Kurangi jumlah"
        onClick={() => set(quantity - 1)}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 disabled:opacity-40"
      >
        <Minus size={14} />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => set(parseInt(e.target.value, 10) || 1)}
        className="h-8 w-12 border-y border-gray-300 text-center text-sm focus:outline-none"
        aria-label="Jumlah"
      />
      <button
        type="button"
        aria-label="Tambah jumlah"
        onClick={() => set(quantity + 1)}
        disabled={quantity >= max}
        className="flex h-8 w-8 items-center justify-center border border-gray-300 text-gray-600 disabled:opacity-40"
      >
        <Plus size={14} />
      </button>
      <span className="ml-3 text-xs text-gray-400">Stok: {max}</span>
    </div>
  );
}
