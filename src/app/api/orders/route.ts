// app/api/orders/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Order API received body:", body);

    const order = await db.order.create({
      data: {
        paid: true,
        subTotal: Number(body.subTotal),
        deliveryFee: 5.0,
        totalPrice: Number(body.totalPrice),
        userEmail: body.userEmail,
        phone: body.phone,
        streetAddress: body.streetAddress,
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
      },
    });

    if (body.products && Array.isArray(body.products)) {
      for (const product of body.products) {
        await db.orderProduct.create({
          data: {
            orderId: order.id,
            productId: product.id,
            quantity: product.quantity,
          },
        });
      }
    }

    //fetch teh complete order with products
    const completeOrder = await db.order.findUnique({
      where: { id: order.id },
      include: {
        products: true,
      },
    });

    return NextResponse.json(completeOrder);
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
