export interface meetingDataType {
  meetingId: number;
  meetingName: string;
  meetingCategory: string;
  roomName: string;
  employeeName: string;
  meetingPeopleNumber: number;
  meetingDate: string;
  meetingTimeStart: string;
  meetingTimeEnd: string;
  additionalInformation: string;
  dateAdded: string;
  modificationDate: string | null;
}
