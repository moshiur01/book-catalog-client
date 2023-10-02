/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiSlice } from "../../api/apiSlice";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    handleWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getWishlist: builder.query({
      query: (userEmail) => ({
        url: `/wishlist/${userEmail}`,
      }),
      providesTags: ["wishlist"],
    }),
  }),
});

export const { useHandleWishlistMutation, useGetWishlistQuery } = wishlistApi;
