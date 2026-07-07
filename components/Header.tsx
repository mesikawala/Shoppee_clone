"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [query, setQuery] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/products?${params.toString()}`);
  }

  return (
    <header className="sticky top-0 z-30 bg-brand">
      <div className="hidden border-b border-white/15 sm:block">
        <div className="container-shop flex h-7 items-center justify-end gap-4 text-[11px] text-white/90">
          <span>Hubungi Kami</span>
          <span>Bantuan</span>
          <span>Ikuti Kami</span>
        </div>
      </div>

      <div className="container-shop flex items-center gap-4 py-3 sm:gap-8 sm:py-4">
        <Link
          href="/"
          className="font-display text-xl font-extrabold text-white sm:text-2xl"
        >
          Belanja<span className="text-white/80">.in</span>
        </Link>

        <form onSubmit={handleSearch} className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, brand, atau toko"
            className="h-9 w-full rounded-sm border-2 border-white bg-white pl-3 pr-10 text-sm text-ink placeholder:text-gray-400 focus:outline-none sm:h-10"
          />
          <button
            type="submit"
            aria-label="Cari"
            className="absolute right-0 top-0 flex h-9 w-10 items-center justify-center bg-brand-dark text-white sm:h-10"
          >
            <Search size={18} />
          </button>
        </form>

        <Link
          href="/cart"
          aria-label="Keranjang belanja"
          className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center text-white sm:h-10 sm:w-10"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-brand">
              {totalItems > 99 ? "99+" : totalItems}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
