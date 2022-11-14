import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getRoomsData } from "../../redux/slices/roomsPageSlice";
import { roomDataType } from "../../types/roomDataType";
import '../../sass/pages/RoomInfoPage/RoomInfoPage.css'
import RoomInfoContent from "./components/RoomInfoContent";
import RoomInfoHeader from "./components/RoomInfoHeader";
import { getRoomTypesData } from "../../redux/slices/roomTypesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import { roomTypesSliceType } from "../../types/slices/roomTypesSliceTypes";

function RoomInfoPage() {
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);
  const roomTypesData: roomTypesSliceType = useAppSelector((state: RootState) => state.roomTypes);
  const dispatch: AppDispatch = useAppDispatch();

  const [selectedRoomData, setSelectedRoomData] = useState<roomDataType | null>(null);

  useEffect((): void => {
    if (roomsData.loading == false && roomsData.value.length > 0) {
      if (id != undefined) {
        const [selectedRoomDataElement]: roomDataType[] = roomsData.value.filter((e: roomDataType) => e.roomId == parseInt(id));

        if (selectedRoomDataElement) {
          setSelectedRoomData(selectedRoomDataElement);
        } else {
          navigate("/platform/error");
        }
      } else {
        navigate("/platform/error");
      }
    } else {
    }
  }, [roomsData.value]);

  useEffect((): void => {
    dispatch(getRoomsData());
    dispatch(getRoomTypesData());

    document.title = `${PLATFORM_NAME} - Informacje o pomieszczeniu`;
  }, []);

  return (
    <main className={roomsData.loading || roomsData.error != null || roomTypesData.loading || roomTypesData.error != null
      ? "main-room-info-page main-room-info-page--content-center"
      : "main-room-info-page"}>
      {roomsData.loading || roomTypesData.loading ? (
        <LoadingSpinner />
      ) : roomsData.error != null || roomTypesData.error != null ? (
        roomsData.error || roomTypesData.error
      ) : (
        <>
          <RoomInfoHeader selectedRoomData={selectedRoomData}/>
          <RoomInfoContent selectedRoomData={selectedRoomData}/>
        </>
      )}
    </main>
  );
}

export default RoomInfoPage;
