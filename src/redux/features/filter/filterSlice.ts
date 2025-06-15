import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterItems {
  name: string;
  value: string[] | string;
}

interface FilterStore {
  items: FilterItems[];
}

const initialState: FilterStore = {
  items: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addToFilter: (state, action: PayloadAction<FilterItems>) => {
        const existingItem = state.items.find((item) => item.name === action.payload.name);
        
        if (!existingItem) {
          // If item doesn't exist, add it (with array for dietary)
          state.items.push({
            ...action.payload,
            value: action.payload.name === "dietary" 
              ? [action.payload.value] 
              : action.payload.value
          });
          return;
        }
      
        if (existingItem.name !== "dietary") {
          // For non-dietary items, just update the value
          existingItem.value = action.payload.value;
          return;
        }
      
        // For dietary items - handle array logic
        if (Array.isArray(existingItem.value)) {
          // Add to existing array if not already present
          if (!existingItem.value.includes(action.payload.value)) {
            existingItem.value.push(action.payload.value);
          }
        } else {
          // Convert to array if it was a single value
          existingItem.value = [existingItem.value, action.payload.value];
        }
      },
  },
});

export const { addToFilter } = filterSlice.actions;
export default filterSlice.reducer;
