import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { sortByType } from "../../types/common";
import { imageType } from "../../types/storeTypes";

// queries
export const tagsApi = createApi({
    reducerPath: 'tagsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/tag',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            };
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getImagesByTag: builder.mutation<
            {count: string, rows: imageType[]},
            {tagId: number, sortBy: sortByType}
        >({
            query: ({tagId, sortBy}) => ({
                url: `/getImagesByTag/:${tagId}/:${sortBy}`,
                method: 'GET',
            }),
        }),
    }),
});

export const useGetImagesByTag = tagsApi.endpoints.getImagesByTag.useMutation;