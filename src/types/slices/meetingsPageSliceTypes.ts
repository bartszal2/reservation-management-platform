import { meetingDataType } from "../meetingDataType";

export type meetingsFilterValueType = 'default' | 'meetings-active' | 'meetings-planned' | 'meetings-ended';

export type meetingsSortValueType = 'default' | 'name-meeting-sort-up' | 'name-meeting-sort-down' | 'oldest-meetings' | 'latest-meetings';

export interface meetingsPageSliceType {
    loading: boolean;
    value: meetingDataType[] | any[];
    error: string | null;
    pageData: {
        searchValue: string;
        filterValue: meetingsFilterValueType;
        sortValue: meetingsSortValueType;
    }
}