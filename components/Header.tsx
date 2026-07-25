"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useRef, useEffect } from "react";
import { Search, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, loading, getMe } = useAuth();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/products?${params.toString()}`);
  }

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await getMe();
      setShowDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="hidden items-center gap-3 sm:flex">
          {!loading && !user ? (
            <>
              <Link
                href="/register"
                className=" flex items-center rounded-sm bg-white px-4 py-2 text-sm font-semibold text-brand hover:bg-gray-100 transition-colors"
              >
                Daftar
              </Link>
              <Link
                href="/login"
                className="flex items-center rounded-sm bg-gradient-to-r from-red-700 to-red-900 px-4 py-2 text-sm font-semibold text-white hover:from-red-800 hover:to-red-950 transition-all shadow-md"
              >
                Login
              </Link>
            </>
          ) : !loading && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 rounded-sm bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <User size={18} />
                <span className="hidden sm:inline truncate max-w-[100px]">
                  {user.username}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${showDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded bg-white shadow-pop">
                  <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand">
                        <User size={24} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">
                          {user.username}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-1">
                    <div className="flex justify-between py-2 text-sm">
                      <span className="text-gray-500">Username</span>
                      <span className="font-medium text-ink">
                        {user.username}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 text-sm">
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium text-ink truncate max-w-[180px]">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 text-sm">
                      <span className="text-gray-500">Role</span>
                      <span className="font-medium text-ink capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 p-3">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-sm bg-gray-100 px-4 py-2 text-sm font-semibold text-ink hover:bg-gray-200 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

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
