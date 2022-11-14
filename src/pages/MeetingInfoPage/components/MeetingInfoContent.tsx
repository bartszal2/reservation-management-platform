import React from 'react';
import { meetingDataType } from '../../../types/meetingDataType';
import { dateStringToLocalString } from '../../../utils/dateStringToLocalString';

function MeetingInfoContent(props: {selectedMeetingData: meetingDataType | null}) {

  const checkMeetingStatus = (): string => {
    if (props.selectedMeetingData != null) {
      const meetingDate: string = props.selectedMeetingData.meetingDate;
      const meetingTimeStart: string = props.selectedMeetingData.meetingTimeStart;
      const meetingTimeEnd: string = props.selectedMeetingData.meetingTimeEnd;

      const [startHours, startMinutes]: string[] =  meetingTimeStart.split(':');
      const dateStartTime: Date = new Date(meetingDate);
      dateStartTime.setHours(parseInt(startHours));
      dateStartTime.setMinutes(parseInt(startMinutes));

      const [endHours, endMinutes]: string[] = meetingTimeEnd.split(':');
      const dateEndTime: Date = new Date(meetingDate);
      dateEndTime.setHours(parseInt(endHours));
      dateEndTime.setMinutes(parseInt(endMinutes));

      if (new Date(meetingDate) > new Date()) {
        return 'Zaplanowane'
      } else if (new Date().toDateString() == dateStartTime.toDateString()) {
        if (new Date() < dateStartTime) {
          return `Zaplanowane (dziś ${startHours}:${startMinutes})`
        } else if (new Date() >= dateStartTime && new Date() <= dateEndTime) {
          return 'W trakcie trwania'
        } else {
          return `Zakończone (dziś ${endHours}:${endMinutes})`
        }
      } else {
        return 'Zakończone'
      }
    } else {
      return ''
    }
  };
  
  const checkMeetingStatusStyle = (): string => {
    if (props.selectedMeetingData != null) {
      const meetingDate: string = props.selectedMeetingData.meetingDate;
      const meetingTimeStart: string = props.selectedMeetingData.meetingTimeStart;
      const meetingTimeEnd: string = props.selectedMeetingData.meetingTimeEnd;

      const [startHours, startMinutes]: string[] =  meetingTimeStart.split(':');
      const dateStartTime: Date = new Date(meetingDate);
      dateStartTime.setHours(parseInt(startHours));
      dateStartTime.setMinutes(parseInt(startMinutes));

      const [endHours, endMinutes]: string[] = meetingTimeEnd.split(':');
      const dateEndTime: Date = new Date(meetingDate);
      dateEndTime.setHours(parseInt(endHours));
      dateEndTime.setMinutes(parseInt(endMinutes));

      if (new Date(meetingDate) > new Date()) {
        return 'content__element content__element--inactive'
      } else if (new Date().toDateString() == dateStartTime.toDateString()) {
        if (new Date() < dateStartTime) {
          return 'content__element content__element--inactive'
        } else if (new Date() >= dateStartTime && new Date() <= dateEndTime) {
          return 'content__element content__element--active'
        } else {
          return 'content__element content__element--inactive'
        }
      } else {
        return 'content__element content__element--inactive'
      }
    } else {
      return ''
    }
  };

  return (
    <div className="main-meeting-info-page__content">
      <div className="content__element content__element--three-width">
        <div className="element__title">ID | Nazwa</div>
        <div className="element__value">{props.selectedMeetingData != null ? `${props.selectedMeetingData.meetingId} | ${props.selectedMeetingData.meetingName}` : ''}</div>
      </div>
      <div className={checkMeetingStatusStyle()}>
        <div className="element__title">Status</div>
        <div className="element__value">{checkMeetingStatus()}</div>
      </div>
      <div className="content__element content__element--two-width">
        <div className="element__title">Kategoria</div>
        <div className="element__value">{props.selectedMeetingData != null ? props.selectedMeetingData.meetingCategory : ''}</div>
      </div>
      <div className="content__element content__element--two-width">
        <div className="element__title">Pomieszczenie</div>
        <div className="element__value">{props.selectedMeetingData != null ? props.selectedMeetingData.roomName : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Data spotkania</div>
        <div className="element__value">{props.selectedMeetingData != null ? new Date(props.selectedMeetingData.meetingDate).toLocaleDateString() : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Godzina spotkania</div>
        <div className="element__value">{props.selectedMeetingData != null ? `${props.selectedMeetingData.meetingTimeStart} - ${props.selectedMeetingData.meetingTimeEnd}` : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Ilość osób</div>
        <div className="element__value">{props.selectedMeetingData != null ? props.selectedMeetingData.meetingPeopleNumber : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Organizator</div>
        <div className="element__value">{props.selectedMeetingData != null ? props.selectedMeetingData.employeeName : ''}</div>
      </div>
      <div className="content__element content__element--two-width">
        <div className="element__title">Dodatkowe informacje</div>
        <div className="element__value">{props.selectedMeetingData != null ? props.selectedMeetingData.additionalInformation : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Data dodania</div>
        <div className="element__value">{props.selectedMeetingData != null ? dateStringToLocalString(props.selectedMeetingData.dateAdded) : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Data modyfikacji</div>
        <div className="element__value">{props.selectedMeetingData != null ? props.selectedMeetingData.modificationDate != null ? dateStringToLocalString(props.selectedMeetingData.modificationDate) : '' : ''}</div>
      </div>
    </div>
  )
}

export default MeetingInfoContent;