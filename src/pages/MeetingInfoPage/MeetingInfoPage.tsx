import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEmployeeresData } from "../../redux/slices/employeeresPageSlice";
import { getMeetingCategoriesData } from "../../redux/slices/meetingCategoriesSlice";
import { getMeetingsData } from "../../redux/slices/meetingsPageSlice";
import { getRoomsData } from "../../redux/slices/roomsPageSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "../../sass/pages/MeetingInfoPage/MeetingInfoPage.css";
import { meetingDataType } from "../../types/meetingDataType";
import { employeeresPageSliceType } from "../../types/slices/employeeresPageSliceTypes";
import { meetingCategoriesSliceType } from "../../types/slices/meetingCategoriesSliceTypes";
import { meetingsPageSliceType } from "../../types/slices/meetingsPageSliceTypes";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import MeetingInfoContent from "./components/MeetingInfoContent";
import MeetingInfoHeader from "./components/MeetingInfoHeader";

function MeetingInfoPage() {
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);
  const meetingCategoriesData: meetingCategoriesSliceType = useAppSelector((state: RootState) => state.meetingCategories);
  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);
  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);
  const dispatch: AppDispatch = useAppDispatch();

  const [selectedMeetingData, setSelectedMeetingData] = useState<meetingDataType | null>(null);

  useEffect((): void => {
    if (meetingsData.loading == false && meetingsData.value.length > 0) {
      if (id != undefined) {
        const [selectedMeetingData]: meetingDataType[] = meetingsData.value.filter((e: meetingDataType) => e.meetingId == parseInt(id));

        if (selectedMeetingData) {
          setSelectedMeetingData(selectedMeetingData);
        } else {
          navigate("/platform/error");
        }
      } else {
        navigate("/platform/error");
      }
    } else {
    }
  }, [meetingsData.value]);

  useEffect((): void => {
    dispatch(getMeetingsData());
    dispatch(getMeetingCategoriesData());
    dispatch(getRoomsData());
    dispatch(getEmployeeresData());
    document.title = `${PLATFORM_NAME} - Informacje o spotkaniu`;
  }, []);

  return (
    <main className={meetingsData.loading || meetingsData.error != null || meetingCategoriesData.loading || meetingCategoriesData.error != null || roomsData.loading || roomsData.error != null || employeeresData.loading || employeeresData.error != null
      ? "main-meeting-info-page main-meeting-info-page--content-center"
      : "main-meeting-info-page"}>
      {meetingsData.loading || meetingCategoriesData.loading || roomsData.loading || employeeresData.loading ? (
        <LoadingSpinner />
      ) : meetingsData.error != null || meetingCategoriesData.error != null || roomsData.error != null || employeeresData.error != null ? (
        meetingsData.error || meetingCategoriesData.error || roomsData.error || employeeresData.error
      ) : (
        <>
          <MeetingInfoHeader selectedMeetingData={selectedMeetingData}/>
          <MeetingInfoContent selectedMeetingData={selectedMeetingData}/>
        </>
      )}
    </main>
  );
}

export default MeetingInfoPage;
