
import { RootState } from "@/redux/store";
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

type CartState = {
    items: CartItem[]
}

let initialCartItems: CartItem[] = [];

// Safely get cart items from localStorage
if (typeof window !== 'undefined') {
  try {
    const storedItems = window.localStorage.getItem("cartItems");
    if (storedItems) {
      const parsed = JSON.parse(storedItems);
      if (Array.isArray(parsed)) {
        initialCartItems = parsed;
      }
    }
  } catch (error) {
    console.error('Error parsing cart items from localStorage:', error);
  }
}

const initialState: CartState = {
    items: initialCartItems
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        AddToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 0) + 1
                existingItem.size = action.payload.size
                existingItem.extra = action.payload.extra
            } else {
                state.items.push({ ...action.payload, quantity: 1 })
            }
        },
        RemoveCartItem: (state, action: PayloadAction<{ id: string }>) => {
            const item = state.items.find((e) => e.id === action.payload.id)
            if (item) {
                if (item.quantity === 1) {
                    state.items = state.items.filter((item) => item.id != action.payload.id)
                } else {
                    item.quantity! -= 1
                }
            }
        },
        RemoveItemFromForm: (state, action: PayloadAction<{ id: string }>) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id)
        },
        ClearCartItems: (state) => {
            state.items = []
        }
    }
})


export const { AddToCart, RemoveCartItem, RemoveItemFromForm, ClearCartItems } = cartSlice.actions
export default cartSlice.reducer
export const selectCartItems = (state: RootState) => state.cart.items