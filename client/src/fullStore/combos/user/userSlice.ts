import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../rootStore';
import { changeNameAvatarAboutMeThunk, changeNameAvatarIsOpenedThunk, compareCodeThunk, deleteAccountThunk, getIsAuthThunk, signInThunk } from './userQueries';

export interface UserState {
  id: number | null
  isAuth: boolean
  name: string | null
  avatar: string | null
  about_me: string | null
  encryptedEmail: string | null
  isLoading: boolean
  message: string
  errorMessage: string
};

const initialState: UserState = {
  id: null,
  isAuth: false,
  name: null,
  avatar: null,
  about_me: null,
  encryptedEmail: null,
  isLoading: false,
  message: "",
  errorMessage: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    logOut: (state, action: PayloadAction<string>) => {
      state.isAuth = false;
      const stateProps: string[] = [
        "id",
        "name",
        "avatar",
        "encryptedEmail"
      ];
      stateProps.forEach((prop: string) => {
        // @ts-ignore
        state[prop] = null;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(compareCodeThunk.fulfilled,
      (state: UserState, action: PayloadAction<string>) => {
        state.encryptedEmail = action.payload;
      });
    builder.addCase(compareCodeThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(signInThunk.fulfilled,
      (state: UserState, action: PayloadAction<{
        id: number,
        name: string,
        avatar: string,
      }>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.isAuth = true;
      });
    builder.addCase(signInThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        console.log("login error is here:")
        console.log(action.payload);
        state["errorMessage"] = action.payload;
      });
    builder.addCase(getIsAuthThunk.fulfilled,
      (state: UserState, action: PayloadAction<{
        id: number,
        name: string,
        avatar: string,
      }>) => {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.isAuth = true;
      });
    builder.addCase(getIsAuthThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(changeNameAvatarAboutMeThunk.fulfilled,
      (state: UserState, action: PayloadAction<{
        name?: string,
        avatar?: string,
        about_me?: string,
      }>) => {
        state.name = action.payload?.name;
        state.avatar = action.payload?.avatar;
        state.about_me = action.payload?.about_me;
      });
    builder.addCase(changeNameAvatarAboutMeThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(deleteAccountThunk.fulfilled,
      (state: UserState, action: PayloadAction<any>) => {
        state.isAuth = false;
        const stateProps: string[] = [
          "id",
          "name",
          "avatar",
          "encryptedEmail"
        ];
        stateProps.forEach((prop: string) => {
          // @ts-ignore
          state[prop] = null;
        });
      });
    builder.addCase(deleteAccountThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
  },
});

// actions
export const {
  setIsAuthFalse,
  setIsLoading,
  setErrorMessage,
  logOut,
} = userSlice.actions;

// selectors
export const selectEncryptedEmail = (state: RootState): string => state.user.encryptedEmail;
export const selectId = (state: RootState): number => +state.user.id;
export const selectAvatar = (state: RootState): string => state.user.avatar;
export const selectIsLoading = (state: RootState): boolean => state.user.isLoading;
export const selectIsAuth = (state: RootState): boolean => state.user.isAuth;
export const selectMessage = (state: RootState): string => state.user.message;
export const selectErrorMessage = (state: RootState): string => state.user.errorMessage;

// reducer
export const userReducer = userSlice.reducer;