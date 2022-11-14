import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MEETINGS_LSTORAGE_NAME } from "../../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from "../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { meetingDataType } from "../../../types/meetingDataType";
import { meetingsFilterValueType, meetingsPageSliceType, meetingsSortValueType } from "../../../types/slices/meetingsPageSliceTypes";
import { convertDateAndTimeStringToMiliseconds } from "../../../utils/convertDateAndTimeStringToMiliseconds";
import { dateStringToDateLocalString } from "../../../utils/dateStringToDateLocalString";
import { saveToLocalstorage } from "../../../utils/saveToLocalStorage";
import { shortenedTextFormat } from "../../../utils/shortenedTextFormat";

function MeetingsContentTable() {
  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);

  const meetingsPageSearchValue: string = meetingsData.pageData.searchValue;
  const meetingsPageFilterValue: meetingsFilterValueType = meetingsData.pageData.filterValue;
  const meetingsPageSortValue: meetingsSortValueType = meetingsData.pageData.sortValue;

  const dispatch: AppDispatch = useAppDispatch();

  const [currentDate, setCurrentDate] = useState(new Date());

  const checkMeetingStatus = (meetingDate: string, meetingTimeStart: string, meetingTimeEnd: string): string => {
    const startMeetingMiliseconds: number = convertDateAndTimeStringToMiliseconds(meetingDate, meetingTimeStart);
    const endMeetingMiliseconds: number = convertDateAndTimeStringToMiliseconds(meetingDate, meetingTimeEnd);

    const startCurrentDateMiliseconds: number = convertDateAndTimeStringToMiliseconds(new Date(), "00:00:00");
    const currentDateMiliseconds: number = currentDate.getTime();
    const endCurrentDateMiliseconds: number = convertDateAndTimeStringToMiliseconds(new Date(), "23:59:59");

    if (endMeetingMiliseconds < startCurrentDateMiliseconds) {
      return `Zakończone`

    } else if (startMeetingMiliseconds >= startCurrentDateMiliseconds && endMeetingMiliseconds <= endCurrentDateMiliseconds) {
      if (endMeetingMiliseconds < currentDateMiliseconds) {
        return `Zakończone (dziś ${meetingTimeEnd})`

      } else if (startMeetingMiliseconds > currentDateMiliseconds && endMeetingMiliseconds > currentDateMiliseconds) {
        return `Zaplanowane (dziś ${meetingTimeStart})`
        
      } else {
        return `W trakcie trwania`
      }
    } else {
      return `Zaplanowane`
    }
  }

  const checkMeetingStatusStyle = (meetingDate: string, meetingTimeStart: string, meetingTimeEnd: string): string => {
    const startMeetingMiliseconds: number = convertDateAndTimeStringToMiliseconds(meetingDate, meetingTimeStart);
    const endMeetingMiliseconds: number = convertDateAndTimeStringToMiliseconds(meetingDate, meetingTimeEnd);

    const startCurrentDateMiliseconds: number = convertDateAndTimeStringToMiliseconds(new Date(), "00:00:00");
    const currentDateMiliseconds: number = currentDate.getTime();
    const endCurrentDateMiliseconds: number = convertDateAndTimeStringToMiliseconds(new Date(), "23:59:59");

    if (endMeetingMiliseconds < startCurrentDateMiliseconds) {
      return 'td__status-inactive'

    } else if (startMeetingMiliseconds >= startCurrentDateMiliseconds && endMeetingMiliseconds <= endCurrentDateMiliseconds) {
      if (endMeetingMiliseconds < currentDateMiliseconds) {
        return 'td__status-inactive'

      } else if (startMeetingMiliseconds > currentDateMiliseconds && endMeetingMiliseconds > currentDateMiliseconds) {
        return 'td__status-inactive'
        
      } else {
        return 'td__status-active'
      }
    } else {
      return 'td__status-inactive'
    }
  };

  const editSelectedMeeting = (meetingElement: meetingDataType): void => {
    dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-meeting', element: meetingElement}));
  };

  const deleteSelectedMeeting = (meetingId: number): void => {
    const [meetingElement]: meetingDataType[] = meetingsData.value.filter((e: meetingDataType) => e.meetingId === meetingId);
    const meetingElementIndex: number = meetingsData.value.indexOf(meetingElement);
    dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'meetingsData', index: (meetingElementIndex)}));
  };

  const getDataViewSearchValue = (data: meetingDataType[]): meetingDataType[] => {
    const newData: meetingDataType[] = data.filter((e: meetingDataType) => e.meetingName.toUpperCase().includes(meetingsPageSearchValue.toUpperCase()));
    return newData;
  };

  const getDataViewFitlering = (data: meetingDataType[]): meetingDataType[] => {
    switch (meetingsPageFilterValue) {
      case "meetings-active":
        const dataMeetingsActive: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate).toDateString() === new Date().toDateString());
        return dataMeetingsActive

      case "meetings-planned":
        const dataMeetingsPlanned: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate) > new Date());
        return dataMeetingsPlanned
      
      case "meetings-ended":
        const dataMeetingsEnded: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate) < new Date(new Date().setDate(new Date().getDate() - 1)));
        return dataMeetingsEnded

      default:
        return data
    }
  };

  const currentDateTimeStart: Date = new Date();
  currentDateTimeStart.setHours(0);
  currentDateTimeStart.setMinutes(0);
  currentDateTimeStart.setSeconds(0);

  const currentDateTimeEnd: Date = new Date();
  currentDateTimeEnd.setHours(23);
  currentDateTimeEnd.setMinutes(59);
  currentDateTimeEnd.setMilliseconds(59);

  const getDataViewSort = (data: meetingDataType[]): meetingDataType[] => {
    switch (meetingsPageSortValue) {
      case "name-meeting-sort-up":
        const dataNameMeetingsSortUp: meetingDataType[] = data.sort((a, b) => a.meetingName.localeCompare(b.meetingName));
        return dataNameMeetingsSortUp

      case "name-meeting-sort-down":
        const dataNameMeetingsSortDown: meetingDataType[] = data.sort((a, b) => b.meetingName.localeCompare(a.meetingName));
        return dataNameMeetingsSortDown

      case "oldest-meetings":
        const dataOldestMeetings: meetingDataType[] = data.sort((a, b) => Date.parse(a.meetingDate) - Date.parse(b.meetingDate));
        return dataOldestMeetings

      case "latest-meetings":
        const dataLatestMeetings: meetingDataType[] = data.sort((a, b) => Date.parse(b.meetingDate) - Date.parse(a.meetingDate));
        return dataLatestMeetings

      default:
        const currentDayActiveMeetings: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate).toDateString() === new Date().toDateString() && convertDateAndTimeStringToMiliseconds(e.meetingDate, e.meetingTimeStart) <= new Date().getTime() && convertDateAndTimeStringToMiliseconds(e.meetingDate, e.meetingTimeEnd) >= new Date().getTime());

        const currentDayOtherMeetings: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate).toDateString() === new Date().toDateString() && !(currentDayActiveMeetings.includes(e)))

        const plannedMeetings: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate).getTime() > currentDateTimeEnd.getTime());

        const endedMeetings: meetingDataType[] = data.filter((e: meetingDataType) => new Date(e.meetingDate).getTime() < currentDateTimeStart.getTime());
        
        const defaultSortData: meetingDataType[] = [...currentDayActiveMeetings, ...currentDayOtherMeetings, ...plannedMeetings, ...endedMeetings];
        return defaultSortData
    }    
  };

  const getMeetingsList = (): meetingDataType[] => {
    let data: meetingDataType[];
    data = getDataViewSearchValue(meetingsData.value);
    data = getDataViewFitlering(data);
    data = getDataViewSort(data);

    return data
  };

  const data: meetingDataType[] = getMeetingsList();

  const meetingsDataTable = data.map((e: meetingDataType): JSX.Element => {
    return (
      <tr className="table-tr" key={e.meetingId}>
      <td className="table-td">{e.meetingId}</td>
      <td className="table-td">
        <div className={checkMeetingStatusStyle(e.meetingDate, e.meetingTimeStart, e.meetingTimeEnd)}>
          {checkMeetingStatus(e.meetingDate, e.meetingTimeStart, e.meetingTimeEnd)}
        </div>
      </td>
      <td className="table-td table-td--long-text-secondary table-td--primary-style">{e.meetingName}</td>
      <td className="table-td">{e.meetingCategory}</td>
      <td className="table-td table-td--long-text-secondary">{e.roomName}</td>
      <td className="table-td">{dateStringToDateLocalString(e.meetingDate)}</td>
      <td className="table-td">{e.meetingTimeStart} - {e.meetingTimeEnd}</td>
      <td className="table-td">{e.meetingPeopleNumber}</td>
      <td className="table-td">{e.employeeName}</td>
      <td className="table-td table-td--long-text-primary table-td--secondary-style">{shortenedTextFormat(e.additionalInformation)}
      </td>
      <td className="table-td">{dateStringToDateLocalString(e.dateAdded)}</td>
      <td className="table-td">
        <div className="table__buttons-container">
          <NavLink to={`/platform/meetings/meeting/${e.meetingId}`}>
            <div className="table-button">
              <span className="material-symbols-outlined">visibility</span>
            </div>
          </NavLink>
          <div className="table-button" onClick={() => {editSelectedMeeting(e)}}>
            <span className="material-symbols-outlined">edit</span>
          </div>
          <div className="table-button" onClick={() => {deleteSelectedMeeting(e.meetingId)}}>
            <span className="material-symbols-outlined">delete</span>
          </div>
        </div>
      </td>
    </tr>
    )
  });

  useEffect((): void => {
      getMeetingsList()
  }, [meetingsPageSearchValue, meetingsPageFilterValue, meetingsPageSortValue]);

  useEffect((): void => {
    if (!meetingsData.loading) {
    saveToLocalstorage(MEETINGS_LSTORAGE_NAME, meetingsData.value);
    } 
  }, [meetingsData.value]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main-content__table-container">
      <table className="table-container__table">
        <thead>
          <tr>
            <th className="table-th">ID</th>
            <th className="table-th">Status</th>
            <th className="table-th">Nazwa spotkania</th>
            <th className="table-th">Rodzaj spotkania</th>
            <th className="table-th">Pomieszczenie</th>
            <th className="table-th">Data spotkania</th>
            <th className="table-th">Godzina spotkania</th>
            <th className="table-th">Ilość osób</th>
            <th className="table-th">Organizator</th>
            <th className="table-th">Dodatkowe informacje</th>
            <th className="table-th">Data dodania</th>
            <th className="table-th">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {meetingsDataTable}
        </tbody>
      </table>
    </div>
  );
}

export default MeetingsContentTable;
