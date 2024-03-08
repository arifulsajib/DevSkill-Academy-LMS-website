import ReactTimeago from "react-timeago";
import { Question } from "../../models/course.model";
import { useState } from "react";
import { useAddAnswerMutation } from "../../Redux/features/api/courseApiSlice";
import { useParams } from "react-router";
import { toast } from "react-toastify";

interface Props {
  question: Question;
}
const QuestionAnswer = ({ question }: Props) => {
  const [answerInput, setAnswerInput] = useState("");
  const { courseId, videoId } = useParams();

  const [addAnswer, { isLoading: isLoadingAnswer }] = useAddAnswerMutation();

  const handleAnswerSubmit = async (e: any) => {
    e.preventDefault();
    if (answerInput.trim() !== "") {
      const newAnswer = {
        answer: answerInput.trim(),
        courseId: courseId,
        contentId: videoId,
        questionId: question._id
      };
      try {
        await addAnswer(newAnswer);
        setAnswerInput("");
        toast("Answer Added Successfully");
      } catch (error: any) {
        toast("Answer Add Failed");
      }
    }
  };

  return (
    <>
      {/* question */}
      <div className="flex items-center">
        <img src={question.user.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} alt="" className="w-10 h-10 rounded-full" />
        <div className="ms-3">
          <div className="flex items-center">
            <p className="text-lg font-bold me-2">{question.user.name}</p>
          </div>
          <p>{question.question}</p>
          <p className="text-xs">
            <ReactTimeago date={question.createdAt} minPeriod={60} />
          </p>
        </div>
      </div>
      {/* reply */}
      <div className="ms-8 menu rounded-lg max-w-xs w-full">
        <details>
          <summary className="text-md mb-2">
            All Answers <i className="fa-solid fa-message fa-xs me-2"> </i>
            {question.questionReplies?.length}
          </summary>
          <form className="px-4 pb-4" onSubmit={handleAnswerSubmit}>
            <textarea className="textarea textarea-bordered w-full" rows={1} placeholder="Write your answer" value={answerInput} onChange={(e) => setAnswerInput(e.target.value)} onBlur={(e) => setAnswerInput(e.target.value)} required></textarea>
            <button type="submit" className="btn btn-xs btn-success block ms-auto" disabled={isLoadingAnswer}>
              {isLoadingAnswer ? "Adding....." : "Add Answer"}
            </button>
          </form>
          {[...question.questionReplies].reverse()?.map((reply: any, index: number) => (
            <div className="flex items-center bg-base-200 mb-2 p-2 rounded" key={index}>
              <img src={reply.user.avater?.url || import.meta.env.VITE_DEFAULT_AVATER} alt="" className="w-10 h-10 rounded-full" />
              <div className="ms-3">
                <div className="flex items-center">
                  <p className="text-lg font-bold me-2">{reply.user.name}</p>
                  {reply.user.role === "admin" && <i className="fa-solid fa-circle-check text-blue-700"></i>}
                </div>
                <p>{reply.answer}</p>
              </div>
            </div>
          ))}
        </details>
      </div>
    </>
  );
};

export default QuestionAnswer;
