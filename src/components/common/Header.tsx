import { Link } from "react-router-dom";
import logo from "../../assets/logo-resized-removebg.png";
import logo2 from "../../assets/logo2-resized-removebg.png";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks/hook";
import { selectIsDark, toggleTheme } from "../../Redux/features/theme/themeSlice";

const Header = () => {
  // toggle theme
  const isdark = useAppSelector(selectIsDark);
  const dispatch = useAppDispatch();

  // styles
  const navLinkStyles = "text-lg font-semibold hover:font-bold mx-1";

  // navbar mobile dropdown not close fix
  const handleClick = () => {
    const elem: any = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  return (
    <header>
      <div className="navbar bg-base-200 bg-opacity-50 backdrop-blur-md shadow-lg fixed top-0 py-0">
        <div className="navbar-start">
          {/* Responsive Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52" onClick={handleClick}>
              <li>
                <NavLink to="/courses" className={navLinkStyles}>
                  Courses
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkStyles}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/sponsorships" className={navLinkStyles}>
                  Sporsorships
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={navLinkStyles}>
                  FAQ
                </NavLink>
              </li>
            </ul>
          </div>
          {/* logo */}
          <Link to="/">
            <img src={isdark ? logo : logo2} alt="DevSkill" width={130} height={130} />
          </Link>
        </div>

        {/* centered Navigation links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/courses" className={navLinkStyles}>
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkStyles}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/sponsorships" className={navLinkStyles}>
                Sporsorships
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={navLinkStyles}>
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>

        {/* right side items */}
        <div className="navbar-end me-3">
          {/* change theme */}
          <label className="swap swap-rotate me-6">
            <input
              type="checkbox"
              className="theme-controller"
              value={isdark ? "night" : "synthwave"}
              checked={isdark}
              onChange={() => {
                dispatch(toggleTheme());
              }}
            />
            <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          {/* Conditional profile or login */}
          <div className="dropdown dropdown-end">
            {/* image */}
            <div tabIndex={0} role="button" className="avatar">
              <div className="w-8 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
                <img src="https://res.cloudinary.com/dyms8bozd/image/upload/v1707772570/avatars/boy1pvazwhbsrysrweoa.jpg" />
              </div>
            </div>
            {/* menu */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40" onClick={handleClick}>
              <li>
                <NavLink to="/profile" className={navLinkStyles}>
                  profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/logout" className={navLinkStyles}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
