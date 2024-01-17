import { createSlice, SerializedError, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "./productsActions";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  color: string;
  slug: string;
  price: number;
  discount: number;
  images: IProductImages[];
}

export interface IProductImages {
  id: number;
  productId: number;
  url: string;
}

export interface ProductsState {
  data: IProduct[] | null | undefined;
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
      state.data = payload;
    });
    builder.addCase(fetchAllProducts.rejected, (state, { payload }) => {
      state.status = "failed";
      // @ts-ignore
      state.error = payload;
    });
    // Create product
    builder.addCase(createProduct.fulfilled, (state, { payload }) => {
      state.data?.push(payload);
    });
    // Delete product
    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.data = state.data?.filter((product) => product.id !== payload.id);
    });
    // Update product
    builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
      const products = state.data?.filter(
        (product) => product.id !== payload.id
      );
      products?.push(payload);
      state.data = products;
    });
  },
});

export default productsSlice.reducer;
