/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FormEvent, useState, useEffect, useRef } from "react";
import { IoSendSharp } from "react-icons/io5";
import ReviewCard from "../components/ReviewCard";
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from "../redux/features/book/bookApi";
import { useAppSelector } from "../redux/hooks";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
export default function Reviews({ id }) {
  const isLoggedIn = useAuth();
  const { user } = useAppSelector((state) => state.auth);
  const [reviewValue, setReviewValue] = useState<string>("");
  const { data: reviewsData, isLoading, isError } = useGetReviewsQuery(id);
  const { reviews } = reviewsData?.data || {};

  const [createReview, { isSuccess }] = useCreateReviewMutation();
  const formRef = useRef(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You must be logged in");
    } else {
      const option = {
        name: user!.name,
        review: reviewValue,
      };

      createReview({ id, data: option });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Reviews added successfully", { id: "reviews" });
      formRef.current.reset();
    }
  }, [isSuccess]);

  return (
    <div className="my-16 p-5">
      <div className="">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex justify-center"
        >
          <input
            onChange={(e) => setReviewValue(e.target.value)}
            type="text"
            required
            className="border w-full max-w-2xl h-10 px-2 focus:outline-none border-slate-400 focus:border-violet-600"
            placeholder="Would you like to write anything about this book ?"
          />
          <button type="submit" className="text-violet-600 mx-4">
            <IoSendSharp size={30} />
          </button>
        </form>
      </div>

      <div className="mx-auto max-w-3xl mt-10">
        <h2 className="font-semibold text-xl font-">Reviews</h2>
        {reviews?.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </div>
    </div>
  );
}
