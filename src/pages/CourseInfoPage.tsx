import { useParams } from "react-router";
import { useGetCourseQuery } from "../Redux/features/api/courseApiSlice";
import Ratings from "../components/utils/Ratings";
import Loading from "../components/utils/Loading";
import CourseContentList from "../components/common/CourseContentList";
import TimeAgo from "react-timeago";
import VideoPlayer from "../components/utils/VideoPlayer";
import { useAppSelector } from "../Redux/hooks/hook";
import { selectCurrentUser } from "../Redux/features/auth/usersSlice";
import { Link } from "react-router-dom";

const CourseInfoPage = () => {
  const params = useParams();
  const courseId = params?.courseId;
  const user = useAppSelector(selectCurrentUser);

  const { data, isFetching, isLoading } = useGetCourseQuery({ id: courseId || "" });
  const course = data?.course;
  const tags = course?.tags.split(", ").join(" #");

  const isPurchased = user?.courses?.find((course: any) => course?._id === courseId);

  // handle order
  const handleOrder = () => {
    console.log("handle order");
  };

  if (isLoading || isFetching) {
    return (
      <section className="min-h-screen my-5 px-4 md:px-16">
        <Loading />
      </section>
    );
  }

  const discountPercentage = Math.round((((course?.estimatePrice || 0) - (course?.price || 0)) / (course?.estimatePrice || 0)) * 100);

  return (
    <section className="min-h-screen my-5 px-4 md:px-16">
      <div className="flex flex-col-reverse lg:flex-row">
        {/* couseInfo Side*/}
        <div className="w-full lg:w-[65%] lg:pe-3">
          <h1 className="text-2xl font-bold text-success">{course?.name}</h1>
          <p className="text-lg lg:w-9/12 my-3">{course?.description}</p>
          <div className="flex justify-between items-center pe-8">
            <div className="flex items-center">
              <Ratings rating={course?.ratings || 0} />
              <div className="text-lg ">{course?.reviews.length} Ratings</div>
            </div>
            <div className="text-lg font-bold">{course?.purchased} Students</div>
          </div>
          {/* benifits */}
          <h1 className="text-2xl font-bold my-4 mt-8">What you will learn from this course?</h1>
          {course?.benifits?.map((benifit) => (
            <div key={benifit._id} className="flex items-center my-3">
              <i className="fa-solid fa-circle-check"></i>
              <p className="text-lg ms-3">{benifit.title}</p>
            </div>
          ))}

          {/* Pre-requisites */}
          <h1 className="text-2xl font-bold my-4 mt-8">What are the prerequisites for starting this course?</h1>
          {course?.prerequisites?.map((prerequisite) => (
            <div key={prerequisite._id} className="flex items-center my-4">
              <i className="fa-solid fa-circle-check"></i>
              <p className="text-lg ms-3">{prerequisite.title}</p>
            </div>
          ))}

          {/* Course Content List */}
          <h1 className="text-2xl font-bold my-4 mt-8">Course Overview</h1>
          <CourseContentList courseData={course?.courseData || []} isDemo />

          {/* Course Details */}
          <h1 className="text-2xl font-bold my-4 mt-8">Course Details</h1>
          <p className="text-lg my-3">{course?.description}</p>
          <p className="text-lg">Follow DevSkill Academy on social media for all updates: </p>
          <p className="text-lg">Instagram:</p>
          <a href="https://www.instagram.com/arifulsajib347/" target="_blank" className="text-lg">
            https://www.instagram.com/arifulsajib347/
          </a>
          <p>LinkedIn:</p>
          <a href="https://www.linkedin.com/in/arifulsajib/" target="_blank" className="text-lg">
            https://www.linkedin.com/in/arifulsajib/
          </a>
          <p className="text-lg my-3">#{tags}</p>

          {/* Reviews section*/}
          <div className="flex items-center my-6">
            <Ratings rating={course?.ratings || 0} />
            <p className="text-xl ms-2">{course?.ratings} Course Rating</p>
            <p className="text-xl ms-5">From {course?.reviews.length} Reviews</p>
          </div>
          {course?.reviews &&
            [...course.reviews].reverse().map((review) => (
              //Review
              <div key={review._id} className="pb-4">
                <div className="flex items-center">
                  <img src={review.user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} alt="" className="w-10 h-10 rounded-full" />
                  <div className="ms-3">
                    <div className="flex items-center">
                      <p className="text-lg font-bold me-2">{review.user?.name.split(" ")[0]}</p>
                      <Ratings rating={review.rating} />
                    </div>
                    <p>{review.review}</p>
                    <p className="text-xs">
                      <TimeAgo date={review.createdAt} minPeriod={60} />
                    </p>
                  </div>
                </div>
                {
                  //review replies
                  review.commentReplies &&
                    [...review.commentReplies].reverse().map((commentReply, idx) => (
                      <div className="flex items-center ms-10 mt-3" key={idx}>
                        <img src={commentReply.user?.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} alt="" className="w-10 h-10 rounded-full" />
                        <div className="ms-3">
                          <div className="flex items-center">
                            <p className="text-lg font-bold me-2">{commentReply.user?.name.split(" ")[0]}</p>
                            <i className="fa-solid fa-circle-check text-blue-700"></i>
                          </div>
                          <p>{commentReply.comment}</p>
                        </div>
                      </div>
                    ))
                }
              </div>
            ))}
        </div>

        {/* Demo Video and Fetures Side */}
        <div className="w-full lg:w-[35%] relative mb-2">
          <div className="sticky top-[100px] left-0 w-full">
            <VideoPlayer url={course?.demoUrl || ""} isDemo />

            <div className="pt-5 flex items-center">
              <h1 className="text-2xl font-bold">{course?.price === 0 ? "Free" : "$" + course?.price}</h1>
              <h1 className="text-2xl font-bold line-through ms-3">${course?.estimatePrice}</h1>
              <h1 className="text-2xl font-bold ms-6">{discountPercentage && discountPercentage}% OFF</h1>
            </div>

            <div className="mt-6">
              {isPurchased ? (
                <Link to={`/course-access/${course?._id}`} className="w-full">
                  <button className="btn btn-error text-lg rounded-full">Enter Course</button>
                </Link>
              ) : (
                <button className="btn btn-error text-lg font-semibold rounded-full" onClick={handleOrder}>
                  Buy Now - {course?.price}$
                </button>
              )}
            </div>
            <div className="mt-6">
              <p className="text-lg my-2">• Source code included</p>
              <p className="text-lg my-2">• Full lifetime access</p>
              <p className="text-lg my-2">• Certificate of completion</p>
              <p className="text-lg my-2">• Premium Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseInfoPage;
