import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { roomTypesData } from '../../data/roomTypesData';
import { ROOM_TYPES_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { roomTypeDataType } from '../../types/roomTypeDataType';
import { roomTypesSliceType } from '../../types/slices/roomTypesSliceTypes';

export const getRoomTypesData = createAsyncThunk(
    'roomTypes/getRoomTypesData',
    async () => {
        const promise = new Promise<roomTypeDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(ROOM_TYPES_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(roomTypesData)
                }
            }, 2350)
        });
        return promise
    }
);

const initialState: roomTypesSliceType = {
    loading: true,
    value: [],
    error: null,
};

export const roomTypesSlice = createSlice({
    name: 'roomTypes',
    initialState,
    reducers: {
        ADD_TYPE: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_TYPE: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_TYPE: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getRoomTypesData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getRoomTypesData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getRoomTypesData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_TYPE, UPDATE_TYPE, REMOVE_TYPE} = roomTypesSlice.actions;

export const roomTypes = (state: {roomTypes: roomTypesSliceType}) => state.roomTypes.value;

export default roomTypesSlice.reducer;