import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProduct } from "./productsSlice";

const backendURL = process.env.BACKEND_URL || "http://localhost:4040";

export const fetchAllProducts = createAsyncThunk<
  IProduct[],
  { rejectValue: SerializedError }
>("products/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await fetch(`${backendURL}/products`, {
      method: "GET",
    });

    return data.json();
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
        `${backendURL}/product`,
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

    const { data } = await axios.delete(`${backendURL}/product/${id}`, config);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
