"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "./QuantitySelector";

export default function AddToCartActions({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function buildCartItem() {
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      stock: product.stock,
      shopName: product.shopName,
    };
  }

  function handleAddToCart() {
    addToCart(buildCartItem());
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addToCart(buildCartItem());
    router.push("/cart");
  }

  const outOfStock = product.stock <= 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500">Jumlah</span>
        <QuantitySelector
          quantity={quantity}
          max={product.stock}
          onChange={setQuantity}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="flex items-center gap-2 rounded-sm border border-brand bg-brand-light px-6 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart size={18} />
          {justAdded ? "Ditambahkan!" : "Masukkan Keranjang"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="rounded-sm bg-brand px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Beli Sekarang
        </button>
      </div>
      {outOfStock ? (
        <p className="text-sm font-medium text-flash">Stok produk ini habis.</p>
      ) : null}
    </div>
  );
}
