import { PrismaClient } from "@prisma/client";
import { products } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Start seeding data ke Supabase...");

  await prisma.product.deleteMany({});
  console.log("🗑️  Tabel Product dikosongkan");

  for (const product of products) {
    await prisma.product.create({
      data: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice ?? null,
        discountPercent: product.discountPercent ?? null,
        images: product.images,
        categorySlug: product.categorySlug,
        rating: product.rating,
        reviewCount: product.reviewCount,
        sold: product.sold,
        stock: product.stock,
        location: product.location,
        shopName: product.shopName,
        shopAvatar: product.shopAvatar,
        isFlashSale: product.isFlashSale || false,
        flashSaleEndsAt: product.flashSaleEndsAt
          ? new Date(product.flashSaleEndsAt)
          : null,
        flashSaleStock: product.flashSaleStock ?? null,
        flashSaleSold: product.flashSaleSold || null,
      },
    });
    console.log(`✅ Created: ${product.name}`);
  }

  console.log("\n🎉 Seeding selesai! Semua data disimpan ke Supabase!");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
