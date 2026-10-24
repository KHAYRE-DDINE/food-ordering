"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectFavorites,
  toggleFavorite,
  FavoriteItem,
} from "@/redux/features/favorites/favoritesSlice";

type FavoriteButtonProps = {
  item: FavoriteItem;
  className?: string;
  size?: number;
};

export default function FavoriteButton({
  item,
  className = "",
  size = 18,
}: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFav = mounted && favorites.some((fav) => fav.id === item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(item));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 ${
        isFav
          ? "bg-white text-red-500 shadow-md scale-105"
          : "bg-white/80 text-gray-500 hover:text-red-500 hover:bg-white hover:scale-105 shadow-sm"
      } ${className}`}
    >
      <Heart
        size={size}
        className={isFav ? "fill-red-500 text-red-500" : "text-current"}
      />
    </button>
  );
}
