import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();

  //   make breadcrams
  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <li key={crumb}>
          <NavLink to={currentLink}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="me-1 w-4 h-4 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            {crumb}
          </NavLink>
        </li>
      );
    });

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/home" && (
        <section className="mt-16 px-4 md:px-6">
          <div className="text-md font-medium breadcrumbs">
            <ul>
              {/* default home breadcrumb */}
              <li>
                <NavLink to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="me-1 w-4 h-4 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                  </svg>
                  Home
                </NavLink>
              </li>
              {crumbs}
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default Breadcrumb;
