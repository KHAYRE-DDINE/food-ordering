import React from "react";
import { Locale } from "@/i18n.config";
import FavoritesClient from "./_components/FavoritesClient";
import { Heart } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Favorites | Fasty Food",
  description: "View and manage your favorite dishes for quick and easy ordering.",
};

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full text-sm font-semibold mb-3">
            <Heart className="h-4 w-4 fill-red-500" />
            Saved Dishes
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600 text-sm">
            Quickly re-order the meals you love the most.
          </p>
        </div>

        <FavoritesClient />
      </div>
    </main>
  );
}
