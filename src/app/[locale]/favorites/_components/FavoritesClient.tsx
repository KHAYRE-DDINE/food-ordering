"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  clearFavorites,
  removeFavorite,
  selectFavorites,
} from "@/redux/features/favorites/favoritesSlice";
import { AddToCart } from "@/redux/features/cart/cartSlice";
import { FormatCurrency } from "@/lib/Formatter";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

export default function FavoritesClient() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading your favorites...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center max-w-lg mx-auto border border-gray-100">
        <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Favorites Yet</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          You haven&apos;t saved any dishes yet. Tap the heart icon on any menu item to quickly find and order your favorite meals here!
        </p>
        <Link href={`/${locale}/menu`}>
          <Button className="gap-2">
            Explore Menu
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = (item: (typeof favorites)[0]) => {
    dispatch(
      AddToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        basePrice: item.basePrice,
        quantity: 1,
      })
    );
    toast.success(`${item.name} added to your cart!`, {
      position: "bottom-left",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-600">
          Showing <strong className="text-gray-900">{favorites.length}</strong> saved {favorites.length === 1 ? "dish" : "dishes"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            dispatch(clearFavorites());
            toast.info("Favorites cleared", { position: "bottom-left" });
          }}
          className="text-gray-500 hover:text-red-600 text-xs"
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="relative h-48 w-full bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => dispatch(removeFavorite(item.id))}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-red-500 rounded-full shadow-sm hover:scale-105 transition-all"
                  aria-label="Remove from favorites"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Link
                    href={`/${locale}/menu/${item.id}`}
                    className="hover:underline"
                  >
                    <h3 className="font-bold text-gray-900 text-lg">
                      {item.name}
                    </h3>
                  </Link>
                  <strong className="text-primary font-bold text-base shrink-0">
                    {FormatCurrency(item.basePrice)}
                  </strong>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <Button
                onClick={() => handleAddToCart(item)}
                className="w-full gap-2 text-sm font-semibold h-10"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
