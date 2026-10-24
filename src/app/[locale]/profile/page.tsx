import React from "react";
import { Locale } from "@/i18n.config";
import ProfileClient from "./_components/ProfileClient";
import { User } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account & Profile | Fasty Food",
  description: "Manage your personal information, saved delivery addresses, and past order history.",
};

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <main className="min-h-[calc(100vh-193px)] bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
            <User className="h-4 w-4" />
            Customer Portal
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Account & Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Manage your personal details, saved delivery addresses, and preferences.
          </p>
        </div>

        <ProfileClient />
      </div>
    </main>
  );
}
