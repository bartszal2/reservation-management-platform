import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SCREENS_LSTORAGE_NAME } from '../../../data/staticPlatformData';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { screenDataType } from '../../../types/screenDataType';
import { screensFilterValueType, screensPageSliceType, screensSortValueType } from '../../../types/slices/screensPageSliceTypes';
import { dateStringToDateLocalString } from '../../../utils/dateStringToDateLocalString';
import { saveToLocalstorage } from '../../../utils/saveToLocalStorage';
import { shortenedTextFormat } from '../../../utils/shortenedTextFormat';

function ScreensContentTable() {
  const screensData: screensPageSliceType = useAppSelector((state: RootState) => state.screensPage);

  const screensPageSearchValue: string = screensData.pageData.searchValue;
  const screensPageFilterValue: screensFilterValueType = screensData.pageData.filterValue;
  const screensPageSortValue: screensSortValueType = screensData.pageData.sortValue;

  const dispatch: AppDispatch = useAppDispatch();

  const editSelectedScreen = (screenElement: screenDataType): void => {
    dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-screen', element: screenElement}));
  };

  const deleteSelectedScreen= (screenId: number): void => {
    const [screenElement]: screenDataType[] = screensData.value.filter((e: screenDataType) => e.screenId === screenId);
    const screenElementIndex: number = screensData.value.indexOf(screenElement);
    dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'screensData', index: (screenElementIndex)}));
  };

  const getDataViewSearchValue = (data: screenDataType[]) => {
    const newData: screenDataType[] = data.filter((e: screenDataType) => e.screenName.toUpperCase().includes(screensPageSearchValue.toUpperCase()))   ;
    return newData
  };

  const getDataViewFitlering = (data: screenDataType[]) => {
    switch (screensPageFilterValue) {
      case "active-screens":
        const dataActiveScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenStatus === true);
        return dataActiveScreens

      case "inactive-screens":
        const dataInactiveScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenStatus === false);
        return dataInactiveScreens

      case "horizontal-screens":
        const dataHorizontalScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenType.includes('horizontal'));
        return dataHorizontalScreens

      case "vertical-screens":
        const dataVerticalScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenType.includes('vertical'));
        return dataVerticalScreens

      default:
        const activeScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenStatus === true);
        const inactiveScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenStatus === false);
        const defaultSortData: screenDataType[] = [...activeScreens, ...inactiveScreens];
        return defaultSortData
    }
  };

  const getDataViewSort = (data: screenDataType[]) => {
    switch (screensPageSortValue) {
      case "name-screen-sort-up":
        const dataNameScreenSortUp: screenDataType[] = data.sort((a, b) => a.screenName.localeCompare(b.screenName));
        return dataNameScreenSortUp

      case "name-screen-sort-down":
        const dataNameScreenSortDown: screenDataType[] = data.sort((a, b) => b.screenName.localeCompare(a.screenName));
        return dataNameScreenSortDown
      
      case "oldest-date-added":
        const dataOldestDateAdded: screenDataType[] = data.sort((a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded));
        return dataOldestDateAdded

      case "latest-date-added":
        const dataLatestDateAdded: screenDataType[] = data.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded));
        return dataLatestDateAdded

      default:
        const activeScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenStatus === true);
        const inactiveScreens: screenDataType[] = data.filter((e: screenDataType) => e.screenStatus === false);
        const defaultSortData: screenDataType[] = [...activeScreens, ...inactiveScreens];
        return defaultSortData
    }    
  };

  const getScreensList = () => {
    let data: screenDataType[];
    data = getDataViewSearchValue(screensData.value);
    data = getDataViewFitlering(data);
    data = getDataViewSort(data);

    return data
  };

  const data: screenDataType[] = getScreensList();

  const screensDataTable = data.map((e: screenDataType): JSX.Element => {
    return (
            <tr key={e.screenId} className="table-tr">
            <td className="table-td">{e.screenId}</td>
            <td className="table-td">
              <div className={e.screenStatus ? 'td__status-active' : 'td__status-inactive'}>
                {e.screenStatus ? 'Aktywny' : 'Nieaktywny'}
              </div>
            </td>
            <td className="table-td table-td--primary-style">{e.screenName}</td>
            <td className="table-td">{e.roomName}</td>
            <td className="table-td">{e.screenLocation}</td>
            <td className="table-td">{e.screenType == 'horizontal' ? 'Poziomo' : 'Pionowo'}</td>
            <td className="table-td table-td--long-text-primary table-td--secondary-style">{shortenedTextFormat(e.additionalInformation)}</td>
            <td className="table-td">{dateStringToDateLocalString(e.dateAdded)}</td>
            <td className="table-td">
              <div className="table__buttons-container">
              <NavLink to={`/screen/${e.screenId}`}>
                <div className="table-button">
                  <span className="material-symbols-outlined">monitor</span>
                </div>
              </NavLink>
              <NavLink to={`/platform/screens/screen/${e.screenId}`}>
                <div className="table-button">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
              </NavLink>
              <div className="table-button" onClick={() => {editSelectedScreen(e)}}>
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div className="table-button" onClick={() => {deleteSelectedScreen
                (e.screenId)}}>
                <span className="material-symbols-outlined">delete</span>
              </div>
              </div>
            </td>
          </tr>
    )
  });

  useEffect((): void => {
      getScreensList();
  }, [screensPageSearchValue, screensPageFilterValue, screensPageSortValue]);

  useEffect((): void => {
    if (!screensData.loading) {
    saveToLocalstorage(SCREENS_LSTORAGE_NAME, screensData.value);
    } 
  }, [screensData.value]);
  
  return (
    <div className="main-content__table-container">
      <table className="table-container__table">
        <thead>
          <tr>
            <th className="table-th">ID</th>
            <th className="table-th">Status</th>
            <th className="table-th">Nazwa ekranu</th>
            <th className="table-th">Nazwa pomieszczenia</th>
            <th className="table-th">Lokalizacja ekranu</th>
            <th className="table-th">Rodzaj ekranu</th>
            <th className="table-th">Dodatkowe informacje</th>
            <th className="table-th">Data dodania</th>
            <th className="table-th">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {screensDataTable}          
        </tbody>
      </table>
    </div>
  )
}

export default ScreensContentTable;