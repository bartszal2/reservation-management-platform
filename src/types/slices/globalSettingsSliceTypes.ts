import { employeeDataType } from "../employeeDataType";
import { meetingDataType } from "../meetingDataType";
import { notificationDataType } from "../notificationDataType";
import { roomDataType } from "../roomDataType";
import { screenDataType } from "../screenDataType";

export type modalWindowType = 'add-employee' | 'add-meeting' | 'add-room' | 'add-screen' | 'edit-employee' | 'edit-meeting' | 'edit-room' | 'edit-screen' | 'delete-agreement';

export type modalWindowDeleteAgreementType = "meetingsData" | "roomsData" | "employeeresData" | "screensData";

export interface globalSettingsSliceType {
    viewSidebar: boolean;
    viewModalWindow: boolean,
    typeOfModalWindow: modalWindowType | null;
    editMeetingElement: meetingDataType | null;
    editRoomElement: roomDataType | null;
    editEmployeeElement: employeeDataType | null;
    editScreenElement: screenDataType | null;
    agreementIndexElement: number | null;
    agreementDataType: modalWindowDeleteAgreementType | null;
    notification: {
        notificationsData: notificationDataType[];
    }
}