import { Link } from "react-router-dom";
import bannerImg from "../../assets/banner.png";
import { useGetLayoutQuery } from "../../Redux/features/api/layoutApiSlice";
import Loading from "../utils/Loading";

const HomeBanner = () => {
  const { data, isFetching, isLoading } = useGetLayoutQuery({ type: "Banner" });

  return (
    <section className="my-5">
      <div className="grid grid-cols-6 gap-2">
        {/* left text */}
        <div className="col-span-6 lg:col-span-3 py-1 flex items-center">
          <div className="text-center md:text-start">
            <h1 className="w-100 text-2xl font-bold md:font-extrabold md:text-5xl mb-3">
              Become the <span className="text-success">software engineer</span> that companies <span className="text-pink-500">love to hire</span>
            </h1>
            <p className="my-6 md:mt-10 text-lg mx-1 md:text-xl">
              All the <span className="font-bold">coding courses</span> you need to excel in one place.
            </p>
            <Link to={"/courses"}>
              <button className="btn btn-success text-lg text-base-300 font-bold">Explore Courses</button>
            </Link>
          </div>
        </div>
        {/* right image */}
        <div className="col-span-6 lg:col-span-3 py-1">{isFetching || isLoading ? <Loading /> : <img src={data?.layout?.banner.image.url || bannerImg} alt="Banner Image" className="w-full object-cover" />}</div>
      </div>
    </section>
  );
};

export default HomeBanner;
