import { describe, expect, it } from "vitest";
import { createOrderSchema } from "./order";

const valid = {
  userEmail: "  Customer@Example.com ",
  phone: "+212 600-000000",
  streetAddress: "1 Main St",
  postalCode: "12345",
  city: "Casablanca",
  country: "Morocco",
  products: [{ productId: "p1", quantity: 2, sizeId: "s1", extraIds: ["e1"] }],
};

describe("createOrderSchema", () => {
  it("accepts a valid order and normalizes the email", () => {
    const result = createOrderSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.userEmail).toBe("customer@example.com");
  });

  it("rejects an empty cart", () => {
    expect(createOrderSchema.safeParse({ ...valid, products: [] }).success).toBe(false);
  });

  it("rejects invalid email, phone and quantities", () => {
    expect(createOrderSchema.safeParse({ ...valid, userEmail: "nope" }).success).toBe(false);
    expect(createOrderSchema.safeParse({ ...valid, phone: "abc" }).success).toBe(false);
    for (const quantity of [0, -1, 1.5, 51]) {
      expect(
        createOrderSchema.safeParse({ ...valid, products: [{ productId: "p1", quantity }] }).success
      ).toBe(false);
    }
  });

  it("does not carry client-sent prices or totals through", () => {
    const result = createOrderSchema.safeParse({
      ...valid,
      subTotal: 0.01,
      totalPrice: 0.01,
      products: [{ productId: "p1", quantity: 1, price: 0.01 }],
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("subTotal");
      expect(result.data).not.toHaveProperty("totalPrice");
      expect(result.data.products[0]).not.toHaveProperty("price");
    }
  });
});
