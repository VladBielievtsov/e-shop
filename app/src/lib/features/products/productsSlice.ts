import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./productsActions";

export interface IProduct {
  id: number;
  title: string;
  color: string;
  slug: string;
  price: number;
}

export interface ProductsState {
  data: IProduct[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError | undefined;
}

const initialState: ProductsState = {
  data: null,
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get all products
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.error = null;
      // @ts-ignore
      state.data = payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      // @ts-ignore
      state.error = payload;
    });
  },
});

export default productsSlice.reducer;
