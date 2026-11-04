import { describe, expect, it } from "vitest";
import { cartLineKey } from "./cart-line";

describe("cartLineKey", () => {
  it("differs for different sizes of the same product", () => {
    expect(cartLineKey({ id: "p1", size: { id: "s1" } })).not.toBe(
      cartLineKey({ id: "p1", size: { id: "s2" } })
    );
  });

  it("differs for different extras of the same product", () => {
    expect(cartLineKey({ id: "p1", size: { id: "s1" }, extra: [{ id: "e1" }] })).not.toBe(
      cartLineKey({ id: "p1", size: { id: "s1" }, extra: [{ id: "e2" }] })
    );
    expect(cartLineKey({ id: "p1", extra: [] })).not.toBe(
      cartLineKey({ id: "p1", extra: [{ id: "e1" }] })
    );
  });

  it("is independent of the order extras were selected in", () => {
    expect(cartLineKey({ id: "p1", extra: [{ id: "e1" }, { id: "e2" }] })).toBe(
      cartLineKey({ id: "p1", extra: [{ id: "e2" }, { id: "e1" }] })
    );
  });

  it("is stable for the same customization", () => {
    expect(cartLineKey({ id: "p1", size: { id: "s1" } })).toBe(
      cartLineKey({ id: "p1", size: { id: "s1" } })
    );
  });
});
