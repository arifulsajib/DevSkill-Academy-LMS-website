import { Outlet, useNavigate, useParams } from "react-router";
import { useGetUserProfileQuery } from "../Redux/features/api/usersApiSlice";
import Loading from "../components/utils/Loading";
import CourseContentList from "../components/Course/CourseContentList";
import { useGetCourseContentQuery } from "../Redux/features/api/courseApiSlice";
import { useEffect, useState } from "react";

const CourseAccessPage = () => {
  // close videoList drawer after click
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const params = useParams();
  const courseId = params?.courseId;

  const { data: user, isFetching, isLoading, isSuccess } = useGetUserProfileQuery();
  const { data: courseData, isFetching: isFetchingCourse, isLoading: isLoadingCourse } = useGetCourseContentQuery({ id: courseId || "" });

  // go to the first video if no videoId
  const navigate = useNavigate();
  useEffect(() => {
    if (courseData?.courseContent && !params.videoId) {
      navigate(courseData?.courseContent[0]?._id);
    }
  }, [navigate, courseData, params]);

  if (isLoading || isFetching) {
    return <Loading />;
  } else if (isSuccess) {
    const isPurchased = user?.courses?.find((course: any) => course?._id === courseId);
    if (!isPurchased) {
      return (
        <section className="min-h-screen my-5 px-4 md:px-16">
          <h1 className="text-2xl font-semibold text-error">You can't access this course</h1>
        </section>
      );
    }
  }

  return (
    <section className="min-h-screen my-5 px-4 md:px-16">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-10 lg:col-span-8">
          <Outlet context={[courseData?.courseContent]} />
        </div>
        <div className="col-span-2 lg:col-span-4 shadow-lg shadow-black rounded overflow-hidden bg-base-300">
          {isFetchingCourse || isLoadingCourse ? (
            <Loading />
          ) : (
            <div className="drawer drawer-end lg:drawer-open  w-full">
              <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly />
              <div className="drawer-content flex flex-col items-center justify-center">
                {/* button for small screen */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden" onClick={() => setDrawerOpen(!isDrawerOpen)}>
                  <i className="fa-solid fa-bars-staggered fa-xl"></i>
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" onClick={() => setDrawerOpen(!isDrawerOpen)}></label>
                <ul className="menu p-4 w-80 lg:w-96 min-h-full bg-base-300 text-base-content">
                  <CourseContentList courseData={courseData?.courseContent || []} setDrawerOpen={setDrawerOpen} isDrawerOpen={isDrawerOpen} />
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseAccessPage;
