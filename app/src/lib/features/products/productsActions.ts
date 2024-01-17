import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { IProduct, IProductImages } from "./productsSlice";

export const fetchAllProducts = createAsyncThunk<
  IProduct[],
  { rejectValue: SerializedError }
>("products/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/products`);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const createProduct = createAsyncThunk<
  IProduct,
  {
    title: string;
    description: string;
    price: number;
    color: string;
    discount: number;
  },
  { rejectValue: SerializedError }
>(
  "products/create",
  async (
    { title, description, price, color, discount },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/product`,
        { title, description, price, color, discount },
        config
      );

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const deleteProduct = createAsyncThunk<
  IProduct,
  { id: number },
  { rejectValue: SerializedError }
>("products/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(`/product/${id}`, config);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const updateProduct = createAsyncThunk<
  IProduct,
  {
    id: number;
    title: string;
    description: string;
    price: number;
    color: string;
    discount: number;
    images: { productId: number; url: any }[];
  },
  { rejectValue: SerializedError }
>(
  "products/update",
  async (
    { id, title, description, price, color, discount, images },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.patch(
        `/product/${id}`,
        { title, description, price, color, discount, images },
        config
      );

      return data;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
