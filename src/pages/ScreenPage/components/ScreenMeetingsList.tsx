import React, { useEffect, useState } from "react";
import { meetingDataType } from "../../../types/meetingDataType";
import { roomDataType } from "../../../types/roomDataType";
import { screenDataType } from "../../../types/screenDataType";
import { convertDateAndTimeStringToDate } from "../../../utils/convertDateAndTimeStringToDate";
import { shortenedTextFormat } from "../../../utils/shortenedTextFormat";

function ScreenMeetingsList(props: { loadingContent: boolean; roomsData: roomDataType[]; screensData: screenDataType[]; meetingsData: meetingDataType[]; paramScreenId: number}) {

  const [dateTimeUpdate, setDateTimeUpdate] = useState({
    meetingStartISOString: '',
    meetingEndISOString: ''
  });

  const [roomMeetingsData, setRoomsMeetingsData] = useState<meetingDataType[]>([]);

  const [roomFromScreenId]: screenDataType[] = props.screensData.filter((e: screenDataType) => e.screenId === props.paramScreenId);
  const roomName: string = roomFromScreenId ? roomFromScreenId.roomName : "";

  const getRoomMeetingsData = (): void => {
    const roomMeetingsData: meetingDataType[] = props.meetingsData.filter((e: meetingDataType) => e.roomName === roomName);
    
    const currentMeetingsData: meetingDataType[] = roomMeetingsData.filter((e: meetingDataType) => (new Date(e.meetingDate).toLocaleDateString() === new Date().toLocaleDateString() && convertDateAndTimeStringToDate(e.meetingDate, e.meetingTimeStart).getTime() <= new Date().getTime()) && convertDateAndTimeStringToDate(e.meetingDate, e.meetingTimeEnd).getTime() >= new Date().getTime());

    const plannedMeetingsData: meetingDataType[] = roomMeetingsData.filter((e: meetingDataType) => convertDateAndTimeStringToDate(e.meetingDate, e.meetingTimeStart).getTime() >= new Date().getTime());

    const data: meetingDataType[] = [...currentMeetingsData, ...plannedMeetingsData];

    data.sort((a, b) => convertDateAndTimeStringToDate(a.meetingDate, a.meetingTimeStart).getTime() - convertDateAndTimeStringToDate(b.meetingDate, b.meetingTimeStart).getTime());

    if (data.length > 0) {

      const [meetingElement]: meetingDataType[] = data;

      const currentMeetingStartISOString: string = convertDateAndTimeStringToDate(meetingElement.meetingDate, meetingElement.meetingTimeStart).toISOString();
      const currentMeetingEndISOString: string = convertDateAndTimeStringToDate(meetingElement.meetingDate, meetingElement.meetingTimeEnd).toISOString();

      setDateTimeUpdate(
        {
          meetingStartISOString: currentMeetingStartISOString, 
          meetingEndISOString: currentMeetingEndISOString
        }
      );
      setRoomsMeetingsData(data);

    } else {
      setDateTimeUpdate(
        {
          meetingStartISOString: '',
          meetingEndISOString: ''
        }
      );
      setRoomsMeetingsData(data);
    }
  }

  const statusMeeting = (meetingDate: string, meetingTimeStart: string, meetingTimeEnd: string): boolean => {
    const meetingDateTimeStart: Date = convertDateAndTimeStringToDate(meetingDate, meetingTimeStart);
    const meetingDateTimeEnd: Date = convertDateAndTimeStringToDate(meetingDate, meetingTimeEnd);

    if (new Date().getTime() >= meetingDateTimeStart.getTime() && new Date().getTime() <= meetingDateTimeEnd.getTime()) {
      return true
    } else {
      return false
    }

  }

  const data = roomMeetingsData.map((e: meetingDataType): JSX.Element => (
    <div key={e.meetingId} className={statusMeeting(e.meetingDate, e.meetingTimeStart, e.meetingTimeEnd) ? 'meetings-list__meeting meetings-list__meeting--active' : 'meetings-list__meeting'}>
          <div className="meeting__group">
            {
              statusMeeting(e.meetingDate, e.meetingTimeStart, e.meetingTimeEnd) ? (<div className="group__status">Aktualnie</div>) : null
            }
            <div className="group__name">{e.meetingName}</div>
            <div className="group__description">{shortenedTextFormat(e.additionalInformation)}</div>  
          </div>
          <div className="meeting__category">{e.meetingCategory}</div>
          <div className="meeting__date">{new Date(e.meetingDate).toLocaleDateString()}</div>
          <div className="meeting__time">{e.meetingTimeStart} - {e.meetingTimeEnd}</div>
          <div className="meeting__employee">{e.employeeName}</div>
      </div>
  ))

  useEffect((): void => {
    getRoomMeetingsData();
  }, [props.loadingContent, props.paramScreenId]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const currentDateTimeValue = new Date();
      currentDateTimeValue.setMilliseconds(0);
      
      if (currentDateTimeValue.toISOString() == dateTimeUpdate.meetingStartISOString || currentDateTimeValue.toISOString() == dateTimeUpdate.meetingEndISOString) {
        getRoomMeetingsData();
      }

    }, 1000);

    return () => clearInterval(timeInterval);
  }, [dateTimeUpdate]);

  return (
    <div
      className={
        props.loadingContent
          ? "screen-page__meetings-list content-loading"
          : "screen-page__meetings-list content-loaded"
      }
    >
      {roomMeetingsData.length > 0 && props.meetingsData.length > 0
        ?   <>
                <div className="meetings-list__title">Najbliższe spotkania</div>
                {data}
            </> 
        : props.loadingContent ? '' : <div className="meetings-list__error">Brak danych do wyświetlenia</div> }
    </div>
  );
}

export default ScreenMeetingsList;
