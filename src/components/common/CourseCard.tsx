import { Course } from "../../models/course.model";
import Ratings from "../utils/Ratings";
interface Props {
  course: Course;
}
const CourseCard = ({ course }: Props) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl border border-gray-800 h-full flex flex-col">
      <figure>
        <img src={course.thumbnail.url} alt="Shoes" className="w-full object-cover min-h-[220px] max-h-[220px]" />
      </figure>
      <div className="card-body">
        <h2 className="text-lg font-medium capitalize text-success">{course.name}</h2>
        <p>{course.description.slice(0, 100)}.....</p>
        <div className="flex items-center justify-between ">
          <Ratings rating={course.ratings} />
          <div>
            <p className="text-lg font-medium">{course.purchased} Students</p>
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <p className="text-lg font-medium">{course.price}$</p>
            <p className="text-lg font-medium line-through mx-2">{course.estimatePrice}$</p>
          </div>
          <div>
            <p className="text-lg font-medium">
              <i className="fa-solid fa-film me-1"></i> {course.courseData.length} Lectures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
