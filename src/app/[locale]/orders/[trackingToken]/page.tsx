import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { Locale } from "@/i18n.config";
import { FormatCurrency } from "@/lib/Formatter";
import Link from "@/link";
import { CheckCircle2, ArrowLeft, MapPin, Phone, Mail, ShoppingBag } from "lucide-react";
import OrderTrackerClient from "./_components/OrderTrackerClient";

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ locale: string; trackingToken: string }>;
}) {
  const { locale, trackingToken } = await params;
  const t = await getTrans(locale as Locale);
  const dict = t.orderTracking;

  const order = await db.order.findUnique({
    where: { trackingToken },
    include: {
      products: true,
      statusEvents: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!order) {
    return (
      <div className="container py-16 text-center max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {dict?.orderNotFound || "Order Not Found"}
        </h1>
        <p className="text-gray-500 mb-6">
          {dict?.orderNotFoundDesc || "We could not find an order matching this tracking link."}
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{dict?.backToMenu || "Back to Menu"}</span>
        </Link>
      </div>
    );
  }

  const statusLabels = dict?.statuses || {};

  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-8">
      {/* Success Callout */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-start gap-4 text-green-900">
        <CheckCircle2 className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
        <div>
          <h1 className="text-xl font-bold">
            {dict?.orderPlaced || "Order Placed Successfully!"}
          </h1>
          <p className="text-sm text-green-800 mt-1">
            {dict?.thankYou || "Thank you for your order. We are preparing your delicious meal."}
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-green-700">
            <span>
              {dict?.orderReference || "Order Reference"}:{" "}
              <code className="bg-green-100 px-2 py-0.5 rounded text-green-900 font-mono text-xs">
                {order.trackingToken.substring(0, 8).toUpperCase()}
              </code>
            </span>
            <span>•</span>
            <span>{new Date(order.createdAt).toLocaleString(locale)}</span>
          </div>
        </div>
      </div>

      {/* Live Order Tracker */}
      <OrderTrackerClient
        initialStatus={order.fulfillmentStatus}
        trackingToken={order.trackingToken}
        statusLabels={statusLabels}
        events={order.statusEvents.map((e) => ({
          id: e.id,
          toStatus: e.toStatus,
          note: e.note,
          createdAt: e.createdAt.toISOString(),
        }))}
      />

      {/* Order Details & Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ordered Items (2 cols) */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
            {dict?.items || "Ordered Items"}
          </h2>
          <ul className="divide-y divide-gray-100">
            {order.products.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-start gap-4">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    <span className="text-primary font-bold mr-2">{item.quantity}×</span>
                    {item.productName || "Menu Item"}
                  </p>
                  {item.sizeName && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Size: <span className="font-medium text-gray-700">{item.sizeName}</span>
                    </p>
                  )}
                  {item.extraNames && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      Extras: <span className="font-medium text-gray-700">{item.extraNames}</span>
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {FormatCurrency((item.unitPrice || 0) * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>{dict?.subtotal || "Subtotal"}</span>
              <span className="font-medium text-gray-900">{FormatCurrency(order.subTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>{dict?.deliveryFee || "Delivery Fee"}</span>
              <span className="font-medium text-gray-900">{FormatCurrency(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
              <span>{dict?.total || "Total"}</span>
              <span className="text-primary font-extrabold">{FormatCurrency(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Customer & Delivery Information (1 col) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4 h-fit">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
            {dict?.deliveryAddress || "Delivery Details"}
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">{order.streetAddress}</p>
                <p className="text-xs text-gray-500">
                  {order.city}, {order.postalCode}
                </p>
                <p className="text-xs text-gray-500">{order.country}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="font-medium text-gray-900">{order.phone}</p>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-gray-900 break-all">{order.userEmail}</p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <Link
              href="/menu"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{dict?.backToMenu || "Order More Items"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
