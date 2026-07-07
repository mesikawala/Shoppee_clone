import { NextRequest, NextResponse } from "next/server";
import { OrderPayload } from "@/lib/types";

const SHIPPING_COST: Record<OrderPayload["shippingMethod"], number> = {
  reguler: 9000,
  express: 25000,
};

// POST /api/orders
// Body: OrderPayload (lihat lib/types.ts)
//
// Saat ini pesanan TIDAK disimpan permanen (hanya divalidasi & dihitung).
// TODO (saat MongoDB Atlas sudah siap):
//   1. Buat model Mongoose `Order` (items, shipping, status, createdAt, dst).
//   2. Simpan payload yang sudah divalidasi: `await Order.create({ ...payload, total })`.
//   3. Kembalikan `_id` dari MongoDB sebagai orderId di response.
export async function POST(request: NextRequest) {
  const body = (await request.json()) as OrderPayload;

  if (!body.items || body.items.length === 0) {
    return NextResponse.json(
      { message: "Keranjang kosong, tidak bisa membuat pesanan." },
      { status: 400 }
    );
  }

  if (!body.shipping?.fullName || !body.shipping?.address || !body.shipping?.phone) {
    return NextResponse.json(
      { message: "Data pengiriman belum lengkap." },
      { status: 400 }
    );
  }

  const subtotal = body.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = SHIPPING_COST[body.shippingMethod] ?? SHIPPING_COST.reguler;
  const total = subtotal + shippingCost;

  const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;

  return NextResponse.json(
    {
      orderId,
      subtotal,
      shippingCost,
      total,
      status: "menunggu_pembayaran",
      message: "Pesanan berhasil dibuat.",
    },
    { status: 201 }
  );
}
