/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import Loading from "../shared/Loading";
import Error from "../shared/Error";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEditOutline,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import useAuth from "../hooks/useAuth";
import DeleteBookModal from "../components/DeleteBookModal";
import { handleDeleteBookModal } from "../redux/features/book/bookSlice";
import Reviews from "./Reviews";
const defaultImage =
  "https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";

const defaultSummary =
  "Interest predates coined money, which dates back to the eighth century BC. Some historians suggest that interest originated with loans for seeds and animals. The seeds produced a yield and could be returned with interest at harvest time. Some or all of an animal’s offspring could go back with the animal. Such loans may have given rise to the current concept of interest.";

export default function BookDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isLoggedIn = useAuth();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetSingleBookQuery(id);
  const { _id, title, author, genre, publication, creator, image, summary } =
    book?.data || {};

  let content = null;

  if (isLoading) {
    content = <Loading />;
  }
  if (!isLoading && isError) {
    content = <Error message={"There was and error"} />;
  }
  if (!isLoading && !isError && _id) {
    content = (
      <div>
        <div className="flex justify-center lg:gap-10">
          <div className="w-1/2 hidden lg:flex justify-end">
            <img
              className="max-w-sm"
              src={image ? image : defaultImage}
              alt=""
            />
          </div>
          <div className="w-1/2">
            <h2 className="text-2xl max-w-md text-slate-700 font-medium mt-5">
              {title}
            </h2>
            <p className="mt-2">
              by{" "}
              <span className="text-violet-600 cursor-pointer">{author}</span>
            </p>
            <p className="mt-5">
              <span className="">Genre:</span>{" "}
              <span className="text-violet-600 capitalize cursor-pointer">
                {genre}
              </span>
            </p>
            <p className="mt-1">
              <span className="">Publication Year:</span>{" "}
              <span className="font-medium">{publication}</span>
            </p>

            <p className="mt-5">
              <span className="font-medium">Summary: </span>{" "}
              {summary ? summary : defaultSummary}
            </p>
          </div>
        </div>
        <Reviews id={id} />
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <div className="text-right py-5">
        {user && user.email === creator && (
          <>
            <button
              onClick={() => navigate(`/edit-book/${_id}`)}
              className="bg-blue-100 p-1.5 hover:text-white hover:bg-blue-500 rounded-md transition-all duration-150 mx-2"
            >
              <MdOutlineModeEditOutline size={22} />
            </button>
            <button
              onClick={() =>
                dispatch(handleDeleteBookModal({ isOpen: true, _id: _id }))
              }
              className="bg-red-100 p-1.5 hover:text-white hover:bg-red-500 rounded-md transition-all duration-150 mx-2"
            >
              <MdOutlineDeleteOutline size={22} />
            </button>{" "}
          </>
        )}
      </div>

      <div>{content}</div>

      <DeleteBookModal />
    </div>
  );
}
