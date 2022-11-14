import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { meetingsExampleData } from '../../data/meetingsExampleData';
import { MEETINGS_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { meetingDataType } from '../../types/meetingDataType';
import { meetingsPageSliceType } from '../../types/slices/meetingsPageSliceTypes';

export const getMeetingsData = createAsyncThunk(
    'meetingsPage/getMeetingsData',
    async () => {
        const promise = new Promise<meetingDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(MEETINGS_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(meetingsExampleData)
                }
            }, 2500)
        });
        return promise
    }
);

const initialState: meetingsPageSliceType = {
    loading: true,
    value: [],
    error: null,
    pageData: {
        searchValue: '',
        filterValue: 'default',
        sortValue: 'default'
    }
};

export const meetingsPageSlice = createSlice({
    name: 'meetingsPage',
    initialState,
    reducers: {
        ADD_MEETING: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_MEETING: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_MEETING: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        },
        SET_MEETINGS_SERACH_VALUE: (state, action) => {
            state.pageData.searchValue = action.payload;
        },
        SET_MEETINGS_FILTER_VALUE: (state, action) => {
            state.pageData.filterValue = action.payload;
        },
        SET_MEETINGS_SORT_VALUE: (state, action) => {
            state.pageData.sortValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMeetingsData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getMeetingsData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getMeetingsData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_MEETING, UPDATE_MEETING, REMOVE_MEETING, SET_MEETINGS_SERACH_VALUE, SET_MEETINGS_FILTER_VALUE, SET_MEETINGS_SORT_VALUE} = meetingsPageSlice.actions;

export const meetingsPage = (state: {meetingsPage: meetingsPageSliceType}) => state.meetingsPage.value;

export default meetingsPageSlice.reducer;