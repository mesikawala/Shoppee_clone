"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CartItem } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "shopee-clone-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Muat keranjang dari localStorage saat pertama kali render di client
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      }
    } catch {
      // localStorage tidak tersedia / data korup, abaikan
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Simpan ke localStorage setiap kali keranjang berubah
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // abaikan jika storage penuh / diblokir
    }
  }, [items, isHydrated]);

  function addToCart(newItem: CartItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === newItem.productId);
      if (existing) {
        const nextQty = Math.min(
          existing.quantity + newItem.quantity,
          existing.stock
        );
        return prev.map((i) =>
          i.productId === newItem.productId ? { ...i, quantity: nextQty } : i
        );
      }
      return [...prev, newItem];
    });
  }

  function removeFromCart(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.min(Math.max(1, quantity), i.stock) }
          : i
      )
    );
  }

  function clearCart() {
    setItems([]);
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart harus dipakai di dalam <CartProvider>");
  }
  return ctx;
}
