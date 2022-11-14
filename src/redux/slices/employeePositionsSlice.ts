import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { employeePositionsData } from '../../data/employeePositionsData';
import { EMPLOYEE_POSITIONS_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { employeePositionDataType } from '../../types/employeePositionDataType';
import { employeePositionsSliceType } from '../../types/slices/employeePositionsSliceTypes';

export const getEmployeePositionsData = createAsyncThunk(
    'employeePositions/getEmployeePositionsData',
    async () => {
        const promise = new Promise<employeePositionDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(EMPLOYEE_POSITIONS_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(employeePositionsData)
                }
            }, 2150)
        });
        return promise
    }
);

const initialState: employeePositionsSliceType = {
    loading: true,
    value: [],
    error: null,
};

export const employeePositionsSlice = createSlice({
    name: 'employeePositions',
    initialState,
    reducers: {
        ADD_POSITION: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_POSITION: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_POSITION: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployeePositionsData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getEmployeePositionsData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getEmployeePositionsData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_POSITION, UPDATE_POSITION, REMOVE_POSITION} = employeePositionsSlice.actions;

export const employeePositions = (state: {employeePositions: employeePositionsSliceType}) => state.employeePositions.value;

export default employeePositionsSlice.reducer;