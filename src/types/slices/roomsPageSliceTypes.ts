import { roomDataType } from "../roomDataType";

export type roomsFilterValueType = 'default' | 'active-rooms' | 'inactive-rooms';

export type roomsSortValueType = 'default' | 'name-room-sort-up' | 'name-room-sort-down' | 'smallest-number-people-room' | 'largest-number-people-room' | 'oldest-date-added' | 'latest-date-added';

export interface roomsPageSliceType {
    loading: boolean;
    value: roomDataType[] | any[];
    error: string | null;
    pageData: {
        searchValue: string;
        filterValue: roomsFilterValueType;
        sortValue: roomsSortValueType;
    }
}