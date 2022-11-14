export interface roomDataType {
  roomId: number;
  roomName: string;
  roomNumber: string;
  minimumRoomPeople: number;
  maximumRoomPeople: number;
  roomStatus: boolean;
  roomType: string;
  additionalInformation: string;
  dateAdded: string;
  modificationDate: string | null;
}
