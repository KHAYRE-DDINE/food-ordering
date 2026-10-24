import { describe, expect, it } from "vitest";
import {
  computeLineTotalCents,
  computeOrderTotals,
  computeUnitPriceCents,
  fromCents,
  toCents,
} from "./pricing";

describe("pricing", () => {
  it("converts to cents without float drift", () => {
    expect(toCents(0.1 + 0.2)).toBe(30);
    expect(toCents(19.99)).toBe(1999);
    expect(fromCents(1999)).toBe(19.99);
  });

  it("unit price = base + size + extras", () => {
    expect(
      computeUnitPriceCents({ basePrice: 9.99, sizePrice: 3.5, extraPrices: [1.99, 1.49] })
    ).toBe(999 + 350 + 199 + 149);
  });

  it("treats missing size and extras as zero", () => {
    expect(computeUnitPriceCents({ basePrice: 8.99 })).toBe(899);
    expect(computeUnitPriceCents({ basePrice: 8.99, sizePrice: null, extraPrices: [] })).toBe(899);
  });

  it("multiplies by quantity", () => {
    expect(computeLineTotalCents({ basePrice: 2.5, quantity: 3 })).toBe(750);
  });

  it("sums order totals and adds the delivery fee", () => {
    const totals = computeOrderTotals(
      [
        { basePrice: 10, sizePrice: 2, extraPrices: [1], quantity: 2 },
        { basePrice: 4.5, quantity: 1 },
      ],
      5
    );
    expect(totals.subTotalCents).toBe(2600 + 450);
    expect(totals.deliveryFeeCents).toBe(500);
    expect(totals.totalCents).toBe(3550);
  });
});
