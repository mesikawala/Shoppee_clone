import { NextRequest, NextResponse } from "next/server";
import { getProducts, GetProductsParams } from "@/lib/products";

// GET /api/products?q=...&category=...&sort=...&page=...&limit=...
//
// TODO (saat MongoDB Atlas sudah siap): ganti implementasi getProducts()
// di lib/products.ts dengan query Mongoose, route ini tidak perlu diubah.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params: GetProductsParams = {
    category: searchParams.get("category") || undefined,
    search: searchParams.get("q") || undefined,
    sort: (searchParams.get("sort") as GetProductsParams["sort"]) || undefined,
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 12,
  };

  const result = await getProducts(params);
  return NextResponse.json(result);
}
