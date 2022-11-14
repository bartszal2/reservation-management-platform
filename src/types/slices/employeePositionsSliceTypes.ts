import { employeePositionDataType } from "../employeePositionDataType";

export interface employeePositionsSliceType {
    loading: boolean;
    value: employeePositionDataType[] | any[];
    error: string | null;
}