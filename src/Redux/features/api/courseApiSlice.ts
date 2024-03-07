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
      keepUnusedDataFor: 5
    }),
    getCourseContent: builder.query<CourseContent, { id: string }>({
      query: ({ id }) => `/course/getCourseContent/${id}`
      // keepUnusedDataFor: 5
    })
  })
});

export const { useGetAllCoursesQuery, useGetCourseQuery, useGetCourseContentQuery } = coursesApiSlice;
