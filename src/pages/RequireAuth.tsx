import { useAppDispatch, useAppSelector } from "../Redux/hooks/hook";
import { selectCurrentToken } from "../Redux/features/auth/authSlice";
import { useGetUserProfileQuery } from "../Redux/features/api/usersApiSlice";
import { Navigate, Outlet, useLocation } from "react-router";
import { toggleLoginModal } from "../Redux/features/toggle/modalSlice";
import Loading from "../components/utils/Loading";

interface Props {
  roles: [string, string];
}
const RequireAuth = ({ roles }: Props) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectCurrentToken);
  const { data: user, isLoading, isSuccess } = useGetUserProfileQuery();
  const userRole = user?.role || "";
  const location = useLocation();

  if (token && !isSuccess) {
    return <Loading />;
  } else if (isLoading) {
    return <Loading />;
  }

  if (!token && !roles.includes(userRole)) {
    dispatch(toggleLoginModal());
  }

  return token && roles.includes(userRole) ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};

export default RequireAuth;
