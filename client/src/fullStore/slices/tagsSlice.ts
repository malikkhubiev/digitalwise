import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imageType } from '../../types/storeTypes';
import { RootState } from '../rootStore';

export interface AuthState {
  tagpageImages: imageType[]
  numberOfImages: number
};

const initialState: any = {
  tagpageImages: [],
  numberOfImages: null
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    /*getTagPageImages: async (state, action: PayloadAction<any>) => {
      const {tagId, sortBy} = action.payload;
      const images = await tagAPI.getTagPageImages(tagId, sortBy);
      state.tagpageImages = images.rows; // Вроде
      state.numberOfImages = images.count;
    },*/
    // Для findTags сделать ртк квери
  }
});

// actions
export const {
  //getTagPageImages
} = tagsSlice.actions;

// selectors
export const selectImages = (state: RootState) => state.tags.tagpageImages;

// reducer
export const tagsReducer = tagsSlice.reducer;