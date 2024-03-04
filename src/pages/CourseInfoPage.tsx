import { useParams } from "react-router";
import { useGetCourseQuery } from "../Redux/features/api/courseApiSlice";
import Ratings from "../components/utils/Ratings";
import Loading from "../components/utils/Loading";
import CourseContentList from "../components/common/CourseContentList";
import TimeAgo from "react-timeago";

const CourseInfoPage = () => {
  const params = useParams();
  const courseId = params?.courseId;

  const { data, isFetching, isLoading } = useGetCourseQuery({ id: courseId || "" });
  const course = data?.course;
  const tags = course?.tags.split(", ").join(" #");

  if (isLoading || isFetching) {
    return (
      <section className="min-h-screen my-5 px-4 md:px-16">
        <Loading />
      </section>
    );
  }

  return (
    <section className="min-h-screen my-5 px-4 md:px-16">
      <div className="flex flex-col-reverse lg:flex-row">
        {/* couseInfo Side*/}
        <div className="w-full lg:w-[75%]">
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
        <div className="w-full lg:w-[25%] relative mb-2">Demo video and features</div>
      </div>
    </section>
  );
};

export default CourseInfoPage;
