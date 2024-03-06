import { Order } from "../../../models/order.model";
import { apiSlice } from "./apiSlice";

interface Orders {
  count: number;
  countAfterQuery: number;
  prev: string | null;
  next: string | null;
  results: Order[];
}

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query<Orders, { searchCourseId?: string; searchUserId?: string; page?: number; limit?: number }>({
      query: ({ searchCourseId = "", searchUserId = "", page = 1, limit = 9 }) => `/course/getAllCourses?searchCourseId=${searchCourseId}&searchUserId=${searchUserId}&page=${page}&limit=${limit}`,
      keepUnusedDataFor: 5
    }),
    getStripePublishableKey: builder.query<any, void>({
      query: () => "/order/payment/sendStripePublishableKey"
      //   keepUnusedDataFor: 5
    }),
    createPaymentIntent: builder.mutation<any, { amount: number }>({
      query: ({ amount }) => ({
        url: "/order/payment",
        method: "POST",
        body: { amount }
      })
    }),
    createOrder: builder.mutation<any, { courseId: string; payment_info: any }>({
      query: ({ courseId, payment_info }) => ({
        url: "/order/createOrder",
        method: "POST",
        body: { courseId, payment_info },
        credentials: "include"
      })
    })
  })
});

export const { useGetAllOrdersQuery, useGetStripePublishableKeyQuery, useCreatePaymentIntentMutation, useCreateOrderMutation } = ordersApiSlice;
