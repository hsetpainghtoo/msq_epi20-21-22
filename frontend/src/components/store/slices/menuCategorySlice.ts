import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuCategory } from "../../../types/menuCategory";

interface MenuSlice {
  menuCategories: MenuCategory[];
  isLoading: boolean;
  error: Error | null;
}

const initialState: MenuSlice = {
  menuCategories: [],
  isLoading: false,
  error: null,
};

const menuCategorySlice = createSlice({
  name: "menuCategory",
  initialState,
  reducers: {
    setMenuCategories: (state, action: PayloadAction<MenuCategory[]>) => {
      state.menuCategories = action.payload;
    },

    addMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = [...state.menuCategories, action.payload];
    },

    removeMenuCategory: (state, action: PayloadAction<MenuCategory>) => {
      state.menuCategories = state.menuCategories.filter(
        (menuCategory) => menuCategory.id !== action.payload.id
      );
    },
  },
});

export const { setMenuCategories, addMenuCategory, removeMenuCategory } =
  menuCategorySlice.actions;

export default menuCategorySlice.reducer;
