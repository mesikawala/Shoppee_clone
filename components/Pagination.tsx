import Link from "next/link";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-6 flex items-center justify-center gap-1.5">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-500",
          page === 1 && "pointer-events-none opacity-40"
        )}
      >
        <ChevronLeft size={16} />
      </Link>
      {pages.map((p) => (
        <Link
          key={p}
          href={buildHref(p)}
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded border text-sm",
            p === page
              ? "border-brand bg-brand text-white"
              : "border-gray-300 bg-white text-gray-600 hover:border-brand hover:text-brand"
          )}
        >
          {p}
        </Link>
      ))}
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-500",
          page === totalPages && "pointer-events-none opacity-40"
        )}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
