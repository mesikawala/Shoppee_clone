// lib/products.ts
//
// Semua fungsi di sini bersifat `async` dan sekarang menggunakan Prisma
// untuk terhubung ke Supabase PostgreSQL. Model Product di schema.prisma
// TIDAK diubah sesuai permintaan.

import { prisma } from "./prisma";
import { Category } from "./types";

// Categories masih menggunakan data statis karena tidak sering berubah
const categories: Category[] = [
  { id: "c1", name: "Elektronik", slug: "elektronik", icon: "Smartphone" },
  { id: "c2", name: "Fashion Wanita", slug: "fashion-wanita", icon: "Shirt" },
  { id: "c3", name: "Fashion Pria", slug: "fashion-pria", icon: "Footprints" },
  { id: "c4", name: "Rumah & Dapur", slug: "rumah-dapur", icon: "Home" },
  { id: "c5", name: "Kecantikan", slug: "kecantikan", icon: "Sparkles" },
  { id: "c6", name: "Olahraga", slug: "olahraga", icon: "Dumbbell" },
  { id: "c7", name: "Hobi & Mainan", slug: "hobi-mainan", icon: "Gamepad2" },
  { id: "c8", name: "Otomotif", slug: "otomotif", icon: "Car" },
];

export interface GetProductsParams {
  category?: string;
  search?: string;
  sort?: "relevan" | "terbaru" | "termurah" | "termahal" | "terlaris";
  page?: number;
  limit?: number;
}

export interface GetProductsResult {
  items: any[];
  total: number;
  page: number;
  totalPages: number;
}

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getProducts(
  params: GetProductsParams = {},
): Promise<GetProductsResult> {
  const { category, search, sort = "relevan", page = 1, limit = 12 } = params;

  const where: any = {};

  if (category) {
    where.categorySlug = category;
  }

  if (search && search.trim()) {
    where.OR = [
      { name: { contains: search.trim(), mode: "insensitive" } },
      { description: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  let orderBy: any;
  switch (sort) {
    case "termurah":
      orderBy = { price: "asc" };
      break;
    case "termahal":
      orderBy = { price: "desc" };
      break;
    case "terlaris":
      orderBy = { sold: "desc" };
      break;
    case "terbaru":
      orderBy = { createdAt: "desc" };
      break;
    default:
      // "relevan": produk rating tinggi & terjual banyak diutamakan
      orderBy = [{ rating: "desc" }, { sold: "desc" }];
  }

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);

  return { items, total, page: safePage, totalPages };
}

export async function getProductById(id: string): Promise<any | undefined> {
  return prisma.product.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
    },
  });
}

export async function getFlashSaleProducts(): Promise<any[]> {
  return prisma.product.findMany({
    where: {
      isFlashSale: true,
    },
  });
}

export async function getRelatedProducts(
  categorySlug: string,
  excludeId: string,
  limit = 6,
): Promise<any[]> {
  return prisma.product.findMany({
    where: {
      categorySlug,
      NOT: { id: excludeId },
    },
    take: limit,
  });
}
