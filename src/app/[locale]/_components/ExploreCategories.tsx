import React from "react";
import { db } from "@/lib/prisma";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import { Utensils, Flame, Sparkles, Leaf, Pizza, Beef, Sandwich, CakeSlice, Coffee, UtensilsCrossed } from "lucide-react";
import { localizeCategoryName } from "@/lib/menu-localization";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  meat: <Beef className="h-6 w-6 text-red-500" />,
  cheese: <Pizza className="h-6 w-6 text-amber-500" />,
  vegetarian: <Leaf className="h-6 w-6 text-green-600" />,
  classic: <Sparkles className="h-6 w-6 text-primary" />,
  spicy: <Flame className="h-6 w-6 text-red-600" />,
  burgers: <Sandwich className="h-6 w-6 text-amber-600" />,
  desserts: <CakeSlice className="h-6 w-6 text-pink-500" />,
  beverages: <Coffee className="h-6 w-6 text-cyan-600" />,
  sides: <UtensilsCrossed className="h-6 w-6 text-orange-500" />,
};

export default async function ExploreCategories({ locale }: { locale: Locale }) {
  let categories: { id: string; name: string; _count: { products: number } }[] = [];
  try {
    categories = await db.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });
  } catch (err) {
    console.error("ExploreCategories fetch error:", err);
    return null;
  }

  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-primary font-bold text-xs uppercase tracking-wider">
              Browse Our Menu
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Explore by Category
            </h2>
          </div>
          <Link
            href={`/${locale}/menu`}
            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1"
          >
            View Complete Menu &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const iconKey = cat.name.toLowerCase();
            const icon = CATEGORY_ICONS[iconKey] || (
              <Utensils className="h-6 w-6 text-primary" />
            );
            const localizedName = localizeCategoryName(cat.name, locale);

            return (
              <Link
                key={cat.id}
                href={`/${locale}/menu`}
                className="group p-5 bg-gray-50 hover:bg-primary/5 rounded-xl border border-gray-200/80 hover:border-primary/40 transition-all text-center flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">
                    {localizedName}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {cat._count.products} {cat._count.products === 1 ? "dish" : "dishes"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
