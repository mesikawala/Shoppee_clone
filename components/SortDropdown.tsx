"use client";

import { useRouter } from "next/navigation";

const OPTIONS: { value: string; label: string }[] = [
  { value: "relevan", label: "Paling Sesuai" },
  { value: "terbaru", label: "Terbaru" },
  { value: "terlaris", label: "Terlaris" },
  { value: "termurah", label: "Harga Terendah" },
  { value: "termahal", label: "Harga Tertinggi" },
];

export default function SortDropdown({
  current,
  q,
  category,
}: {
  current: string;
  q?: string;
  category?: string;
}) {
  const router = useRouter();

  function handleChange(value: string) {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    params.set("sort", value);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 sm:text-sm">Urutkan:</span>
      <div className="flex gap-1.5">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleChange(opt.value)}
            className={`rounded-sm border px-2.5 py-1.5 text-xs transition-colors sm:text-sm ${
              current === opt.value
                ? "border-brand bg-brand text-white"
                : "border-gray-300 bg-white text-gray-600 hover:border-brand hover:text-brand"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
