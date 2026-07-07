import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Store } from "lucide-react";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { formatRupiah, formatSold } from "@/lib/format";
import StarRating from "@/components/StarRating";
import ProductGallery from "@/components/ProductGallery";
import AddToCartActions from "@/components/AddToCartActions";
import ProductGrid from "@/components/ProductGrid";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: PageProps) {
  const product = await getProductById(params.id);
  if (!product) return { title: "Produk tidak ditemukan — Belanja.in" };
  return { title: `${product.name} — Belanja.in` };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  const related = await getRelatedProducts(product.categorySlug, product.id, 5);

  return (
    <div className="container-shop flex flex-col gap-4 py-4">
      <div className="rounded bg-white p-4 shadow-card sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-full sm:w-[420px]">
            <ProductGallery images={product.images} name={product.name} />
          </div>

          <div className="flex flex-1 flex-col gap-3">
            <h1 className="text-lg font-semibold leading-snug text-ink sm:text-xl">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <StarRating rating={product.rating} />
                <span className="font-medium text-ink">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-300">|</span>
              <span>{product.reviewCount.toLocaleString("id-ID")} Penilaian</span>
              <span className="text-gray-300">|</span>
              <span>{formatSold(product.sold)}</span>
            </div>

            <div className="rounded bg-gray-50 px-4 py-3">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-brand">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice ? (
                  <>
                    <span className="text-base text-gray-400 line-through">
                      {formatRupiah(product.originalPrice)}
                    </span>
                    <span className="rounded bg-brand px-1.5 py-0.5 text-xs font-bold text-white">
                      -{product.discountPercent}%
                    </span>
                  </>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin size={16} />
              <span>Dikirim dari {product.location}</span>
            </div>

            <hr className="my-1 border-gray-100" />

            <AddToCartActions product={product} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1 rounded bg-white p-4 shadow-card sm:p-6">
          <h2 className="mb-3 text-base font-semibold text-ink">
            Deskripsi Produk
          </h2>
          <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
            {product.description}
          </p>
        </div>

        <div className="w-full rounded bg-white p-4 shadow-card sm:w-72 sm:p-6">
          <h2 className="mb-3 text-base font-semibold text-ink">
            Tentang Toko
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-100">
              <Image
                src={product.shopAvatar}
                alt={product.shopName}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-ink">
                <Store size={14} />
                {product.shopName}
              </p>
              <p className="text-xs text-gray-400">{product.location}</p>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-lg font-bold text-ink">
            Produk Serupa
          </h2>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </div>
  );
}
