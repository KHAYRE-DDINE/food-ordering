import React from 'react'
import { GrSecure } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";
import getTrans from '@/lib/translation';
import { Locale } from '@/i18n.config';

export const Offers = async ({ locale }: { locale: Locale }) => {
  const { home } = await getTrans(locale);
  const { offers } = home;

  return (
    <div className="container">
    <div className="why mt-12 border border-1 border-[#0a8800] rounded-md">
      <div className="resons flex justify-between items-center p-3 rounded-md bg-[#0a8800] text-white hover:opacity-80">
        <h2 className="flex justify-center items-center gap-1 text-[14px]">
          <IoShieldCheckmark size={20} /> {offers.whyChooseUs}
        </h2>
        <div className="flex justify-center items-center gap-3">
          <p className="flex justify-center items-center gap-1 text-[14px]">
            <GrSecure size={20} /> {offers.securePrivacy}
          </p>
          <p className="flex justify-center items-center gap-1 text-[14px]">
            <GoCreditCard size={20} /> {offers.safePayments}
          </p>
          <p className="flex justify-center items-center gap-1 text-[14px]">
            <TbTruckDelivery size={20} /> {offers.deliveryGuarantee}
          </p>
        </div>
      </div>
      <div className="description">
        <p className="flex justify-start items-center gap-1 text-[#0a8800] py-[10px] px-[4px] text-[15px]">
          <IoIosNotifications size={25} className="animate-bounce" />
          {offers.securityReminder}
        </p>
      </div>
    </div>
    <div className="lighting animate-pulse text-white bg-gradient-to-r from-[#f5a153] to-[#d63d00] flex justify-center items-center gap-3 p-3 rounded-md mt-5">
      <div className="flex justify-center items-center gap-2">
        <BsFillLightningFill size={25} />
        <span className="font-bold text-[20px]">{offers.lightningDeals}</span>
      </div>
      <div className="flex justify-center items-center gap-1 opacity-80">
        <span className="text-[14px] ">{offers.limitedTimeOffer}</span>
        <FaChevronRight size={14} />
      </div>
    </div>
  </div>
  )
}
