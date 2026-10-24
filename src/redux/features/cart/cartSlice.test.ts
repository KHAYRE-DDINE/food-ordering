import { describe, expect, it } from "vitest";
import reducer, { AddToCart, ClearCartItems, RemoveCartItem, RemoveItemFromForm, type CartItem } from "./cartSlice";
import { cartLineKey } from "@/lib/cart-line";

const size = (id: string, price = 0) => ({ id, name: "SMALL" as const, price, productId: "p1" });
const extra = (id: string, price = 1) => ({ id, name: "CHEESE" as const, price, productId: "p1" });

const item = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: "p1",
  name: "Pizza",
  image: "/x.png",
  basePrice: 10,
  size: size("s1"),
  extra: [],
  ...overrides,
});

const empty = { items: [] as CartItem[] };

describe("cart reducer", () => {
  it("adding the same customization increments quantity", () => {
    let state = reducer(empty, AddToCart(item()));
    state = reducer(state, AddToCart(item()));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("keeps different customizations of one product as separate lines", () => {
    let state = reducer(empty, AddToCart(item({ size: size("s1") })));
    state = reducer(state, AddToCart(item({ size: size("s2") })));
    state = reducer(state, AddToCart(item({ extra: [extra("e1")] })));
    expect(state.items).toHaveLength(3);
    // The first line must not have been overwritten.
    expect(state.items[0].size?.id).toBe("s1");
    expect(state.items[0].extra).toEqual([]);
  });

  it("decrements only the targeted line and removes it at zero", () => {
    let state = reducer(empty, AddToCart(item({ size: size("s1") })));
    state = reducer(state, AddToCart(item({ size: size("s1") })));
    state = reducer(state, AddToCart(item({ size: size("s2") })));
    const k1 = cartLineKey({ id: "p1", size: size("s1") });
    const k2 = cartLineKey({ id: "p1", size: size("s2") });

    state = reducer(state, RemoveCartItem({ lineKey: k1 }));
    expect(state.items.find((i) => i.size?.id === "s1")?.quantity).toBe(1);
    expect(state.items.find((i) => i.size?.id === "s2")?.quantity).toBe(1);

    state = reducer(state, RemoveCartItem({ lineKey: k2 }));
    expect(state.items.map((i) => i.size?.id)).toEqual(["s1"]);
  });

  it("removes a whole line without touching other lines", () => {
    let state = reducer(empty, AddToCart(item({ size: size("s1") })));
    state = reducer(state, AddToCart(item({ size: size("s2") })));
    state = reducer(state, RemoveItemFromForm({ lineKey: cartLineKey({ id: "p1", size: size("s1") }) }));
    expect(state.items.map((i) => i.size?.id)).toEqual(["s2"]);
  });

  it("clears the cart", () => {
    const state = reducer(reducer(empty, AddToCart(item())), ClearCartItems());
    expect(state.items).toEqual([]);
  });
});
