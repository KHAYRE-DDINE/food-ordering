import React from 'react'
import { Lock, CreditCard, Truck, ShieldCheck, Bell, Zap, ChevronRight } from "lucide-react";
import getTrans from '@/lib/translation';
import { Locale } from '@/i18n.config';
import Link from 'next/link';

export const Offers = async ({ locale }: { locale: Locale }) => {
  const { home } = await getTrans(locale);
  const { offers } = home;

  return (
    <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
      <div className="why border border-emerald-600/30 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="resons flex flex-col sm:flex-row justify-between items-center p-3 rounded-t-xl bg-emerald-700 text-white gap-2">
          <h2 className="flex justify-center items-center gap-1.5 text-sm font-semibold">
            <ShieldCheck className="h-5 w-5 text-emerald-200" /> {offers.whyChooseUs}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs">
            <p className="flex justify-center items-center gap-1.5 text-emerald-100">
              <Lock className="h-4 w-4" /> {offers.securePrivacy}
            </p>
            <p className="flex justify-center items-center gap-1.5 text-emerald-100">
              <CreditCard className="h-4 w-4" /> {offers.safePayments}
            </p>
            <p className="flex justify-center items-center gap-1.5 text-emerald-100">
              <Truck className="h-4 w-4" /> {offers.deliveryGuarantee}
            </p>
          </div>
        </div>
        <div className="description px-4 py-2 bg-emerald-50">
          <p className="flex justify-start items-center gap-2 text-emerald-800 text-xs font-medium">
            <Bell className="h-4 w-4 text-emerald-600 animate-bounce" />
            {offers.securityReminder}
          </p>
        </div>
      </div>
      <Link
        href={`/${locale}/offers`}
        className="lighting text-white bg-gradient-to-r from-primary to-orange-600 flex justify-between items-center p-3.5 rounded-xl mt-4 shadow-sm hover:opacity-95 transition-opacity block"
      >
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-200 fill-amber-200" />
          <span className="font-bold text-base sm:text-lg">{offers.lightningDeals}</span>
        </div>
        <div className="flex items-center gap-1 text-xs opacity-90 font-medium">
          <span>{offers.limitedTimeOffer}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </Link>
    </div>
  );
};
