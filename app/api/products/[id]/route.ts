import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

// GET /api/products/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await getProductById(params.id);

  if (!product) {
    return NextResponse.json(
      { message: "Produk tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
