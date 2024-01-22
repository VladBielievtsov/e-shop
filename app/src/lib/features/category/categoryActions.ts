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

export const createCategory = createAsyncThunk<
  ICategory,
  {
    name: string;
  },
  { rejectValue: SerializedError }
>("categories/create", async ({ name }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`/category`, { name }, config);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
