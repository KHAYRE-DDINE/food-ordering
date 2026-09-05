import { OrderStatus } from "@prisma/client";

export const orderStatusSteps: OrderStatus[] = [
  OrderStatus.PLACED,
  OrderStatus.CONFIRMED,
  OrderStatus.PREPARING,
  OrderStatus.OUT_FOR_DELIVERY,
  OrderStatus.DELIVERED,
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  [OrderStatus.PLACED]: "Placed",
  [OrderStatus.CONFIRMED]: "Confirmed",
  [OrderStatus.PREPARING]: "Preparing",
  [OrderStatus.OUT_FOR_DELIVERY]: "Out for delivery",
  [OrderStatus.DELIVERED]: "Delivered",
  [OrderStatus.CANCELLED]: "Cancelled",
};

export const orderStatusTone: Record<OrderStatus, string> = {
  [OrderStatus.PLACED]: "bg-sky-50 text-sky-700 ring-sky-200",
  [OrderStatus.CONFIRMED]: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  [OrderStatus.PREPARING]: "bg-amber-50 text-amber-700 ring-amber-200",
  [OrderStatus.OUT_FOR_DELIVERY]: "bg-violet-50 text-violet-700 ring-violet-200",
  [OrderStatus.DELIVERED]: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  [OrderStatus.CANCELLED]: "bg-rose-50 text-rose-700 ring-rose-200",
};
