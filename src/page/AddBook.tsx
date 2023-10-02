/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../redux/features/book/bookApi";

interface AddBookFormInputs {
  image?: string;
  title: string;
  author: string;
  genre: string;
  publication: Date;
  summary?: string;
}

export default function AddBook() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AddBookFormInputs>();

  const [createBook, { isLoading, isError: resError, isSuccess }] =
    useCreateBookMutation();

  const onSubmit = (data: AddBookFormInputs) => {
    const { publication, ...others } = data;

    const year = new Date(publication).getFullYear();

    const finalData = {
      creator: user?.email,
      publication: year.toString(),
      ...others,
    };

    createBook(finalData);
  };

  useEffect(() => {
    if (resError && resError?.data) {
      toast.error(resError?.data?.message, { id: "add-new-book" });
    }
  }, [resError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book created successfully", { id: "add-new-book" });
      navigate("/books");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-center text-3xl font-bold py-8 text-sky-800">
        Add a New Book
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg"
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
            className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
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
            className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
            {...register("genre", {
              required: {
                value: true,
                message: "Genre is required",
              },
            })}
          />
          {errors.genre && (
            <span className="text-red-500 text-sm">{errors.genre.message}</span>
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
            placeholder="Enter a book summary (Optional)"
            rows="4"
            className={`border border-gray-300 rounded-md w-full py-2 px-3 focus:ring focus:ring-blue-500`}
            {...register("summary")}
          />
        </div>

        <div className="mx-44">
          <button
            className="bg-sky-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-800 "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
