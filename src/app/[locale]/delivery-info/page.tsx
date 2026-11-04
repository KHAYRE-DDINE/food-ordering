import React from "react";
import { db } from "@/lib/prisma";
import { Locale } from "@/i18n.config";
import { FormatCurrency } from "@/lib/Formatter";
import {
  Truck,
  Store,
  Clock,
  MapPin,
  ShieldAlert,
  CheckCircle2,
  PhoneCall,
  DollarSign,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery & Pickup Information | Fasty Food",
  description: "Learn about our delivery zones, order minimums, free shipping thresholds, and pickup times.",
};

export default async function DeliveryInfoPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  const settings = await db.restaurantSettings.findUnique({
    where: { id: "default" },
  });

  const deliveryFee = settings?.deliveryFee ?? 5.0;
  const minOrder = settings?.minOrderAmount ?? 10.0;
  const freeThreshold = settings?.freeDeliveryThreshold ?? 40.0;
  const deliveryMins = settings?.estimatedDeliveryMinutes ?? 35;
  const pickupMins = settings?.estimatedPickupMinutes ?? 15;
  const openingHours = `${settings?.openingHour ?? "10:00 AM"} – ${settings?.closingHour ?? "11:00 PM"}`;
  const days = settings?.operatingDays ?? "Monday - Sunday";

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
            <Truck className="h-4 w-4" />
            Fulfillment Guide
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Delivery & Pickup
          </h1>
          <p className="text-gray-600 text-sm">
            Everything you need to know about our service areas, preparation speeds, and packaging standards.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Delivery Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Truck className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Home & Office Delivery
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Freshly prepared meals sealed in thermal, tamper-evident containers delivered straight to your door.
              </p>

              <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Estimated Delivery Time:
                  </span>
                  <strong className="text-gray-900">{deliveryMins} - {deliveryMins + 15} mins</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Standard Delivery Fee:
                  </span>
                  <strong className="text-gray-900">{FormatCurrency(deliveryFee)}</strong>
                </div>

                <div className="flex justify-between text-green-700 font-semibold bg-green-50 p-2.5 rounded-lg">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Free Delivery Threshold:
                  </span>
                  <span>Orders over {FormatCurrency(freeThreshold)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Minimum Order Amount:</span>
                  <strong className="text-gray-900">{FormatCurrency(minOrder)}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Store className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Restaurant Express Pickup
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Skip the wait and collect your order directly from our kitchen counter with zero delivery fees.
              </p>

              <div className="space-y-3 pt-4 border-t border-gray-100 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    Pickup Ready In:
                  </span>
                  <strong className="text-gray-900">{pickupMins} - {pickupMins + 10} mins</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Pickup Fee:
                  </span>
                  <strong className="text-green-700">Always FREE ($0.00)</strong>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Pickup Address:
                  </span>
                  <span className="text-right font-medium text-gray-900">
                    {settings?.address ?? "123 Food Street"}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Contact Kitchen:</span>
                  <strong className="text-gray-900">{settings?.phone ?? "+1 555-0199"}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Operating Hours & Notes */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Kitchen Operating Hours
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Orders are accepted and cooked live during our official operating schedule:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200/60 mb-6">
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                Operating Days
              </span>
              <p className="font-semibold text-gray-900 mt-0.5">{days}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">
                Cooking & Dispatch Hours
              </span>
              <p className="font-semibold text-gray-900 mt-0.5">{openingHours}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl text-amber-900 text-xs leading-relaxed border border-amber-200">
            <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              During peak dinner hours (7:00 PM – 9:00 PM) or inclement weather, delivery times may vary by 10–15 minutes to guarantee driver safety and optimal food freshness.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
