"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    title: "Promo Koperasi",
    subtitle: "Diskon hingga 50% untuk semua kategori produk",
    bg: "bg-gradient-to-r from-orange-500 via-red-500 to-red-600",
  },
  {
    title: "Produk Desa Terbaik",
    subtitle: "Dukung produk lokal kualitas premium",
    bg: "bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500",
  },
  {
    title: "Gratis Ongkir Se-Indonesia",
    subtitle: "Min. belanja Rp0, berlaku untuk semua toko",
    bg: "bg-gradient-to-br from-red-700 via-red-600 to-orange-600",
  },
];

export default function Banner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  function go(delta: number) {
    setActive((prev) => (prev + delta + SLIDES.length) % SLIDES.length);
  }

  const slide = SLIDES[active];

  return (
    <div
      className={`relative overflow-hidden rounded ${slide.bg} px-6 py-10 text-white sm:px-12 sm:py-16`}
    >
      <div className="max-w-md animate-fadeIn" key={active}>
        <p className="text-2xl font-bold font-display sm:text-4xl">
          {slide.title}
        </p>
        <p className="mt-2 text-sm text-white/90 sm:text-base">
          {slide.subtitle}
        </p>
      </div>

      <button
        aria-label="Slide sebelumnya"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        aria-label="Slide berikutnya"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Ke slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
