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
      <h2 className="text-center text-2xl font-semibold pt-10">Add Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm mx-auto mt-10 pb-20">
          <div>
            <h3 className="poppins text-base font-medium mb-2 ">Title</h3>
            <input
              placeholder="Type book title"
              type="text"
              className={`border w-full outline-none  py-2 px-3 ${
                errors.title
                  ? " border-red-500 focus:border-red-500"
                  : "focus:border-slate-700 border-slate-300"
              }`}
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
              })}
            />
            {errors.title && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.title.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-base font-medium mb-2 mt-2 ">Author</h3>
            <div className="">
              <input
                placeholder="Type author name"
                type="text"
                className={`border w-full outline-none py-2 px-3 ${
                  errors.author
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("author", {
                  required: {
                    value: true,
                    message: "Author is required",
                  },
                })}
              />
            </div>
            {errors.author && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-base font-medium mb-2 mt-2 ">Genre</h3>
            <div className="">
              <input
                type="text"
                placeholder="Select genre name"
                className={`border w-full outline-none py-2 px-3 ${
                  errors.genre
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("genre", {
                  required: {
                    value: true,
                    message: "Genre is required",
                  },
                })}
              />
            </div>
            {errors.genre && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.genre.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-base font-medium mb-2 mt-2 ">
              Publication Year
            </h3>
            <div className="">
              <input
                type="date"
                placeholder="Select publication year"
                className={`border w-full outline-none py-2 px-3 ${
                  errors.publication
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("publication", {
                  required: {
                    value: true,
                    message: "Publication is required",
                  },
                })}
              />
            </div>
            {errors.publication && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.publication.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-base font-medium mb-2 mt-2 ">Image</h3>
            <div className="">
              <input
                placeholder="Image link ( Optional )"
                type="text"
                className={`border w-full outline-none py-2 px-3 focus:border-slate-700 border-slate-300`}
                {...register("image")}
              />
            </div>
          </div>
          <div>
            <h3 className="poppins text-base font-medium mb-2 mt-2 ">
              Summary
            </h3>
            <div className="">
              <textarea
                placeholder="Summary ( Optional )"
                type="text"
                className={`border w-full outline-none py-2 px-3 focus:border-slate-700 border-slate-300`}
                {...register("summary")}
              />
            </div>
          </div>
          <input
            // disabled={isLoading}
            className="bg-violet-600 text-white mt-10 w-full py-2 text-lg poppins font-semibold cursor-pointer uppercase"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}
