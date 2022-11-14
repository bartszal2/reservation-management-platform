import React, { useEffect, useState } from "react";
import { meetingDataType } from "../../../types/meetingDataType";
import { roomDataType } from "../../../types/roomDataType";
import { screenDataType } from "../../../types/screenDataType";
import { convertDateAndTimeStringToDate } from "../../../utils/convertDateAndTimeStringToDate";
import { shortenedTextFormat } from "../../../utils/shortenedTextFormat";

function ScreenRoomStatus(props: {loadingContent: boolean, roomsData: roomDataType[], screensData: screenDataType[], meetingsData: meetingDataType[], paramScreenId: number;}) {

  const [roomFromScreenId]: screenDataType[] = props.screensData.filter((e: screenDataType) => e.screenId === props.paramScreenId);
  const roomName: string = roomFromScreenId ? roomFromScreenId.roomName : "";

  interface dateTimeUpdate {
    meetingStartISOString: string;
    meetingEndISOString: string;
  }

  const [dateTimeUpdate, setDateTimeUpdate] = useState<dateTimeUpdate>({
    meetingStartISOString: '',
    meetingEndISOString: ''
  });

  const [meetingElement, setMeetingElement] = useState<any>({});
  const [currentDateTimeValue, setCurrentDateTime] = useState(new Date());

  const getCurrentMeetingElement = (): void => {
    const roomMeetingsData: meetingDataType[] = props.meetingsData.filter((e: meetingDataType) => e.roomName === roomName);
    
    const currentMeetingsData: meetingDataType[] = roomMeetingsData.filter((e: meetingDataType) => (new Date(e.meetingDate).toLocaleDateString() === new Date().toLocaleDateString() && convertDateAndTimeStringToDate(e.meetingDate, e.meetingTimeStart).getTime() <= new Date().getTime()) && convertDateAndTimeStringToDate(e.meetingDate, e.meetingTimeEnd).getTime() >= new Date().getTime());

    currentMeetingsData.sort((a, b) => convertDateAndTimeStringToDate(a.meetingDate, a.meetingTimeStart).getTime() - convertDateAndTimeStringToDate(b.meetingDate, b.meetingTimeStart).getTime());

    const plannedMeetingsData: meetingDataType[] = roomMeetingsData.filter((e: meetingDataType) => convertDateAndTimeStringToDate(e.meetingDate, e.meetingTimeStart).getTime() >= new Date().getTime());

    plannedMeetingsData.sort((a, b) => convertDateAndTimeStringToDate(a.meetingDate, a.meetingTimeStart).getTime() - convertDateAndTimeStringToDate(b.meetingDate, b.meetingTimeStart).getTime());

    if (currentMeetingsData.length > 0) {
      const [currentMeetingElement]: meetingDataType[] = currentMeetingsData;

      setDateTimeUpdate(
        {
          meetingStartISOString: convertDateAndTimeStringToDate(currentMeetingElement.meetingDate, currentMeetingElement.meetingTimeStart).toISOString(),
          meetingEndISOString: convertDateAndTimeStringToDate(currentMeetingElement.meetingDate, currentMeetingElement.meetingTimeEnd).toISOString()
        }
      );
      setMeetingElement(currentMeetingElement);

    } else {
      
      if (plannedMeetingsData.length > 0) {
        const [plannedMeetingElement]: meetingDataType[] = plannedMeetingsData;

        const currentMeetingStartISOString: string = convertDateAndTimeStringToDate(plannedMeetingElement.meetingDate, plannedMeetingElement.meetingTimeStart).toISOString();
        const currentMeetingEndISOString: string = convertDateAndTimeStringToDate(plannedMeetingElement.meetingDate, plannedMeetingElement.meetingTimeEnd).toISOString();

        setDateTimeUpdate(
          {
            meetingStartISOString: currentMeetingStartISOString,
            meetingEndISOString: currentMeetingEndISOString
          }
        );
        setMeetingElement({});
        
      } else {
        setDateTimeUpdate(
          {
            meetingStartISOString: '',
            meetingEndISOString: ''
          }
        );
        setMeetingElement({});
      }
    }
  }

  const convertMilisecondsToTime = (value: number): string => {
    const ms: number = value % 1000;
    value = (value - ms) / 1000;
    const sec: number = value % 60;
    value = (value - sec) / 60;
    const min: number = value % 60;
    const hr: number = (value - min) / 60;

    return hr + 'h ' + min + 'm ' + sec + 's';
  }

  const percentToEnd = (): number | string => {
    if (Object.keys(meetingElement).length > 0) {
      const startDateValue: Date = convertDateAndTimeStringToDate(meetingElement.meetingDate, meetingElement.meetingTimeStart);
      const endDateValue: Date = convertDateAndTimeStringToDate(meetingElement.meetingDate, meetingElement.meetingTimeEnd);

      const currentTimeMiliseconds: number = currentDateTimeValue.getHours() * 1000 * 60 * 60 + currentDateTimeValue.getMinutes() * 1000 * 60 + currentDateTimeValue.getSeconds() * 1000;
      const startTimeMiliseconds: number = startDateValue.getHours() * 1000 * 60 * 60 + startDateValue.getMinutes() * 1000 * 60 + startDateValue.getSeconds() * 1000;
      const endTimeMiliseconds: number = endDateValue.getHours() * 1000 * 60 * 60 + endDateValue.getMinutes() * 1000 * 60 + endDateValue.getSeconds() * 1000 ;

      const result = (((currentTimeMiliseconds - startTimeMiliseconds) / (endTimeMiliseconds - startTimeMiliseconds)) * 100);

      return result > 100 ? 100 : result
    } else {
      return 0
    }
  }

  const countDownTime = () => {
    if (Object.keys(meetingElement).length > 0) {
      let result: number = convertDateAndTimeStringToDate(meetingElement.meetingDate, meetingElement.meetingTimeEnd).getTime() - currentDateTimeValue.getTime();
      result = result < 0 ? 0 : result;

      return convertMilisecondsToTime(result)
    } else {
      return 0
    }
  }

  useEffect((): void => {
    getCurrentMeetingElement();
  }, [props.loadingContent, props.paramScreenId]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentDateTime(new Date());

      const currentDateTimeValue = new Date();
      currentDateTimeValue.setMilliseconds(0);

      if (currentDateTimeValue.toISOString() == dateTimeUpdate.meetingStartISOString || currentDateTimeValue.toISOString() == dateTimeUpdate.meetingEndISOString) {
        getCurrentMeetingElement();
      }
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [dateTimeUpdate]);

  return (
    <div
      className={
        props.loadingContent
          ? "screen-page__room-status content-loading"
          : "screen-page__room-status content-loaded"
      }
    >
      
      {
        props.loadingContent
          ? ''
          : Object.keys(meetingElement).length > 0
            ? <div className="room-status__block room-status__block--busy">
              <div className="block__text block__text--busy">ZAJĘTE</div>
              <div className="block__name">{meetingElement.meetingName}</div>
              <div className="block__description">{shortenedTextFormat(meetingElement.additionalInformation, 45)}</div>
              <div className="block__group">
                <div className="group__element">Data spotkania: {new Date(meetingElement.meetingDate).toLocaleDateString()}</div>
                <div className="group__element">Kategoria: {meetingElement.meetingCategory}</div>
                <div className="group__element">Ilość osób: {meetingElement.meetingPeopleNumber}</div>
                <div className="group__element">Organizator: {meetingElement.employeeName}</div>
              </div>
              <div className="block__progress-bar">
                <div className="progress-bar__time-start">{meetingElement.meetingTimeStart}</div>
                <div className="progress-bar__value" style={{width: percentToEnd() + "%"}}></div>
                <div className="progress-bar__time-end">{meetingElement.meetingTimeEnd}</div>
              </div>
              <div className="block__countdown">
                <div className="countdown__text">Do końca spotkania pozostało</div>
                <div className="coutdown__value">{countDownTime()}</div>
              </div>            
            </div>
            : <div className="room-status__block room-status__block--free">
                <div className="block__text block__text--free">WOLNE</div>
              </div>
      }
    </div>
  );
}

export default ScreenRoomStatus;
