import { getCategories, getProducts, GetProductsParams } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import CategorySidebar from "@/components/CategorySidebar";
import SortDropdown from "@/components/SortDropdown";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Cari Produk — Belanja.in",
};

interface PageProps {
  searchParams: {
    q?: string;
    category?: string;
    sort?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sort = (searchParams.sort as GetProductsParams["sort"]) || "relevan";
  const page = parseInt(searchParams.page || "1", 10) || 1;

  const [categories, result] = await Promise.all([
    getCategories(),
    getProducts({
      category: searchParams.category,
      search: searchParams.q,
      sort,
      page,
      limit: 15,
    }),
  ]);

  function buildPageHref(targetPage: number) {
    const params = new URLSearchParams();
    if (searchParams.q) params.set("q", searchParams.q);
    if (searchParams.category) params.set("category", searchParams.category);
    if (sort) params.set("sort", sort);
    params.set("page", String(targetPage));
    return `/products?${params.toString()}`;
  }

  const activeCategoryName = categories.find(
    (c) => c.slug === searchParams.category
  )?.name;

  return (
    <div className="container-shop flex flex-col gap-4 py-4">
      <div className="rounded bg-white px-4 py-3 shadow-card">
        <p className="text-sm text-gray-500">
          {searchParams.q ? (
            <>
              Hasil pencarian untuk{" "}
              <span className="font-semibold text-ink">
                &quot;{searchParams.q}&quot;
              </span>{" "}
              — {result.total} produk ditemukan
            </>
          ) : activeCategoryName ? (
            <>
              Kategori{" "}
              <span className="font-semibold text-ink">{activeCategoryName}</span>{" "}
              — {result.total} produk
            </>
          ) : (
            <>Menampilkan {result.total} produk</>
          )}
        </p>
      </div>

      <div className="flex gap-4">
        <CategorySidebar
          categories={categories}
          activeCategory={searchParams.category}
          search={searchParams.q}
        />

        <div className="flex-1">
          <div className="mb-3 rounded bg-white px-3 py-2.5 shadow-card">
            <SortDropdown
              current={sort}
              q={searchParams.q}
              category={searchParams.category}
            />
          </div>

          <ProductGrid
            products={result.items}
            emptyMessage="Produk tidak ditemukan. Coba kata kunci atau kategori lain."
          />

          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            buildHref={buildPageHref}
          />
        </div>
      </div>
    </div>
  );
}
