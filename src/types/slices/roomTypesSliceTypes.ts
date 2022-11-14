import { roomTypeDataType } from "../roomTypeDataType";

export interface roomTypesSliceType {
    loading: boolean;
    value: roomTypeDataType[] | any[];
    error: string | null;
}