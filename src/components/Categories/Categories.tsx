"use client";

import { ProductSizes, ExtraIngredients } from "@prisma/client";
import Menu from "@/components/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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

export default function Categories({ categories }: CategoriesProps) {
  const filters = useSelector((state: RootState) => state.filter.items);

  console.log('Categories received in component:', categories.map(c => ({
    id: c.id,
    name: c.name,
    productCount: c.products.length
  })));

  const products = categories.flatMap((category) => category.products);



  // Get filter values
  const searchFilter =
    (filters.find((f) => f.name === "search")?.value as string) || "";
  const categoryFilter =
    (filters.find((f) => f.name === "category")?.value as string) ||
    "All Categories";
  const dietaryFilters =
    (filters.find((f) => f.name === "dietary")?.value as string[]) || [];

  const filterProducts = products.filter((product) => {
    // Search text filter
    const matchesSearch =
      searchFilter === "" ||
      product.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      product.description.toLowerCase().includes(searchFilter.toLowerCase());

      // Category filter
  const matchesCategory =
    categoryFilter === "All Categories" ||
    categories
      .find((c) => c.products.some(p => p.id === product.id))
      ?.name.toLowerCase() === categoryFilter.toLowerCase();

    // Dietary filter
    const matchesDietary =
      dietaryFilters.length === 0 ||
      dietaryFilters.every((diet) =>
        product.extras.some(
          (extra) => extra.name.toLowerCase() === diet.toUpperCase()
        )
      );

    return matchesSearch && matchesCategory && matchesDietary;
  });


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
}
