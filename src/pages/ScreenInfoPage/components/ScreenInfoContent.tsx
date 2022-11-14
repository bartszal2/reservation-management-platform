import React from 'react';
import { screenDataType } from '../../../types/screenDataType';
import { dateStringToLocalString } from '../../../utils/dateStringToLocalString';

function ScreenInfoContent(props: {selectedScreenData: screenDataType | null}) {

    return (
        <div className="main-screen-info-page__content">
          <div className="content__element content__element--three-width">
            <div className="element__title">ID | Nazwa</div>
            <div className="element__value">{props.selectedScreenData != null ? `${props.selectedScreenData.screenId} | ${props.selectedScreenData.screenName}` : ''}</div>
          </div>
          <div className={props.selectedScreenData != null ? props.selectedScreenData.screenStatus ? 'content__element content__element--active' : 'content__element content__element--inactive' : 'content__element'}>
            <div className="element__title">Status ekranu</div>
            <div className="element__value">{props.selectedScreenData != null ? props.selectedScreenData.screenStatus ? 'Aktywny' : 'Nieaktywny' : ''}</div>
        </div>  
        <div className="content__element">
            <div className="element__title">Rodzaj ekranu</div>
            <div className="element__value">{props.selectedScreenData != null ? props.selectedScreenData.screenType == "horizontal" ? 'Poziomo' : 'Pionowo' : ''}</div>
        </div>  
        <div className="content__element content__element--two-width">
            <div className="element__title">Lokalizacja ekranu</div>
            <div className="element__value">{props.selectedScreenData != null ? props.selectedScreenData.screenLocation : ''}</div>
        </div>  
          <div className="content__element">
            <div className="element__title">Nazwa pomieszczenia</div>
            <div className="element__value">{props.selectedScreenData != null ? props.selectedScreenData.roomName : ''}</div>
        </div>  
          <div className="content__element content__element--two-width">
            <div className="element__title">Dodatkowe informacje</div>
            <div className="element__value">{props.selectedScreenData != null ? props.selectedScreenData.additionalInformation : ''}</div>
        </div>          
          <div className="content__element">
            <div className="element__title">Data dodania</div>
            <div className="element__value">{props.selectedScreenData != null ? dateStringToLocalString(props.selectedScreenData.dateAdded) : ''}</div>
        </div>
        <div className="content__element">
            <div className="element__title">Data modyfikacji</div>
            <div className="element__value">{props.selectedScreenData != null ? props.selectedScreenData.modificationDate != null ? dateStringToLocalString(props.selectedScreenData.modificationDate) : '' : ''}</div>
        </div>
        </div>
      )
}

export default ScreenInfoContent;