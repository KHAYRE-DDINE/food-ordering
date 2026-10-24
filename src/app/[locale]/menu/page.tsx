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
  // Fetch categories
  const [{ locale }, categories] = await Promise.all([
    params,
    getProductByCategory(),
  ]);
  const { menu } = await getTrans(locale);

  return (
    <div>
      <div className="text-center pt-[66px]">
        <MainHead title={menu.title} subTitle={menu.subtitle} />
      </div>
      <div className="container max-w-7xl">
        <FilterItems translation={menu} />
        <Categories categories={categories} locale={locale} translation={menu} />
      </div>
    </div>
  );
}
