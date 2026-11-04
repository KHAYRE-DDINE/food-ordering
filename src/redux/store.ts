import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import filterReducer from './features/filter/filterSlice'
import favoritesReducer from './features/favorites/favoritesSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        filter: filterReducer,
        favorites: favoritesReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
