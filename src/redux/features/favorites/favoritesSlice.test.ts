import { describe, it, expect } from "vitest";
import favoritesReducer, {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearFavorites,
  FavoriteItem,
} from "./favoritesSlice";

describe("favoritesSlice", () => {
  const sampleDish: FavoriteItem = {
    id: "dish-1",
    name: "Margherita Pizza",
    image: "/assets/images/menu/margherita-pizza.jpg",
    basePrice: 8.99,
    description: "Classic pizza",
  };

  it("adds a dish to favorites when toggled initially", () => {
    const state = favoritesReducer({ items: [] }, toggleFavorite(sampleDish));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe("dish-1");
  });

  it("removes the dish when toggled again", () => {
    const initialState = { items: [sampleDish] };
    const state = favoritesReducer(initialState, toggleFavorite(sampleDish));
    expect(state.items).toHaveLength(0);
  });

  it("adds a dish if not already present via addFavorite", () => {
    const state = favoritesReducer({ items: [] }, addFavorite(sampleDish));
    expect(state.items).toHaveLength(1);
    const state2 = favoritesReducer(state, addFavorite(sampleDish));
    expect(state2.items).toHaveLength(1);
  });

  it("removes a specific favorite by id", () => {
    const initialState = { items: [sampleDish] };
    const state = favoritesReducer(initialState, removeFavorite("dish-1"));
    expect(state.items).toHaveLength(0);
  });

  it("clears all favorites", () => {
    const initialState = {
      items: [
        sampleDish,
        { ...sampleDish, id: "dish-2", name: "Chicken Shawarma" },
      ],
    };
    const state = favoritesReducer(initialState, clearFavorites());
    expect(state.items).toHaveLength(0);
  });
});
