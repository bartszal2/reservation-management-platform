import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { screensExampleData } from '../../data/screensExampleData';
import { SCREENS_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { screenDataType } from '../../types/screenDataType';
import { screensPageSliceType } from '../../types/slices/screensPageSliceTypes';

export const getScreensData = createAsyncThunk(
    'screensPage/getScreensData',
    async () => {
        const promise = new Promise<screenDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(SCREENS_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(screensExampleData)
                }
            }, 2850)
        });
        return promise
    }
);

const initialState: screensPageSliceType = {
    loading: true,
    value: [],
    error: null,
    pageData: {
        searchValue: '',
        filterValue: 'default',
        sortValue: 'default'
    }
};

export const screensPageSlice = createSlice({
    name: 'screensPage',
    initialState,
    reducers: {
        ADD_SCREEN: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_SCREEN: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_SCREEN: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        },
        SET_SCREENS_SERACH_VALUE: (state, action) => {
            state.pageData.searchValue = action.payload;
        },
        SET_SCREENS_FILTER_VALUE: (state, action) => {
            state.pageData.filterValue = action.payload;
        },
        SET_SCREENS_SORT_VALUE: (state, action) => {
            state.pageData.sortValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getScreensData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getScreensData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getScreensData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_SCREEN, UPDATE_SCREEN, REMOVE_SCREEN, SET_SCREENS_SERACH_VALUE, SET_SCREENS_FILTER_VALUE, SET_SCREENS_SORT_VALUE} = screensPageSlice.actions;

export const screensPage = (state: {screensPage: screensPageSliceType}) => state.screensPage.value;

export default screensPageSlice.reducer;