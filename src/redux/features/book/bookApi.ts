/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { toast } from "react-hot-toast";
import { apiSlice } from "../../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (queryString) => ({
        url: `/books?${queryString}`,
      }),
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, getState, queryFulfilled }) {
        const { book } = getState();
        const { searchTerm, filterByGenre, filterByPublication } = book;

        let queryString = "";

        if (searchTerm) {
          queryString += `&searchTerm=${searchTerm}`;
        }
        if (filterByGenre) {
          queryString += `&genre=${filterByGenre}`;
        }
        if (filterByPublication) {
          queryString += `&publication=${filterByPublication}`;
        }

        try {
          const result = await queryFulfilled;

          if (result?.data?.statusCode === 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getBooks",
                queryString,
                (draft) => {
                  const updatedBook = draft?.data?.find(
                    (item) => item._id == arg.id
                  );

                  if (updatedBook) {
                    updatedBook.title = arg.data.title;
                    updatedBook.author = arg.data.author;
                    updatedBook.genre = arg.data.genre;
                    updatedBook.publication = arg.data.publication;
                    updatedBook.summary = arg.data.summary;
                    updatedBook.image = arg.data.image;
                  }
                }
              )
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getSingleBook",
                arg.id,
                (draft) => {
                  console.log(
                    JSON.parse(JSON.stringify(draft.data)),
                    "from single "
                  );
                  draft.data.title = arg.data.title;
                  draft.data.author = arg.data.author;
                  draft.data.genre = arg.data.genre;
                  draft.data.publication = arg.data.publication;
                  draft.data.summary = arg.data.summary;
                  draft.data.image = arg.data.image;
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
    createReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/reviews/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    getReviews: builder.query({
      query: (id) => ({
        url: `/books/reviews/${id}`,
      }),
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useGetSingleBookQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useCreateReviewMutation,
  useGetReviewsQuery,
} = bookApi;
