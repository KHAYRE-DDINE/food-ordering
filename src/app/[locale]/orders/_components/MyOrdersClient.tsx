"use client";
import React, { useEffect, useState } from "react";
import { FormatCurrency } from "@/lib/Formatter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hooks";
import { ReorderItems, CartItem } from "@/redux/features/cart/cartSlice";
import {
  Package,
  Search,
  ExternalLink,
  RotateCcw,
  Clock,
  Truck,
  Store,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

type OrderItemProduct = {
  id: string;
  name: string;
  image: string;
  basePrice: number;
};

type OrderProductItem = {
  id: string;
  productId: string;
  productName: string | null;
  sizeName: string | null;
  extraNames: string | null;
  quantity: number;
  unitPrice: number | null;
  product?: OrderItemProduct;
};

export type OrderSummary = {
  id: string;
  orderNumber?: number | null;
  trackingToken: string;
  fulfillmentStatus: string;
  paymentStatus: string;
  fulfillmentMethod: string;
  totalPrice: number;
  createdAt: string;
  products?: OrderProductItem[];
};

export default function MyOrdersClient() {
  const [emailInput, setEmailInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [searched, setSearched] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  useEffect(() => {
    // Load local device orders if present
    try {
      const stored = localStorage.getItem("fasty_recent_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Fetch details for these tokens
          Promise.all(
            parsed.map(async (item: { trackingToken: string }) => {
              try {
                const res = await fetch(`/api/orders/${item.trackingToken}`);
                if (res.ok) {
                  return await res.json();
                }
              } catch {
                return null;
              }
              return null;
            })
          ).then((results) => {
            const valid = results.filter(Boolean) as OrderSummary[];
            if (valid.length > 0) {
              setOrders(valid);
            }
          });
        }
      }
    } catch {
      // ignore error
    }
  }, []);

  const handleSearchByEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;

    setIsLoading(true);
    setSearched(true);
    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not find orders", { position: "bottom-left" });
        return;
      }

      setOrders(data.orders || []);
      if ((data.orders || []).length === 0) {
        toast.info("No orders found for this email address.", { position: "bottom-left" });
      }
    } catch {
      toast.error("Failed to lookup order history", { position: "bottom-left" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReorder = (order: OrderSummary) => {
    if (!order.products || order.products.length === 0) {
      router.push(`/${locale}/orders/${order.trackingToken}`);
      return;
    }

    const cartItems: CartItem[] = order.products
      .filter((p) => p.product)
      .map((p) => ({
        id: p.productId,
        name: p.product?.name || p.productName || "Dish",
        image: p.product?.image || "/assets/images/menu/margherita-pizza.jpg",
        basePrice: p.product?.basePrice || p.unitPrice || 10,
        quantity: p.quantity || 1,
      }));

    if (cartItems.length > 0) {
      dispatch(ReorderItems(cartItems));
      toast.success("Order items added to your cart!", { position: "bottom-left" });
      router.push(`/${locale}/cart`);
    } else {
      router.push(`/${locale}/orders/${order.trackingToken}`);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
            <CheckCircle2 className="h-3 w-3" /> Delivered
          </span>
        );
      case "OUT_FOR_DELIVERY":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
            <Truck className="h-3 w-3" /> On the Way
          </span>
        );
      case "PREPARING":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
            <Clock className="h-3 w-3" /> Preparing in Kitchen
          </span>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
            <Clock className="h-3 w-3" /> {status.replace("_", " ")}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Email search card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Lookup Orders by Email
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the email address you used when placing your order to see full order details and receipts.
        </p>
        <form onSubmit={handleSearchByEmail} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="e.g. your@email.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            className="h-10 text-sm max-w-md"
          />
          <Button type="submit" disabled={isLoading} className="gap-2 h-10 font-medium">
            <Search className="h-4 w-4" />
            {isLoading ? "Searching..." : "Find Orders"}
          </Button>
        </form>
      </div>

      {/* Orders List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Recent & Looked Up Orders
          </h3>
          <Link
            href={`/${locale}/orders/track`}
            className="text-sm text-primary hover:underline font-medium flex items-center gap-1"
          >
            Track with Reference Token
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-gray-800 mb-1">
              {searched ? "No Orders Found" : "No Recent Orders Found on this Device"}
            </h4>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              {searched
                ? "We could not find any orders registered under this email. Please check your spelling or tracking link."
                : "Enter your email above or place your first delicious order from our menu!"}
            </p>
            <Link href={`/${locale}/menu`}>
              <Button>Browse Menu</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.trackingToken}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:border-gray-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-gray-100 px-2.5 py-1 rounded text-gray-700">
                      REF #{order.trackingToken.slice(-6).toUpperCase()}
                    </span>
                    {getStatusBadge(order.fulfillmentStatus)}
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      {order.fulfillmentMethod === "PICKUP" ? (
                        <>
                          <Store className="h-3 w-3" /> Pickup
                        </>
                      ) : (
                        <>
                          <Truck className="h-3 w-3" /> Delivery
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()} at{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {order.products && order.products.length > 0 && (
                    <p className="text-sm text-gray-700 line-clamp-1">
                      {order.products
                        .map((p) => `${p.quantity}x ${p.productName || p.product?.name || "Dish"}`)
                        .join(", ")}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Total</span>
                    <strong className="text-lg font-bold text-primary">
                      {FormatCurrency(order.totalPrice)}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link href={`/${locale}/orders/${order.trackingToken}`}>
                      <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Track
                      </Button>
                    </Link>

                    <Button
                      size="sm"
                      onClick={() => handleReorder(order)}
                      className="h-9 gap-1.5 text-xs font-semibold"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      Reorder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
