import { setCookie } from "cookies-next";
import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = process.env.BACKEND_URL || "http://localhost:4040";

export const authLogin = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: SerializedError }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${backendURL}/login`,
      { email, password },
      config
    );
    // store user's token in local storage
    //localStorage.setItem("token", data.token);
    setCookie("token", data.token);
    return data;
  } catch (error: any) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
