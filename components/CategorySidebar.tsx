import Link from "next/link";
import clsx from "clsx";
import { Category } from "@/lib/types";

export default function CategorySidebar({
  categories,
  activeCategory,
  search,
}: {
  categories: Category[];
  activeCategory?: string;
  search?: string;
}) {
  function buildHref(categorySlug?: string) {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (categorySlug) params.set("category", categorySlug);
    const qs = params.toString();
    return `/products${qs ? `?${qs}` : ""}`;
  }

  return (
    <aside className="hidden w-52 flex-shrink-0 rounded bg-white p-4 shadow-card lg:block">
      <h3 className="mb-3 text-sm font-semibold text-ink">Kategori</h3>
      <ul className="flex flex-col gap-2.5">
        <li>
          <Link
            href={buildHref(undefined)}
            className={clsx(
              "text-sm",
              !activeCategory ? "font-semibold text-brand" : "text-gray-600 hover:text-brand"
            )}
          >
            Semua Produk
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={buildHref(category.slug)}
              className={clsx(
                "text-sm",
                activeCategory === category.slug
                  ? "font-semibold text-brand"
                  : "text-gray-600 hover:text-brand"
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
