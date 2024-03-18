import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { blockedUserType, profileType } from '../../../types/storeTypes';
import { RootState } from '../../rootStore';
import { blockThunk, getAuthorProfileThunk, unBlockThunk } from './profileQueries';

const initialState: any = {
  errorMessage: ""
};

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    setProfilesErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setIsFirstTimeToFalse: (state, action: PayloadAction<{ ownId: number }>) => {
      state[action.payload.ownId].isFirstTime = false;
    },
    addProfile: (state, action: PayloadAction<profileType>) => {
      state[action.payload.id] = action.payload;
    },
    updateBlockedUsers: (state, action: PayloadAction<{
      ownId: number
      unblockedUsers: number[]
    }>) => {
      state[action.payload.ownId].blocked.rows.forEach((user: blockedUserType, index: number) => {
        if (action.payload.unblockedUsers.includes(user.id)) {
          state[action.payload.ownId].blocked.rows.splice(index, 1);
          state[action.payload.ownId].blocked.count--;
        };
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthorProfileThunk.fulfilled,
      (state: any, action: PayloadAction<any>) => {
        state[action.payload.id] = action.payload;
      });
    builder.addCase(getAuthorProfileThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(blockThunk.fulfilled,
      (state: any, action: PayloadAction<number>) => {
        if (state[action.payload]) {
          delete state[action.payload];
        };
      });
    builder.addCase(blockThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(unBlockThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
  },
});

// actions
export const {
  setProfilesErrorMessage,
  setIsFirstTimeToFalse,
  addProfile,
  updateBlockedUsers,
} = profilesSlice.actions;

// selectors
export const selectProfile = (state: RootState, id: number): profileType => state.profiles[id];
export const selectProfilesErrorMessage = (state: RootState): string => state.profiles.errorMessage;

export const profilesReducer = profilesSlice.reducer;