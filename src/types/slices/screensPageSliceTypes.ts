import { screenDataType } from "../screenDataType";

export type screensFilterValueType = 'default' | 'active-screens' | 'inactive-screens' | 'horizontal-screens' | 'vertical-screens';

export type screensSortValueType = 'default' | 'name-screen-sort-up' | 'name-screen-sort-down' | 'oldest-date-added' | 'latest-date-added';

export interface screensPageSliceType {
    loading: boolean;
    value: screenDataType[] | any[];
    error: string | null;
    pageData: {
        searchValue: string;
        filterValue: screensFilterValueType;
        sortValue: screensSortValueType;
    }
}