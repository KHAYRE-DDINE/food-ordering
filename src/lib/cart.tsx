import { CartItem } from "@/redux/features/cart/cartSlice"


export const deliveryFee = 5

export const GetCartQuantity = (cart: CartItem[]) => {
    return cart.reduce((quantity, item) => item.quantity! + quantity, 0)
}

export const getItemQuantity = (id: string, cart: CartItem[]) => {
    return cart.find((item) => id === item.id)?.quantity || 0
}

export const getSubTotal = (cart: CartItem[]) => {
    return cart.reduce((total, cartItem) => {
        const extrasTotal = cartItem.extra?.reduce((sum, extra) => {
            return sum + (extra.price || 0)
        }, 0)
        const itemTotal = cartItem.basePrice + (cartItem.size?.price || 0) + (extrasTotal || 0)

        return total + itemTotal * cartItem.quantity!
    }, 0)
}

export const getTotalAmount = (cart: CartItem[]) => {
    return getSubTotal(cart) + deliveryFee
} 