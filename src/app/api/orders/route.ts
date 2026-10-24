// app/api/orders/route.ts
import { db } from "@/lib/prisma";
import { DELIVERY_FEE, computeOrderTotals, fromCents, type PricedLine } from "@/lib/pricing";
import { createOrderSchema } from "@/lib/validation/order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order", fields: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const input = parsed.data;

  try {
    const productIds = [...new Set(input.products.map((line) => line.productId))];
    const dbProducts = await db.product.findMany({
      where: { id: { in: productIds } },
      include: { sizes: true, extras: true },
    });
    const productById = new Map(dbProducts.map((product) => [product.id, product]));

    const missingProductIds = productIds.filter((id) => !productById.has(id));
    if (missingProductIds.length > 0) {
      return NextResponse.json(
        { error: "Some cart items no longer exist", missingProductIds },
        { status: 409 }
      );
    }

    // Price every line from database values; client prices are never used.
    const pricedLines: (PricedLine & { productId: string })[] = [];
    for (const line of input.products) {
      const product = productById.get(line.productId)!;

      let sizePrice = 0;
      if (line.sizeId) {
        const size = product.sizes.find((candidate) => candidate.id === line.sizeId);
        if (!size) {
          return NextResponse.json(
            { error: "Invalid size for product", productId: product.id },
            { status: 400 }
          );
        }
        sizePrice = size.price;
      } else if (product.sizes.length > 0) {
        return NextResponse.json(
          { error: "A size is required for this product", productId: product.id },
          { status: 400 }
        );
      }

      const uniqueExtraIds = [...new Set(line.extraIds)];
      const extraPrices: number[] = [];
      for (const extraId of uniqueExtraIds) {
        const extra = product.extras.find((candidate) => candidate.id === extraId);
        if (!extra) {
          return NextResponse.json(
            { error: "Invalid extra for product", productId: product.id },
            { status: 400 }
          );
        }
        extraPrices.push(extra.price);
      }

      pricedLines.push({
        productId: product.id,
        quantity: line.quantity,
        basePrice: product.basePrice,
        sizePrice,
        extraPrices,
      });
    }

    const totals = computeOrderTotals(pricedLines, DELIVERY_FEE);

    const order = await db.$transaction(async (tx) => {
      return tx.order.create({
        data: {
          // Payment is not collected yet, so a new order is never "paid".
          paid: false,
          subTotal: fromCents(totals.subTotalCents),
          deliveryFee: fromCents(totals.deliveryFeeCents),
          totalPrice: fromCents(totals.totalCents),
          userEmail: input.userEmail,
          phone: input.phone,
          streetAddress: input.streetAddress,
          postalCode: input.postalCode,
          city: input.city,
          country: input.country,
          products: {
            create: pricedLines.map((line) => ({
              productId: line.productId,
              quantity: line.quantity,
            })),
          },
        },
        select: { id: true, subTotal: true, deliveryFee: true, totalPrice: true, createdAt: true },
      });
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    // Log server-side only; never return internal error text to the client.
    console.error("Order creation failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Could not create the order. Please try again." }, { status: 500 });
  }
}
