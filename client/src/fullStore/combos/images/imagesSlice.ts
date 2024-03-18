import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imagesFromServerType, imageType } from '../../../types/storeTypes';
import { RootState } from '../../rootStore';
import { getPrivateImagesByDateThunk, getPrivateImagesByPopularityThunk, getSavedImagesThunk, getUsualImagesByDateThunk, getUsualImagesByPopularityThunk } from './imagesQueries';

const initialState: any = {
  usual: {
    date: {
      rows: [],
      count: "0"
    },
    popularity: {
      rows: [],
      count: "0"
    },
  },
  private: {
    date: {
      rows: [],
      count: "0"
    },
    popularity: {
      rows: [],
      count: "0"
    },
  },
  saved: {
    rows: [],
    count: "0"
  },
  errorMessage: ""
};

export const ownImagesSlice = createSlice({
  name: 'ownImages',
  initialState,
  reducers: {
    setOwnImagesErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    addUsualImageByDate: (state, action: PayloadAction<imageType>) => {
      state.usual.date = [action.payload, ...state.usual.date];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUsualImagesByDateThunk.fulfilled,
      (state: any, action: PayloadAction<imagesFromServerType>) => {
        state.usual.date = action.payload;
      });
    builder.addCase(getUsualImagesByDateThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(getUsualImagesByPopularityThunk.fulfilled,
      (state: any, action: PayloadAction<imagesFromServerType>) => {
        state.usual.popularity = {
          count: action.payload.count,
          rows: action.payload.rows.reverse()
        };
      });
    builder.addCase(getUsualImagesByPopularityThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(getPrivateImagesByDateThunk.fulfilled,
      (state: any, action: PayloadAction<imagesFromServerType>) => {
        state.private.date = action.payload;
      });
    builder.addCase(getPrivateImagesByDateThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(getPrivateImagesByPopularityThunk.fulfilled,
      (state: any, action: PayloadAction<imagesFromServerType>) => {
        state.private.popularity = {
          count: action.payload.count,
          rows: action.payload.rows.reverse()
        };
      });
    builder.addCase(getPrivateImagesByPopularityThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
    builder.addCase(getSavedImagesThunk.fulfilled,
      (state: any, action: PayloadAction<imagesFromServerType>) => {
        state.saved = action.payload;
      });
    builder.addCase(getSavedImagesThunk.rejected,
      (state: any, action: PayloadAction<any>) => {
        state["errorMessage"] = action.payload;
      });
  },
});

// actions
export const {
  setOwnImagesErrorMessage,
  addUsualImageByDate,
} = ownImagesSlice.actions;

// selectors
export const selectUsualImagesByDate = (state: RootState) => state.ownImages.usual.date;
export const selectUsualImagesByPopularity = (state: RootState) => state.ownImages.usual.popularity;
export const selectPrivateImagesByDate = (state: RootState) => state.ownImages.private.date;
export const selectPrivateImagesByPopularity = (state: RootState) => state.ownImages.private.popularity;
export const selectSavedImages = (state: RootState) => state.ownImages.saved;
export const selectOwnImagesErrorMessage = (state: RootState): string => state.ownImages.errorMessage;

export const ownImagesReducer = ownImagesSlice.reducer;