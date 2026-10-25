"use client";
import "./Menu.css";
import { FormatCurrency } from "@/lib/Formatter";
import React, { JSX } from "react";
import AddButton from "./add-to-cart";
import { ProductWithRelations } from "@/types/product";
import { Routes } from "@/constants/enums";
import Link from "next/link";
import { motion } from "motion/react";
import { Salad, Vegan, Pizza, Flame, Sparkles } from "lucide-react";
import { LanguageType } from "@/i18n.config";
import { Translations } from "@/types/translations";
import { defaultMenuTranslation, localizeExtraName } from "@/lib/menu-localization";
import { Languages } from "@/constants/enums";
import FavoriteButton from "./FavoriteButton";

function MenuItem({
  item,
  locale,
  translation,
}: {
  item: ProductWithRelations;
  locale?: LanguageType;
  translation?: Translations['menu'];
}) {
  const currentLocale = locale ?? Languages.ENGLISH;
  const currentTranslation = translation ?? defaultMenuTranslation;

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="menu-item h-full p-4 rounded-xl bg-white border border-gray-100 hover:shadow-xl duration-200 transition-all shadow-sm"
    >
      <div className="relative w-full h-48 mx-auto overflow-hidden rounded-lg bg-gray-50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton
            item={{
              id: item.id,
              name: item.name,
              image: item.image,
              basePrice: item.basePrice,
              description: item.description,
              categoryId: item.categoryId,
            }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center h-[50px] mt-2">
        <Link key={item.id} href={`/${currentLocale}/${Routes.MENU}/${item.id}`} prefetch>
          <h4 className="font-bold text-[17px] hover:text-primary transition-colors">{item.name}</h4>
        </Link>
        <strong className="text-primary font-extrabold text-base">
          {FormatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-xs line-clamp-2 text-start mt-[-8px] h-[32px] leading-relaxed">{item.description}</p>
      <div className="spices flex justify-center items-center flex-wrap gap-x-2 mt-2">
        {item.extras.map((extra) => {
          const extraIcons: { [key: string]: JSX.Element } = {
            cheese: <Pizza className="w-3.5 h-3.5 text-amber-500" />,
            pepper: <Flame className="w-3.5 h-3.5 text-red-600" />,
            tomato: <Vegan className="w-3.5 h-3.5 text-emerald-600" />,
            bacon: <Sparkles className="w-3.5 h-3.5 text-rose-600" />,
            onion: <Salad className="w-3.5 h-3.5 text-purple-600" />,
          };

          const icon = extraIcons[extra.name.toLowerCase()] || null;

          return (
            <div
              key={`${item.id}-${extra.id}`}
              className="extras h-[20px] my-1 flex items-center gap-x-1 border rounded-full border-gray-200 bg-gray-50 px-2.5 py-1 text-gray-700"
            >
              {icon}
              <span className="capitalize text-[11px] font-medium">
                {localizeExtraName(extra.name, currentLocale)}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-3">
        <AddButton item={item} locale={currentLocale} translation={currentTranslation} />
      </div>
    </motion.div>
  );
}

export default MenuItem;
