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
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "user/register",
        method: "POST",
        body: { ...credentials }
      })
    }),
    forgetPassword: builder.mutation({
      query: (credentials) => ({
        url: "user/requestResetPass",
        method: "POST",
        body: { ...credentials }
      })
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: "user/resetPassword",
        method: "POST",
        body: { ...credentials }
      })
    })
  })
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useForgetPasswordMutation, useResetPasswordMutation } = authApiSlice;
