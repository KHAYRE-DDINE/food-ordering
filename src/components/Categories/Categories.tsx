import { getProductByCategory } from "@/server/db/products";
import Menu from "@/components/menu";
import React from "react";

const Categories = async () => {
  const categories = await getProductByCategory();

  return (
    <div>
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

export default Categories;
