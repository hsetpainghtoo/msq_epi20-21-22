import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu, NewMenuParams } from "../../../types/menu";

interface MenuSlice {
  menus: Menu[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MenuSlice = {
  menus: [],
  isLoading: false,
  error: null,
};

export const createMenu = createAsyncThunk(
  "menu/createMenu",
  async (newMenu: NewMenuParams, thunkApi) => {
    const { onSuccess, onError, ...payload } = newMenu;
    onError && onError();
    try {
      const response = await fetch("http://localhost:8000/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const dataFromServer = await response.json();
      const { menus } = dataFromServer;
      //   thunkApi.dispatch(setMenus(menus as Menu[])); // Dispatch the "setMenus" action to update the menus state
      onSuccess && onSuccess();
      return menus;
    } catch (error) {
      console.error(error);
    }
  }
);

export const menuSlice = createSlice({
  name: "menu",
  initialState: initialState,
  reducers: {
    setMenus: (state, action: PayloadAction<Menu[]>) => {
      state.menus = action.payload;
    },

    addMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = [...state.menus, action.payload];
    },

    removeMenu: (state, action: PayloadAction<Menu>) => {
      state.menus = state.menus.filter((menu) => menu.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createMenu.fulfilled, (state, action) => {
        state.isLoading = false;
        state.menus = action.payload;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.isLoading = false;
        const e = new Error("createMenu rejected!");
        state.error = e.message;
      });
  },
});

export const { setMenus, addMenu, removeMenu } = menuSlice.actions;

export default menuSlice.reducer;
