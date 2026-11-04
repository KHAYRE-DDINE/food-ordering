"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { deliveryFee as standardDeliveryFee, getSubTotal } from "@/lib/cart";
import { FormatCurrency } from "@/lib/Formatter";
import {
  ApplyPromoCode,
  ClearCartItems,
  RemovePromoCode,
  selectAppliedPromo,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  CreditCard,
  MapPin,
  Phone,
  ShoppingBag,
  Mail,
  Tag,
  CheckCircle2,
  X,
  Truck,
  Store,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Translations } from "@/types/translations";
import { useRouter, useParams } from "next/navigation";

const Checkpoint = ({ translation }: { translation: Translations['cart'] }) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const appliedPromo = useAppSelector(selectAppliedPromo);
  const subTotal = getSubTotal(cart);
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [fulfillmentMethod, setFulfillmentMethod] = useState<"DELIVERY" | "PICKUP">("DELIVERY");
  const [promoInput, setPromoInput] = useState("");
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    userEmail: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    country: "",
    deliveryNotes: "",
  });

  const activeDeliveryFee = fulfillmentMethod === "PICKUP" ? 0 : standardDeliveryFee;
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  const finalTotal = Math.max(0, subTotal - discountAmount + activeDeliveryFee);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    setIsApplyingPromo(true);
    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoInput.trim(), subTotal }),
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        toast.error(data.error || "Invalid promo code", { position: "bottom-left" });
        return;
      }

      dispatch(
        ApplyPromoCode({
          code: data.code,
          discountAmount: data.discountAmount,
          discountType: data.discountType,
          discountValue: data.discountValue,
        })
      );
      toast.success(`Promo code ${data.code} applied!`, { position: "bottom-left" });
      setPromoInput("");
    } catch {
      toast.error("Failed to apply promo code", { position: "bottom-left" });
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    dispatch(RemovePromoCode());
    toast.info("Promo code removed", { position: "bottom-left" });
  };

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
          streetAddress: fulfillmentMethod === "PICKUP" ? "Pickup at Restaurant" : form.address,
          postalCode: fulfillmentMethod === "PICKUP" ? "00000" : form.postalCode,
          city: fulfillmentMethod === "PICKUP" ? "Restaurant Location" : form.city,
          country: fulfillmentMethod === "PICKUP" ? "Local" : form.country,
          fulfillmentMethod,
          deliveryNotes: form.deliveryNotes,
          promoCode: appliedPromo?.code,
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
        throw new Error(errorData.error || "Failed to create order");
      }

      const data = await response.json();
      toast.success("Order submitted successfully!", { position: "bottom-left" });

      // Persist order token to recent orders in localStorage for customer/guest portal
      if (typeof window !== "undefined" && data.trackingToken) {
        try {
          const recent = JSON.parse(localStorage.getItem("fasty_recent_orders") || "[]");
          const updated = [
            {
              trackingToken: data.trackingToken,
              createdAt: data.createdAt || new Date().toISOString(),
              totalPrice: data.totalPrice,
              userEmail: form.userEmail,
            },
            ...recent.filter((o: { trackingToken: string }) => o.trackingToken !== data.trackingToken),
          ].slice(0, 15);
          localStorage.setItem("fasty_recent_orders", JSON.stringify(updated));
        } catch {
          // ignore localStorage error
        }
      }

      sessionStorage.removeItem("cartItems");
      dispatch(ClearCartItems());
      setForm({
        userEmail: "",
        phone: "",
        address: "",
        postalCode: "",
        city: "",
        country: "",
        deliveryNotes: "",
      });

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

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      {/* Fulfillment method selector */}
      <div className="mb-6">
        <Label className="text-gray-700 text-sm font-semibold mb-2 block">
          Fulfillment Method
        </Label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => setFulfillmentMethod("DELIVERY")}
            className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
              fulfillmentMethod === "DELIVERY"
                ? "bg-white text-primary shadow-sm font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Truck className="h-4 w-4" />
            <span>Delivery</span>
          </button>
          <button
            type="button"
            onClick={() => setFulfillmentMethod("PICKUP")}
            className={`flex items-center justify-center gap-2 py-2 px-3 text-sm font-medium rounded-md transition-all ${
              fulfillmentMethod === "PICKUP"
                ? "bg-white text-primary shadow-sm font-semibold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Store className="h-4 w-4" />
            <span>Pickup (Free)</span>
          </button>
        </div>
      </div>

      {/* Promo Code section */}
      <div className="mb-6 p-3.5 bg-gray-50 rounded-lg border border-gray-200/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
            <Tag className="h-4 w-4 text-primary" />
            Promo Code
          </span>
          {appliedPromo && (
            <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Applied
            </span>
          )}
        </div>

        {appliedPromo ? (
          <div className="flex items-center justify-between bg-white px-3 py-2 rounded border border-green-300">
            <div>
              <span className="font-bold text-sm text-gray-900">{appliedPromo.code}</span>
              <p className="text-xs text-green-700">
                Saved {FormatCurrency(appliedPromo.discountAmount)}
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemovePromo}
              className="text-gray-400 hover:text-red-500 p-1"
              title="Remove promo code"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g. WELCOME10"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="h-9 uppercase text-sm"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleApplyPromo}
              disabled={isApplyingPromo || !promoInput.trim()}
              className="h-9 shrink-0"
            >
              {isApplyingPromo ? "..." : "Apply"}
            </Button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-gray-700 flex items-center gap-2 text-sm">
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
            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10 text-sm"
            onChange={handleForm}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="text-gray-700 flex items-center gap-2 text-sm">
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
            className="focus-visible:ring-2 focus-visible:ring-primary/50 h-10 text-sm"
            onChange={handleForm}
          />
        </div>

        {fulfillmentMethod === "DELIVERY" && (
          <>
            <div className="space-y-1">
              <Label htmlFor="address" className="text-gray-700 flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                {translation.checkout.deliveryAddress}
              </Label>
              <Textarea
                id="address"
                placeholder="Enter street name, building/apartment number"
                name="address"
                value={form.address}
                required
                rows={2}
                className="resize-none focus-visible:ring-2 focus-visible:ring-primary/50 min-h-[70px] text-sm"
                onChange={handleForm}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="postal-code" className="text-gray-700 text-xs">
                  {translation.checkout.postalCode}
                </Label>
                <Input
                  type="text"
                  id="postal-code"
                  placeholder="12345"
                  name="postalCode"
                  value={form.postalCode}
                  required
                  className="focus-visible:ring-2 focus-visible:ring-primary/50 h-9 text-sm"
                  onChange={handleForm}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="city" className="text-gray-700 text-xs">
                  {translation.checkout.city}
                </Label>
                <Input
                  type="text"
                  id="city"
                  placeholder="New York"
                  name="city"
                  value={form.city}
                  required
                  className="focus-visible:ring-2 focus-visible:ring-primary/50 h-9 text-sm"
                  onChange={handleForm}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="country" className="text-gray-700 text-xs">
                {translation.checkout.country}
              </Label>
              <Input
                type="text"
                id="country"
                placeholder="United States"
                name="country"
                value={form.country}
                required
                className="focus-visible:ring-2 focus-visible:ring-primary/50 h-9 text-sm"
                onChange={handleForm}
              />
            </div>
          </>
        )}

        <div className="space-y-1">
          <Label htmlFor="notes" className="text-gray-700 text-xs">
            Special Instructions / Delivery Notes (Optional)
          </Label>
          <Input
            type="text"
            id="notes"
            placeholder="e.g. Leave at front door, call on arrival"
            name="deliveryNotes"
            value={form.deliveryNotes}
            className="h-9 text-sm"
            onChange={handleForm}
          />
        </div>

        {/* Price Breakdown */}
        <div className="pt-3 border-t border-gray-100 space-y-1.5 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{FormatCurrency(subTotal)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-green-700 font-medium">
              <span>Discount ({appliedPromo.code})</span>
              <span>-{FormatCurrency(appliedPromo.discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>{fulfillmentMethod === "PICKUP" ? "Pickup" : "Delivery Fee"}</span>
            <span>{activeDeliveryFee === 0 ? "FREE" : FormatCurrency(activeDeliveryFee)}</span>
          </div>

          <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">{FormatCurrency(finalTotal)}</span>
          </div>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-11 text-base font-medium bg-primary hover:bg-primary/90 transition-colors"
            disabled={isSubmitting}
          >
            <CreditCard className="mr-2 h-5 w-5" />
            {isSubmitting
              ? translation.checkout.processing
              : `${translation.checkout.pay} ${FormatCurrency(finalTotal)}`}
          </Button>
        </div>

        <p className="text-[11px] text-gray-500 text-center">
          {translation.checkout.agreement}
        </p>
      </form>
    </div>
  );
};

export default Checkpoint;
