import { ProductSizes, ExtraIngredients } from "@prisma/client";
import MenuWrapper from "@/components/menu/MenuWrapper";

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

  const products = categories.flatMap((categorie)=>  categorie.products );

  console.log(products);

  return (
    <div>
      {categories.map((category) => (
        <section key={category.id} className="section-gap">
          <h1 className="text-[#F44336] text-4xl font-bold italic text-center mb-6 mt-14">
            {category.name}
          </h1>
          <MenuWrapper items={category.products} />
        </section>
      ))}
    </div>
  );
}
