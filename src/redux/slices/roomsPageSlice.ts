import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roomsExampleData } from '../../data/roomsExampleData';
import { ROOMS_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { roomDataType } from '../../types/roomDataType';
import { roomsPageSliceType } from '../../types/slices/roomsPageSliceTypes';

export const getRoomsData = createAsyncThunk(
    'roomsPage/getRoomsData',
    async () => {
        const promise = new Promise<roomDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(ROOMS_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(roomsExampleData)
                }
            }, 2000)
        });
        return promise
    }
);

const initialState: roomsPageSliceType = {
    loading: true,
    value: [],
    error: null,
    pageData: {
        searchValue: '',
        filterValue: 'default',
        sortValue: 'default'
    }
};

export const roomsPageSlice = createSlice({
    name: 'roomsPage',
    initialState,
    reducers: {
        ADD_ROOM: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_ROOM: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_ROOM: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        },
        SET_ROOMS_SERACH_VALUE: (state, action) => {
            state.pageData.searchValue = action.payload;
        },
        SET_ROOMS_FILTER_VALUE: (state, action) => {
            state.pageData.filterValue = action.payload;
        },
        SET_ROOMS_SORT_VALUE: (state, action) => {
            state.pageData.sortValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomsData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getRoomsData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getRoomsData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_ROOM, UPDATE_ROOM, REMOVE_ROOM, SET_ROOMS_SERACH_VALUE, SET_ROOMS_FILTER_VALUE, SET_ROOMS_SORT_VALUE} = roomsPageSlice.actions;

export const roomsPage = (state: {roomsPage: roomsPageSliceType}) => state.roomsPage.value;

export default roomsPageSlice.reducer;