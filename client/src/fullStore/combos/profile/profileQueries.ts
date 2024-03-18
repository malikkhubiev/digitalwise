import { createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { $authHost } from "../../../http"
import { imageType, preferenceType, profileType, requestersType, tagType } from "../../../types/storeTypes";

// queries
export const profilesApi = createApi({
    reducerPath: 'profilesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + "api/user",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPreferences: builder.query<preferenceType[], null>({
            query: () => "getPreferences",
        }),
        getImagesByPreferences: builder.query<{
            rows: imageType[],
            count: string
        }, null>({
            query: () => "getImagesByPreferences",
        }),
        follow: builder.mutation<
            any,
            { followingId: number }
        >({
            query: ({ followingId }) => ({
                url: "/follow",
                method: 'POST',
                body: {
                    followingId
                },
            }),
        }),
        unFollow: builder.mutation<
            any,
            { unFollowingId: number }
        >({
            query: ({ unFollowingId }) => ({
                url: "/unFollow",
                method: 'POST',
                body: {
                    unFollowingId
                },
            }),
        }),
    }),
});

export const useGetPreferences = profilesApi.endpoints.getPreferences.useQuery;
export const useGetImagesByPreferences = profilesApi.endpoints.getImagesByPreferences.useQuery;
export const useFollow = profilesApi.endpoints.follow.useMutation;
export const useUnfollow = profilesApi.endpoints.unFollow.useMutation;

// thunks
export const getAuthorsProfilesThunk = createAsyncThunk(
    'profiles/getAuthorsProfiles',
    // @ts-ignore
    async (userId?: number | null, { rejectWithValue }) => {
        try {
            const response = await $authHost.get<
                profileType
            >(`/user/getUserProfile:${userId}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        };
    }
);
export const getAuthorProfileThunk = createAsyncThunk(
    'profiles/getAuthorProfile',
    // @ts-ignore
    async (userId?: number | null, { rejectWithValue }) => {
        try {
            const response = await $authHost.get<
                profileType
            >(`/user/getUserProfile:${userId}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        };
    }
);