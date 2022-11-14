import React, { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getRoomsData, SET_ROOMS_FILTER_VALUE, SET_ROOMS_SERACH_VALUE, SET_ROOMS_SORT_VALUE } from "../../redux/slices/roomsPageSlice";
import { getRoomTypesData } from "../../redux/slices/roomTypesSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "../../sass/pages/RoomsPage/RoomsPage.css";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import { roomTypesSliceType } from "../../types/slices/roomTypesSliceTypes";
import RoomsContentHeader from "./components/RoomsContentHeader";
import RoomsContentTable from "./components/RoomsContentTable";
import RoomsHeader from "./components/RoomsHeader";

function RoomsPage() {
  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);
  const roomTypesData: roomTypesSliceType = useAppSelector((state: RootState) => state.roomTypes);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(SET_ROOMS_SERACH_VALUE(''));
    dispatch(SET_ROOMS_FILTER_VALUE(''));
    dispatch(SET_ROOMS_SORT_VALUE(''));
    dispatch(getRoomsData());
    dispatch(getRoomTypesData());
    document.title = `${PLATFORM_NAME} - Pomieszczenia`;
  }, []);

  return (
    <main
      className={
        roomsData.loading || roomsData.error != null || roomTypesData.loading || roomTypesData.error != null
          ? "main-rooms-page main-rooms-page--content-center"
          : "main-rooms-page"
      }
    >
      {roomsData.loading || roomTypesData.loading ? (
        <LoadingSpinner />
      ) : roomsData.error != null || roomTypesData.error != null ? (
        roomsData.error || roomTypesData.error
      ) : (
        <>
          <RoomsHeader />
          <div className="main-rooms-page__main-content">
            <RoomsContentHeader />
            <RoomsContentTable />
          </div>
        </>
      )}
    </main>
  );
}

export default RoomsPage;
