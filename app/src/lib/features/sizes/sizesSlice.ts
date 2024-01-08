import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { createSize, deleteSizes, updateSizes } from "./sizesActions";

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
  sizes: [],
  status: "idle",
  error: null,
};

const sizeSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {},
  extraReducers(builder) {
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
