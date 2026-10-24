// app/api/orders/route.ts
import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

type OrderProductRequest = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Order API received body:", body);

    const products: OrderProductRequest[] = Array.isArray(body.products) ? body.products : [];
    const subTotal = Number(body.subTotal);
    const totalPrice = Number(body.totalPrice);

    if (!Number.isFinite(subTotal) || !Number.isFinite(totalPrice)) {
      return NextResponse.json(
        { error: "Invalid order totals" },
        { status: 400 }
      );
    }

    if (products.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const invalidProduct = products.find(
      (product) =>
        typeof product.id !== "string" ||
        product.id.length === 0 ||
        !Number.isInteger(product.quantity) ||
        product.quantity < 1
    );

    if (invalidProduct) {
      return NextResponse.json(
        { error: "Invalid cart item", item: invalidProduct },
        { status: 400 }
      );
    }

    const existingProducts = await db.product.findMany({
      where: {
        id: {
          in: products.map((product) => product.id),
        },
      },
      select: {
        id: true,
      },
    });
    const existingProductIds = new Set(existingProducts.map((product) => product.id));
    const missingProductIds = products
      .map((product) => product.id)
      .filter((productId) => !existingProductIds.has(productId));

    if (missingProductIds.length > 0) {
      return NextResponse.json(
        {
          error: "Some cart items no longer exist",
          missingProductIds,
        },
        { status: 400 }
      );
    }

    const completeOrder = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          paid: true,
          subTotal,
          deliveryFee: 5.0,
          totalPrice,
          userEmail: body.userEmail,
          phone: body.phone,
          streetAddress: body.streetAddress,
          postalCode: body.postalCode,
          city: body.city,
          country: body.country,
          products: {
            create: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
        include: {
          products: true,
        },
      });

      return order;
    });

    return NextResponse.json(completeOrder);
  } catch (error: unknown) {
    console.error("Order creation error:", error);
    const message = error instanceof Error ? error.message : "Failed to create order";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
