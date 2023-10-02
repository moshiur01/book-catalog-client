/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { apiSlice } from "../../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
        } catch (error) {
          // nothing
        }
      },
    }),

    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result?.data?.data?.accessToken,
              user: result?.data?.data?.user,
            })
          );
        } catch (error) {
          // nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
