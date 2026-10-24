import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trackingToken: string }> }
) {
  try {
    const { trackingToken } = await params;
    if (!trackingToken) {
      return NextResponse.json({ error: "Tracking token required" }, { status: 400 });
    }

    const order = await db.order.findUnique({
      where: { trackingToken },
      select: {
        id: true,
        trackingToken: true,
        fulfillmentStatus: true,
        paymentStatus: true,
        fulfillmentMethod: true,
        paymentMethod: true,
        subTotal: true,
        deliveryFee: true,
        totalPrice: true,
        customerName: true,
        userEmail: true,
        phone: true,
        streetAddress: true,
        postalCode: true,
        city: true,
        country: true,
        createdAt: true,
        updatedAt: true,
        products: {
          select: {
            id: true,
            quantity: true,
            productName: true,
            sizeName: true,
            extraNames: true,
            unitPrice: true,
          },
        },
        statusEvents: {
          orderBy: { createdAt: "asc" },
          select: {
            id: true,
            toStatus: true,
            note: true,
            createdAt: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error fetching order status:", error);
    return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 });
  }
}
