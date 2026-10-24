import React from "react";
import { UtensilsCrossed, SlidersHorizontal, Truck, ArrowRight } from "lucide-react";
import { Locale } from "@/i18n.config";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrderingSteps({ locale }: { locale: Locale }) {
  const steps = [
    {
      step: "01",
      icon: <UtensilsCrossed className="h-6 w-6 text-primary" />,
      title: "Choose Your Meal",
      description:
        "Explore our curated selection of fresh stone-baked pizzas, grilled meats, and artisanal platters.",
    },
    {
      step: "02",
      icon: <SlidersHorizontal className="h-6 w-6 text-primary" />,
      title: "Customize & Add Extras",
      description:
        "Select your ideal serving size, customize toppings, cheeses, and spices to suit your exact craving.",
    },
    {
      step: "03",
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Fast Delivery or Pickup",
      description:
        "Follow your food with real-time status tracking as our kitchen cooks and our courier delivers hot.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-wider">
            Easy & Intuitive
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-1 mb-3">
            How Fasty Food Works
          </h2>
          <p className="text-sm text-gray-600">
            Enjoy delicious restaurant-grade meals in three simple steps without unnecessary friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 transition-all flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-gray-200 font-mono">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href={`/${locale}/menu`}>
            <Button size="lg" className="rounded-full px-8 gap-2 shadow-md">
              Start Your Order Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
