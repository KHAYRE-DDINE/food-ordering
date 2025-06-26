import MainHead from "@/components/main-heading";
import Categories from "@/components/Categories/Categories";
import { getProductByCategory } from "@/server/db/products";
import FilterItems from "@/components/Filter";

export default async function MenuPage() {
  // Fetch categories
  const categories = await getProductByCategory();

  if (!categories || categories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No categories found. Please try again later.</p>
      </div>
    );
  }

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
