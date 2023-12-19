import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = process.env.BACKEND_URL || "http://localhost:4040";

export const fetchAllProducts = createAsyncThunk<
  void,
  { rejectValue: SerializedError }
>("products/fetchAllProducts", async (_, { rejectWithValue }) => {
  try {
    const data = await fetch(`http://localhost:4040/products`, {
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
