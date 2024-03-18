import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { chatType, imageType, messageType } from "../../types/storeTypes";

// queries
export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + 'api/message',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            };
            return headers;
        },
    }),
    endpoints: (builder) => ({
        send: builder.mutation<
            {
                message: messageType,
                chat?: chatType
            },
            {
                chatId?: number,
                from: number,
                to: number,
                text: string
            }
        >({
            query: ({
                chatId,
                from,
                to,
                text
            }) => ({
                url: "/send",
                method: 'POST',
                body: {
                    chatId,
                    from,
                    to,
                    text
                }
            }),
        }),
        delete: builder.mutation<
            {message: string},
            {
                chatId: number,
                messageId: number
            }
        >({
            query: ({ chatId, messageId }) => ({
                url: "/delete",
                method: 'DELETE',
                body: {
                    data: {
                        chatId,
                        messageId
                    }
                }
            }),
        }),
    }),
});

export const useSendMessage = messagesApi.endpoints.send.useMutation;
export const useDeleteMessage = messagesApi.endpoints.delete.useMutation;