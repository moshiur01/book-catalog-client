/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import {
  useGetSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { toast } from "react-hot-toast";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

export default function EditBook() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const { data: bookData, isLoading, isError } = useGetSingleBookQuery(id);
  const {
    _id,
    title: initialTitle,
    author: initialAuthor,
    genre: initialGenre,
    publication: initialPublication,
    image: initialImage,
    summary: InitialSummary,
  } = bookData?.data || {};

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [updateBook, { isSuccess }] = useUpdateBookMutation();

  const onSubmit = (data: any) => {
    updateBook({ id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book Updated", { id: "edit-book" });
      navigate(`/books/${id}`);
    }
  }, [isSuccess, navigate]);

  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
  } else if (!isLoading && !isLoading && _id) {
    content = (
      <div className="container mx-auto px-5">
        <h2 className="text-center text-3xl font-semibold pt-10">Edit Book</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800"
            >
              Title
            </label>
            <input
              id="title"
              placeholder="Enter the book title"
              type="text"
              defaultValue={initialTitle}
              className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            {errors.title && (
              <span className="text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-lg font-medium text-gray-800"
            >
              Author
            </label>
            <input
              id="author"
              placeholder="Enter the author's name"
              type="text"
              defaultValue={initialAuthor}
              className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
              {...register("author", {
                required: {
                  value: true,
                  message: "Author is required",
                },
              })}
            />
            {errors.author && (
              <span className="text-red-500 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-lg font-medium text-gray-800"
            >
              Genre
            </label>
            <input
              id="genre"
              type="text"
              placeholder="Enter the genre"
              defaultValue={initialGenre}
              className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
              {...register("genre", {
                required: {
                  value: true,
                  message: "Genre is required",
                },
              })}
            />
            {errors.genre && (
              <span className="text-red-500 text-sm">
                {errors.genre.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="publication"
              className="block text-lg font-medium text-gray-800"
            >
              Publication Year
            </label>
            <input
              id="publication"
              type="date"
              placeholder="Select the publication year"
              defaultValue={initialPublication}
              className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
              {...register("publication", {
                required: {
                  value: true,
                  message: "Publication year is required",
                },
              })}
            />
            {errors.publication && (
              <span className="text-red-500 text-sm">
                {errors.publication.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-800"
            >
              Image
            </label>
            <input
              id="image"
              placeholder="Enter the image link (Optional)"
              type="text"
              defaultValue={initialImage}
              className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
              {...register("image")}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="summary"
              className="block text-lg font-medium text-gray-800"
            >
              Summary
            </label>
            <textarea
              id="summary"
              defaultValue={InitialSummary}
              placeholder="Summary (Optional)"
              rows="4"
              className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
              {...register("summary")}
            />
          </div>
          <div className="mx-40">
            <button
              className="bg-sky-800 text-white py-2 px-10 rounded-md font-semibold hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-500"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }

  return content;
}
