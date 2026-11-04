"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, ChefHat, Truck, PackageCheck, AlertCircle } from "lucide-react";

interface StatusEvent {
  id: string;
  toStatus: string;
  note: string | null;
  createdAt: string;
}

interface OrderTrackerProps {
  initialStatus: string;
  trackingToken: string;
  statusLabels: Record<string, string>;
  events: StatusEvent[];
}

const STEPS = [
  { key: "PENDING", icon: Clock },
  { key: "CONFIRMED", icon: CheckCircle2 },
  { key: "PREPARING", icon: ChefHat },
  { key: "OUT_FOR_DELIVERY", icon: Truck },
  { key: "COMPLETED", icon: PackageCheck },
];

export default function OrderTrackerClient({
  initialStatus,
  trackingToken,
  statusLabels,
  events: initialEvents,
}: OrderTrackerProps) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [events, setEvents] = useState(initialEvents);

  useEffect(() => {
    // If completed or cancelled, no need to poll
    if (currentStatus === "COMPLETED" || currentStatus === "CANCELLED" || currentStatus === "REJECTED") {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${trackingToken}`);
        if (res.ok) {
          const data = await res.json();
          if (data.fulfillmentStatus) {
            setCurrentStatus(data.fulfillmentStatus);
            if (data.statusEvents) {
              setEvents(data.statusEvents);
            }
          }
        }
      } catch (err) {
        console.error("Polling order status error:", err);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [trackingToken, currentStatus]);

  const isTerminalFailure = currentStatus === "CANCELLED" || currentStatus === "REJECTED";
  const currentIndex = STEPS.findIndex((s) => s.key === currentStatus);

  if (isTerminalFailure) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 flex items-center gap-4">
        <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
        <div>
          <h3 className="font-bold text-lg">{statusLabels[currentStatus] || currentStatus}</h3>
          <p className="text-sm text-red-700 mt-1">
            {events.length > 0 && events[events.length - 1].note
              ? events[events.length - 1].note
              : "This order has been cancelled."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>{statusLabels[currentStatus] || currentStatus}</span>
        </h2>
        <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
          Live Tracking
        </span>
      </div>

      <div className="relative">
        <div className="hidden sm:flex justify-between items-center relative z-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isDone = currentIndex >= idx;
            const isCurrent = currentIndex === idx;

            return (
              <div key={step.key} className="flex flex-col items-center text-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    isCurrent
                      ? "bg-primary text-white ring-4 ring-primary/20 scale-105"
                      : isDone
                      ? "bg-primary/90 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs mt-3 font-medium max-w-[100px] leading-tight ${
                    isDone ? "text-gray-900 font-semibold" : "text-gray-400"
                  }`}
                >
                  {statusLabels[step.key] || step.key}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical progress */}
        <div className="sm:hidden space-y-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isDone = currentIndex >= idx;
            const isCurrent = currentIndex === idx;

            return (
              <div key={step.key} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCurrent
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : isDone
                      ? "bg-primary/90 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm ${
                      isDone ? "text-gray-900 font-bold" : "text-gray-400"
                    }`}
                  >
                    {statusLabels[step.key] || step.key}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
