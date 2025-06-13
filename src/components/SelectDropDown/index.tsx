"use client";
import { useState } from "react";

function DropDown({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const categories = ["Classic", "Vegetarian", "Meat", "Cheese", "Spicy"];

  return (
    <div 
    className="relative cursor-pointer bg-white px-[10px] py-[9px] w-[300px] h-[42px] leading-7 rounded-lg shadow-inner shadow-gray-200 focus-visible:!border-primary"
    onClick={()=> setIsActive(!isActive)}
    >
      <h2 className="text-[15px] text-primary">{selectedCategory}</h2>
      {isActive && (
        <ul className="absolute ">
          {categories.map((e) => (
            <li
              key={e}
              onClick={(e) => {
                setIsActive(!isActive);
                setSelectedCategory(e.target.textContent);
              }}
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDown;
