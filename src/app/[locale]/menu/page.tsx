import MainHead from "@/components/main-heading";
import Categories from "@/components/Categories/Categories";
import { getProductByCategory } from "@/server/db/products";
import FilterItems from "@/components/Filter";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const categories = await getProductByCategory();

  return (
    <div className="bg-zinc-50 pb-16">
      <div className="container pt-[66px] text-center">
        <MainHead title={translation.menu.title} subTitle={translation.menu.subtitle} />
      </div>
      <FilterItems menu={translation.menu} />
      <Categories
        categories={categories}
        labels={translation.menuItem}
        categoryLabels={translation.menu.categoryLabels}
        emptyText={translation.menu.empty}
      />
    </div>
  );
}
