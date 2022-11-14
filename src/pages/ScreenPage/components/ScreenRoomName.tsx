import React from "react";
import { roomDataType } from "../../../types/roomDataType";
import { screenDataType } from "../../../types/screenDataType";

function ScreenRoomName(props: {
  loadingContent: boolean;
  roomsData: roomDataType[];
  screensData: screenDataType[];
  paramScreenId: number;
}) {
  const [roomFromScreenId]: screenDataType[] = props.screensData.filter((e: screenDataType) => e.screenId === props.paramScreenId);
  const roomName: string = roomFromScreenId ? roomFromScreenId.roomName : "";

  return (
    <div
      className={
        props.loadingContent
          ? "screen-page__room-name content-loading"
          : "screen-page__room-name content-loaded"
      }
    >
      {roomName}
    </div>
  );
}

export default ScreenRoomName;
