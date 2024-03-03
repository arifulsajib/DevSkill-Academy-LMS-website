import Header from "./components/common/Header";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Coursepage from "./pages/Coursepage";
import Breadcrumb from "./components/utils/Breadcrumb";
import NotFoundpage from "./pages/NotFoundpage";
import Footer from "./components/common/Footer";
import FullPageLoading from "./components/utils/FullPageLoading";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./Redux/hooks/hook";
import { useGetUserProfileQuery } from "./Redux/features/api/usersApiSlice";
import { setUser } from "./Redux/features/auth/usersSlice";
import Profilepage from "./pages/Profilepage";
import RequireAuth from "./pages/RequireAuth";
import ResetPassPage from "./pages/ResetPassPage";
import ProfileInfo from "./components/profilepage/ProfileInfo";
import ChangePassword from "./components/profilepage/ChangePassword";
import EnrolledCourses from "./components/profilepage/EnrolledCourses";
import OrderHistory from "./components/profilepage/OrderHistory";

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
          <Route path="/resetpass/:userId/:resetString" element={<ResetPassPage />} />

          <Route element={<RequireAuth roles={["user", "admin"]} />}>
            <Route path="/profile" element={<Profilepage />}>
              <Route index element={<Navigate to="info" replace />} />
              <Route path="info" element={<ProfileInfo />} />
              <Route path="change-pass" element={<ChangePassword />} />
              <Route path="courses" element={<EnrolledCourses />} />
              <Route path="order-history" element={<OrderHistory />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundpage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
