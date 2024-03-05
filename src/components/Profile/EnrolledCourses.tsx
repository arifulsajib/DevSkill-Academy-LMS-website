import { useGetAllCoursesQuery } from "../../Redux/features/api/courseApiSlice";
import { selectCurrentUser } from "../../Redux/features/auth/usersSlice";
import { useAppSelector } from "../../Redux/hooks/hook";
import CourseCard from "../common/CourseCard";
import Loading from "../utils/Loading";

const EnrolledCourses = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: courses, isFetching, isLoading } = useGetAllCoursesQuery({});
  const usersEnrolledCourses = courses?.results?.filter((course: any) => user?.courses?.find((userCourse: any) => userCourse?._id === course?._id));

  return (
    <section>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {isLoading || isFetching ? <Loading gridCol="col-span-3" /> : usersEnrolledCourses?.map((course: any) => <CourseCard key={course._id} course={course} />)}
      </div>
    </section>
  );
};

export default EnrolledCourses;
