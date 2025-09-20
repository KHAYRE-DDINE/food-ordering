import React from 'react'
import { GrSecure } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShieldCheckmark } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { BsFillLightningFill } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa6";

export const Offers = () => {
  return (
    <div className="container">
    <div className="why mt-12 border border-1 border-[#0a8800] rounded-md">
      <div className="resons flex justify-between items-center p-3 rounded-md bg-[#0a8800] text-white hover:opacity-80">
        <h2 className="flex justify-center items-center gap-1 text-[14px]">
          <IoShieldCheckmark size={20} /> Why Choose Us?
        </h2>
        <div className="flex justify-center items-center gap-3">
          <p className="flex justify-center items-center gap-1 text-[14px]">
            <GrSecure size={20} /> Secure privacy
          </p>
          <p className="flex justify-center items-center gap-1 text-[14px]">
            <GoCreditCard size={20} /> Safe payments
          </p>
          <p className="flex justify-center items-center gap-1 text-[14px]">
            <TbTruckDelivery size={20} /> Delivery guarantee
          </p>
        </div>
      </div>
      <div className="description">
        <p className="flex justify-start items-center gap-1 text-[#0a8800] py-[10px] px-[4px] text-[15px]">
          <IoIosNotifications size={25} className="animate-bounce" />
          Security reminder: Please be wary of scam messages and links. Temu
          won&apos;t ask for extra fees via SMS or email.
        </p>
      </div>
    </div>
    <div className="lighting animate-pulse text-white bg-gradient-to-r from-[#f5a153] to-[#d63d00] flex justify-center items-center gap-3 p-3 rounded-md mt-5">
      <div className="flex justify-center items-center gap-2">
        <BsFillLightningFill size={25} />
        <span className="font-bold text-[20px]">Lightning deals</span>
      </div>
      <div className="flex justify-center items-center gap-1 opacity-80">
        <span className="text-[14px] ">Limited time offer</span>
        <FaChevronRight size={14} />
      </div>
    </div>
  </div>
  )
}
