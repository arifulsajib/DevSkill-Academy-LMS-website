import { Course } from "../../../models/course.model";
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

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<Courses, { searchName?: string; page?: number; limit?: number }>({
      query: ({ searchName = "", page = 1, limit = 9 }) => `/course/getAllCourses?searchName=${searchName}&page=${page}&limit=${limit}`,
      keepUnusedDataFor: 5
    }),
    getCourse: builder.query<CourseResponse, { id: string }>({
      query: (id) => `/course/getCourse/${id}`,
      keepUnusedDataFor: 5
    })
  })
});

export const { useGetAllCoursesQuery, useGetCourseQuery } = coursesApiSlice;
