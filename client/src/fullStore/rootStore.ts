import { configureStore } from '@reduxjs/toolkit';
import { chatsApi } from './combos/chats/chatsQueries';
import { ownImagesApi } from './combos/images/imagesQueries';
import { ownImagesReducer } from './combos/images/imagesSlice';
import { profilesApi } from './combos/profile/profileQueries';
import { profilesReducer } from './combos/profile/profilesSlice';
import { userApi } from './combos/user/userQueries';
import { userReducer } from './combos/user/userSlice';
import { commentApi } from './queries/commentQueries';
import { imageApi } from './queries/imageQueries';
import { tagsApi } from './queries/tagsQueries';
import { preferencesReducer } from './slices/preferencesSlice';
import { tagsReducer } from './slices/tagsSlice';
import { messagesApi } from './queries/messagesQueries';
import { chatsReducer } from './combos/chats/chatsSlice';
import { searchApi } from './queries/searchQueries';

export const store = configureStore({
  reducer: {
    // Reducers
    user: userReducer,
    ownImages: ownImagesReducer,
    profiles: profilesReducer,
    tags: tagsReducer,
    preferences: preferencesReducer,
    chats: chatsReducer,
    // Queries
    [userApi.reducerPath]: userApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [ownImagesApi.reducerPath]: ownImagesApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      profilesApi.middleware,
      imageApi.middleware,
      tagsApi.middleware,
      ownImagesApi.middleware,
      commentApi.middleware,
      chatsApi.middleware,
      messagesApi.middleware,
      searchApi.middleware,
    ),
});

export const globalState = store.getState();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;