'use client'
import Menu from "@/components/menu";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProductSizes, ExtraIngredients } from "@prisma/client";

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface CategoriesProps {
  categories: Category[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  order: number;
  basePrice: number;
  sizes: {
    id: string;
    name: ProductSizes;
    price: number;
    productId: string;
  }[];
  extras: {
    id: string;
    name: ExtraIngredients;
    price: number;
    productId: string;
  }[];
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

const Categories = ({ categories }: CategoriesProps) => {
  const filters = useSelector((state: RootState) => state.filter)

  console.log(filters)

  return (
    <div>
      {categories.map((category: Category) => (
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
