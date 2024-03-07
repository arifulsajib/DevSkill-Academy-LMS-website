import { useOutletContext, useParams } from "react-router";
import { CourseLecture } from "../../models/course.model";
import VideoPlayer from "../utils/VideoPlayer";

const VideoContent = () => {
  const { videoId } = useParams();
  const [courseData]: [CourseLecture[]] = useOutletContext();
  let video: any = {};
  if (courseData) {
    video = courseData.find((video: any) => video._id === videoId);
  }
  return (
    <section>
      <VideoPlayer url={video?.videoUrl || ""} />
      <h1 className="text-2xl font-semibold mt-4">{video?.title}</h1>
      <p className="text-lg font-semibold mt-4">{video?.description}</p>
    </section>
  );
};

export default VideoContent;
