import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { commentType, imageType } from "../../types/storeTypes";

// queries
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + "api/comment",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            };
            return headers;
        },
    }),
    endpoints: (builder) => ({
        add: builder.mutation<
            commentType,
            { imageId: number, text: string }
        >({
            query: ({ imageId, text }) => ({
                url: "/add",
                method: 'POST',
                body: {
                    imageId,
                    text
                }
            }),
        }),
        like: builder.mutation<
            { message: string },
            { commentId: number }
        >({
            query: ({ commentId }) => ({
                url: "/like",
                method: 'PUT',
                body: {
                    commentId
                }
            }),
        }),
        unLike: builder.mutation<
            { message: string },
            { commentId: number }
        >({
            query: ({ commentId }) => ({
                url: "/unLike",
                method: 'PUT',
                body: {
                    commentId
                }
            }),
        }),
        delete: builder.mutation<
            { message: string },
            { commentId: number }
        >({
            query: ({ commentId }) => ({
                url: "/delete",
                method: 'DELETE',
                body: {
                    commentId
                }
            }),
        }),
    }),
});

export const useAddComment = commentApi.endpoints.add.useMutation;
export const useLikeComment = commentApi.endpoints.like.useMutation;
export const useUnLikeComment = commentApi.endpoints.unLike.useMutation;
export const useDeleteComment = commentApi.endpoints.delete.useMutation;