import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { ICategory } from "./categorySlice";

export const getAllCategories = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: SerializedError }
>("categories/getAllCategories", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/category`);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
