import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { profileType } from '../../../types/storeTypes';
import { RootState } from '../../rootStore';
import { getAuthorProfileThunk } from './profileQueries';

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
    addProfile: (state, action: PayloadAction<profileType>) => {
      state[action.payload.id] = action.payload;
    }
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
  },
});

// actions
export const {
  setProfilesErrorMessage,
  addProfile,
} = profilesSlice.actions;

// selectors
export const selectProfile = (state: RootState, id: number): profileType => state.profiles[id];
export const selectProfilesErrorMessage = (state: RootState): string => state.profiles.errorMessage;

export const profilesReducer = profilesSlice.reducer;