"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { selectFavorites } from "@/redux/features/favorites/favoritesSlice";
import { useParams } from "next/navigation";

export default function FavoritesIcon() {
  const favorites = useAppSelector(selectFavorites);
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? favorites.length : 0;

  return (
    <Link
      href={`/${locale}/favorites`}
      className="block relative group"
      aria-label="View Favorites"
    >
      {count > 0 && (
        <span className="absolute -top-3.5 start-3.5 bg-red-500 w-4 h-4 rounded-full text-white text-center text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
      <Heart className="text-accent group-hover:text-red-500 duration-200 transition-colors !h-5 !w-5" />
    </Link>
  );
}
