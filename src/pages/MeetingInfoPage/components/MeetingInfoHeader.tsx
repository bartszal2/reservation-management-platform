import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from "../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { meetingDataType } from "../../../types/meetingDataType";
import { meetingsPageSliceType } from "../../../types/slices/meetingsPageSliceTypes";

function MeetingInfoHeader(props: {selectedMeetingData: meetingDataType | null}) {
  const navigate: NavigateFunction = useNavigate()

  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);
  const dispatch: AppDispatch = useAppDispatch();
  
  const editSelectedMeeting = (meetingElement: meetingDataType): void => {
    dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-meeting', element: meetingElement}))
  };

  const deleteSelectedMeeting = (currentMeetingId: number): void => {
    const [meetingElement]: meetingDataType[] = meetingsData.value.filter((e: meetingDataType) => e.meetingId === currentMeetingId)
    const meetingElementIndex: number = meetingsData.value.indexOf(meetingElement)
    dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'meetingsData', index: (meetingElementIndex)}))
  };

  return (
    <div className="main-meeting-info-page__header">
      <div className="header__group">
        <div className="group__title">
          <span className="material-symbols-outlined">groups</span>
          Spotkanie - {props.selectedMeetingData != null ? props.selectedMeetingData.meetingName : ''}
        </div>
        <div className="group__nav">
          <button className="nav__button" onClick={() => {editSelectedMeeting(props.selectedMeetingData!)}}>
            <span className="material-symbols-outlined">edit</span>
            Edytuj
          </button>
          <button className="nav__button" onClick={() => {deleteSelectedMeeting(props.selectedMeetingData!.meetingId)}}>
            <span className="material-symbols-outlined">delete</span>
            Usuń
          </button>
          <button className="nav__button" onClick={() => {navigate('/platform/meetings')}}>
            <span className="material-symbols-outlined">settings</span>
            Wróć
          </button>
        </div>
      </div>
      <div className="header__text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
        nam, ducimus quae deleniti recusandae sed corrupti dicta ullam autem
        cupiditate? Quae ex aliquam dignissimos fuga, mollitia repudiandae
        quaerat tempore rem cum explicabo fugiat cupiditate perferendis possimus
        voluptatibus temporibus laudantium libero incidunt tempora minus
        praesentium facilis saepe illo quidem. Consectetur est distinctio
        voluptatum iure iste molestiae mollitia doloremque et repellendus alias
        autem unde, magni inventore quae id illum. Facere est blanditiis enim,
        laudantium eos nostrum iusto, quas odit corporis corrupti fugit totam et
        sunt impedit nihil ducimus recusandae veniam ipsa commodi.
      </div>
    </div>
  );
}

export default MeetingInfoHeader;
