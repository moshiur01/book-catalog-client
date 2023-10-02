/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { handleDeleteBookModal } from "../redux/features/book/bookSlice";
import { toast } from "react-hot-toast";
import { useDeleteBookMutation } from "../redux/features/book/bookApi";
import { useNavigate } from "react-router-dom";

export default function DeleteBookModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { deleteBookModal, bookDeleteId } = useAppSelector(
    (state) => state.book
  );

  const [deleteBook, { isSuccess }] = useDeleteBookMutation();
  const dandleDelete = () => {
    deleteBook(bookDeleteId);
  };

  useEffect(() => {
    if (isSuccess) {
        navigate("/books")
      toast.success("Successfully deleted");
      dispatch(handleDeleteBookModal({ isOpen: false, _id: "" }));
    }
  }, [dispatch, isSuccess, navigate]);

  return (
    deleteBookModal && (
      <div className="fixed w-full h-full inset-0 z-50 bg-black/70 poppins">
        <div className="rounded w-full max-w-lg space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <div>
            <p className="text-red-500 font-semibold">
              Are you sure you want to delete this book ?
            </p>

            <p className="text-red-500 mt-3 text-sm">
              Once you delete it, you can,t bring it back.
            </p>

            <div className="mt-5 flex justify-end gap-5">
              <button
                onClick={dandleDelete}
                className="py-2 px-4 bg-red-500 text-white rounded-md font-medium"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  dispatch(handleDeleteBookModal({ isOpen: false, _id: "" }))
                }
                className="py-2 px-4 bg-slate-800 text-white rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
