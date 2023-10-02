/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { toast } from "react-hot-toast";
import { apiSlice } from "../../api/apiSlice";

export const readingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    handleReading: builder.mutation({
      query: (data) => ({
        url: "/reading",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reading"],
    }),
    getReadingList: builder.query({
      query: (userEmail) => ({
        url: `/reading/${userEmail}`,
      }),
      providesTags: ["reading"],
    }),
    updateReadingStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/reading/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { user } = getState().auth;
        try {
          const result = await queryFulfilled;
          if (result?.data?.statusCode === 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getReadingList",
                user.email,
                (draft) => {
                  const updatedReading = draft?.data?.find(
                    (item) => item._id == arg.id
                  );

                  if (updatedReading) {
                    console.log(JSON.parse(JSON.stringify(updatedReading)));

                    updatedReading.status = arg.data.status;
                  }
                }
              )
            );
          } else {
            return;
          }
        } catch (error) {
          toast.error("Something went wrong");
        }
      },
    }),
  }),
});

export const {
  useHandleReadingMutation,
  useGetReadingListQuery,
  useUpdateReadingStatusMutation,
} = readingApi;
