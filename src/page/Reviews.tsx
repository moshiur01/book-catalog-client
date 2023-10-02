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
import { BsChatRightText } from "react-icons/bs";
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
    <div className="my-16 py-2">
      <div className="mx-72 max-w-3xl mt-10">
        <h2 className="font-semibold text-xl font-">Reviews</h2>
        <div className="mr-[222px] my-4">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex justify-center"
          >
            <input
              onChange={(e) => setReviewValue(e.target.value)}
              type="text"
              required
              className="border  w-full max-w-2xl h-10 px-2 focus:outline-none border-slate-400 focus:border-sky-700 rounded-lg"
              placeholder="write anything about this book"
            />
            <button type="submit" className="text-sky-800 mx-4">
              <BsChatRightText size={28} />
            </button>
          </form>
        </div>
        {reviews?.map((review, index) => (
          <ReviewCard review={review} key={index} />
        ))}
      </div>
    </div>
  );
}
