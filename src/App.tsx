import Header from "./components/common/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coursepage from "./pages/Coursepage";
import Breadcrumb from "./components/common/Breadcrumb";
import NotFoundpage from "./pages/NotFoundpage";
import Footer from "./components/common/Footer";
import FullPageLoading from "./pages/FullPageLoading";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./Redux/hooks/hook";
import { useGetUserProfileQuery } from "./Redux/features/api/usersApiSlice";
import { setUser } from "./Redux/features/auth/usersSlice";
import Profilepage from "./pages/Profilepage";
import RequireAuth from "./pages/RequireAuth";

function App() {
  // get current user profile
  const dispatch = useAppDispatch();
  const { data: userProfile, isSuccess } = useGetUserProfileQuery();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(userProfile));
    }
  }, [dispatch, userProfile, isSuccess]);

  // Full page loading
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1700);
  }, []);
  if (loading) {
    return <FullPageLoading />;
  }

  return (
    <>
      <ToastContainer />
      <Router>
        <Header />
        <Breadcrumb />
        <Routes>
          <Route index path="/" element={<Homepage />} />
          <Route path="/courses" element={<Coursepage />} />
          <Route element={<RequireAuth roles={["user"]} />}>
            <Route path="/profile" element={<Profilepage />} />
          </Route>
          <Route path="*" element={<NotFoundpage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
