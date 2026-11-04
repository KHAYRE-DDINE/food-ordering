"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Truck, ArrowRight } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

export default function TrackOrderLookupPage() {
  const [tokenInput, setTokenInput] = useState("");
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tokenInput.trim();
    if (!cleaned) {
      toast.error("Please enter your tracking reference code.", {
        position: "bottom-left",
      });
      return;
    }

    router.push(`/${locale}/orders/${encodeURIComponent(cleaned)}`);
  };

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10 text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Truck className="h-8 w-8" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            Track Your Order
          </h1>
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Enter the unique tracking reference code provided on your order confirmation screen or receipt to see live kitchen and delivery status.
          </p>

          <form onSubmit={handleTrack} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="e.g. cm123456789... or tracking token"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="h-12 text-base px-4 font-mono focus-visible:ring-2 focus-visible:ring-primary/50"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold gap-2 bg-primary hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
              Check Live Status
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-500">
            <MapPin className="h-4 w-4 text-gray-400" />
            Real-time updates directly from our kitchen and delivery fleet.
          </div>
        </div>
      </div>
    </main>
  );
}
