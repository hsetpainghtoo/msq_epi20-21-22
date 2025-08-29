import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SnackbarType = "success" | "error";

interface AppSnackbarSlice {
  type: SnackbarType;
  message: string;
  open: boolean;
}

const initialState: AppSnackbarSlice = {
  type: "success",
  message: "",
  open: false,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ type: SnackbarType; message: string }>
    ) => {
      const { type, message } = action.payload;
      state.type = type;
      state.message = message;
      state.open = true;
    },

    hideSnackbar: (state)=>{
      state.open = false;
      state.message = "";
      state.type = "success";
    }
  },
});


export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
