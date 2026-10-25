"use client";

import Menu from "@/components/menu";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LanguageType } from "@/i18n.config";
import { localizeCategoryName, localizeProduct } from "@/lib/menu-localization";
import { Translations } from "@/types/translations";
import { ProductWithRelations } from "@/types/product";

interface Category {
  id: string;
  name: string;
  products: ProductWithRelations[];
}

interface CategoriesProps {
  categories: Category[];
  locale: LanguageType;
  translation: Translations['menu'];
}

export default function Categories({ categories = [], locale, translation }: CategoriesProps) {
  const filterItems = useSelector((state: RootState) => state?.filter?.items);
  const safeFilters = Array.isArray(filterItems) ? filterItems : [];

  const searchItem = safeFilters.find((f) => f && f.name === "search");
  const searchFilter = typeof searchItem?.value === "string" ? searchItem.value.trim().toLowerCase() : "";

  const categoryItem = safeFilters.find((f) => f && f.name === "category");
  const categoryFilter = typeof categoryItem?.value === "string" ? categoryItem.value : "All Categories";

  const dietaryItem = safeFilters.find((f) => f && f.name === "dietary");
  let dietaryFilters: string[] = [];
  if (Array.isArray(dietaryItem?.value)) {
    dietaryFilters = dietaryItem.value.map((v) => String(v).toLowerCase());
  } else if (typeof dietaryItem?.value === "string" && dietaryItem.value) {
    dietaryFilters = [dietaryItem.value.toLowerCase()];
  }

  const safeCategories = Array.isArray(categories) ? categories : [];

  const filteredCategories = safeCategories.map(category => {
    const products = Array.isArray(category?.products) ? category.products : [];

    const filteredProducts = products.filter(product => {
      if (!product) return false;

      const pName = String(product.name || "").toLowerCase();
      const pDesc = String(product.description || "").toLowerCase();

      // Search text filter
      const matchesSearch =
        searchFilter === "" ||
        pName.includes(searchFilter) ||
        pDesc.includes(searchFilter);

      // Category filter
      const catName = String(category.name || "").toLowerCase();
      const matchesCategory =
        categoryFilter === "All Categories" ||
        catName === categoryFilter.toLowerCase();

      // Dietary filter: check against ingredients/extras that the item does NOT contain
      const safeExtras = Array.isArray(product.extras) ? product.extras : [];
      const productExtrasLower = safeExtras.map(e => String(e.name || "").toLowerCase());

      const matchesDietary =
        dietaryFilters.length === 0 ||
        dietaryFilters.every(filter => !productExtrasLower.includes(filter));

      return matchesSearch && matchesCategory && matchesDietary;
    });

    return {
      ...category,
      products: filteredProducts
    };
  }).filter(category => category.products.length > 0);

  if (filteredCategories.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 text-lg">No dishes found matching your current filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {filteredCategories.map((category) => (
        <section key={category.id} id={category.name.toLowerCase()} className="scroll-mt-28">
          <div className="flex items-center justify-center gap-4 mb-8 mt-12">
            <span className="h-px bg-primary/20 w-16 sm:w-28" />
            <h2 className="text-gray-900 text-2xl sm:text-3xl font-extrabold tracking-tight text-center">
              {localizeCategoryName(category.name, locale)}
            </h2>
            <span className="h-px bg-primary/20 w-16 sm:w-28" />
          </div>
          <Menu
            items={category.products.map((product) => localizeProduct(product, locale))}
            locale={locale}
            translation={translation}
          />
        </section>
      ))}
    </div>
  );
}
