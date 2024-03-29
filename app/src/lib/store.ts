import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import sizesReducer from "./features/sizes/sizesSlice";
import authReducer from "./features/auth/authSlice";
import categoriesSlice from "./features/category/categorySlice";
import { authApi } from "./features/auth/authService";
import cartReducer from "./features/cart/cartSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      categories: categoriesSlice,
      sizes: sizesReducer,
      cart: cartReducer,
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
