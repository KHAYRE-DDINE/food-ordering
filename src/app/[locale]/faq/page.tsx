import React from "react";
import { Locale } from "@/i18n.config";
import FaqClient from "./_components/FaqClient";
import { HelpCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Fasty Food",
  description: "Find clear answers to questions about our food ordering, delivery areas, payments, and store policies.",
};

export default async function FaqPage({
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
            <HelpCircle className="h-4 w-4" />
            Help Center
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-sm">
            Everything you need to know about our ingredients, ordering process, delivery times, and cancellation policy.
          </p>
        </div>

        <FaqClient />
      </div>
    </main>
  );
}
