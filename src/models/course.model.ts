import { User } from "./user.model";

interface Thumbnail {
  public_id: string;
  url: string;
}
interface Benifit {
  _id: string;
  title: string;
}
interface Prerequisite {
  _id: string;
  title: string;
}

interface ReviewReply {
  user: User;
  comment: string;
}

interface Review {
  _id: string;
  user: User;
  review: string;
  commentReplies: ReviewReply[];
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

interface Link {
  title: string;
  url: string;
}

interface QuestionReply {
  user: User;
  answer: string;
}

interface Question {
  user: User;
  question: string;
  questionReplies: QuestionReply[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseLecture {
  _id: string;
  title: string;
  videoSection: string;
  description: string;
  videoLength: number;
  videoPlayer: string;
  suggestion: string;
  links: Link[];
  questions: Question[];
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  price: string;
  estimatePrice: string;
  thumbnail: Thumbnail;
  tags: string;
  level: string;
  demoUrl: string;
  benifits: Benifit[];
  prerequisites: Prerequisite[];
  reviews: Review[];
  courseData: CourseLecture[];
  ratings: number;
  purchased: number;
  createdAt: string;
  updatedAt: string;
}
