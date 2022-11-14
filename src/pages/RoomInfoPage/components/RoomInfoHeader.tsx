import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from "../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { roomDataType } from "../../../types/roomDataType";

function RoomInfoHeader(props: {selectedRoomData: roomDataType | null}) {
  const navigate: NavigateFunction = useNavigate();

  const roomsData = useAppSelector((state: RootState) => state.roomsPage);
  const dispatch: AppDispatch = useAppDispatch();
  
  const editSelectedRoom = (roomElement: roomDataType): void => {
    dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-room', element: roomElement}));
  };

  const deleteSelectedRoom = (currentRoomId: number): void => {
    const [roomElement]: roomDataType[] = roomsData.value.filter((e: roomDataType) => e.roomId === currentRoomId);
    const roomElementIndex: number = roomsData.value.indexOf(roomElement);
    dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'roomsData', index: (roomElementIndex)}));
  };

  return (
    <div className="main-room-info-page__header">
      <div className="header__group">
        <div className="group__title">
          <span className="material-symbols-outlined">groups</span>
          Pomieszczenie - {props.selectedRoomData != null ? props.selectedRoomData.roomName : ''}
        </div>
        <div className="group__nav">
          <button className="nav__button" onClick={() => {editSelectedRoom(props.selectedRoomData!)}}>
            <span className="material-symbols-outlined">edit</span>
            Edytuj
          </button>
          <button className="nav__button" onClick={() => {deleteSelectedRoom(props.selectedRoomData!.roomId)}}>
            <span className="material-symbols-outlined">delete</span>
            Usuń
          </button>
          <button className="nav__button" onClick={() => {navigate('/platform/rooms')}}>
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

export default RoomInfoHeader;
