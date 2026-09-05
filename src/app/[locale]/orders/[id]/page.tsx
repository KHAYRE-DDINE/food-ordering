import { FormatCurrency } from "@/lib/Formatter";
import { orderStatusLabels, orderStatusSteps, orderStatusTone } from "@/lib/orders";
import { db } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { Check, Clock, Home, ReceiptText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type OrderTrackingPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const { locale, id } = await params;
  const order = await db.order.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const activeIndex =
    order.status === OrderStatus.CANCELLED
      ? -1
      : orderStatusSteps.findIndex((status) => status === order.status);

  return (
    <main className="min-h-[calc(100vh-193px)] bg-zinc-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-500">Order #{order.id.slice(0, 8)}</p>
            <h1 className="text-3xl font-bold text-zinc-950">Track your order</h1>
          </div>
          <Link
            href={`/${locale}/menu`}
            className="inline-flex h-10 w-fit items-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            <Home className="h-4 w-4" />
            Back to menu
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-5">
              <div>
                <h2 className="text-xl font-bold text-zinc-950">Delivery status</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  Updates appear here as the restaurant moves your order forward.
                </p>
              </div>
              <span className={`inline-flex rounded-md px-3 py-1.5 text-sm font-semibold ring-1 ${orderStatusTone[order.status]}`}>
                {orderStatusLabels[order.status]}
              </span>
            </div>

            {order.status === OrderStatus.CANCELLED ? (
              <div className="mt-6 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                This order was cancelled. Contact the restaurant if you need help.
              </div>
            ) : (
              <ol className="mt-6 grid gap-4">
                {orderStatusSteps.map((status, index) => {
                  const complete = index <= activeIndex;
                  return (
                    <li key={status} className="flex gap-4">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                          complete
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-zinc-200 bg-zinc-50 text-zinc-400"
                        }`}
                      >
                        {complete ? <Check className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="pt-1">
                        <p className="font-semibold text-zinc-950">{orderStatusLabels[status]}</p>
                        <p className="mt-1 text-sm text-zinc-500">
                          {index === activeIndex
                            ? "Current step"
                            : complete
                              ? "Completed"
                              : "Waiting for restaurant update"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          <aside className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-zinc-500" />
              <h2 className="text-lg font-bold text-zinc-950">Order summary</h2>
            </div>
            <div className="space-y-4">
              {order.products.map((item) => (
                <div key={item.id} className="flex justify-between gap-4 text-sm">
                  <span className="text-zinc-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-semibold text-zinc-950">
                    {FormatCurrency(item.product.basePrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t border-zinc-100 pt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium">{FormatCurrency(order.subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery</span>
                <span className="font-medium">{FormatCurrency(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold">
                <span>Total</span>
                <span>{FormatCurrency(order.totalPrice)}</span>
              </div>
            </div>
            <div className="mt-5 rounded-md bg-zinc-50 p-4 text-sm text-zinc-600">
              <p className="font-semibold text-zinc-900">{order.customerName || "Guest customer"}</p>
              <p className="mt-1">{order.streetAddress}</p>
              <p>{order.city}, {order.country}</p>
              <p className="mt-1">{order.phone}</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
