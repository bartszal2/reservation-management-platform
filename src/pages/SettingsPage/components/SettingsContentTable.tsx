import React, { useEffect } from 'react';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { EMPLOYEE_POSITIONS_LSTORAGE_NAME, MEETING_CATEGORIES_LSTORAGE_NAME, ROOM_TYPES_LSTORAGE_NAME } from '../../../data/staticPlatformData';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { getEmployeePositionsData } from '../../../redux/slices/employeePositionsSlice';
import { getMeetingCategoriesData } from '../../../redux/slices/meetingCategoriesSlice';
import { getRoomTypesData } from '../../../redux/slices/roomTypesSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { employeePositionsSliceType } from '../../../types/slices/employeePositionsSliceTypes';
import { meetingCategoriesSliceType } from '../../../types/slices/meetingCategoriesSliceTypes';
import { roomTypesSliceType } from '../../../types/slices/roomTypesSliceTypes';
import { saveToLocalstorage } from '../../../utils/saveToLocalStorage';
import EmployeePositionsBlock from './components/EmployeePositionsBlock';
import MeetingCategoriesBlock from './components/MeetingCategoriesBlock';
import RoomTypesBlock from './components/RoomTypesBlock';

function SettingsContentTable() {
  const meetingsCategoriesData: meetingCategoriesSliceType = useAppSelector((state: RootState) => state.meetingCategories);
  const roomTypesData: roomTypesSliceType = useAppSelector((state: RootState) => state.roomTypes);
  const employeePositionsData: employeePositionsSliceType = useAppSelector((state: RootState) => state.employeePositions);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(getMeetingCategoriesData())
    dispatch(getRoomTypesData())
    dispatch(getEmployeePositionsData())
  }, []);

  useEffect((): void => {
    !meetingsCategoriesData.loading && saveToLocalstorage(MEETING_CATEGORIES_LSTORAGE_NAME, meetingsCategoriesData.value);
  }, [meetingsCategoriesData.value]);

  useEffect((): void => {
    !roomTypesData.loading && saveToLocalstorage(ROOM_TYPES_LSTORAGE_NAME, roomTypesData.value);
  }, [roomTypesData.value]);

  useEffect((): void => {
    !employeePositionsData.loading && saveToLocalstorage(EMPLOYEE_POSITIONS_LSTORAGE_NAME, employeePositionsData.value);
  }, [employeePositionsData.value]);
  

  return (
    <div className="content__container">
        <div className={meetingsCategoriesData.loading || meetingsCategoriesData.error != null ? "container__block container__block--content-center" : "container__block"}>
          {meetingsCategoriesData.loading ? <LoadingSpinner/> : meetingsCategoriesData.error != null ? meetingsCategoriesData.error : <MeetingCategoriesBlock meetingsCategoriesData={meetingsCategoriesData.value}/>}
        </div>

        <div className={roomTypesData.loading || roomTypesData.error != null ? "container__block container__block--content-center" : "container__block"}>
          {roomTypesData.loading ? <LoadingSpinner/> : roomTypesData.error != null ? roomTypesData.error : <RoomTypesBlock roomTypesData={roomTypesData.value}/>}
        </div>
        
        <div className={employeePositionsData.loading || employeePositionsData.error != null ? "container__block container__block--content-center" : "container__block"}>
          {employeePositionsData.loading ? <LoadingSpinner/> : employeePositionsData.error != null ? employeePositionsData.error : <EmployeePositionsBlock employeePositionsData={employeePositionsData.value}/>}
        </div>
    </div>
  )
}

export default SettingsContentTable;