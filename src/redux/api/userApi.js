import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (limit) => `users?limit=${limit}`,
    }),
    getUserDetail: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    getUserSearch: builder.query({
      query: (keyword) => `users/search?q=${keyword}`,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserDetailQuery,
  useGetUserSearchQuery,
} = userApi;
