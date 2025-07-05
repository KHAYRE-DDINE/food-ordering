// app/api/orders/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Order API received body:', body);
    
    const order = await db.order.create({
      data: {
        paid: true,
        subTotal: Number(body.subTotal),
        deliveryFee: 5.00,
        totalPrice: Number(body.totalPrice),
        userEmail: body.userEmail,
        phone: body.phone,
        streetAddress: body.streetAddress,
        postalCode: body.postalCode,
        city: body.city,
        country: body.country,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}