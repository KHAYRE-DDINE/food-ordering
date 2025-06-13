"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTotalAmount } from "@/lib/cart";
import { FormatCurrency } from "@/lib/Formatter";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

const Checkpoint = () => {
  const cart = useAppSelector(selectCartItems);
  const totalAmount = getTotalAmount(cart);

  return (
    cart &&
    cart.length > 0 && (
      <div className="grid gap-6 bg-gray-100 rounded-md p-4">
        <h2 className="text-2xl text-black font-semibold">Checkout</h2>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="phone" className="text-accent">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Enter your phone"
                type="text"
                name="phone"
                className="focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-2 focus-visible:!ring-orange-500 focus-visible:!ring-offset-0"
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="address" className="text-accent">
                Street address
              </Label>
              <Textarea
                id="address"
                placeholder="Enter your address"
                name="address"
                className='resize-none focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-2 focus-visible:!ring-orange-500 focus-visible:!ring-offset-0"                               '
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid gap-1">
                <Label htmlFor="postal-code" className="text-accent">
                  Postal code
                </Label>
                <Input
                  type="text"
                  id="postal-code"
                  placeholder="Enter postal code"
                  name="postal-code"
                  className="focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-2 focus-visible:!ring-orange-500 focus-visible:!ring-offset-0"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="city" className="text-accent">
                  City
                </Label>
                <Input
                  type="text"
                  id="city"
                  placeholder="Enter your City"
                  name="city"
                  className="focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-2 focus-visible:!ring-orange-500 focus-visible:!ring-offset-0"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="country" className="text-accent">
                  Country
                </Label>
                <Input
                  type="text"
                  id="country"
                  placeholder="Enter your country"
                  name="country"
                  className="focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-2 focus-visible:!ring-orange-500 focus-visible:!ring-offset-0"
                />
              </div>
            </div>
            <Button className="h-10">Pay {FormatCurrency(totalAmount)}</Button>
          </div>
        </form>
      </div>
    )
  );
};

export default Checkpoint;
