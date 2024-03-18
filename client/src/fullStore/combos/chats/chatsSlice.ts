import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../rootStore';


export interface chatState {
    newChatUserId: number | null
};

const initialState: chatState = {
    newChatUserId: null
};

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setNewChatUserId: (state, action: PayloadAction<number>) => {
            state.newChatUserId = action.payload;
        },
    },
});

// actions
export const {
    setNewChatUserId,
} = chatsSlice.actions;

// selectors
export const selectNewChatUserId = (state: RootState):number => state.chats.newChatUserId;

export const chatsReducer = chatsSlice.reducer;