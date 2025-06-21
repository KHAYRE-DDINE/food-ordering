'use client'
import MainHead from "@/components/main-heading";
import FilterItems from "@/components/Filter";
import Categories from "@/components/Categories/Categories";
import { useSelector } from "react-redux";

const MenuPage = () => {
  // const filters = useSelector((state)=> state.filters)

  // console.log(filters)


  return (
    <div>
      <div className="text-center pt-[66px]">
        <MainHead title="Choose Your Meal" subTitle="Enjoy with it" />
      </div>
      <FilterItems />
      <Categories/>
    </div>
  );
};

export default MenuPage;
