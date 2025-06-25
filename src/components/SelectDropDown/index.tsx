"use client";
import { addToFilter } from "@/redux/features/filter/filterSlice";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { AppDispatch } from "@/redux/store";

function DropDown({
  selectedCategory,
  setSelectedCategory,
  dispatch,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  dispatch: AppDispatch;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const categories = [
    "All Categories",
    "Classic",
    "Vegetarian",
    "Meat",
    "Cheese",
    "Spicy",
  ];

  return (
    <div
      className="relative cursor-pointer bg-white px-[10px] py-[9px] w-[300px] h-[42px] leading-7 rounded-lg shadow-inner shadow-gray-200 focus-visible:!border-primary"
      onClick={() => setIsActive(!isActive)}
    >
      <h2 className="text-[15px] text-primary font-[500]">
        {selectedCategory}
      </h2>
      {isActive && (
        <ul className="absolute w-full left-0 p-2 mt-[7px] rounded-lg bg-white border-[2px] border-[hsl(0, 0%, 76.9%)] shadow-inner">
          {categories.map((e) => (
            <li
              key={e}
              onClick={(e:React.MouseEvent<HTMLElement>) => {
                const target = e.currentTarget;
                const category = target.textContent || '';
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
                  <CheckIcon size={20} /> {e}
                </span>
              ) : (
                <span>{e}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
