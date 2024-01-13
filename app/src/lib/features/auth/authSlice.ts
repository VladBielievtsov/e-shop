import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { getCookie, hasCookie, deleteCookie } from "cookies-next";
import { authLogin, profileUpdate } from "./authActions";

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  password: string;
  phone: string | null;
  region: string | null;
  city: string | null;
  postOffice: string | null;
  role: string;
  resetPassKey: string;
  resetExp: string;
  token: string;
}

type CookieValueTypes = string | undefined;

export interface AuthState {
  loading: boolean;
  userInfo: null | UserInfo;
  token: null | CookieValueTypes;
  error: null | SerializedError | undefined;
  success: boolean;
}

const token = hasCookie("token") ? getCookie("token") : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  token,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      deleteCookie("token");
      state.loading = false;
      state.userInfo = null;
      state.token = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(authLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(authLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      // @ts-ignore
      state.userInfo = payload;
      // @ts-ignore
      state.token = payload.token;
    });
    builder.addCase(authLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Update profile
    builder.addCase(profileUpdate.fulfilled, (state, { payload }) => {
      // @ts-ignore
      state.userInfo = payload;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
