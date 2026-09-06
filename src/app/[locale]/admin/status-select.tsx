"use client";

import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const statuses = Object.values(OrderStatus);

type AdminStatusSelectProps = {
  adminEmail: string;
  orderId: string;
  currentStatus: OrderStatus;
  labels: Record<OrderStatus, string>;
  messages: {
    success: string;
    error: string;
  };
};

export default function AdminStatusSelect({
  adminEmail,
  orderId,
  currentStatus,
  labels,
  messages,
}: AdminStatusSelectProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isSaving, setIsSaving] = useState(false);

  const updateStatus = async (nextStatus: OrderStatus) => {
    setStatus(nextStatus);
    setIsSaving(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-email": adminEmail,
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.success(messages.success, { position: "bottom-left" });
      router.refresh();
    } catch {
      setStatus(currentStatus);
      toast.error(messages.error, { position: "bottom-left" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <select
      value={status}
      disabled={isSaving}
      onChange={(event) => updateStatus(event.target.value as OrderStatus)}
      className="h-10 w-44 rounded-md border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 outline-none ring-primary/30 transition focus:ring-2 disabled:cursor-wait disabled:opacity-60"
    >
      {statuses.map((option) => (
        <option key={option} value={option}>
          {labels[option]}
        </option>
      ))}
    </select>
  );
}
