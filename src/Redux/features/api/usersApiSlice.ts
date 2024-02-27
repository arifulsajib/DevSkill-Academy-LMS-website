import { User } from "../../../models/user.model";
import { apiSlice } from "./apiSlice";

interface Users {
  count: number;
  countAfterQuery: number;
  prev: string | null;
  next: string | null;
  results: User[];
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<User, void>({
      query: () => "/user/profile"
      //   keepUnusedDataFor: 5
    }),
    getAllUsers: builder.query<Users, void>({
      query: () => "/user/allUsers"
      //   keepUnusedDataFor: 5
    })
  })
});

export const { useGetUserProfileQuery, useGetAllUsersQuery } = usersApiSlice;
