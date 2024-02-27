import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: { ...credentials }
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: "POST"
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
