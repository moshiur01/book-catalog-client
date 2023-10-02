/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react";
import { useAppSelector } from "../redux/hooks";
import BookCard from "../components/BookCard";
import { useGetWishlistQuery } from "../redux/features/wishlist/wishlistApi";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

export default function WishList() {
  const { user } = useAppSelector((state) => state.auth);

  const {
    data: wishlists,
    isLoading,
    isError,
  } = useGetWishlistQuery(user.email);


  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
  } else if (!isLoading && !isError && wishlists?.data?.length === 0) {
    content = (
      <div className="text-center font-semibold text-lg poppins">
        Oops! wishlist are empty
      </div>
    );
  } else if (!isLoading && !isError && wishlists?.data?.length > 0) {
    content = (
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlists?.data?.map((book) => (
            <BookCard book={book.book} key={book._id} />
          ))}
        </div>
      </div>
    );
  }

  return content;
}
