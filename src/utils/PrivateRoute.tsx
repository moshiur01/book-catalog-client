/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }: any) => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? children : <Navigate to="/login"></Navigate>
};

export default PrivateRoute
