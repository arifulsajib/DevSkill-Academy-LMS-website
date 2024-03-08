import { useOutletContext, useParams } from "react-router";
import { CourseLecture } from "../../models/course.model";
import VideoPlayer from "../utils/VideoPlayer";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import QuestionAnswer from "./QuestionAnswer";
import { useAddQuestionMutation, useAddReviewMutation, useGetCourseQuery } from "../../Redux/features/api/courseApiSlice";
import Loading from "../utils/Loading";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const VideoContent = () => {
  const [questionInput, setQuestionInput] = useState("");
  const [video, setVideo] = useState<any>({});

  const [rating, setRating] = useState(5);
  const [reviewInput, setReviewInput] = useState("");

  const { videoId, courseId } = useParams();
  const { data: course, isFetching: isFetchingCourse, isLoading: isLoadingCourse } = useGetCourseQuery({ id: courseId || "" });
  const [addQuestion, { isLoading: isLoadingQuestion }] = useAddQuestionMutation();
  const [addReview, { isLoading: isLoadingReview }] = useAddReviewMutation();

  const [courseData, isLoadingCourseData]: [CourseLecture[], boolean] = useOutletContext();
  // let video: any = {};
  useEffect(() => {
    if (courseData) {
      setVideo(courseData.find((video: CourseLecture) => video._id === videoId));
    }
  }, [courseData, videoId]);

  // question add
  const handleQuestionSubmit = async (e: any) => {
    e.preventDefault();
    if (questionInput.trim() !== "") {
      const newQuestion = {
        question: questionInput.trim(),
        courseId: courseId,
        contentId: videoId
      };
      try {
        await addQuestion(newQuestion);
        setQuestionInput("");
        toast("Question Added Successfully");
      } catch (error: any) {
        toast("Question Add Failed");
      }
    }
  };
  // review add
  const handleReviewSubmit = async (e: any) => {
    e.preventDefault();
    if (reviewInput.trim() !== "") {
      const newReview = {
        rating: rating,
        review: reviewInput.trim(),
        courseId: courseId
      };
      try {
        const result = await addReview(newReview);
        if ("error" in result) {
          toast("Error, already reviewed or invalid", { type: "error" });
        } else {
          setReviewInput("");
          toast("Review Added Successfully");
        }
      } catch (error: any) {
        toast("Review Add Failed, refresh and try again", { type: "error" });
      }
    }
  };

  if (isFetchingCourse || isLoadingCourse) {
    return <Loading />;
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold text-success mb-3">{course?.course.name}</h1>
      <VideoPlayer url={video?.videoUrl || ""} />
      <h1 className="lg:text-2xl font-semibold lg:my-4">{video?.title}</h1>

      <Tabs focusTabOnClick={false} defaultIndex={0} className="w-100 overflow-hidden">
        <TabList className="flex justify-between lg:text-xl break">
          <Tab className="lg:px-5 py-2">Overview</Tab>
          <Tab className="lg:px-5 py-2">Resources</Tab>
          <Tab className="lg:px-5 py-2">Q&A</Tab>
          <Tab className="lg:px-5 py-2">Reviews</Tab>
        </TabList>

        <div className="border mb-4"></div>

        <TabPanel>
          <p className="text-lg mb-4">{video?.description}</p>
          <p className="text-lg">Follow DevSkill Academy on social media for all updates: </p>
          <p className="text-lg mt-2">Instagram:</p>
          <a href="https://www.instagram.com/arifulsajib347/" target="_blank" className="text-lg inline-block break-all">
            https://www.instagram.com/arifulsajib347/
          </a>
          <p className="text-lg mt-2">LinkedIn:</p>
          <a href="https://www.linkedin.com/in/arifulsajib/" target="_blank" className="text-lg inline-block break-all">
            https://www.linkedin.com/in/arifulsajib/
          </a>
        </TabPanel>

        <TabPanel>
          {video &&
            video.links?.map((link: any, index: number) => (
              <div key={index} className="flex">
                <p className="text-lg">{link.title} : </p>
                <a href={link.url} target="_blank" className="text-lg ms-2 text-info inline-block break-all">
                  {link.url}
                </a>
              </div>
            ))}
        </TabPanel>

        <TabPanel>
          {/* ask question */}
          <form className="px-4 pb-2" onSubmit={handleQuestionSubmit}>
            <textarea className="textarea textarea-bordered w-full" placeholder="Write your question" value={questionInput} onChange={(e) => setQuestionInput(e.target.value)} onBlur={(e) => setQuestionInput(e.target.value)} required></textarea>
            <button type="submit" className="btn btn-sm btn-success block ms-auto" disabled={isLoadingQuestion}>
              {isLoadingQuestion ? "Adding....." : "Add Question"}
            </button>
          </form>
          <div className="divider mb-2"></div>
          {isLoadingCourseData ? (
            <Loading />
          ) : (
            video?.questions &&
            [...video.questions]?.reverse()?.map((question: any, index: number) => (
              <div key={index}>
                <QuestionAnswer question={question} />
              </div>
            ))
          )}
        </TabPanel>

        <TabPanel>
          {/* add review */}
          <h1 className="text-xl font-semibold mb-2 px-4">Add Review</h1>
          <div className="rating gap-1 px-4">
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" onClick={() => setRating(1)} checked={rating == 1} readOnly />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" onClick={() => setRating(2)} checked={rating == 2} readOnly />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" onClick={() => setRating(3)} checked={rating == 3} readOnly />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" onClick={() => setRating(4)} checked={rating == 4} readOnly />
            <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-500" onClick={() => setRating(5)} checked={rating == 5} readOnly />
          </div>
          <form className="px-4 pb-2" onSubmit={handleReviewSubmit}>
            <textarea className="textarea textarea-bordered w-full" placeholder="Write your review" value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} onBlur={(e) => setReviewInput(e.target.value)} required></textarea>
            <button type="submit" className="btn btn-sm btn-success block ms-auto" disabled={isLoadingReview}>
              {isLoadingReview ? "Adding....." : "Add Review"}
            </button>
          </form>
          <div className="divider pb-2"></div>
          {course?.course?.reviews &&
            [...course.course.reviews].reverse().map((review, idx) => (
              <div key={idx}>
                <ReviewCard review={review} />
              </div>
            ))}
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default VideoContent;
