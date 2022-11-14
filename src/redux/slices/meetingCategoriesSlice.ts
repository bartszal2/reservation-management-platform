import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { meetingsCategoriesData } from '../../data/meetingsCategoriesData';
import { MEETING_CATEGORIES_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { meetingCategoryDataType } from '../../types/meetingCategoryDataType';
import { meetingCategoriesSliceType } from '../../types/slices/meetingCategoriesSliceTypes';

export const getMeetingCategoriesData = createAsyncThunk(
    'meetingsCategories/getMeetingsCategoriesData',
    async () => {
        const promise = new Promise<meetingCategoryDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(MEETING_CATEGORIES_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(meetingsCategoriesData)
                }
            }, 2250)
        });
        return promise
    }
);

const initialState: meetingCategoriesSliceType = {
    loading: true,
    value: [],
    error: null,
};

export const meetingCategoriesSlice = createSlice({
    name: 'meetingsCategories',
    initialState,
    reducers: {
        ADD_CATEGORY: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_CATEGORY: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_CATEGORY: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMeetingCategoriesData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getMeetingCategoriesData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getMeetingCategoriesData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY} = meetingCategoriesSlice.actions;

export const meetingsCategories = (state: {meetingsCategories: meetingCategoriesSliceType}) => state.meetingsCategories.value;

export default meetingCategoriesSlice.reducer;