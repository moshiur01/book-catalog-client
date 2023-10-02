import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["reviews", "books", "wishlist", "reading"],
  endpoints: () => ({}),
});

// http://localhost:5000/books/651a5e6f3c54af8d0892bf54
