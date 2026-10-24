"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getTotalAmount } from "@/lib/cart";
import { FormatCurrency } from "@/lib/Formatter";
import { ClearCartItems, selectCartItems } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import { useAppDispatch } from "@/redux/hooks";
import { CreditCard, MapPin, Phone, ShoppingBag, Mail } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Translations } from "@/types/translations";
import { useRouter, useParams } from "next/navigation";

const Checkpoint = ({ translation }: { translation: Translations['cart'] }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const totalAmount = getTotalAmount(cart);
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    userEmail: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: form.userEmail,
          phone: form.phone,
          streetAddress: form.address,
          postalCode: form.postalCode,
          city: form.city,
          country: form.country,
          // Only identifiers and quantities are sent. The server prices the order.
          products: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity ?? 1,
            sizeId: item.size?.id ?? null,
            extraIds: (item.extra ?? []).map((extra) => extra.id),
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order API error response:", errorData);
        throw new Error(errorData.error || "Failed to create order");
      }

      const data = await response.json();
      toast.success("Order submitted successfully!", {
        position: "bottom-left",
      });
      sessionStorage.removeItem("cartItems");
      dispatch(ClearCartItems());
      // Reset the form only after a successful order; on failure the customer keeps what they typed.
      setForm({ userEmail: "", phone: "", address: "", postalCode: "", city: "", country: "" });
      if (data.trackingToken) {
        router.push(`/${locale}/orders/${data.trackingToken}`);
      }
    } catch (error: unknown) {
      console.error("Order error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit order", {
        position: "bottom-left",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cart || cart.length === 0) {
    return null;
  }

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingBag className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">{translation.orderSummary}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <Label
            htmlFor="email"
            className="text-gray-700 flex items-center gap-2"
          >
            <Mail className="h-4 w-4 text-gray-500" />
            {translation.checkout.emailAddress}
          </Label>
          <Input
            id="email"
            placeholder="your@email.com"
            type="email"
            name="userEmail"
            value={form.userEmail}
            required
            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-11"
            onChange={(e) => handleForm(e)}
          />
        </div>
        <div className="space-y-1">
          <Label
            htmlFor="phone"
            className="text-gray-700 flex items-center gap-2"
          >
            <Phone className="h-4 w-4 text-gray-500" />
            {translation.checkout.phoneNumber}
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 000-0000"
            type="tel"
            name="phone"
            value={form.phone}
            required
            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-11"
            onChange={(e) => handleForm(e)}
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor="address"
            className="text-gray-700 flex items-center gap-2"
          >
            <MapPin className="h-4 w-4 text-gray-500" />
            {translation.checkout.deliveryAddress}
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your full address"
            name="address"
            value={form.address}
            required
            rows={3}
            className="resize-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[100px]"
            onChange={(e) =>
              setForm({
                ...form,
                [e.currentTarget.name]: e.currentTarget.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="postal-code" className="text-gray-700 text-sm">
              {translation.checkout.postalCode}
            </Label>
            <Input
              type="text"
              id="postal-code"
              placeholder="12345"
              name="postalCode"
              value={form.postalCode}
              required
              className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10"
              onChange={(e) => handleForm(e)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="city" className="text-gray-700 text-sm">
              {translation.checkout.city}
            </Label>
            <Input
              type="text"
              id="city"
              placeholder="New York"
              name="city"
              value={form.city}
              required
              className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10"
              onChange={(e) => handleForm(e)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="country" className="text-gray-700 text-sm">
            {translation.checkout.country}
          </Label>
          <Input
            type="text"
            id="country"
            placeholder="United States"
            name="country"
            value={form.country}
            required
            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10"
            onChange={(e) => handleForm(e)}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-colors"
            disabled={isSubmitting}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {isSubmitting
              ? translation.checkout.processing
              : `${translation.checkout.pay} ${FormatCurrency(totalAmount)}`}
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          {translation.checkout.agreement}
        </p>
      </form>
    </div>
  );
};

export default Checkpoint;
