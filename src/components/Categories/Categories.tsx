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
  const storedFilters =
    typeof window !== "undefined"
      ? window.sessionStorage.getItem("filter")
      : null;

  console.log(categories)


  if (storedFilters) {
    try {
      // Parse the stored JSON data
      const filters = JSON.parse(storedFilters);

      // Loop through the filter items
      Object.entries(filters).forEach(([key, value]) => {
        console.log(`Key: ${key}, Value:`, value);

        // You can access specific properties like:
        if (key === "filterObject") {
          console.log("Filter object:", value);
        }

        // Or handle arrays
        if (Array.isArray(value)) {
          console.log("Array items:");
          value.forEach((item) => console.log(item));
        }
      });
    } catch (error) {
      console.error("Error parsing stored filters:", error);
    }
  } else {
    console.log("No filters found in sessionStorage");
  }

  const products = categories.flatMap((category) => category.products);

  const filterProducts = products.filter((product) => {
    const hasOnion = product.extras.some((e) => e.name === "ONION");
    const isPizza = product.name.includes("Pizza");

    const productCategory = categories.find((c) =>
      c.products.some((p) => p.id === product.id)
    );

    const isTheRealItem = productCategory
      ? productCategory?.name === "Classic"
      : true;

    return hasOnion && isPizza && isTheRealItem;
  });

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
    
    // <div>
    //   {filterProducts.map((product) => (
    //     <section key={product.id} className="section-gap">
    //       <h1 className="text-[#F44336] text-4xl font-bold italic text-center mb-6 mt-14">
    //         {product.name}
    //       </h1>
    //       <MenuWrapper items={filterProducts} />
    //     </section>
    //   ))}
    // </div>
  );
}
