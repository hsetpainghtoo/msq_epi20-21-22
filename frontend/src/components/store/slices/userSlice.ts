import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserSlice,
  RegisterUserParam,
  User,
  LoginUserParam,
} from "../../../types/users";

export const initialState: UserSlice = {
  user: null,
  isLoading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (registerUserParam: RegisterUserParam, thunkApi) => {
    const { email, password } = registerUserParam;
    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response, "Register Response!");

      registerUserParam.onSuccess && registerUserParam.onSuccess();
    } catch (e) {
      console.error(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (loginUserParam: LoginUserParam, thunkApi) => {
    const { email, password } = loginUserParam;
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const dataFromServer = await response.json();
        const {accessToken} = dataFromServer;
        localStorage.setItem("accessToken", accessToken);
        loginUserParam.onSuccess && loginUserParam.onSuccess();
      } else {
        return thunkApi.rejectWithValue("Invalid credentials");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
