"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/format";
import QuantitySelector from "@/components/QuantitySelector";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, isHydrated } = useCart();
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Saat keranjang termuat, pilih semua item secara default
  useEffect(() => {
    if (isHydrated) {
      setSelected(new Set(items.map((i) => i.productId)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated]);

  function toggleSelect(productId: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((i) => i.productId)));
    }
  }

  const selectedItems = items.filter((i) => selected.has(i.productId));
  const totalSelectedItems = selectedItems.reduce((s, i) => s + i.quantity, 0);
  const totalSelectedPrice = selectedItems.reduce(
    (s, i) => s + i.quantity * i.price,
    0
  );

  function handleCheckout() {
    router.push("/checkout");
  }

  if (!isHydrated) {
    return <div className="container-shop py-10 text-center text-gray-400">Memuat keranjang...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container-shop flex flex-col items-center justify-center gap-3 py-20 text-center">
        <ShoppingBag size={56} className="text-gray-300" />
        <p className="text-lg font-semibold text-ink">Keranjangmu masih kosong</p>
        <p className="text-sm text-gray-500">
          Yuk, mulai belanja dan temukan produk favoritmu.
        </p>
        <Link
          href="/products"
          className="mt-2 rounded-sm bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container-shop flex flex-col gap-4 py-4 pb-28 sm:pb-4">
      <h1 className="font-display text-xl font-bold text-ink">Keranjang Belanja</h1>

      <div className="rounded bg-white shadow-card">
        <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-3 text-sm text-gray-500">
          <input
            type="checkbox"
            checked={selected.size === items.length}
            onChange={toggleSelectAll}
            className="h-4 w-4 accent-brand"
            aria-label="Pilih semua produk"
          />
          <span className="flex-1">Produk</span>
          <span className="hidden w-28 text-center sm:block">Harga</span>
          <span className="hidden w-32 text-center sm:block">Jumlah</span>
          <span className="hidden w-28 text-right sm:block">Subtotal</span>
          <span className="w-8" />
        </div>

        {items.map((item) => (
          <div
            key={item.productId}
            className="flex flex-col gap-3 border-b border-gray-100 px-4 py-4 last:border-b-0 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 items-center gap-3">
              <input
                type="checkbox"
                checked={selected.has(item.productId)}
                onChange={() => toggleSelect(item.productId)}
                className="h-4 w-4 flex-shrink-0 accent-brand"
                aria-label={`Pilih ${item.name}`}
              />
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <Link
                  href={`/products/${item.productId}`}
                  className="line-clamp-2 text-sm text-ink hover:text-brand"
                >
                  {item.name}
                </Link>
                <span className="text-xs text-gray-400">{item.shopName}</span>
              </div>
            </div>

            <span className="w-28 text-left text-sm font-medium text-ink sm:text-center">
              {formatRupiah(item.price)}
            </span>

            <div className="w-32 sm:flex sm:justify-center">
              <QuantitySelector
                quantity={item.quantity}
                max={item.stock}
                onChange={(qty) => updateQuantity(item.productId, qty)}
              />
            </div>

            <span className="w-28 text-left text-sm font-semibold text-brand sm:text-right">
              {formatRupiah(item.price * item.quantity)}
            </span>

            <button
              type="button"
              aria-label="Hapus produk"
              onClick={() => removeFromCart(item.productId)}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center text-gray-400 hover:text-flash"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 py-3 shadow-pop sm:static sm:rounded sm:shadow-card">
        <div className="text-sm text-gray-500">
          <p>
            Total ({totalSelectedItems} barang):{" "}
            <span className="text-lg font-bold text-brand">
              {formatRupiah(totalSelectedPrice)}
            </span>
          </p>
        </div>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={selectedItems.length === 0}
          className="rounded-sm bg-brand px-8 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
