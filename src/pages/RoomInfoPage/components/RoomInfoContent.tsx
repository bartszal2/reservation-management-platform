import React from 'react';
import { roomDataType } from '../../../types/roomDataType';
import { dateStringToLocalString } from '../../../utils/dateStringToLocalString';

function RoomInfoContent(props: {selectedRoomData: roomDataType | null}) {

  return (
    <div className="main-room-info-page__content">
      <div className="content__element content__element--three-width">
        <div className="element__title">ID | Numer - Nazwa</div>
        <div className="element__value">{props.selectedRoomData != null ? `${props.selectedRoomData.roomId} | ${props.selectedRoomData.roomNumber} - ${props.selectedRoomData.roomName}` : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Rodzaj pomieszczenia</div>
        <div className="element__value">{props.selectedRoomData != null ? props.selectedRoomData.roomType : ''}</div>
      </div>
      <div className={props.selectedRoomData != null ? props.selectedRoomData.roomStatus ? 'content__element content__element--active' : 'content__element content__element--inactive' : 'content__element'}>
            <div className="element__title">Status pomieszczenia</div>
            <div className="element__value">{props.selectedRoomData != null ? props.selectedRoomData.roomStatus ? 'Aktywne' : 'Nieaktywne' : ''}</div>
        </div>  
      <div className="content__element">
        <div className="element__title">Ilość osób w pomieszczeniu</div>
        <div className="element__value">{props.selectedRoomData != null ? `Min. ${props.selectedRoomData.minimumRoomPeople} - Max. ${props.selectedRoomData.maximumRoomPeople}` : ''}</div>
      </div>
      <div className="content__element content__element--two-width">
        <div className="element__title">Dodatkowe informacje</div>
        <div className="element__value">{props.selectedRoomData != null ? props.selectedRoomData.additionalInformation : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Data dodania</div>
        <div className="element__value">{props.selectedRoomData != null ? dateStringToLocalString(props.selectedRoomData.dateAdded) : ''}</div>
      </div>
      <div className="content__element">
        <div className="element__title">Data modyfikacji</div>
        <div className="element__value">{props.selectedRoomData != null ? props.selectedRoomData.modificationDate != null ? dateStringToLocalString(props.selectedRoomData.modificationDate) : '' : ''}</div>
      </div>
    </div>
  )
}

export default RoomInfoContent;