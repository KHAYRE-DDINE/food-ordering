"use client";
import React, { useState } from "react";
import { Search, ChevronDown, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

type FaqItem = {
  category: string;
  question: string;
  answer: string;
};

const FAQ_DATA: FaqItem[] = [
  {
    category: "Ordering & Customization",
    question: "How do I customize my dish size or ingredients?",
    answer:
      "When browsing the menu, click 'Add to Cart' or select any dish to open the customization dialog. You can pick your desired size (Small, Medium, Large) and select extra toppings like Cheese, Bacon, Tomato, Pepper, or Onion.",
  },
  {
    category: "Ordering & Customization",
    question: "Can I place an order as a guest without creating an account?",
    answer:
      "Yes! You can order seamlessly as a guest by entering your contact email, phone number, and delivery address at checkout. We will provide you with a live tracking reference link.",
  },
  {
    category: "Delivery & Pickup",
    question: "What are your delivery hours and delivery fee?",
    answer:
      "Our kitchen prepares orders daily from 10:00 AM to 11:00 PM. Standard delivery has a flat fee of $5.00, or FREE delivery for orders above $40.00. Pickup at the restaurant is always free.",
  },
  {
    category: "Delivery & Pickup",
    question: "How long does delivery usually take?",
    answer:
      "Orders are prepared fresh to order. Standard delivery takes approximately 30-45 minutes depending on distance and peak kitchen volume. In-store pickup is usually ready in 15-20 minutes.",
  },
  {
    category: "Payments & Discounts",
    question: "What payment methods do you accept?",
    answer:
      "We accept Cash on Delivery, Cash on Pickup, and major online payment cards through our secure checkout integration.",
  },
  {
    category: "Payments & Discounts",
    question: "How do I use a promotional code?",
    answer:
      "At checkout in your shopping cart summary, enter your code (such as WELCOME10 or FEAST20) into the Promo Code box and click 'Apply'. The discount will be verified and deducted instantly.",
  },
  {
    category: "Cancellations & Refunds",
    question: "Can I cancel or modify my order after placing it?",
    answer:
      "Orders can be modified or cancelled within 5 minutes of placement before our kitchen begins cooking. Please contact us immediately by phone at +1 555-0199 for urgent modifications.",
  },
  {
    category: "Cancellations & Refunds",
    question: "What is your refund policy if an item is missing or damaged?",
    answer:
      "Customer satisfaction is our highest priority. If an item is missing, incorrect, or does not meet quality standards, please reach out via our Contact page or phone within 2 hours of delivery for an immediate replacement or full refund.",
  },
];

export default function FaqClient() {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(FAQ_DATA.map((item) => item.category))];

  const filtered = FAQ_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search and Category Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search questions (e.g. delivery fee, cancel, coupon)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-10 text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100">
            <HelpCircle className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">
              No matching questions found. Try searching for different keywords or contact our team directly.
            </p>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-gray-900 text-base hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50 mt-1">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
