import { getCategories, getFlashSaleProducts, getProducts } from "@/lib/products";
import Banner from "@/components/Banner";
import CategoryNav from "@/components/CategoryNav";
import FlashSale from "@/components/FlashSale";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

export default async function HomePage() {
  const [categories, flashSaleProducts, recommended] = await Promise.all([
    getCategories(),
    getFlashSaleProducts(),
    getProducts({ sort: "relevan", limit: 15 }),
  ]);

  return (
    <div className="container-shop flex flex-col gap-4 py-4">
      <Banner />
      <CategoryNav categories={categories} />
      <FlashSale products={flashSaleProducts} />

      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            Rekomendasi Untukmu
          </h2>
          <Link href="/products" className="text-sm text-brand hover:underline">
            Lihat Semua
          </Link>
        </div>
        <ProductGrid products={recommended.items} />
      </section>
    </div>
  );
}
