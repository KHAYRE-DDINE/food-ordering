"use client";
import "./Menu.css";
import { FormatCurrency } from "@/lib/Formatter";
import React, { JSX } from "react";
import AddButton from "./add-to-cart";
import Image from "next/image";
import { ProductWithRelations } from "@/types/product";
import { Routes } from "@/constants/enums";
import Link from "next/link";
import { motion } from "motion/react";
import { FaBacon, FaCheese, FaPepperHot } from "react-icons/fa6";
import { Salad, Vegan } from "lucide-react";

function MenuItem({ item }: { item: ProductWithRelations }) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      // whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="menu-item h-full p-4 rounded-md bg-gray-200 hover:shadow-2xl shadow-[#000000b3] duration-75"
    >
      <div className="relative w-full h-48 mx-auto overflow-hidden">
        <Image src={item.image} className="object-fill" alt={item.name} fill />
      </div>
      <div className="flex justify-between items-center h-[50px]">
        <Link key={item.id} href={`${Routes.MENU}/${item.id}`} prefetch>
          <h4 className="font-semibold text-[17px] hover:underline">{item.name}</h4>
        </Link>
        <strong className="text-accent">
          {FormatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-1 text-start mt-[-20px] h-[20px]">{item.description}</p>
      <div className="spices flex justify-center items-center flex-wrap gap-x-2">
        {item.extras.map((extra) => {
          const extraIcons: { [key: string]: JSX.Element } = {
            cheese: <FaCheese className="w-4 h-4 text-yellow-400" />,
            pepper: <FaPepperHot className="w-4 h-4 text-red-600" />,
            tomato: <Vegan className="w-4 h-4 text-red-500" />,
            bacon: <FaBacon className="w-4 h-4 text-red-800" />,
            onion: <Salad className="w-4 h-4 text-purple-500" />,
          };

          const icon = extraIcons[extra.name.toLowerCase()] || null;

          return (
            <div
              key={`${item.id}-${extra.id}`}
              className="extras h-[18px] my-2 flex items-center gap-x-1 border border-1 rounded-xl border-gray-400 p-[10px]"
            >
              {icon}
              <span className=" capitalize text-[12px] ">
                {extra.name}
              </span>
            </div>
          );
        })}
      </div>
      <AddButton item={item} />
    </motion.div>
  );
}

export default MenuItem;
