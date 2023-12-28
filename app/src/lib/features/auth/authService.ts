import { RootState } from "@/lib/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backendURL = process.env.BACKEND_URL || "http://localhost:4040/";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: backendURL,
    credentials: "include",
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "/getme",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetUserDetailsQuery } = authApi;
