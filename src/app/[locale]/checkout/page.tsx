import Checkpoint from "../cart/_components/checkout";
import Items from "../cart/_components/items";
import { CreditCard } from "lucide-react";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";

export default async function CheckoutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const translation = await getTrans(locale as Locale);

  return (
    <main className="min-h-[calc(100vh-193px)] bg-zinc-50 py-10">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-center gap-2">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-center text-4xl font-bold text-zinc-950">
            {translation.checkout.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-6 text-2xl font-semibold text-zinc-900">
              {translation.checkout.reviewTitle}
            </h2>
            <Items labels={translation.cart} menuLabels={translation.menuItem} />
          </div>
          <div className="h-fit lg:sticky lg:top-28">
            <Checkpoint labels={translation.checkout} />
          </div>
        </div>
      </div>
    </main>
  );
}
