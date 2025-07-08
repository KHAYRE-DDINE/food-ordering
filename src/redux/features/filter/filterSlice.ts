import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterItems {
  name: string;
  value: string[] | string;
}

interface FilterStore {
  items: FilterItems[];
}

let initialFilterItems: FilterItems[] = [];

// Safely get and parse filter from sessionStorage
if (typeof window !== "undefined") {
  try {
    const storedFilter = window.sessionStorage.getItem("filter");
    if (storedFilter) {
      const parsed = JSON.parse(storedFilter);
      // Ensure we have a valid array structure
      if (Array.isArray(parsed?.items)) {
        initialFilterItems = parsed.items;
      }
    }
  } catch (error) {
    console.error("Error parsing filter from sessionStorage:", error);
  }
}

const initialState: FilterStore = {
  items: initialFilterItems,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addToFilter: (state, action: PayloadAction<FilterItems>) => {
      const { name, value } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.name === name
      );

      if (existingItemIndex === -1) {
        state.items.push({
          name,
          value:
            name === "dietary"
              ? Array.isArray(value)
                ? value
                : [value]
              : value,
        });
        return;
      }

      const existingItem = state.items[existingItemIndex];

      if (name !== "dietary") {
        existingItem.value = value;
        return;
      }

      const currentValue = existingItem.value;
      const newValue = Array.isArray(value) ? value : [value];

      if (Array.isArray(currentValue)) {
        const updatedValue = currentValue.includes(newValue[0])
          ? currentValue.filter((v) => v !== newValue[0])
          : [...currentValue, ...newValue];

        existingItem.value = updatedValue;
      } else {
        existingItem.value =
          currentValue !== newValue[0] ? [currentValue, ...newValue] : [];
      }
    },
    removeFromFilter: (state, action: PayloadAction<FilterItems>) => {
      const { name, value } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.name === name);

      if (existingItemIndex === -1) return;

      const existingItem = state.items[existingItemIndex];

      if (name === "dietary") {
        if (Array.isArray(existingItem.value)) {
          // Remove the specific dietary value from the array
          const updatedValue = existingItem.value.filter(
            (v: string) => v !== value
          );
          
          if (updatedValue.length === 0) {
            // If no dietary filters left, remove the entire item
            state.items.splice(existingItemIndex, 1);
          } else {
            // Otherwise update with the filtered array
            existingItem.value = updatedValue;
          }
        } else if (existingItem.value === value) {
          // If it's a single value that matches, remove the entire item
          state.items.splice(existingItemIndex, 1);
        }
      } else {
        // For non-dietary filters, remove the entire filter item
        state.items.splice(existingItemIndex, 1);
      }
    },
  },
});

export const { addToFilter, removeFromFilter } = filterSlice.actions;
export default filterSlice.reducer;
