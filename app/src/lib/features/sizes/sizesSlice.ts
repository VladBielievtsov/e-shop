import { createSlice, SerializedError } from "@reduxjs/toolkit";
import {
  createSize,
  deleteSizes,
  getAllSizes,
  updateSizes,
} from "./sizesActions";

export interface ISize {
  id: number;
  size: string;
  productId: number;
  qantity: number;
}

export interface SizesState {
  sizes: ISize[] | null | undefined;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | SerializedError | undefined;
}

const initialState: SizesState = {
  sizes: null,
  status: "idle",
  error: null,
};

const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get all sizes
    builder.addCase(getAllSizes.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAllSizes.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.error = null;
      state.sizes = payload;
    });
    builder.addCase(getAllSizes.rejected, (state, { payload }) => {
      state.status = "failed";
      // @ts-ignore
      state.error = payload;
    });
    // Create sizes
    builder.addCase(createSize.fulfilled, (state, { payload }) => {
      state.sizes?.push(payload);
    });
    // Delete sizes
    builder.addCase(deleteSizes.fulfilled, (state, { payload }) => {
      state.sizes = state.sizes?.filter(
        (size) => size.productId !== payload.productId
      );
    });
    // Update sizes
    builder.addCase(updateSizes.fulfilled, (state, { payload }) => {
      state.sizes = state.sizes?.filter(
        (sizes) => sizes.productId !== payload.productId
      );
      state.sizes?.push(payload);
    });
  },
});

export default sizeSlice.reducer;
