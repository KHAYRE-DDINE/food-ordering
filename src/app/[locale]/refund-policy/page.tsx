import React from "react";
import { Locale } from "@/i18n.config";
import { RotateCcw } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Fasty Food",
  description: "Learn about order cancellations, refunds, item replacements, and our quality guarantee.",
};

export default async function RefundPolicyPage({
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
              <RotateCcw className="h-4 w-4" />
              Customer Assurance
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Cancellation & Refund Policy
            </h1>
            <p className="text-xs text-gray-400">
              Last updated: October 2026
            </p>
          </div>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">1. Order Cancellation Window</h2>
            <p>
              Because our dishes are prepared fresh upon receipt, you may cancel or change your order within <strong>5 minutes</strong> of submission by calling our dispatch desk directly at +1 555-0199. Once the kitchen has initiated cooking, orders cannot be cancelled.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">2. Missing, Incorrect, or Damaged Items</h2>
            <p>
              If an item is missing from your package, incorrect relative to your customizations, or damaged during transport, please notify us within <strong>2 hours</strong> of receipt. We will promptly provide:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600">
              <li>An immediate complimentary re-cook and express delivery of the correct item, OR</li>
              <li>A direct refund for the affected item to your original payment method.</li>
            </ul>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">3. Refund Processing Times</h2>
            <p>
              Approved card refunds are processed immediately by our finance desk and typically reflect on your bank or credit card balance within 3 to 5 business days, depending on your banking institution. Cash payments are refunded directly in cash at our restaurant counter.
            </p>
          </section>

          <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <h2 className="text-lg font-bold text-gray-900">4. Contact Support</h2>
            <p>
              To initiate a resolution or check refund status, please have your order reference code handy and reach out to support@fastyfood.com or call +1 555-0199.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
