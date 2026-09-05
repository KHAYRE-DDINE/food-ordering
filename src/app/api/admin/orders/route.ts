import { ADMIN_EMAIL_HEADER, assertAdminEmail } from "@/lib/admin";
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await assertAdminEmail(request.headers.get(ADMIN_EMAIL_HEADER));

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

    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error && error.message === "ADMIN_REQUIRED") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    console.error("Admin order list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin orders" },
      { status: 500 }
    );
  }
}
