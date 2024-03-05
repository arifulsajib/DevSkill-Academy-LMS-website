import { Outlet } from "react-router";
import Sidebar from "../components/Profile/Sidebar";

const Profilepage = () => {
  return (
    <section className="min-h-screen my-5 px-4 md:px-6">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-2 lg:col-span-3 shadow-lg shadow-black rounded overflow-hidden bg-base-300">
          <Sidebar />
        </div>
        <div className="col-span-10 lg:col-span-9">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Profilepage;
