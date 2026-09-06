import { isAdminEmail } from "@/lib/admin";
import { Locale } from "@/i18n.config";
import { FormatCurrency } from "@/lib/Formatter";
import { orderStatusTone } from "@/lib/orders";
import { db } from "@/lib/prisma";
import getTrans from "@/lib/translation";
import { OrderStatus } from "@prisma/client";
import {
  BarChart3,
  ClipboardList,
  Lock,
  PackageCheck,
  Settings,
  ShoppingBag,
  Users,
  Utensils,
} from "lucide-react";
import AdminStatusSelect from "./status-select";

export const dynamic = "force-dynamic";

type AdminPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ adminEmail?: string }>;
};

export default async function AdminPage({ params, searchParams }: AdminPageProps) {
  const { locale } = await params;
  const { adminEmail } = await searchParams;
  const translation = await getTrans(locale as Locale);
  const dashboard = translation.admin.dashboard;
  const statusLabels = translation.orders.status;
  const allowed = await isAdminEmail(adminEmail);

  if (!allowed) {
    return (
      <main className="min-h-[calc(100vh-193px)] bg-zinc-50 px-4 py-12">
        <section className="mx-auto max-w-md rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-950">{dashboard.accessTitle}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            {dashboard.accessDescription}
          </p>
          <form className="mt-6 space-y-3">
            <label className="block text-sm font-medium text-zinc-700" htmlFor="adminEmail">
              {dashboard.emailLabel}
            </label>
            <input
              id="adminEmail"
              name="adminEmail"
              type="email"
              required
              placeholder={dashboard.emailPlaceholder}
              className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none ring-primary/30 focus:ring-2"
            />
            <button className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800">
              {dashboard.openDashboard}
            </button>
          </form>
        </section>
      </main>
    );
  }

  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  const closedStatuses: OrderStatus[] = [OrderStatus.DELIVERED, OrderStatus.CANCELLED];
  const activeOrders = orders.filter((order) => !closedStatuses.includes(order.status));
  const revenueToday = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const averageOrder = orders.length ? revenueToday / orders.length : 0;

  const navItems = [
    { label: dashboard.overview, icon: BarChart3, active: true },
    { label: translation.admin.tabs.orders, icon: ClipboardList, active: true },
    { label: translation.admin.tabs.menuItems, icon: Utensils, active: false },
    { label: translation.admin.tabs.users, icon: Users, active: false },
    { label: dashboard.settings, icon: Settings, active: false },
  ];

  return (
    <main className="min-h-[calc(100vh-193px)] bg-zinc-100">
      <div className="grid min-h-[calc(100vh-193px)] lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-zinc-200 bg-zinc-950 px-4 py-5 text-white lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">{dashboard.brand}</p>
              <h1 className="text-lg font-bold">{dashboard.operations}</h1>
            </div>
          </div>
          <nav className="mt-8 grid gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                disabled={!item.active}
                className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition ${
                  item.active
                    ? "bg-white/10 text-white"
                    : "cursor-not-allowed text-zinc-500"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="px-4 py-6 md:px-8">
          <header className="flex flex-col gap-4 border-b border-zinc-200 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">{dashboard.adminDashboard}</p>
              <h2 className="text-3xl font-bold tracking-normal text-zinc-950">
                {dashboard.controlCenter}
              </h2>
            </div>
            <div className="rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
              {dashboard.signedInAs} <span className="font-semibold text-zinc-950">{adminEmail}</span>
            </div>
          </header>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <DashboardMetric label={dashboard.totalOrders} value={orders.length.toString()} />
            <DashboardMetric label={dashboard.activeOrders} value={activeOrders.length.toString()} />
            <DashboardMetric label={dashboard.averageOrder} value={FormatCurrency(averageOrder)} />
          </div>

          <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
            <div className="flex flex-col gap-2 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">{dashboard.liveOrders}</h3>
                <p className="text-sm text-zinc-500">
                  {dashboard.liveDescription}
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <PackageCheck className="h-4 w-4" />
                {activeOrders.length} {dashboard.inProgress}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">{dashboard.order}</th>
                    <th className="px-5 py-3 font-semibold">{dashboard.customer}</th>
                    <th className="px-5 py-3 font-semibold">{dashboard.items}</th>
                    <th className="px-5 py-3 font-semibold">{dashboard.total}</th>
                    <th className="px-5 py-3 font-semibold">{dashboard.status}</th>
                    <th className="px-5 py-3 font-semibold">{dashboard.update}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="align-top">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-zinc-950">#{order.id.slice(0, 8)}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {new Intl.DateTimeFormat("en", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(order.createdAt)}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-zinc-900">
                          {order.customerName || dashboard.guestCustomer}
                        </p>
                        <p className="text-xs text-zinc-500">{order.userEmail}</p>
                        <p className="text-xs text-zinc-500">{order.city}, {order.country}</p>
                      </td>
                      <td className="px-5 py-4 text-zinc-600">
                        {order.products.map((item) => (
                          <p key={item.id}>
                            {item.quantity}x {item.product.name}
                          </p>
                        ))}
                      </td>
                      <td className="px-5 py-4 font-semibold text-zinc-950">
                        {FormatCurrency(order.totalPrice)}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ring-1 ${orderStatusTone[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <AdminStatusSelect
                          adminEmail={adminEmail || ""}
                          orderId={order.id}
                          currentStatus={order.status}
                          labels={statusLabels}
                          messages={{
                            success: dashboard.statusUpdated,
                            error: dashboard.statusError,
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td className="px-5 py-10 text-center text-zinc-500" colSpan={6}>
                        {dashboard.empty}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function DashboardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-zinc-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-zinc-950">{value}</p>
    </div>
  );
}
