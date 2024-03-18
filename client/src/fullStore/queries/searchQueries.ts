import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { searchResultsArrayType } from "../../types/common";
import { blockedUsersType, followersAndFollowingListType, imageLikerType, tagType } from "../../types/storeTypes";

// queries
export const searchApi = createApi({
    reducerPath: 'searchApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/search',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            };
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTagsBySubstring: builder.mutation<
            tagType[],
            {substring: string}
        >({
            query: ({substring}) => ({
                url: `/getTagsBySubstring/:${substring}`,
                method: 'GET'
            }),
        }),
        getUsersBySubstring: builder.mutation<
            searchResultsArrayType,
            {substring: string}
        >({
            query: ({substring}) => ({
                url: `/getUsersBySubstring/:${substring}`,
                method: 'GET'
            }),
        }),
        getFollowersOrFollowingsBySubstr: builder.mutation<
            followersAndFollowingListType,
            {
                substring: string,
                who: "followers" | "following"
            }
        >({
            query: ({substring, who}) => ({
                url: `/getFollowersOrFollowingsBySubstr/:${substring}/:${who}`,
                method: 'GET'
            }),
        }),
        getBlockedUsersBySubstr: builder.mutation<
            blockedUsersType,
            {
                substring: string,
            }
        >({
            query: ({substring}) => ({
                url: `/getBlockedUsersBySubstr/:${substring}`,
                method: 'GET'
            }),
        }),
        getImageLikersBySubstr: builder.mutation<
            {
                count: string,
                rows: imageLikerType[]
            },
            {
                imageId: number,
                substring: string,
            }
        >({
            query: ({imageId, substring}) => ({
                url: `/getImageLikers/:${imageId}/:${substring}`,
                method: 'GET'
            }),
        }),
    }),
});

export const useGetTagsBySubstring = searchApi.endpoints.getTagsBySubstring.useMutation;
export const useGetUsersBySubstring = searchApi.endpoints.getUsersBySubstring.useMutation;
export const useGetFollowersOrFollowingsBySubstr = searchApi.endpoints.getFollowersOrFollowingsBySubstr.useMutation;
export const useGetBlockedUsersBySubstr = searchApi.endpoints.getBlockedUsersBySubstr.useMutation;
export const useGetImageLikersBySubstr = searchApi.endpoints.getImageLikersBySubstr.useMutation;