import Link from "next/link";
import { Zap } from "lucide-react";
import { Product } from "@/lib/types";
import CountdownTimer from "./CountdownTimer";
import FlashSaleCard from "./FlashSaleCard";

export default function FlashSale({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const endsAt = products[0].flashSaleEndsAt ?? new Date().toISOString();

  return (
    <section className="overflow-hidden rounded bg-gradient-to-r from-flash to-brand">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap size={20} className="fill-yellow-300 text-yellow-300" />
          <h2 className="font-display text-lg font-bold text-white">
            Flash Sale
          </h2>
          <CountdownTimer endsAt={endsAt} />
        </div>
        <Link
          href="/products"
          className="text-xs font-medium text-white underline-offset-2 hover:underline"
        >
          Lihat Semua
        </Link>
      </div>
      <div className="flex gap-2.5 overflow-x-auto bg-white/95 p-3 no-scrollbar">
        {products.map((product) => (
          <FlashSaleCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
