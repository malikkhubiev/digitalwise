import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { imageType } from "../../types/storeTypes";

// queries
export const imageApi = createApi({
    reducerPath: 'imageApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/image',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            };
            return headers;
        },
    }),
    endpoints: (builder) => ({
        upload: builder.mutation<
            imageType,
            FormData
        >({
            query: (FormData) => ({
                url: "/upload",
                method: 'POST',
                body: FormData
            }),
        }),
        getImageMutation: builder.mutation<
            imageType,
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: `/get:${imageId}`,
                method: 'GET',
            }),
        }),
        save: builder.mutation<
            { message: string },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/save",
                method: 'PUT',
                body: {
                    imageId
                }
            }),
        }),
        unSave: builder.mutation<
            { message: string },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/unSave",
                method: 'PUT',
                body: {
                    imageId
                }
            }),
        }),
        hide: builder.mutation<
            { message: string },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/hide",
                method: 'PUT',
                body: {
                    imageId
                }
            }),
        }),
        show: builder.mutation<
            { message: string },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/show",
                method: 'PUT',
                body: {
                    imageId
                }
            }),
        }),
        view: builder.mutation<
            { message: string },
            { imagesIds: number[] }
        >({
            query: ({ imagesIds }) => ({
                url: "/view",
                method: 'POST',
                body: {
                    imagesIds
                }
            }),
        }),
        like: builder.mutation<
        {message: string},
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/like",
                method: 'PUT',
                body: {
                    imageId
                }
            }),
        }),
        unLike: builder.mutation<
            { message: string },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/unLike",
                method: 'PUT',
                body: {
                    imageId
                }
            }),
        }),
        notInterested: builder.mutation<
            { notInterestedImageId: number },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/notInterested",
                method: 'POST',
                body: {
                    imageId
                }
            }),
        }),
        delete: builder.mutation<
            { message: string },
            { imageId: number }
        >({
            query: ({ imageId }) => ({
                url: "/delete",
                method: 'DELETE',
                body: {
                    imageId
                }
            }),
        }),
    }),
});

export const useUploadImage = imageApi.endpoints.upload.useMutation;
export const useGetImageMutation = imageApi.endpoints.getImageMutation.useMutation;
export const useSaveImage = imageApi.endpoints.save.useMutation;
export const useUnSaveImage = imageApi.endpoints.unSave.useMutation;
export const useHideImage = imageApi.endpoints.hide.useMutation;
export const useShowImage = imageApi.endpoints.show.useMutation;
export const useViewImage = imageApi.endpoints.view.useMutation;
export const useLikeImage = imageApi.endpoints.like.useMutation;
export const useUnLikeImage = imageApi.endpoints.unLike.useMutation;
export const useNotInterestedImage = imageApi.endpoints.notInterested.useMutation;
export const useDeleteImage = imageApi.endpoints.delete.useMutation;