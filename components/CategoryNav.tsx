import Link from "next/link";
import {
  Smartphone,
  Shirt,
  Footprints,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Car,
  LucideIcon,
} from "lucide-react";
import { Category } from "@/lib/types";

const ICONS: Record<string, LucideIcon> = {
  Smartphone,
  Shirt,
  Footprints,
  Home,
  Sparkles,
  Dumbbell,
  Gamepad2,
  Car,
};

export default function CategoryNav({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="rounded bg-white p-4 shadow-card">
      <div className="grid grid-cols-4 gap-y-5 sm:grid-cols-8">
        {categories.map((category) => {
          const Icon = ICONS[category.icon] ?? Home;
          return (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group flex flex-col items-center gap-2 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-white transition-all group-hover:from-orange-500 group-hover:to-red-600 group-hover:scale-110 shadow-sm">
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <span className="text-[11px] leading-tight text-ink">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
