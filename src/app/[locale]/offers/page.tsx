import React from "react";
import { db } from "@/lib/prisma";
import { Locale } from "@/i18n.config";
import OffersClient from "./_components/OffersClient";
import { Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offers & Promotions | Fasty Food",
  description: "Explore our latest special offers, combo meal deals, and exclusive discount codes.",
};

export default async function OffersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [offers, promos] = await Promise.all([
    db.offer.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),
    db.promoCode.findMany({
      where: { isActive: true },
      orderBy: { discountValue: "desc" },
    }),
  ]);

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
            <Sparkles className="h-4 w-4" />
            Special Deals
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Offers & Promotions
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            Enjoy premium restaurant dining at great value. Save on your next order with our verified promo coupons and curated meal bundles.
          </p>
        </div>

        <OffersClient offers={offers} promos={promos} />
      </div>
    </main>
  );
}
