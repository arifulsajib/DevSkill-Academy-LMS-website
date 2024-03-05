import { LayoutModel } from "../../../models/layout.model";
import { apiSlice } from "./apiSlice";

interface Layout {
  message: string;
  layout: LayoutModel;
}

export const layoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLayout: builder.query<Layout, { type: string }>({
      query: ({ type }) => `/layout/getLayoutByType?type=${type}`
      //   keepUnusedDataFor: 60
    })
  })
});

export const { useGetLayoutQuery } = layoutApiSlice;
