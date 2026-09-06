"use client";
import {
  SearchIcon,
  Pizza,
  Salad,
  IceCream,
  Sandwich,
  Apple,
  Beef,
  Carrot,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DropDown from "../SelectDropDown";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFilter,
  removeFromFilter,
} from "@/redux/features/filter/filterSlice";
import { FilterItems as FilterCheckout } from "@/redux/features/filter/filterSlice";
import { RootState } from "@/redux/store";
import { Translations } from "@/types/translations";


function FilterItems({ menu }: { menu: Translations["menu"] }) {
  const add = Object.keys(menu.ingredientLabels).map((name, index) => ({
    id: index + 1,
    name,
    label: menu.ingredientLabels[name as keyof typeof menu.ingredientLabels],
  }));
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter);

  const [selectedCategory, setSelectedCategory] =
    useState<string>(menu.allCategories);

  const handleCheckedBoxes = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: FilterCheckout
  ) => {
    if (event.target.checked) {
      dispatch(addToFilter({ name: "dietary", value: item.name }));
    } else {
      dispatch(removeFromFilter({ name: "dietary", value: item.value }));
    }
  };

  useEffect(() => {
    sessionStorage.setItem("filter", JSON.stringify(filters));
  }, [filters]);

  return (
    <>
      <div className="filter container mt-10 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {menu.searchMenu}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                name="search"
                placeholder={menu.searchPlaceholder}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-gray-700 placeholder-gray-400"
                onChange={(e) =>
                  dispatch(
                    addToFilter({ name: "search", value: e.target.value })
                  )
                }
              />
            </div>
          </div>

          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {menu.filterByCategory}
            </label>
            <div className="relative">
              <DropDown
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                dispatch={dispatch}
                allCategoriesLabel={menu.allCategories}
                categoryLabels={menu.categoryLabels}
              />
            </div>
          </div>
        </div>

        <div className="relative py-5 border-t border-gray-100">
          <div className="absolute inset-0 overflow-hidden opacity-10 h-[43px]">
            <div className="flex items-center justify-center h-full animate-marquee whitespace-nowrap">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="inline-flex items-center mx-8">
                  <Pizza className="h-8 w-8 mx-4 text-primary-500" />
                  <Salad className="h-8 w-8 mx-4 text-green-500" />
                  <IceCream className="h-8 w-8 mx-4 text-pink-300" />
                  <Sandwich className="h-8 w-8 mx-4 text-yellow-600" />
                  <Apple className="h-8 w-8 mx-4 text-red-400" />
                  <Beef className="h-8 w-8 mx-4 text-amber-700" />
                  <Carrot className="h-8 w-8 mx-4 text-orange-500" />
                </div>
              ))}
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            {menu.dietaryOptions}
          </h3>
          <div className="flex flex-wrap gap-4">
            {add.map((e) => (
              <div key={e.id} className="flex items-center">
                <input
                  type="checkbox"
                  name={e.name}
                  id={e.name}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-all duration-200"
                  onChange={(event) =>
                    handleCheckedBoxes(event, { name: e.name, value: e.name })
                  }
                />
                <label
                  htmlFor={e.name}
                  className="ml-2 text-sm text-gray-700 capitalize cursor-pointer hover:text-gray-900 transition-colors duration-200"
                >
                  {e.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
            display: inline-block;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `,
        }}
      />
    </>
  );
}

export default FilterItems;
