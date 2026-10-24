import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";
import { z } from "zod";

const LookupSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address").max(254),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = LookupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid email" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    const orders = await db.order.findMany({
      where: {
        userEmail: email.toLowerCase(),
      },
      select: {
        id: true,
        orderNumber: true,
        trackingToken: true,
        fulfillmentStatus: true,
        paymentStatus: true,
        fulfillmentMethod: true,
        subTotal: true,
        deliveryFee: true,
        discountAmount: true,
        totalPrice: true,
        createdAt: true,
        products: {
          select: {
            id: true,
            productId: true,
            productName: true,
            sizeName: true,
            extraNames: true,
            quantity: true,
            unitPrice: true,
            product: {
              select: {
                id: true,
                name: true,
                image: true,
                basePrice: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ orders });
  } catch (error: unknown) {
    console.error("Order lookup error:", error);
    return NextResponse.json(
      { error: "Could not retrieve order history." },
      { status: 500 }
    );
  }
}
