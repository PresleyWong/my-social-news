import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (limit) => `posts?limit=${limit}`,
    }),
    getPostDetail: builder.query({
      // multiple API calls - post > user > comment
      async queryFn(postId, _queryApi, _extraOptions, baseQuery) {
        const post = await baseQuery(`posts/${postId}`);
        if (post.error) return { error: post.error };
        const user = await baseQuery(`users/${post.data.userId}`);
        if (user.error) return { user: post.error };
        const comments = await baseQuery(`comments/post/${postId}`);
        return comments.data
          ? {
              data: {
                ...post.data,
                username: user.data.username,
                userImage: user.data.image,
                comments: comments.data.comments,
              },
            }
          : { error: comments.error };
      },
    }),
    getPostSearch: builder.query({
      query: (keyword) => `posts/search?q=${keyword}`,
    }),
    getPostByUserId: builder.query({
      query: (userId) => `posts/user/${userId}`,
    }),
    getPostComment: builder.query({
      query: (postId) => `posts/${postId}/comments`,
    }),
    addNewPost: builder.mutation({
      query: (payload) => ({
        url: "posts/add",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetPostDetailQuery,
  useGetPostSearchQuery,
  useGetPostByUserIdQuery,
  useGetPostCommentQuery,
  useAddNewPostMutation,
} = postApi;
