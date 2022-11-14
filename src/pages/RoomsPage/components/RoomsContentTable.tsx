import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ROOMS_LSTORAGE_NAME } from '../../../data/staticPlatformData';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { roomDataType } from '../../../types/roomDataType';
import { roomsFilterValueType, roomsSortValueType } from '../../../types/slices/roomsPageSliceTypes';
import { dateStringToDateLocalString } from '../../../utils/dateStringToDateLocalString';
import { saveToLocalstorage } from '../../../utils/saveToLocalStorage';
import { shortenedTextFormat } from '../../../utils/shortenedTextFormat';

function RoomsContentTable() {
  const roomsData = useAppSelector((state: RootState) => state.roomsPage);

  const roomsPageSearchValue: string = roomsData.pageData.searchValue;
  const roomsPageFilterValue: roomsFilterValueType = roomsData.pageData.filterValue;
  const roomsPageSortValue: roomsSortValueType = roomsData.pageData.sortValue;

  const dispatch: AppDispatch = useAppDispatch();

  const editSelectedRoom = (roomElement: roomDataType): void => {
    dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-room', element: roomElement}));
  };

  const deleteSelectedRoom = (roomId: number): void => {
    const [roomElement]: roomDataType[] = roomsData.value.filter((e: roomDataType) => e.roomId === roomId);
    const roomElementIndex: number = roomsData.value.indexOf(roomElement);
    dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'roomsData', index: (roomElementIndex)}));
  };

  const getDataViewSearchValue = (data: roomDataType[]) => {
    const newData: roomDataType[] = data.filter((e: roomDataType) => e.roomName.toUpperCase().includes(roomsPageSearchValue.toUpperCase()));
    return newData
  };

  const getDataViewFitlering = (data: roomDataType[]) => {
    switch (roomsPageFilterValue) {
      case "active-rooms":
        const dataActiveRooms: roomDataType[] = data.filter((e: roomDataType) => e.roomStatus === true);
        return dataActiveRooms

      case "inactive-rooms":
        const dataInactiveRooms: roomDataType[] = data.filter((e: roomDataType) => e.roomStatus === false);
        return dataInactiveRooms

      default:
        return data
    }
  };

  const getDataViewSort = (data: roomDataType[]) => {
    switch (roomsPageSortValue) {
      case "name-room-sort-up":
        const dataNameRoomSortUp: roomDataType[] = data.sort((a, b) => a.roomName.localeCompare(b.roomName));
        return dataNameRoomSortUp

      case "name-room-sort-down":
        const dataNameRoomSortDown: roomDataType[] = data.sort((a, b) => b.roomName.localeCompare(a.roomName));
        return dataNameRoomSortDown
      
      case "smallest-number-people-room":
        const dataSmallestNumberPeopleRoom: roomDataType[] = data.sort((a, b) => b.maximumRoomPeople - a.maximumRoomPeople);
        return dataSmallestNumberPeopleRoom

      case "largest-number-people-room":
        const dataLargestNumberPeopleRoom: roomDataType[] = data.sort((a, b) => a.maximumRoomPeople - b.maximumRoomPeople);
        return dataLargestNumberPeopleRoom

      case "oldest-date-added":
        const dataOldestDateAdded: roomDataType[] = data.sort((a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded));
        return dataOldestDateAdded

      case "latest-date-added":
        const dataLatestDateAdded: roomDataType[] = data.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded));
        return dataLatestDateAdded

      default:
        const activeRooms: roomDataType[] = data.filter((e: roomDataType) => e.roomStatus === true);
        const inactiveRooms: roomDataType[] = data.filter((e: roomDataType) => e.roomStatus === false);
        const defaultSortData: roomDataType[] = [...activeRooms, ...inactiveRooms];
        return defaultSortData
    }    
  };

  const getRoomsList = (): roomDataType[] => {
    let data: roomDataType[];
    data = getDataViewSearchValue(roomsData.value);
    data = getDataViewFitlering(data);
    data = getDataViewSort(data);

    return data;
  };

  const data: roomDataType[] = getRoomsList();

  const roomsDataTable = data.map((e: roomDataType): JSX.Element => {
    return (
            <tr key={e.roomId} className="table-tr">
            <td className="table-td">{e.roomId}</td>
            <td className="table-td">
              <div className={e.roomStatus ? 'td__status-active' : 'td__status-inactive'}>
                {e.roomStatus ? 'Aktywne' : 'Nieaktywne'}
              </div>
            </td>
            <td className="table-td table-td--primary-style">{e.roomName}</td>
            <td className="table-td">{e.roomNumber}</td>
            <td className="table-td">{e.roomType}</td>
            <td className="table-td">{e.minimumRoomPeople} - {e.maximumRoomPeople}</td>
            <td className="table-td table-td--long-text-primary table-td--secondary-style">{shortenedTextFormat(e.additionalInformation)}
            </td>
            <td className="table-td">{dateStringToDateLocalString(e.dateAdded)}</td>
            <td className="table-td">
              <div className="table__buttons-container">
              <NavLink to={`/platform/rooms/room/${e.roomId}`}>
                <div className="table-button">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
              </NavLink>
              <div className="table-button" onClick={() => {editSelectedRoom(e)}}>
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div className="table-button" onClick={() => {deleteSelectedRoom
                (e.roomId)}}>
                <span className="material-symbols-outlined">delete</span>
              </div>
              </div>
            </td>
          </tr>
    )
  });

  useEffect((): void => {
      getRoomsList();
  }, [roomsPageSearchValue, roomsPageFilterValue, roomsPageSortValue])

  useEffect((): void => {
    if (!roomsData.loading) {
    saveToLocalstorage(ROOMS_LSTORAGE_NAME, roomsData.value);
    } 
  }, [roomsData.value]);
  
  return (
    <div className="main-content__table-container">
      <table className="table-container__table">
        <thead>
          <tr>
            <th className="table-th">ID</th>
            <th className="table-th">Status</th>
            <th className="table-th">Nazwa pomieszczenia</th>
            <th className="table-th">Numer pomieszczenia</th>
            <th className="table-th">Rodzaj pomieszczenia</th>
            <th className="table-th">Ilość osób w pomieszczeniu</th>
            <th className="table-th">Dodatkowe informacje</th>
            <th className="table-th">Data dodania</th>
            <th className="table-th">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {roomsDataTable}
        </tbody>
      </table>
    </div>
  )
}

export default RoomsContentTable;