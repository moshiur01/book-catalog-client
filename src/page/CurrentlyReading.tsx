/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import BookCard from "../components/BookCard";
import { useAppSelector } from "../redux/hooks";
import { useGetReadingListQuery } from "../redux/features/reading/readingApi";
import Loading from "../shared/Loading";
import Error from "../shared/Error";

export default function CurrentlyReading() {
  const { user } = useAppSelector((state) => state.auth);
  const {
    data: readings,
    isLoading,
    isError,
  } = useGetReadingListQuery(user && user.email);

  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
  } else if (!isLoading && !isError && readings?.data?.length === 0) {
    content = (
      <div className="text-center font-semibold text-lg poppins">
        Oops! reading list are empty
      </div>
    );
  } else if (!isLoading && !isError && readings?.data?.length > 0) {
    content = (
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {readings?.data?.map((book) => (
            <BookCard book={book.book} status={book.status} readingId={book._id} key={book._id} />
          ))}
        </div>
      </div>
    );
  }

  return content;
}
