import { describe, it, expect } from "vitest";
import cartReducer, {
  ApplyPromoCode,
  RemovePromoCode,
  ReorderItems,
  CartItem,
} from "./cartSlice";

describe("cartSlice promo and reorder features", () => {
  it("applies a promo code and records discount details", () => {
    const initialState = { items: [], appliedPromo: null };
    const state = cartReducer(
      initialState,
      ApplyPromoCode({
        code: "WELCOME10",
        discountAmount: 5.0,
        discountType: "PERCENTAGE",
        discountValue: 10,
      })
    );
    expect(state.appliedPromo).not.toBeNull();
    expect(state.appliedPromo?.code).toBe("WELCOME10");
    expect(state.appliedPromo?.discountAmount).toBe(5.0);
  });

  it("removes an applied promo code cleanly", () => {
    const initialState = {
      items: [],
      appliedPromo: {
        code: "FASTY5",
        discountAmount: 5.0,
        discountType: "FIXED" as const,
        discountValue: 5,
      },
    };
    const state = cartReducer(initialState, RemovePromoCode());
    expect(state.appliedPromo).toBeNull();
  });

  it("reorders past order items into cart", () => {
    const pastItems: CartItem[] = [
      {
        id: "pizza-1",
        name: "Margherita Pizza",
        image: "/assets/images/menu/margherita-pizza.jpg",
        basePrice: 8.99,
        quantity: 2,
      },
      {
        id: "shawarma-1",
        name: "Chicken Shawarma",
        image: "/assets/images/menu/grilled-chicken-shawarma.jpg",
        basePrice: 12.99,
        quantity: 1,
      },
    ];

    const state = cartReducer({ items: [], appliedPromo: null }, ReorderItems(pastItems));
    expect(state.items).toHaveLength(2);
    expect(state.items[0].name).toBe("Margherita Pizza");
    expect(state.items[1].name).toBe("Chicken Shawarma");
  });
});
