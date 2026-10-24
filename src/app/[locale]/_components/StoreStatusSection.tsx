import React from "react";
import { db } from "@/lib/prisma";
import { Locale } from "@/i18n.config";
import { MapPin, Phone, Clock, Store, CheckCircle, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function StoreStatusSection({ locale }: { locale: Locale }) {
  let settings = null;
  try {
    settings = await db.restaurantSettings.findUnique({
      where: { id: "default" },
    });
  } catch (err) {
    console.error("StoreStatusSection fetch error:", err);
  }

  const isOpen = settings?.isOpen ?? true;
  const address = settings?.address ?? "123 Food Street";
  const phone = settings?.phone ?? "+1 555-0199";
  const hours = `${settings?.openingHour ?? "10:00 AM"} – ${settings?.closingHour ?? "11:00 PM"}`;
  const days = settings?.operatingDays ?? "Monday - Sunday";

  return (
    <section className="py-14 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white backdrop-blur-sm">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpen ? "bg-green-400 animate-pulse" : "bg-red-400"
                  }`}
                />
                {isOpen ? "Kitchen Open & Taking Orders" : "Kitchen Currently Closed"}
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Visit Us or Order Direct
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Enjoy hot, chef-crafted meals cooked to order with authentic ingredients. We provide contact-free home delivery and swift in-store pickup.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-gray-200">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
                  <span>
                    {days}: <strong className="text-white">{hours}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-primary shrink-0" />
                  <span className="truncate">{address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4 w-4 text-primary shrink-0" />
                  <span>Free delivery on orders $40+</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link href={`/${locale}/menu`}>
                <Button size="lg" className="w-full font-bold shadow-md">
                  Order for Delivery
                </Button>
              </Link>
              <Link href={`/${locale}/delivery-info`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Delivery & Pickup Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
