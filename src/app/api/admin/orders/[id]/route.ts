import { ADMIN_EMAIL_HEADER, assertAdminEmail } from "@/lib/admin";
import { db } from "@/lib/prisma";
import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

const statuses = new Set(Object.values(OrderStatus));

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await assertAdminEmail(request.headers.get(ADMIN_EMAIL_HEADER));

    const { id } = await params;
    const body = await request.json();
    const status = body.status as OrderStatus;

    if (!statuses.has(status)) {
      return NextResponse.json({ error: "Invalid order status" }, { status: 400 });
    }

    const order = await db.order.update({
      where: { id },
      data: { status },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof Error && error.message === "ADMIN_REQUIRED") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    console.error("Admin order update error:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
