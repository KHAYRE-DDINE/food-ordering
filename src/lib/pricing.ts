/**
 * Pricing rules shared by the cart preview (client) and order creation (server).
 *
 * All arithmetic is done in integer cents to avoid floating-point drift.
 * The client total is only a preview: the server recomputes everything
 * from database prices at checkout and ignores any client-sent totals.
 *
 * Formula (mirrors what customers already see in the cart):
 *   unit price = product.basePrice + size.price + sum(extra.price)
 * `size.price` is therefore treated as a surcharge on top of the base price.
 */

/** Flat delivery fee. TODO(Phase 4): move to restaurant settings once the owner defines delivery rules. */
export const DELIVERY_FEE = 5;

export const toCents = (amount: number): number => Math.round(amount * 100);

export const fromCents = (cents: number): number => cents / 100;

export type PricedLine = {
  basePrice: number;
  sizePrice?: number | null;
  extraPrices?: number[];
  quantity: number;
};

export function computeUnitPriceCents(line: Omit<PricedLine, "quantity">): number {
  const extras = (line.extraPrices ?? []).reduce((sum, price) => sum + toCents(price), 0);
  return toCents(line.basePrice) + toCents(line.sizePrice ?? 0) + extras;
}

export function computeLineTotalCents(line: PricedLine): number {
  return computeUnitPriceCents(line) * line.quantity;
}

export type OrderTotals = {
  subTotalCents: number;
  deliveryFeeCents: number;
  totalCents: number;
};

export function computeOrderTotals(lines: PricedLine[], deliveryFee: number): OrderTotals {
  const subTotalCents = lines.reduce((sum, line) => sum + computeLineTotalCents(line), 0);
  const deliveryFeeCents = toCents(deliveryFee);
  return {
    subTotalCents,
    deliveryFeeCents,
    totalCents: subTotalCents + deliveryFeeCents,
  };
}
