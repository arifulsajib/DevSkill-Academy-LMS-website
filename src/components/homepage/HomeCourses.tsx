import { Link } from "react-router-dom";
import { useGetAllCoursesQuery } from "../../Redux/features/api/courseApiSlice";
import CourseCard from "../common/CourseCard";
import Loading from "../utils/Loading";
import SectionHeading from "../utils/SectionHeading";

const HomeCourses = () => {
  const { data, isLoading, isFetching } = useGetAllCoursesQuery({ limit: 6 });
  const courses = data?.results;

  return (
    <section className="my-8 px-5 lg:px-28">
      <SectionHeading
        sectionTitle="TOP-SELLING COURSES"
        title="Level Up Your Coding Skills"
        description="Whether you're looking to switch to a career in tech or to advance in your current role, my courses give you the knowledge and experience you need to succeed."
      />

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">{isLoading || isFetching ? <Loading gridCol="col-span-3" /> : courses?.map((course) => <CourseCard key={course._id} course={course} />)}</div>

      <div className="text-center mt-8">
        <Link to="/courses">
          <button className="btn btn-success">View All Courses</button>
        </Link>
      </div>
    </section>
  );
};

export default HomeCourses;
