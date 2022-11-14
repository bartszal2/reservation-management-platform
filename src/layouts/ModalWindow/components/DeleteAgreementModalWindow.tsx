import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { REMOVE_EMPLOYEE } from '../../../redux/slices/employeeresPageSlice';
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { REMOVE_MEETING } from '../../../redux/slices/meetingsPageSlice';
import { REMOVE_ROOM } from '../../../redux/slices/roomsPageSlice';
import { REMOVE_SCREEN } from '../../../redux/slices/screensPageSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { employeeDataType } from '../../../types/employeeDataType';
import { meetingDataType } from '../../../types/meetingDataType';
import { roomDataType } from '../../../types/roomDataType';
import { screenDataType } from '../../../types/screenDataType';
import { globalSettingsSliceType } from '../../../types/slices/globalSettingsSliceTypes';
import { dateStringToDateLocalString } from '../../../utils/dateStringToDateLocalString';

function DeleteAgreementModalWindow() {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const meetingsData: meetingDataType[] = useAppSelector((state: RootState) => state.meetingsPage.value);
  const roomsData: roomDataType[] = useAppSelector((state: RootState) => state.roomsPage.value);
  const employeeresData: employeeDataType[] = useAppSelector((state: RootState) => state.employeeresPage.value);
  const screensData: screenDataType[] = useAppSelector((state: RootState) => state.screensPage.value);

  const dispatch: AppDispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const getDeleteAgreementModalWindowContent = (): JSX.Element => {
    const agreementIndexElement: number | null = globalSettingsData.agreementIndexElement;

    if (agreementIndexElement != null && agreementIndexElement >= 0) {
      switch (globalSettingsData.agreementDataType) {
        case "meetingsData":
          return (
            <>
              <div className="window__description">
                Czy chcesz usunąć spotkanie o nazwie <span className="description__element-highlighted">{meetingsData[agreementIndexElement].meetingName}</span> zaplanowane na <span className="description__element-highlighted">{new Date(meetingsData[agreementIndexElement].meetingDate).toLocaleDateString()}</span>?
                <p className="description__paragraph">Pamiętaj o tym, że dany element może być również używany przez inne dane istniejące na danej platformie. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nesciunt aliquam molestiae quaerat eligendi at!</p>
              </div>
              <div className="window__content">
                <form className="content__form">
                  <div className="form__group">
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Anuluj" 
                      onClick={() => {dispatch(CLOSE_MODAL_WINDOW())}}
                    />
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Usuń" 
                      onClick={() => {
                        dispatch(REMOVE_MEETING(agreementIndexElement)),
                        dispatch(ADD_NOTIFICATION({notificationName: `Usunięto spotkanie o nazwie '${meetingsData[agreementIndexElement].meetingName}' zaplanowane na ${dateStringToDateLocalString(meetingsData[agreementIndexElement].meetingDate)}`, notificationDate: new Date().toJSON(), seenNotification: false})),  
                        dispatch(CLOSE_MODAL_WINDOW()), 
                        navigate('/platform/meetings')
                      }}/>
                  </div>
                  </form>
                </div>
              </>
          );

        case "roomsData":
          return (
            <>
              <div className="window__description">
                Czy chcesz usunąć pomieszczenie o nazwie <span className="description__element-highlighted">{roomsData[agreementIndexElement].roomName}</span>?
                <p className="description__paragraph">Pamiętaj o tym, że dany element może być również używany przez inne dane istniejące na danej platformie. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nesciunt aliquam molestiae quaerat eligendi at!</p>
              </div>
              <div className="window__content">
                <form className="content__form">
                  <div className="form__group">
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Anuluj" 
                      onClick={() => {dispatch(CLOSE_MODAL_WINDOW())}}
                    />
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Usuń" 
                      onClick={() => {
                        dispatch(REMOVE_ROOM(agreementIndexElement)),
                        dispatch(ADD_NOTIFICATION({notificationName: `Usunięto pomieszczenie o nazwie '${roomsData[agreementIndexElement].roomName}'`, notificationDate: new Date().toJSON(), seenNotification: false})),  
                        dispatch(CLOSE_MODAL_WINDOW()), 
                        navigate('/platform/rooms')
                      }}/>
                  </div>
                  </form>
                </div>
              </>
          );

        case "employeeresData":
          return (
            <>
              <div className="window__description">
                Czy chcesz usunąć pracownika o nazwie <span className="description__element-highlighted">{employeeresData[agreementIndexElement].employeeName}</span>?
                <p className="description__paragraph">Pamiętaj o tym, że dany element może być również używany przez inne dane istniejące na danej platformie. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nesciunt aliquam molestiae quaerat eligendi at!</p>
              </div>
              <div className="window__content">
                <form className="content__form">
                  <div className="form__group">
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Anuluj" 
                      onClick={() => {dispatch(CLOSE_MODAL_WINDOW())}}
                    />
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Usuń" 
                      onClick={() => {
                        dispatch(REMOVE_EMPLOYEE(agreementIndexElement)),
                        dispatch(ADD_NOTIFICATION({notificationName: `Usunięto informacje o pracowniku ${employeeresData[agreementIndexElement].employeeName}`, notificationDate: new Date().toJSON(), seenNotification: false})),  
                        dispatch(CLOSE_MODAL_WINDOW()), 
                        navigate('/platform/employeeres')
                      }}/> 
                    </div>
                  </form>
                </div>
              </>
          );
            
        case "screensData":
          return (
            <>
              <div className="window__description">
                Czy chcesz usunąć ekran o nazwie <span className="description__element-highlighted">{screensData[agreementIndexElement].screenName}</span>?
                <p className="description__paragraph">Pamiętaj o tym, że dany element może być również używany przez inne dane istniejące na danej platformie. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nesciunt aliquam molestiae quaerat eligendi at!</p>
              </div>
              <div className="window__content">
                <form className="content__form">
                  <div className="form__group">
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Anuluj" 
                      onClick={() => {dispatch(CLOSE_MODAL_WINDOW())}}
                    />
                    <input 
                      type="button" 
                      className="form__button-element" 
                      value="Usuń" 
                      onClick={() => {
                        dispatch(REMOVE_SCREEN(agreementIndexElement)),
                        dispatch(ADD_NOTIFICATION({notificationName: `Usunięto ekran o nazwie: ${screensData[agreementIndexElement].screenName}`, notificationDate: new Date().toJSON(), seenNotification: false})),  
                        dispatch(CLOSE_MODAL_WINDOW()), 
                        navigate('/platform/screens')
                      }}/>
                    </div>
                  </form>
                </div>
              </>
          );
            
        default:
          return (
            <>
              <div className="window__description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eum deleniti odit maxime magni omnis cum vel distinctio ea aliquam, harum praesentium et quasi qui accusantium delectus sed? Esse a, nostrum soluta itaque tempore quidem!
              </div>
              <div className="window__content">
                Lorem ipsum dolor sit amet consectetur.
              </div>
            </>
          );
    }
    } else {
      return (
        <>
          <div className="window__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, eum deleniti odit maxime magni omnis cum vel distinctio ea aliquam, harum praesentium et quasi qui accusantium delectus sed? Esse a, nostrum soluta itaque tempore quidem!
          </div>
          <div className="window__content">
            Lorem ipsum dolor sit amet consectetur.
          </div>
        </>
      );
    }
  };

  return (
      <>
        <div className="window__header">
          <div className="header__title">Usuwanie elementu</div>
          <div className="header__nav">
            <div
              className="nav__button"
              onClick={() => {
                dispatch(CLOSE_MODAL_WINDOW());
              } }
            >
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
        </div>
        {getDeleteAgreementModalWindowContent()}
      </>
  )
}

export default DeleteAgreementModalWindow;