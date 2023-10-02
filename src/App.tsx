import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import useAuthCheck from "./hooks/useAuthCheck";
import { Outlet } from "react-router-dom";
import Loading from "./shared/Loading";
function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>
      <Loading />
    </div>
  ) : (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
