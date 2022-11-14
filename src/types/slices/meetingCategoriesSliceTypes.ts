import { meetingCategoryDataType } from "../meetingCategoryDataType";

export interface meetingCategoriesSliceType {
    loading: boolean;
    value: meetingCategoryDataType[] | any[];
    error: string | null;
}