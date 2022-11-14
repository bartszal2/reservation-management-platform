import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEmployeeresData } from "../../redux/slices/employeeresPageSlice";
import { getMeetingCategoriesData } from "../../redux/slices/meetingCategoriesSlice";
import { getMeetingsData, SET_MEETINGS_FILTER_VALUE, SET_MEETINGS_SERACH_VALUE, SET_MEETINGS_SORT_VALUE } from "../../redux/slices/meetingsPageSlice";
import { getRoomsData } from "../../redux/slices/roomsPageSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "../../sass/pages/MeetingsPage/MeetingsPage.css";
import { employeeresPageSliceType } from "../../types/slices/employeeresPageSliceTypes";
import { meetingCategoriesSliceType } from "../../types/slices/meetingCategoriesSliceTypes";
import { meetingsPageSliceType } from "../../types/slices/meetingsPageSliceTypes";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import MeetingsContentHeader from "./components/MeetingsContentHeader";
import MeetingsContentTable from "./components/MeetingsContentTable";
import MeetingsHeader from "./components/MeetingsHeader";

function MeetingsPage() {
  const { value } = useParams();

  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);
  const meetingCategoriesData: meetingCategoriesSliceType = useAppSelector((state: RootState) => state.meetingCategories);
  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);
  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(SET_MEETINGS_SERACH_VALUE(''));
    dispatch(SET_MEETINGS_FILTER_VALUE('default'));
    dispatch(SET_MEETINGS_SORT_VALUE('default'));
    dispatch(getMeetingsData());
    dispatch(getRoomsData());
    dispatch(getEmployeeresData());
    dispatch(getMeetingCategoriesData());

    if (value) dispatch(SET_MEETINGS_SERACH_VALUE(value))

    document.title = `${PLATFORM_NAME} - Spotkania`;
  }, []);

  return (
    <main
      className={
        meetingsData.loading || meetingsData.error != null || 
        roomsData.loading || roomsData.error != null || 
        employeeresData.loading || employeeresData.error != null || meetingCategoriesData.loading || meetingCategoriesData.error != null
          ? "main-meetings-page main-meetings-page--content-center"
          : "main-meetings-page"
      }
    >
      {meetingsData.loading || 
      roomsData.loading || 
      employeeresData.loading || meetingCategoriesData.loading ? (
        <LoadingSpinner />
      ) : meetingsData.error != null || 
      roomsData.error != null || 
      employeeresData.error != null || meetingCategoriesData.error != null  ? (
        meetingsData.error || 
        roomsData.error || 
        employeeresData.error || meetingCategoriesData.error
      ) : (
        <>
          <MeetingsHeader />
          <div className="main-meetings-page__main-content">
            <MeetingsContentHeader />
            <MeetingsContentTable />
          </div>
        </>
      )}
    </main>
  );
}

export default MeetingsPage;
