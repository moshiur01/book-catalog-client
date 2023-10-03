/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import Error from "../shared/Error";
import Loading from "../shared/Loading";

export default function HomeBook() {
  const queryString = "";
  const { data: allBooks, isLoading, isError } = useGetBooksQuery(queryString);
  const { data } = allBooks || {};

  const newData = data?.slice(0, 10);

  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (!isLoading && isError) {
    content = <Error message="Something went wrong" />;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = (
      <div className="text-center font-semibold text-lg poppins">
        Oops! No book found
      </div>
    );
  } else if (!isLoading && !isError && data?.length > 0) {
    content = (
      <div className="container mx-auto px-5 text-center">
        <h1 className="font-bold text-3xl my-8">Explore Our Latest Books</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
          {newData?.map((book) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
        <div className="my-10 text-center">
          <Link
            to="/books"
            className="bg-cyan-700	 text-white py-1.5 px-3 rounded-md"
          >
            All Books
          </Link>
        </div>
      </div>
    );
  }

  return content;
}
