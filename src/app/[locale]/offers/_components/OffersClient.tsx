"use client";
import React, { useState } from "react";
import { FormatCurrency } from "@/lib/Formatter";
import { Button } from "@/components/ui/button";
import { Tag, Copy, Check, Sparkles, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useParams } from "next/navigation";

export type OfferItem = {
  id: string;
  title: string;
  description: string;
  badge: string | null;
  price: number;
  originalPrice: number | null;
  image: string;
  terms: string | null;
};

export type PromoItem = {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderAmount: number;
  maxDiscount: number | null;
};

export default function OffersClient({
  offers,
  promos,
}: {
  offers: OfferItem[];
  promos: PromoItem[];
}) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Coupon code ${code} copied to clipboard!`, {
      position: "bottom-left",
    });
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  return (
    <div className="space-y-16">
      {/* Active Promo Codes */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Tag className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">
            Available Promo Coupons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="bg-white border-2 border-dashed border-primary/40 rounded-xl p-5 hover:border-primary transition-colors flex flex-col justify-between shadow-sm relative overflow-hidden"
            >
              <div className="absolute -right-8 -top-8 w-20 h-20 bg-primary/10 rounded-full flex items-end justify-start p-3" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {promo.discountType === "PERCENTAGE"
                      ? `${promo.discountValue}% OFF`
                      : `$${promo.discountValue.toFixed(2)} OFF`}
                  </span>
                  <span className="text-xs text-gray-500">Active</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Use Code: <span className="text-primary font-mono">{promo.code}</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {promo.minOrderAmount > 0
                    ? `Valid on orders over $${promo.minOrderAmount.toFixed(2)}`
                    : "Valid on all orders"}
                  {promo.maxDiscount && ` (max discount $${promo.maxDiscount.toFixed(2)})`}.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-mono">
                  {promo.code}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(promo.code)}
                  className="h-8 gap-1.5 text-xs font-semibold"
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Meal Deals & Bundles */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-900">
            Curated Meal Deals & Combos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="relative h-48 w-full bg-gray-100">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                {deal.badge && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {deal.badge}
                  </span>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {deal.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {deal.description}
                  </p>
                  {deal.terms && (
                    <p className="text-xs text-gray-400 italic mb-4">
                      *{deal.terms}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-primary">
                      {FormatCurrency(deal.price)}
                    </span>
                    {deal.originalPrice && (
                      <span className="ml-2 text-sm text-gray-400 line-through">
                        {FormatCurrency(deal.originalPrice)}
                      </span>
                    )}
                  </div>

                  <Link href={`/${locale}/menu`}>
                    <Button size="sm" className="gap-1.5 font-medium">
                      Order from Menu
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotion Policy / Notice */}
      <section className="bg-primary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-1">
              Promotions & Deal Conditions
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Promo codes and meal bundle prices are strictly verified and applied at checkout. Discounts apply to food subtotal and do not cover mandatory delivery fees. Only one promotional coupon code can be applied per order. Offers are subject to restaurant kitchen availability.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
