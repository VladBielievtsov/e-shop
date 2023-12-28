import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import authReducer from "./features/auth/authSlice";
import { authApi } from "./features/auth/authService";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
