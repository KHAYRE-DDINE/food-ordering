import getTrans from "@/lib/translation";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { CreditCard, ShieldCheck, Truck, Zap } from "lucide-react";

export const Offers = async () => {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { offers } = home;

  return (
    <section className="bg-white py-5">
      <div className="container">
        <div className="grid gap-3 rounded-lg border border-zinc-200 bg-zinc-950 p-4 text-white shadow-sm md:grid-cols-[1.1fr_2fr] md:items-center">
          <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-normal">
            <ShieldCheck className="h-5 w-5 text-primary" />
            {offers.whyTitle}
          </h2>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              {offers.securePrivacy}
            </p>
            <p className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              {offers.safePayments}
            </p>
            <p className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              {offers.deliveryGuarantee}
            </p>
          </div>
        </div>
        <div className="mt-3 grid gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 md:grid-cols-[1fr_auto] md:items-center">
          <p>{offers.reminder}</p>
          <div className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-3 py-2 font-bold text-white">
            <Zap className="h-4 w-4" />
            {offers.dealsTitle} · {offers.limitedTime}
          </div>
        </div>
      </div>
    </section>
  );
};
