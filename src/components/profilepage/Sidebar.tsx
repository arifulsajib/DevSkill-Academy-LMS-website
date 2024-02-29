import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks/hook";
import { selectCurrentUser } from "../../Redux/features/auth/usersSlice";

const Sidebar = () => {
  // close sidebar after click
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const handleClick = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const user = useAppSelector(selectCurrentUser);
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* only icon sidebar */}
          <ul className="menu px-0 py-4 lg:hidden overflow-hidden  ">
            <li className="p-6 m-0">
              <label htmlFor="sidebar-drawer" className="btn btn-sm btn-ghost" onClick={handleClick}>
                <i className="fa-solid fa-bars-staggered fa-xl"></i>
              </label>
            </li>
            <li>
              <NavLink to="info" className="flex items-center my-3 justify-center">
                <div className="w-10">
                  <img src={user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} className="rounded-full" />
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="change-pass" className="flex items-center justify-center my-3 p-6">
                <i className="fa-solid fa-xl fa-lock text-base-content"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="courses" className="flex items-center justify-center my-3 p-6">
                <i className="fa-solid  fa-copyright fa-xl  text-base-content"></i>
              </NavLink>
            </li>
            <li>
              <NavLink to="order-history" className="flex items-center justify-center my-3 p-6">
                <i className="fa-solid  fa-money-bill-transfer fa-xl  text-base-content"></i>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="drawer-side z-20 lg:z-0">
          <label htmlFor="sidebar-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={handleClick}></label>

          <ul className="menu p-4 w-60 lg:w-80 min-h-full  bg-base-300 text-base-content py-20 lg:py-5">
            {/* Sidebar content here */}
            <li onClick={handleClick}>
              <NavLink to="info" className="flex items-center my-3">
                <div className="w-10">
                  <img src={user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} className="rounded-full" />
                </div>
                <div className="text-[1.1rem] font-semibold ms-1">My Account</div>
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink to="change-pass" className="flex items-center my-3">
                <i className="fa-solid fa-xl fa-lock text-base-content"></i>
                <div className="text-[1.1rem] font-semibold ms-1">Change Password</div>
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink to="courses" className="flex items-center my-3">
                <i className="fa-solid  fa-copyright fa-xl  text-base-content"></i>
                <div className="text-[1.1rem] font-semibold ms-1">Enrolled Courses</div>
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink to="order-history" className="flex items-center my-3">
                <i className="fa-solid  fa-money-bill-transfer fa-xl  text-base-content"></i>
                <div className="text-[1.1rem] font-semibold ms-1">Order History</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
