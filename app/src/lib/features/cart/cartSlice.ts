import { createSlice, SerializedError } from "@reduxjs/toolkit";

export interface ICart {
  id: string;
  price: number;
  productId: number;
  size: string[];
  slug: string;
  title: string;
  totalPrice: number;
}

export interface CartState {
  data: ICart[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError | undefined;
}

const initialState: CartState = {
  data: JSON.parse(localStorage.getItem("cart") || "[]"),
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.data = [...state.data, payload];
    },
    removeFromCart: (state, { payload }) => {
      state.data = state.data.filter((item) => item.id != payload);
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, removeFromCart } = cartSlice.actions;
