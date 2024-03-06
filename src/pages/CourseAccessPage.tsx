import { useParams } from "react-router";
import { useGetUserProfileQuery } from "../Redux/features/api/usersApiSlice";
import Loading from "../components/utils/Loading";

const CourseAccessPage = () => {
  const params = useParams();
  const courseId = params?.courseId;

  const { data: user, isFetching, isLoading } = useGetUserProfileQuery();
  if (isLoading || isFetching) {
    return <Loading />;
  }

  const isPurchased = user?.courses?.find((course: any) => course?._id === courseId);
  if (!isPurchased) {
    return (
      <section className="min-h-screen my-5 px-4 md:px-16">
        <h1 className="text-2xl font-semibold text-error">You can't access this course</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen my-5 px-4 md:px-16">
      <h1 className="text-2xl font-semibold text-success">Course Access Page</h1>
    </section>
  );
};

export default CourseAccessPage;
