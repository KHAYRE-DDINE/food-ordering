// app/api/orders/route.ts
import { db } from "@/lib/prisma";
import { DELIVERY_FEE, computeOrderTotals, computeUnitPriceCents, fromCents, type PricedLine } from "@/lib/pricing";
import { createOrderSchema } from "@/lib/validation/order";
import { NextResponse } from "next/server";

type DetailedPricedLine = PricedLine & {
  productId: string;
  productName: string;
  sizeName: string | null;
  extraNames: string;
  unitPrice: number;
};

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
    const pricedLines: DetailedPricedLine[] = [];
    for (const line of input.products) {
      const product = productById.get(line.productId)!;

      let sizePrice = 0;
      let sizeName: string | null = null;
      if (line.sizeId) {
        const size = product.sizes.find((candidate) => candidate.id === line.sizeId);
        if (!size) {
          return NextResponse.json(
            { error: "Invalid size for product", productId: product.id },
            { status: 400 }
          );
        }
        sizePrice = size.price;
        sizeName = size.name;
      } else if (product.sizes.length > 0) {
        return NextResponse.json(
          { error: "A size is required for this product", productId: product.id },
          { status: 400 }
        );
      }

      const uniqueExtraIds = [...new Set(line.extraIds)];
      const extraPrices: number[] = [];
      const extraNamesList: string[] = [];
      for (const extraId of uniqueExtraIds) {
        const extra = product.extras.find((candidate) => candidate.id === extraId);
        if (!extra) {
          return NextResponse.json(
            { error: "Invalid extra for product", productId: product.id },
            { status: 400 }
          );
        }
        extraPrices.push(extra.price);
        extraNamesList.push(extra.name);
      }

      const unitPriceCents = computeUnitPriceCents({
        basePrice: product.basePrice,
        sizePrice,
        extraPrices,
      });

      pricedLines.push({
        productId: product.id,
        productName: product.name,
        sizeName,
        extraNames: extraNamesList.join(", "),
        unitPrice: fromCents(unitPriceCents),
        quantity: line.quantity,
        basePrice: product.basePrice,
        sizePrice,
        extraPrices,
      });
    }

    const deliveryFeeToCharge = input.fulfillmentMethod === "PICKUP" ? 0 : DELIVERY_FEE;
    const totals = computeOrderTotals(pricedLines, deliveryFeeToCharge);

    let promoCodeApplied: string | null = null;
    let discountAmountCents = 0;

    if (input.promoCode) {
      const normalizedCode = input.promoCode.toUpperCase().trim();
      const promo = await db.promoCode.findUnique({
        where: { code: normalizedCode },
      });

      const now = new Date();
      if (
        promo &&
        promo.isActive &&
        (!promo.startsAt || promo.startsAt <= now) &&
        (!promo.expiresAt || promo.expiresAt >= now) &&
        (promo.usageLimit === null || promo.timesUsed < promo.usageLimit) &&
        totals.subTotalCents >= Math.round(promo.minOrderAmount * 100)
      ) {
        promoCodeApplied = promo.code;
        if (promo.discountType === "PERCENTAGE") {
          discountAmountCents = Math.round((totals.subTotalCents * promo.discountValue) / 100);
          if (promo.maxDiscount) {
            discountAmountCents = Math.min(discountAmountCents, Math.round(promo.maxDiscount * 100));
          }
        } else {
          discountAmountCents = Math.min(Math.round(promo.discountValue * 100), totals.subTotalCents);
        }
      }
    }

    const finalTotalCents = Math.max(0, totals.subTotalCents - discountAmountCents + totals.deliveryFeeCents);

    const order = await db.$transaction(async (tx) => {
      if (promoCodeApplied) {
        await tx.promoCode.update({
          where: { code: promoCodeApplied },
          data: { timesUsed: { increment: 1 } },
        });
      }

      return tx.order.create({
        data: {
          paid: false,
          fulfillmentStatus: "PENDING",
          paymentStatus: "UNPAID",
          fulfillmentMethod: input.fulfillmentMethod,
          paymentMethod: input.fulfillmentMethod === "PICKUP" ? "CASH_ON_PICKUP" : "CASH_ON_DELIVERY",
          customerName: input.userEmail.split("@")[0],
          promoCode: promoCodeApplied,
          discountAmount: fromCents(discountAmountCents),
          subTotal: fromCents(totals.subTotalCents),
          deliveryFee: fromCents(totals.deliveryFeeCents),
          totalPrice: fromCents(finalTotalCents),
          deliveryNotes: input.deliveryNotes,
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
              productName: line.productName,
              sizeName: line.sizeName,
              extraNames: line.extraNames,
              unitPrice: line.unitPrice,
            })),
          },
          statusEvents: {
            create: {
              toStatus: "PENDING",
              note: "Order placed by customer",
              actor: "CUSTOMER",
            },
          },
        },
        select: {
          id: true,
          trackingToken: true,
          subTotal: true,
          deliveryFee: true,
          totalPrice: true,
          createdAt: true,
        },
      });
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error: unknown) {
    // Log server-side only; never return internal error text to the client.
    console.error("Order creation failed:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ error: "Could not create the order. Please try again." }, { status: 500 });
  }
}
