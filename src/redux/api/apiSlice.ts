import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://book-server-blond.vercel.app/api/v1/" }),
  tagTypes: ["reviews", "books", "wishlist", "reading"],
  endpoints: () => ({}),
});
