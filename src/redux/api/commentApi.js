import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllComments: builder.query({
      query: (limit) => `comments?limit=${limit}`,
    }),
    getCommentDetail: builder.query({
      query: (commentId) => `comments/${commentId}`,
    }),
    getCommentByPostId: builder.query({
      query: (postId) => `comments/post/${postId}`,
    }),
    addNewComment: builder.mutation({
      query: (payload) => ({
        url: "comments/add",
        method: "POST",
        body: JSON.stringify({
          postId: payload.postId,
          userId: payload.userId,
          body: payload.body,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useGetAllCommentsQuery,
  useGetCommentDetailQuery,
  useGetCommentByPostIdQuery,
  useAddNewCommentMutation,
} = commentApi;
