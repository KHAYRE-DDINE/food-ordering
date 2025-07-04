import { db } from "@/lib/prisma";
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
if (typeof window !== 'undefined') {
  try {
    const storedFilter = window.sessionStorage.getItem('filter');
    if (storedFilter) {
      const parsed = JSON.parse(storedFilter);
      // Ensure we have a valid array structure
      if (Array.isArray(parsed?.items)) {
        initialFilterItems = parsed.items;
      }
    }
  } catch (error) {
    console.error('Error parsing filter from sessionStorage:', error);
  }
}

const initialState: FilterStore = {
  items: initialFilterItems
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addToFilter: (state, action: PayloadAction<FilterItems>) => {
      const { name, value } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.name === name);
      
      if (existingItemIndex === -1) {
        state.items.push({
          name,
          value: name === "dietary" ? (Array.isArray(value) ? value : [value]) : value,
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
          ? currentValue.filter(v => v !== newValue[0])
          : [...currentValue, ...newValue];
          
        existingItem.value = updatedValue;
      } else {
        existingItem.value = currentValue !== newValue[0] 
          ? [currentValue, ...newValue] 
          : [];
      }
    }
  },
});

export const { addToFilter } = filterSlice.actions;
export default filterSlice.reducer;
