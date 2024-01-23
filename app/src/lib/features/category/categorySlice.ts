import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { IProduct } from "../products/productsSlice";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "./categoryActions";
import { RootState } from "@/lib/store";

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
    // Create Category
    builder.addCase(createCategory.fulfilled, (state, { payload }) => {
      state.categories?.push(payload);
    });
    // Delete product
    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.categories = state.categories?.filter(
        (category) => category.id !== payload.id
      );
    });
  },
});

export const getCategoryById = (state: RootState, categoryId: number) => {
  return state.categories.categories?.find(
    (category) => category.id === categoryId
  );
};

export default categoriesSlice.reducer;
