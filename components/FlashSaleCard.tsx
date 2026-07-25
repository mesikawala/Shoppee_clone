import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatRupiah } from "@/lib/format";

export default function FlashSaleCard({ product }: { product: Product }) {
  const stock = product.flashSaleStock ?? 100;
  const sold = product.flashSaleSold ?? 0;
  const percent = Math.min(100, Math.round((sold / stock) * 100));
  const almostGone = percent >= 80;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex w-[160px] flex-shrink-0 flex-col overflow-hidden rounded bg-white shadow-card transition-shadow hover:shadow-pop sm:w-[200px]"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="200px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-1.5 p-2.5">
        <p className="line-clamp-2 min-h-[34px] text-[12.5px] leading-tight text-ink">
          {product.name}
        </p>
        <span className="text-base font-bold text-brand">
          {formatRupiah(product.price)}
        </span>

        <div className="relative h-4 w-full overflow-hidden rounded-full bg-brand-light">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand to-red-700"
            style={{ width: `${percent}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold text-white">
            {almostGone ? "Hampir Habis!" : `Terjual ${percent}%`}
          </span>
        </div>
      </div>
    </Link>
  );
}
