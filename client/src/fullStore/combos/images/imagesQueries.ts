import { createAsyncThunk } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { $authHost } from "../../../http"
import { imagesFromServerType, imageType, profileType } from "../../../types/storeTypes";

// queries
export const ownImagesApi = createApi({
    reducerPath: 'ownImagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL + "api/user",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token"); 
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getOwnAndFollowingImages: builder.mutation<
            imageType[],
            null
        >({
            query: () => ({
                url: "/getOwnAndFollowingImages",
                method: 'GET',
            }),
        }),
    }),
});

export const useGetOwnAndFollowingImages = ownImagesApi.endpoints.getOwnAndFollowingImages.useMutation;

// thunks
export const getUsualImagesByDateThunk = createAsyncThunk(
    'ownImages/getUsualImageByDate',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await $authHost.post<
            imagesFromServerType
        >("/user/getImages", {
            userId,
            imagesType: "ordinary",
            typeOfSorting: "createdAt"
        });
        return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const getUsualImagesByPopularityThunk = createAsyncThunk(
    'ownImages/getUsualImageByPopularity',
    async (userId, {rejectWithValue}) => {
        try {
            const response = await $authHost.post<
            imagesFromServerType
        >(`/user/getImages`, {
            userId,
            imagesType: "ordinary",
            typeOfSorting: "popularity"
        });
        return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message); 
        }
    }
);
export const getPrivateImagesByDateThunk = createAsyncThunk(
    'ownImages/getPrivateImageByDate',
    async (userId: number, {rejectWithValue}) => {
        try{
            const response = await $authHost.post<
            imagesFromServerType
        >(`/user/getImages`, {
            userId,
            imagesType: "private",
            typeOfSorting: "createdAt"
        });
        return response.data;
        }catch(e){
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const getPrivateImagesByPopularityThunk = createAsyncThunk(
    'ownImages/getPrivateImageByPopularity',
    async (userId: number, {rejectWithValue}) => {
        try{
            const response = await $authHost.post<
            imagesFromServerType
        >(`/user/getImages`, {
            userId,
            imagesType: "private",
            typeOfSorting: "popularity"
        });
        return response.data;
        }catch(e){
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const getSavedImagesThunk = createAsyncThunk(
    'ownImages/getSavedImages',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await $authHost.post<
            imagesFromServerType
        >(`/user/getImages`, {
            userId,
            imagesType: "saved",
            typeOfSorting: "createdAt"
        });
        return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);