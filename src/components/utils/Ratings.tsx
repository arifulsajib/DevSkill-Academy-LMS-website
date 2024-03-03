import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
interface Props {
  rating: number;
}
const Ratings = ({ rating }: Props) => {
  const stars = Array.from({ length: 5 }, (_, idx) => {
    return (
      <li key={idx} className="me-2">
        {rating >= idx + 1 ? <BsStarFill /> : rating >= idx + 0.5 ? <BsStarHalf /> : <BsStar />}
      </li>
    );
  });

  return <div className="flex items-start list-none text-yellow-500 text-lg">{stars}</div>;
};

export default Ratings;
