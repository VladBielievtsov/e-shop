import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = process.env.BACKEND_URL || "http://localhost:4040";

export const fetchAllProducts = createAsyncThunk<
  void,
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
