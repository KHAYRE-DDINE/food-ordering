import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export type FavoriteItem = {
    id: string;
    name: string;
    image: string;
    basePrice: number;
    description: string;
    categoryId?: string;
};

type FavoritesState = {
    items: FavoriteItem[];
};

let initialItems: FavoriteItem[] = [];

if (typeof window !== 'undefined') {
    try {
        const stored = localStorage.getItem('fasty_favorites');
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                initialItems = parsed;
            }
        }
    } catch (e) {
        console.error('Error loading favorites from localStorage:', e);
    }
}

const initialState: FavoritesState = {
    items: initialItems,
};

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            const exists = state.items.some((item) => item.id === action.payload.id);
            if (exists) {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
            if (typeof window !== 'undefined') {
                localStorage.setItem('fasty_favorites', JSON.stringify(state.items));
            }
        },
        addFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            if (!state.items.some((item) => item.id === action.payload.id)) {
                state.items.push(action.payload);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('fasty_favorites', JSON.stringify(state.items));
                }
            }
        },
        removeFavorite: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            if (typeof window !== 'undefined') {
                localStorage.setItem('fasty_favorites', JSON.stringify(state.items));
            }
        },
        clearFavorites: (state) => {
            state.items = [];
            if (typeof window !== 'undefined') {
                localStorage.removeItem('fasty_favorites');
            }
        },
    },
});

export const { toggleFavorite, addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;
export const selectFavorites = (state: RootState) => state.favorites?.items ?? [];
export const selectIsFavorite = (productId: string) => (state: RootState) =>
    state.favorites?.items.some((item) => item.id === productId) ?? false;

export default favoritesSlice.reducer;
