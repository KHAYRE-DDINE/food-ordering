import { CartItem } from "@/redux/features/cart/cartSlice"
import { cartLineKey } from "@/lib/cart-line"
import { DELIVERY_FEE, computeLineTotalCents, computeUnitPriceCents, fromCents } from "@/lib/pricing"

// Preview values only. The server recomputes prices from the database at checkout.
export const deliveryFee = DELIVERY_FEE

export const GetCartQuantity = (cart: CartItem[]) => {
    return cart.reduce((quantity, item) => (item.quantity ?? 0) + quantity, 0)
}

// Total quantity of a product across all of its customizations.
export const getItemQuantity = (id: string, cart: CartItem[]) => {
    return cart
        .filter((item) => id === item.id)
        .reduce((total, item) => total + (item.quantity ?? 0), 0)
}

// Quantity of one exact customization (product + size + extras).
export const getLineQuantity = (lineKey: string, cart: CartItem[]) => {
    return cart.find((item) => cartLineKey(item) === lineKey)?.quantity ?? 0
}

const priceInput = (item: CartItem) => ({
    basePrice: item.basePrice,
    sizePrice: item.size?.price ?? 0,
    extraPrices: (item.extra ?? []).map((extra) => extra.price ?? 0),
})

export const getUnitPrice = (item: CartItem) =>
    fromCents(computeUnitPriceCents(priceInput(item)))

export const getLineTotal = (item: CartItem) =>
    fromCents(computeLineTotalCents({ ...priceInput(item), quantity: item.quantity ?? 0 }))

export const getSubTotal = (cart: CartItem[]) => {
    return cart.reduce((total, item) => total + getLineTotal(item), 0)
}

export const getTotalAmount = (cart: CartItem[]) => {
    return getSubTotal(cart) + deliveryFee
}
