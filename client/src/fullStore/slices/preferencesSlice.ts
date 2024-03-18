import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootStore';

export interface AuthState {
  isAuth: boolean
  encryptedEmail: string | null
};

const initialState: any = {};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    /*getPreferences: async (state, action: PayloadAction<any>) => {
      const preferences: preferenceType[] = await preferencesAPI.getPreferences();
      preferences.forEach((preference: preferenceType) => {
        state[preference.name] = preference.rating;
      });
    },
    setPreferences: async (state, action: PayloadAction<any>) => {
      const {updatedPreferences} = action.payload;
      for (let preference in Object.keys(updatedPreferences)){
        state[preference] = state[preference] + updatedPreferences[preference];
      };
      const preferencesInServerStyle = [];
      for (let preference in Object.keys(state)){
        preferencesInServerStyle.push({
          name: preference,
          rating: state[preference]
        });
      };
      await preferencesAPI.sendPreferences(preferencesInServerStyle);
    }*/
  }
});

// actions
export const {
  // setPreferences
} = preferencesSlice.actions;

// selectors
export const selectPreferences = (state: RootState) => state.preferences;

// reducer
export const preferencesReducer = preferencesSlice.reducer;