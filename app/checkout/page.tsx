"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatRupiah } from "@/lib/format";
import {
  OrderPayload,
  PaymentMethod,
  ShippingInfo,
  ShippingMethod,
} from "@/lib/types";

const SHIPPING_OPTIONS: { value: ShippingMethod; label: string; cost: number; eta: string }[] = [
  { value: "reguler", label: "Reguler", cost: 9000, eta: "2-4 hari" },
  { value: "express", label: "Express", cost: 25000, eta: "1 hari" },
];

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string }[] = [
  { value: "transfer", label: "Transfer Bank" },
  { value: "ewallet", label: "E-Wallet (OVO/GoPay/Dana)" },
  { value: "cod", label: "Bayar di Tempat (COD)" },
];

interface OrderResult {
  orderId: string;
  subtotal: number;
  shippingCost: number;
  total: number;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, isHydrated } = useCart();

  const [shipping, setShipping] = useState<ShippingInfo>({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("reguler");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  const selectedShipping =
    SHIPPING_OPTIONS.find((s) => s.value === shippingMethod) ?? SHIPPING_OPTIONS[0];
  const grandTotal = totalPrice + selectedShipping.cost;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload: OrderPayload = {
      items,
      shipping,
      shippingMethod,
      paymentMethod,
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Gagal membuat pesanan.");
        return;
      }

      setOrderResult(data);
      clearCart();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderResult) {
    return (
      <div className="container-shop flex flex-col items-center gap-4 py-16 text-center">
        <CheckCircle2 size={64} className="text-savings" />
        <h1 className="text-xl font-bold text-ink">Pesanan Berhasil Dibuat!</h1>
        <p className="text-sm text-gray-500">
          Nomor pesanan kamu:{" "}
          <span className="font-semibold text-ink">{orderResult.orderId}</span>
        </p>
        <div className="mt-2 w-full max-w-sm rounded bg-white p-4 text-left text-sm shadow-card">
          <div className="flex justify-between py-1 text-gray-500">
            <span>Subtotal</span>
            <span>{formatRupiah(orderResult.subtotal)}</span>
          </div>
          <div className="flex justify-between py-1 text-gray-500">
            <span>Ongkos Kirim</span>
            <span>{formatRupiah(orderResult.shippingCost)}</span>
          </div>
          <div className="mt-1 flex justify-between border-t border-gray-100 py-1 font-semibold text-ink">
            <span>Total Bayar</span>
            <span className="text-brand">{formatRupiah(orderResult.total)}</span>
          </div>
        </div>
        <Link
          href="/products"
          className="mt-3 rounded-sm bg-brand px-8 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Lanjut Belanja
        </Link>
      </div>
    );
  }

  if (isHydrated && items.length === 0) {
    return (
      <div className="container-shop flex flex-col items-center gap-3 py-20 text-center">
        <p className="text-lg font-semibold text-ink">Tidak ada produk untuk di-checkout</p>
        <Link
          href="/products"
          className="rounded-sm bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Kembali Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container-shop flex flex-col gap-4 py-4 pb-28 lg:pb-4">
      <h1 className="font-display text-xl font-bold text-ink">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div className="rounded bg-white p-4 shadow-card sm:p-6">
            <h2 className="mb-4 text-sm font-semibold text-ink">
              Alamat Pengiriman
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Nama Penerima"
                value={shipping.fullName}
                onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <input
                required
                placeholder="Nomor HP"
                value={shipping.phone}
                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <input
                required
                placeholder="Kota"
                value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <input
                required
                placeholder="Kode Pos"
                value={shipping.postalCode}
                onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <textarea
                required
                placeholder="Alamat Lengkap (jalan, no. rumah, RT/RW, kecamatan)"
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="col-span-1 rounded border border-gray-300 px-3 py-2 text-sm focus:border-brand focus:outline-none sm:col-span-2"
                rows={3}
              />
            </div>
          </div>

          <div className="rounded bg-white p-4 shadow-card sm:p-6">
            <h2 className="mb-4 text-sm font-semibold text-ink">
              Metode Pengiriman
            </h2>
            <div className="flex flex-col gap-2">
              {SHIPPING_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center justify-between rounded border border-gray-200 px-3 py-2.5 text-sm has-[:checked]:border-brand"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shippingMethod === opt.value}
                      onChange={() => setShippingMethod(opt.value)}
                      className="accent-brand"
                    />
                    {opt.label}{" "}
                    <span className="text-xs text-gray-400">({opt.eta})</span>
                  </span>
                  <span className="font-medium text-ink">
                    {formatRupiah(opt.cost)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded bg-white p-4 shadow-card sm:p-6">
            <h2 className="mb-4 text-sm font-semibold text-ink">
              Metode Pembayaran
            </h2>
            <div className="flex flex-col gap-2">
              {PAYMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2 rounded border border-gray-200 px-3 py-2.5 text-sm has-[:checked]:border-brand"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === opt.value}
                    onChange={() => setPaymentMethod(opt.value)}
                    className="accent-brand"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="flex flex-col gap-3 rounded bg-white p-4 shadow-card sm:p-6 lg:sticky lg:top-24">
            <h2 className="text-sm font-semibold text-ink">Ringkasan Pesanan</h2>
            <div className="flex max-h-60 flex-col gap-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex items-center gap-2.5">
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-xs text-ink">{item.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <span className="text-xs font-medium text-ink">
                    {formatRupiah(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Ongkos Kirim</span>
              <span>{formatRupiah(selectedShipping.cost)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold text-ink">
              <span>Total</span>
              <span className="text-brand">{formatRupiah(grandTotal)}</span>
            </div>

            {error ? <p className="text-sm text-flash">{error}</p> : null}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 rounded-sm bg-gradient-to-r from-orange-500 via-red-500 to-red-600 px-6 py-3 text-sm font-semibold text-white hover:from-orange-600 hover:via-red-600 hover:to-red-700 disabled:cursor-not-allowed disabled:opacity-60 shadow-md transition-all"
            >
              {submitting ? "Memproses..." : "Buat Pesanan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
