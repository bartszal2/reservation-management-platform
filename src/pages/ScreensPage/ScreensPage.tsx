import React, { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getRoomsData } from "../../redux/slices/roomsPageSlice";
import { getScreensData, SET_SCREENS_FILTER_VALUE, SET_SCREENS_SERACH_VALUE, SET_SCREENS_SORT_VALUE } from "../../redux/slices/screensPageSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "../../sass/pages/ScreensPage/ScreensPage.css";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import { screensPageSliceType } from "../../types/slices/screensPageSliceTypes";
import ScreensContentHeader from "./components/ScreensContentHeader";
import ScreensContentTable from "./components/ScreensContentTable";
import ScreensHeader from "./components/ScreensHeader";

function ScreensPage() {
  const screensData: screensPageSliceType = useAppSelector((state: RootState) => state.screensPage);
  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(SET_SCREENS_SERACH_VALUE(''));
    dispatch(SET_SCREENS_FILTER_VALUE(''));
    dispatch(SET_SCREENS_SORT_VALUE(''));
    dispatch(getScreensData());
    dispatch(getRoomsData());
    document.title = `${PLATFORM_NAME} - Ekrany`;
  }, []);

  return (
    <main
      className={
        screensData.loading || screensData.error != null || roomsData.loading || roomsData.error != null
          ? "main-screens-page main-screens-page--content-center"
          : "main-screens-page"
      }
    >
      {screensData.loading || roomsData.loading ? (
        <LoadingSpinner />
      ) : screensData.error != null || roomsData.error != null ? (
        screensData.error || roomsData.error
      ) : (
        <>
          <ScreensHeader />
          <div className="main-screens-page__main-content">
            <ScreensContentHeader />
            <ScreensContentTable />
          </div>
        </>
      )}
    </main>
  );
}

export default ScreensPage;
