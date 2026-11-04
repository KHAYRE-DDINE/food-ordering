import MainHead from "@/components/main-heading";
import Categories from "@/components/Categories/Categories";
import { getProductByCategory } from "@/server/db/products";
import FilterItems from "@/components/Filter";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const [{ locale }, categories] = await Promise.all([
    params,
    getProductByCategory(),
  ]);
  const { menu } = await getTrans(locale);

  // Guarantee clean plain JSON serialization across the server/client component boundary
  const plainCategories = JSON.parse(JSON.stringify(categories ?? []));

  return (
    <main className="min-h-screen pt-28 pb-20 bg-gray-50/40">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <MainHead title={menu.title} subTitle={menu.subtitle} />
        </div>
        <FilterItems translation={menu} />
        <div className="mt-8">
          <Categories categories={plainCategories} locale={locale} translation={menu} />
        </div>
      </div>
    </main>
  );
}
