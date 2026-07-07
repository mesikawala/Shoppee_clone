// lib/types.ts
// Tipe data inti aplikasi. Nama field sengaja dibuat mirip dokumen MongoDB
// (memakai `id` string) supaya saat lib/products.ts diganti ke Mongoose/MongoDB
// Atlas nanti, tipe ini tidak perlu banyak berubah.

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // nama icon dari lucide-react, lihat components/CategoryNav.tsx
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  categorySlug: string;
  rating: number; // 0 - 5
  reviewCount: number;
  sold: number;
  stock: number;
  location: string;
  shopName: string;
  shopAvatar: string;
  description: string;
  isFlashSale?: boolean;
  flashSaleEndsAt?: string; // ISO date string
  flashSaleStock?: number; // total stok khusus flash sale (untuk progress bar)
  flashSaleSold?: number; // terjual dalam flash sale ini
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
  shopName: string;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export type ShippingMethod = "reguler" | "express";
export type PaymentMethod = "cod" | "transfer" | "ewallet";

export interface OrderPayload {
  items: CartItem[];
  shipping: ShippingInfo;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
}
