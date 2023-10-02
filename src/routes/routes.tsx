import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/Login";
import NotFound from "../page/NotFound";
import Signup from "../page/Signup";
import Home from "../page/Home";
import Books from "../page/Books";
import AddBook from "../page/AddBook";
import HomeBook from "../page/HomeBook";
import PrivateRoute from "../utils/PrivateRoute";
import PublicRoute from "../utils/PublicRoute";
import BookDetails from "../page/BookDetails";
import EditBook from "../page/EditBook";
import WishList from "../page/WishList";
import CurrentlyReading from "../page/CurrentlyReading";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <HomeBook />,
          },
          {
            path: "/books",
            element: <Books />,
          },
          {
            path: "/books/:id",
            element: <BookDetails />,
          },
          {
            path: "/edit-book/:id",
            element: <EditBook />,
          },
          {
            path: "/add-new-book",
            element: (
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            ),
          },
          {
            path: "/wishlist",
            element: (
              <PrivateRoute>
                <WishList />
              </PrivateRoute>
            ),
          },
          {
            path: "/currently-reading",
            element: (
              <PrivateRoute>
                <CurrentlyReading />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default routes;
