import { employeeDataType } from "../employeeDataType";

export type employeeresFilterValueType = 'default' | 'active-employeeres' | 'inactive-employeeres'

export type employeeresSortValueType = 'default' | 'name-employee-sort-up' | 'name-employee-sort-down' | 'oldest-date-added' | 'latest-date-added'

export interface employeeresPageSliceType {
    loading: boolean;
    value: employeeDataType[] | any[];
    error: string | null;
    pageData: {
        searchValue: string;
        filterValue: employeeresFilterValueType;
        sortValue: employeeresSortValueType;
    }
}