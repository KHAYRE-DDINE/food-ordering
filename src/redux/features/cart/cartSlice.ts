import { RootState } from "@/redux/store";
import { cartLineKey } from "@/lib/cart-line";
import { Extra, Size } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    name: string
    id: string
    image: string
    basePrice: number
    quantity?: number
    size?: Size
    extra?: Extra[]
}

export type AppliedPromo = {
    code: string
    discountAmount: number
    discountType: 'PERCENTAGE' | 'FIXED'
    discountValue: number
}

type CartState = {
    items: CartItem[]
    appliedPromo: AppliedPromo | null
}

let initialCartItems: CartItem[] = [];

// Safely get cart items from sessionStorage
if (typeof window !== 'undefined') {
  try {
    const storedItems = window.sessionStorage.getItem("cartItems");
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      if (Array.isArray(parsed)) {
        initialCartItems = parsed;
      }
    }
  } catch (error) {
    console.error('Error parsing cart items from sessionStorage:', error);
  }
}

const initialState: CartState = {
    items: initialCartItems,
    appliedPromo: null
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddToCart: (state, action: PayloadAction<CartItem>) => {
            const key = cartLineKey(action.payload)
            const existingItem = state.items.find((item) => cartLineKey(item) === key)

            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        RemoveCartItem: (state, action: PayloadAction<{ lineKey: string }>) => {
            const item = state.items.find((e) => cartLineKey(e) === action.payload.lineKey)
            if (item) {
                if ((item.quantity ?? 1) <= 1) {
                    state.items = state.items.filter((e) => cartLineKey(e) !== action.payload.lineKey)
                } else {
                    item.quantity! -= 1
                }
            }
        },
        RemoveItemFromForm: (state, action: PayloadAction<{ lineKey: string }>) => {
            state.items = state.items.filter((item) => cartLineKey(item) !== action.payload.lineKey)
        },
        ClearCartItems: (state) => {
            state.items = []
            state.appliedPromo = null
        },
        ApplyPromoCode: (state, action: PayloadAction<AppliedPromo>) => {
            state.appliedPromo = action.payload
        },
        RemovePromoCode: (state) => {
            state.appliedPromo = null
        },
        ReorderItems: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
            state.appliedPromo = null
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('cartItems', JSON.stringify(action.payload))
            }
        }
    }
})

export const { 
    AddToCart, 
    RemoveCartItem, 
    RemoveItemFromForm, 
    ClearCartItems,
    ApplyPromoCode,
    RemovePromoCode,
    ReorderItems
} = cartSlice.actions

export default cartSlice.reducer

export const selectCartItems = (state: RootState) => state.cart.items
export const selectAppliedPromo = (state: RootState) => state.cart.appliedPromo
