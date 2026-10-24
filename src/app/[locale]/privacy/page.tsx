import React from "react";
import { Locale } from "@/i18n.config";
import { ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fasty Food",
  description: "Read our privacy policy regarding how we protect your personal information and order data.",
};

export default async function PrivacyPage({
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
              <ShieldCheck className="h-4 w-4" />
              Legal & Compliance
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-gray-400">
              Last updated: October 2026
            </p>
          </div>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">1. Information We Collect</h2>
            <p>
              When you place an order on Fasty Food, we collect the necessary information to fulfill your meal preparation and delivery. This includes your name, email address, contact telephone number, and physical delivery address.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">2. How We Use Your Information</h2>
            <p>
              Your contact details are strictly used to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
              <li>Process, prepare, and deliver your food order.</li>
              <li>Provide you with live order status updates and receipts.</li>
              <li>Contact you if our kitchen has a question regarding your order.</li>
              <li>Improve platform performance and service reliability.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">3. Data Security & Storage</h2>
            <p>
              We implement industry-standard encryption and security measures. Payment details are processed through encrypted payment gateways; we never store your credit card or CVV details on our servers.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">4. Sharing with Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal information to third parties. Information is only shared with authorized delivery couriers strictly for the purpose of locating your delivery address.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">5. Your Rights and Inquiries</h2>
            <p>
              You have the right to access, rectify, or request deletion of your personal order history. For privacy-related inquiries, please contact our support team at privacy@fastyfood.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
