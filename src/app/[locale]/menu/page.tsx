import MainHead from "@/components/main-heading";
import Categories from "@/components/Categories/Categories";
import { getProductByCategory } from "@/server/db/products";
import FilterItems from "@/components/Filter";

export default async function MenuPage() {
  // Fetch categories
  const categories = await getProductByCategory();

  return (
    <div>
      <div className="text-center pt-[66px]">
        <MainHead title="Choose Your Meal" subTitle="Enjoy with it" />
      </div>
      <FilterItems />
      <Categories categories={categories} />
    </div>
  );
}
