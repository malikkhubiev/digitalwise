import { createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { $authHost } from "../../../http/index"
import { profileType } from "../../../types/storeTypes";

// queries
export const profilesApi = createApi({
    reducerPath: 'profilesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + "api/author",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAuthors: builder.query<{
            rows: profileType[],
            count: number
        }, any>({
            query: ({
                name_substr,
                books_num,
                summaries_num,
                quotes_num,
                limit,
                offset
            }) => `/get/:${name_substr}/:${books_num}/:${summaries_num}/:${quotes_num}/:${limit}/:${offset}`,
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

export const useFollow = profilesApi.endpoints.follow.useMutation;
export const useUnfollow = profilesApi.endpoints.unFollow.useMutation;

// thunks
export const getAuthorProfileThunk = createAsyncThunk(
    'profiles/getAuthorProfile',
    // @ts-ignore
    async (authorId?: number | null, { rejectWithValue }) => {
        try {
            const response = await $authHost.get<
                profileType
            >(`/author/getOne/:${authorId}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        };
    }
);