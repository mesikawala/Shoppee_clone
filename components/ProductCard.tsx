import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatRupiah, formatSold } from "@/lib/format";
import StarRating from "./StarRating";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded bg-white shadow-card transition-shadow hover:shadow-pop"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discountPercent ? (
          <span className="absolute right-0 top-0 rounded-bl bg-brand px-1.5 py-0.5 text-[11px] font-bold text-white">
            -{product.discountPercent}%
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5">
        <p className="line-clamp-2 min-h-[36px] text-[13px] leading-tight text-ink">
          {product.name}
        </p>
        <div className="mt-auto">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-semibold text-brand">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice ? (
              <span className="text-xs text-gray-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            ) : null}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-1">
              <StarRating rating={product.rating} size={11} />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span>{formatSold(product.sold)}</span>
          </div>
          <p className="mt-1 truncate text-[11px] text-gray-400">
            {product.location}
          </p>
        </div>
      </div>
    </Link>
  );
}
