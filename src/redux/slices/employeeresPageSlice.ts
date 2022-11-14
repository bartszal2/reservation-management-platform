import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { employeeresExampleData } from '../../data/employeeresExampleData';
import { EMPLOYEERES_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { employeeDataType } from '../../types/employeeDataType';
import { employeeresPageSliceType } from '../../types/slices/employeeresPageSliceTypes';

export const getEmployeeresData = createAsyncThunk(
    'employeeresPage/getEmployeeresData',
    async () => {
        const promise = new Promise<employeeDataType[]>((resolve, reject) => {
            setTimeout(() => {
                const getDataFromLocalstorage = localStorage.getItem(EMPLOYEERES_LSTORAGE_NAME)
                
                if (getDataFromLocalstorage != null) {
                    resolve(JSON.parse(getDataFromLocalstorage))
                    
                } else {
                    resolve(employeeresExampleData)
                }
            }, 2250)
        });
        return promise
    }
);

const initialState: employeeresPageSliceType = {
    loading: true,
    value: [],
    error: null,
    pageData: {
        searchValue: '',
        filterValue: 'default',
        sortValue: 'default'
    }
};

export const employeeresPageSlice = createSlice({
    name: 'employeeresPage',
    initialState,
    reducers: {
        ADD_EMPLOYEE: (state, action) => {
            state.value.push(action.payload);
        },
        UPDATE_EMPLOYEE: (state, action) => {
            const data = state.value;
            data[action.payload.index] = action.payload.value;
            state.value = data;
        },
        REMOVE_EMPLOYEE: (state, action) => {
            const data = state.value;
            data.splice(action.payload, 1);
            state.value = data;
        },
        SET_EMPLOYEERES_SERACH_VALUE: (state, action) => {
            state.pageData.searchValue = action.payload;
        },
        SET_EMPLOYEERES_FILTER_VALUE: (state, action) => {
            state.pageData.filterValue = action.payload;
        },
        SET_EMPLOYEERES_SORT_VALUE: (state, action) => {
            state.pageData.sortValue = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getEmployeeresData.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(getEmployeeresData.fulfilled, (state, action) => {
            state.loading = false;
            state.value = action.payload;
        }),
        builder.addCase(getEmployeeresData.rejected, (state) => {
            state.loading = false;
            state.error = 'Błąd ładowania danych';
        })
    }
});

export const {ADD_EMPLOYEE, UPDATE_EMPLOYEE, REMOVE_EMPLOYEE, SET_EMPLOYEERES_SERACH_VALUE, SET_EMPLOYEERES_FILTER_VALUE, SET_EMPLOYEERES_SORT_VALUE} = employeeresPageSlice.actions;

export const workersPage = (state: {employeeresPage: employeeresPageSliceType}) => state.employeeresPage.value;

export default employeeresPageSlice.reducer;