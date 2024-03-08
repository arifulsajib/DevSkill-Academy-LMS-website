import { Course, CourseLecture } from "../../../models/course.model";
import { apiSlice } from "./apiSlice";

interface Courses {
  count: number;
  countAfterQuery: number;
  prev: string | null;
  next: string | null;
  results: Course[];
}

interface CourseResponse {
  message: string;
  course: Course;
}

interface CourseContent {
  message: string;
  courseContent: CourseLecture[];
}

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<Courses, { searchName?: string; page?: number; limit?: number }>({
      query: ({ searchName = "", page = 1, limit = 9 }) => `/course/getAllCourses?searchName=${searchName}&page=${page}&limit=${limit}`,
      keepUnusedDataFor: 5
    }),
    getCourse: builder.query<CourseResponse, { id: string }>({
      query: ({ id }) => `/course/getCourse/${id}`,
      keepUnusedDataFor: 5,
      providesTags: ["Course"]
    }),
    getCourseContent: builder.query<CourseContent, { id: string }>({
      query: ({ id }) => `/course/getCourseContent/${id}`,
      providesTags: ["CourseContent"]
      // keepUnusedDataFor: 5
    }),
    addQuestion: builder.mutation({
      query: (body) => ({
        url: `/course/addQuestion`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["CourseContent"]
    }),
    addAnswer: builder.mutation({
      query: (body) => ({
        url: `/course/addReply`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["CourseContent"]
    }),
    addReview: builder.mutation({
      query: (body) => ({
        url: `/course/addReview/${body.courseId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Course"]
    }),
    addReviewReply: builder.mutation({
      query: (body) => ({
        url: `/course/addReplyToReview`,
        method: "PUT",
        body
      }),
      invalidatesTags: ["Course"]
    })
  })
});

export const { useGetAllCoursesQuery, useGetCourseQuery, useGetCourseContentQuery, useAddQuestionMutation, useAddAnswerMutation, useAddReviewMutation, useAddReviewReplyMutation } = coursesApiSlice;
