import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ISize } from "./sizesSlice";

const backendURL = process.env.BACKEND_URL || "http://localhost:4040";

export const createSize = createAsyncThunk<
  ISize,
  {
    productId: number;
    quantity: number;
    size: string;
  }[],
  { rejectValue: SerializedError }
>("sizes/create", async (body, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(`${backendURL}/size`, body, config);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const updateSizes = createAsyncThunk<
  ISize,
  {
    productId: number;
    quantity: number;
    size: string;
  }[],
  { rejectValue: SerializedError }
>("sizes/update", async (body, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.patch(
      `${backendURL}/sizes/${body[0].productId}`,
      body,
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
});

export const deleteSizes = createAsyncThunk<
  ISize,
  { id: number },
  { rejectValue: SerializedError }
>("sizes/delete", async ({ id }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.delete(`${backendURL}/sizes/${id}`, config);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
