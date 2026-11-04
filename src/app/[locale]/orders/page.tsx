import React from "react";
import { Locale } from "@/i18n.config";
import MyOrdersClient from "./_components/MyOrdersClient";
import { Package } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Fasty Food",
  description: "View past orders, track live status, and quickly reorder your favorite meals.",
};

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
            <Package className="h-4 w-4" />
            Order Management
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 text-sm">
            Review past meals, monitor fulfillment progress, or reorder with one click.
          </p>
        </div>

        <MyOrdersClient />
      </div>
    </main>
  );
}
