import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { chatType, imageType } from "../../../types/storeTypes";
import { $authHost } from "../../../http";
import { createAsyncThunk } from "@reduxjs/toolkit";

// queries
export const chatsApi = createApi({
    reducerPath: 'chatsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + "api/chat",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token"); 
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getChats: builder.mutation<
            chatType[],
            null
        >({
            query: () => ({
                url: "/get",
                method: 'GET',
            }),
        }),
        clearOneChat: builder.mutation<
            {chatId: number},
            {chatId: number}
        >({
            query: ({chatId}) => ({
                url: "/clearOne",
                method: 'DELETE',
                body: {
                    data: {
                        chatId
                    }
                }
            }),
        }),
        deleteOneChat: builder.mutation<
            {chatId: number},
            {chatId: number}
        >({
            query: ({chatId}) => ({
                url: "/deleteOne",
                method: 'DELETE',
                body: {
                    data: {
                        chatId
                    }
                }
            }),
        }),
        clearAllChats: builder.mutation<
            {message: string},
            null
        >({
            query: () => ({
                url: "/clearAll",
                method: 'DELETE',
            }),
        }),
        deleteAllChats: builder.mutation<
            {message: string},
            null
        >({
            query: () => ({
                url: "/deleteAll",
                method: 'DELETE',
            }),
        }),
    }),
});

export const useGetChats = chatsApi.endpoints.getChats.useMutation;
export const useClearOneChat = chatsApi.endpoints.clearOneChat.useMutation;
export const useDeleteOneChat = chatsApi.endpoints.deleteOneChat.useMutation;
export const useClearAllChats = chatsApi.endpoints.clearAllChats.useMutation;
export const useDeleteAllChats = chatsApi.endpoints.deleteAllChats.useMutation;

// thunks
export const getChatsThunk = createAsyncThunk(
    'chats/getChats',
    // @ts-ignore
    async (authorId?: number | null, { rejectWithValue }) => {
        try {
            const response = await $authHost.get<
                any
            >(`/author/getOne/:${authorId}`);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        };
    }
);