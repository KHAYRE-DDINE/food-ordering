import MainHead from "@/components/main-heading";
import Menu from "@/components/menu";
import { getProductByCategory } from "@/server/db/products";
import FilterItems from "@/components/Filter";

const MenuPage = async () => {
  const categories = await getProductByCategory();
  console.log(categories);

  return (
    <div>
      <div className="text-center pt-[66px]">
        <MainHead title="Choose Your Meal" subTitle="Enjoy with it" />
      </div>
      <FilterItems />
      {categories.map((category) => (
        <section key={category.id} className="section-gap">
          <h1 className="text-[#F44336] text-4xl font-bold italic text-center mb-6 mt-14">
            {category.name}
          </h1>
          <Menu items={category.products} />
        </section>
      ))}
    </div>
  );
};

export default MenuPage;
