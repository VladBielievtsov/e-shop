import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { IProduct } from "../products/productsSlice";
import { getAllCategories } from "./categoryActions";

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}

export interface CategoryState {
  categories: ICategory[] | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError | undefined;
}

const initialState: CategoryState = {
  categories: null,
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllCategories.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.error = null;
      state.categories = payload;
    });
    builder.addCase(getAllCategories.rejected, (state, { payload }) => {
      state.status = "failed";
      // @ts-ignore
      state.error = payload;
    });
  },
});

export default categoriesSlice.reducer;
