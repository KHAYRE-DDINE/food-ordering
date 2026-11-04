import React from "react";
import { Locale } from "@/i18n.config";
import { FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Fasty Food",
  description: "Read our terms of service regarding ordering, pricing, delivery, and user conduct.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 space-y-8">
          <div className="border-b border-gray-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-3">
              <FileText className="h-4 w-4" />
              Terms & Conditions
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Terms of Service
            </h1>
            <p className="text-xs text-gray-400">
              Last updated: October 2026
            </p>
          </div>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p>
              By accessing our website or submitting an order through Fasty Food, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please do not use our ordering platform.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">2. Ordering and Pricing</h2>
            <p>
              All prices displayed on the menu are subject to verification upon server calculation. We strive for exact accuracy in menu items, ingredient lists, and pricing. In the rare event of a typographical pricing error, we reserve the right to notify you before preparing the order.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">3. Delivery and Pickup Times</h2>
            <p>
              Stated delivery and pickup windows are reasonable estimates based on average preparation speeds and traffic conditions. While we make every effort to deliver promptly, delays may occasionally arise during severe weather or peak rush hours.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">4. Food Allergens and Dietary Needs</h2>
            <p>
              While we take great precautions to avoid cross-contamination, our kitchen prepares meals containing common allergens such as dairy, gluten, nuts, and soy. Please review product customization options carefully and notify us of any severe medical allergies prior to ordering.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">5. Governing Law</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the local laws governing our restaurant location.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
