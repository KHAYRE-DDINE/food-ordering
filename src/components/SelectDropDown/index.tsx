"use client";
import { addToFilter } from "@/redux/features/filter/filterSlice";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { Translations } from "@/types/translations";

function DropDown({
  selectedCategory,
  setSelectedCategory,
  dispatch,
  translation,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  dispatch: AppDispatch;
  translation: Translations['menu'];
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const categories = [
    "All Categories",
    "Classic",
    "Vegetarian",
    "Meat",
    "Cheese",
    "Spicy",
    "Burgers",
    "Desserts",
    "Beverages",
    "Sides",
  ];
  const isArabic = translation.allCategories !== "All Categories";
  const labels: Record<string, string> = {
    "All Categories": translation.allCategories,
    Classic: isArabic ? "كلاسيكي" : "Classic",
    Vegetarian: isArabic ? "نباتي" : "Vegetarian",
    Meat: isArabic ? "لحوم" : "Meat",
    Cheese: isArabic ? "جبن" : "Cheese",
    Spicy: isArabic ? "حار" : "Spicy",
    Burgers: isArabic ? "برجر" : "Burgers",
    Desserts: isArabic ? "حلويات" : "Desserts",
    Beverages: isArabic ? "مشروبات" : "Beverages",
    Sides: isArabic ? "مقبلات" : "Sides",
  };

  return (
    <div
      className="relative cursor-pointer bg-white px-[10px] py-[9px] w-[300px] h-[42px] leading-7 rounded-lg shadow-inner shadow-gray-200 focus-visible:!border-primary"
      onClick={() => setIsActive(!isActive)}
    >
      <h2 className="text-[15px] text-primary font-[500]">
        {labels[selectedCategory] ?? selectedCategory}
      </h2>
      {isActive && (
        <ul className="absolute w-full left-0 p-2 mt-[7px] rounded-lg z-50 bg-white border-[2px] border-[hsl(0, 0%, 76.9%)] shadow-inner">
          {categories.map((e) => (
            <li
              key={e}
              data-value={e}
              onClick={(e:React.MouseEvent<HTMLElement>) => {
                const target = e.currentTarget;
                const category = target.dataset.value || '';
                setIsActive(!isActive);
                setSelectedCategory(category);
                dispatch(
                  addToFilter({ name: "category", value: category })
                );
              }}
              className={`${
                selectedCategory == e
                  ? "px-1 bg-primary rounded-md text-white py-[3px]"
                  : "px-9 py-[3px]"
              }`}
            >
              {selectedCategory == e ? (
                <span className="flex items-center justify-start gap-2">
                  <CheckIcon size={20} /> {labels[e]}
                </span>
              ) : (
                <span>{labels[e]}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
