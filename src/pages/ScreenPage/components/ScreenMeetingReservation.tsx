import React from "react";
import { meetingDataType } from "../../../types/meetingDataType";
import { roomDataType } from "../../../types/roomDataType";
import { screenDataType } from "../../../types/screenDataType";

function ScreenMeetingReservation(props: {
  loadingContent: boolean;
  roomsData: roomDataType[];
  screensData: screenDataType[];
  meetingsData: meetingDataType[];
  paramScreenId: number;
}) {
  const [roomFromScreenId]: screenDataType[] = props.screensData.filter((e: screenDataType) => e.screenId === props.paramScreenId);
  const roomName: string = roomFromScreenId ? roomFromScreenId.roomName : "";

  const [roomData]: roomDataType[] = props.roomsData.filter((e: roomDataType) => e.roomName === roomName);

  return (
    <div
      className={
        props.loadingContent
          ? "screen-page__meeting-reservation content-loading"
          : "screen-page__meeting-reservation content-loaded"
      }
    >
      {props.loadingContent === false ? (
        <>
          <div className="meeting-reservation__title">Jak zarezerwować pomieszczenie o nazwie '{roomData ? roomData.roomName : ''}'?</div>
          <div className="meeting-reservation__text">
            {`${roomData ? roomData.roomName : ''} to pomieszczenie kategorii '${roomData ? roomData.roomType : ''}' które może pomieścić od ${roomData ? roomData.minimumRoomPeople : ''} do ${roomData ? roomData.maximumRoomPeople : ''} osób, aby zarezerwować dane pomieszczenie zgłoś się do Administratora platformy zarządzącej rezerwacją pomieszczeń.`}
          </div>
        </>
      ) : ''}
    </div>
  );
}

export default ScreenMeetingReservation;
