import { describe, it, expect } from "vitest";

function calculatePromoDiscount({
  subTotal,
  discountType,
  discountValue,
  minOrderAmount = 0,
  maxDiscount = null,
}: {
  subTotal: number;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  minOrderAmount?: number;
  maxDiscount?: number | null;
}) {
  if (subTotal < minOrderAmount) {
    return { valid: false, discount: 0, reason: "Minimum order amount not met" };
  }

  let discount = 0;
  if (discountType === "PERCENTAGE") {
    discount = (subTotal * discountValue) / 100;
    if (maxDiscount !== null && discount > maxDiscount) {
      discount = maxDiscount;
    }
  } else {
    discount = Math.min(discountValue, subTotal);
  }

  return {
    valid: true,
    discount: Math.round(discount * 100) / 100,
  };
}

describe("Promo Calculation Logic", () => {
  it("calculates percentage discount accurately", () => {
    const result = calculatePromoDiscount({
      subTotal: 50.0,
      discountType: "PERCENTAGE",
      discountValue: 20,
    });
    expect(result.valid).toBe(true);
    expect(result.discount).toBe(10.0);
  });

  it("caps percentage discount at maxDiscount when exceeded", () => {
    const result = calculatePromoDiscount({
      subTotal: 200.0,
      discountType: "PERCENTAGE",
      discountValue: 25,
      maxDiscount: 15.0,
    });
    expect(result.valid).toBe(true);
    expect(result.discount).toBe(15.0);
  });

  it("calculates fixed discount accurately", () => {
    const result = calculatePromoDiscount({
      subTotal: 30.0,
      discountType: "FIXED",
      discountValue: 5.0,
    });
    expect(result.valid).toBe(true);
    expect(result.discount).toBe(5.0);
  });

  it("does not allow fixed discount to exceed subtotal", () => {
    const result = calculatePromoDiscount({
      subTotal: 8.0,
      discountType: "FIXED",
      discountValue: 10.0,
    });
    expect(result.valid).toBe(true);
    expect(result.discount).toBe(8.0);
  });

  it("rejects promo when order does not satisfy minimum order amount", () => {
    const result = calculatePromoDiscount({
      subTotal: 12.0,
      discountType: "PERCENTAGE",
      discountValue: 10,
      minOrderAmount: 20.0,
    });
    expect(result.valid).toBe(false);
    expect(result.discount).toBe(0);
  });
});
