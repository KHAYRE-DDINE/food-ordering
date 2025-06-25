"use client";
import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import DropDown from "../SelectDropDown";
import { useDispatch } from "react-redux";
import { addToFilter } from "@/redux/features/filter/filterSlice";
import { FilterItems as FilterCheckout } from "@/redux/features/filter/filterSlice";

function FilterItems() {
  const add = [
    {
      id: 1,
      name: "onion",
    },
    {
      id: 2,
      name: "tomato",
    },
    {
      id: 3,
      name: "bacon",
    },
    {
      id: 4,
      name: "cheese",
    },
    {
      id: 5,
      name: "pepper",
    },
  ];
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Choose a Category");

  const handleCheckedBoxes = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: FilterCheckout
  ) => {
    if (event.target.checked) {
      dispatch(
        addToFilter({ name: 'dietary', value: item.name })
      );
    }
  };

  return (
    <div className="filter container bg-[#80808029] h-[200px] rounded-xl py-5 px-16 mt-10">
      <div className="top flex items-center justify-center gap-12">
        <div>
          <label className="text-[15px] ">Search menu</label>
          <div className="relative flex justify-start items-center mt-1 gap-2">
            <SearchIcon className="absolute left-[10px] w-[19px] " />
            <input
              type="search"
              name="search"
              placeholder="Search by name or keyword..."
              className="px-9 py-[9px] w-[300px] rounded-lg shadow-inner shadow-gray-200 placeholder:text-[15px] focus-visible:!border-primary"
              onChange={(e) =>
                dispatch(addToFilter({ name: "search", value: e.target.value }))
              }
            />
          </div>
        </div>
        <div>
          <label className="text-[15px] ">Filter by Category</label>
          <div className="category_filter flex justify-start items-center gap-2">
            <DropDown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
      <div className="bottom mt-5 mx-auto w-[640px]">
        <label className="text-[15px] ">Dietary Options</label>
        <div className="flex items-center justify-between mt-2 ">
          {add.map((e) => (
            <div key={e.id} className="gap-1 flex items-center">
              <input
                className="border-primary "
                type="checkbox"
                name={e.name}
                id={e.name}
                onChange={(event) => handleCheckedBoxes(event, {name:e.name, value:e.name})}
              />
              <label className="capitalize" htmlFor={e.name}>
                {e.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilterItems;
