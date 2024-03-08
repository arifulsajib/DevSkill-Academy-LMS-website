import ReactTimeago from "react-timeago";
import { Review } from "../../models/course.model";
import Ratings from "../utils/Ratings";
import { useState } from "react";
import { useAddReviewReplyMutation } from "../../Redux/features/api/courseApiSlice";
import { toast } from "react-toastify";
import { useAppSelector } from "../../Redux/hooks/hook";
import { selectCurrentUser } from "../../Redux/features/auth/usersSlice";
import { useParams } from "react-router";

interface Props {
  review: Review;
  isInfoPage?: boolean;
}
const ReviewCard = ({ review, isInfoPage }: Props) => {
  const [replyInput, setReplyInput] = useState("");
  const { courseId } = useParams();

  const [addReviewReply, { isLoading: isLoadingReply }] = useAddReviewReplyMutation();
  const user = useAppSelector(selectCurrentUser);
  const isAdmin = user?.role === "admin";

  const handleReviewReply = async (reviewId: string) => {
    // e.preventDefault();
    if (replyInput.trim() !== "") {
      const newReply = {
        comment: replyInput.trim(),
        reviewId: reviewId,
        courseId: courseId
      };
      try {
        const result = await addReviewReply(newReply);
        if ("error" in result) {
          toast("Invalid, Please try again", { type: "error" });
        } else {
          setReplyInput("");
          toast("Reply Added Successfully");
        }
      } catch (error: any) {
        toast("Reply Add Failed, refresh and try again", { type: "error" });
      }
    }
  };

  return (
    <>
      {/* Review */}
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
              <ReactTimeago date={review.createdAt} minPeriod={60} />
            </p>
          </div>
        </div>
        {/* add review reply*/}
        {isAdmin && !isInfoPage && (
          <form
            className="px-4 pb-4 mx-8 mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              handleReviewReply(review._id);
            }}
          >
            <textarea className="textarea textarea-bordered w-full" rows={1} placeholder="Write your answer" value={replyInput} onChange={(e) => setReplyInput(e.target.value)} onBlur={(e) => setReplyInput(e.target.value)} required></textarea>
            <button type="submit" className="btn btn-xs btn-success block ms-auto" disabled={isLoadingReply}>
              {isLoadingReply ? "Adding....." : "Add Reply"}
            </button>
          </form>
        )}
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
    </>
  );
};

export default ReviewCard;
