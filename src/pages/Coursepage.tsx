import { useState } from "react";
import SectionHeading from "../components/utils/SectionHeading";
import { useGetAllCoursesQuery } from "../Redux/features/api/courseApiSlice";
import Loading from "../components/utils/Loading";
import CourseCard from "../components/Course/CourseCard";
import Pagination from "../components/utils/Pagination";

const Coursepage = () => {
  const [page, setPage] = useState(1);
  // const [searchName, setSearchName] = useState("");

  const { data, isFetching, isLoading } = useGetAllCoursesQuery({ page });
  const courses = data?.results;

  return (
    <section className=" md:px-6 min-h-screen my-8 px-5 lg:px-28">
      <SectionHeading title="Level Up Your Coding Skills" description="Whether you want to excel in web development, mobile development or strengthen your fundamental software engineering skills, there is a course for you." />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">{isLoading || isFetching ? <Loading gridCol="col-span-3" /> : courses?.map((course) => <CourseCard key={course._id} course={course} />)}</div>

      <div className="flex justify-center mt-8">
        <Pagination pageHandler={setPage} nextPage={data?.next} prevPage={data?.prev} currentPage={page} />
      </div>
    </section>
  );
};

export default Coursepage;
