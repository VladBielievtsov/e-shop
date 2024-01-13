import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { ISize } from "./sizesSlice";

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
    const { data } = await axios.post(`/size`, body, config);

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
      `/sizes/${body[0].productId}`,
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

    const { data } = await axios.delete(`/sizes/${id}`, config);

    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
