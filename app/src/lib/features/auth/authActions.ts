import { setCookie } from "cookies-next";
import { SerializedError, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { UserInfo } from "./authSlice";

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
    const { data } = await axios.post(`/login`, { email, password }, config);
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

export const profileUpdate = createAsyncThunk<
  UserInfo,
  {
    name: string;
    email: string;
    phone: string;
    region: string;
    city: string;
    postOffice: string;
  },
  { rejectValue: SerializedError }
>(
  "auth/update",
  async (
    { name, email, phone, region, city, postOffice },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios({
        method: "patch",
        url: "/update",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        data: {
          name,
          email,
          phone,
          region,
          city,
          postOffice,
        },
      });

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
