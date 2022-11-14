import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { EMPLOYEERES_LSTORAGE_NAME } from '../../../data/staticPlatformData';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { employeeDataType } from '../../../types/employeeDataType';
import { employeeresFilterValueType, employeeresPageSliceType, employeeresSortValueType } from '../../../types/slices/employeeresPageSliceTypes';
import { dateStringToDateLocalString } from '../../../utils/dateStringToDateLocalString';
import { saveToLocalstorage } from '../../../utils/saveToLocalStorage';
import { shortenedTextFormat } from '../../../utils/shortenedTextFormat';

function EmployeeresContentTable() {
  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);

  const employeeresPageSearchValue: string = employeeresData.pageData.searchValue;
  const employeeresPageFilterValue: employeeresFilterValueType = employeeresData.pageData.filterValue;
  const employeeresPageSortValue: employeeresSortValueType = employeeresData.pageData.sortValue;

  const dispatch: AppDispatch = useAppDispatch();

  const editSelectedEmployee = (employeeElement: employeeDataType): void => {
    dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-employee', element: employeeElement}));
  };

  const deleteSelectedEmployee= (employeeId: number): void => {
    const [employeeElement]: employeeDataType[] = employeeresData.value.filter((e: employeeDataType) => e.employeeId === employeeId);
    const employeeElementIndex: number = employeeresData.value.indexOf(employeeElement);
    dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'employeeresData', index: (employeeElementIndex)}));
  };

  const getDataViewSearchValue = (data: employeeDataType[]) => {
    const newData: employeeDataType[] = data.filter((e: employeeDataType) => e.employeeName.toUpperCase().includes(employeeresPageSearchValue.toUpperCase()));
    return newData
  };

  const getDataViewFitlering = (data: employeeDataType[]) => {
    switch (employeeresPageFilterValue) {
      case "active-employeeres":
        const dataActiveEmployeeres: employeeDataType[] = data.filter((e: employeeDataType) => e.employeeStatus === true)
        return dataActiveEmployeeres

      case "inactive-employeeres":
        const dataInactiveEmployeeres: employeeDataType[] = data.filter((e: employeeDataType) => e.employeeStatus === false)
        return dataInactiveEmployeeres

      default:
        return data
    }
  };

  const getDataViewSort = (data: employeeDataType[]) => {
    switch (employeeresPageSortValue) {
      case "name-employee-sort-up":
        const dataNameEmployeeSortUp: employeeDataType[] = data.sort((a, b) => a.employeeName.localeCompare(b.employeeName))
        return dataNameEmployeeSortUp

      case "name-employee-sort-down":
        const dataNameEmployeeSortDown: employeeDataType[] = data.sort((a, b) => b.employeeName.localeCompare(a.employeeName))
        return dataNameEmployeeSortDown
      
      case "oldest-date-added":
        const dataOldestDateAdded: employeeDataType[] = data.sort((a, b) => Date.parse(a.dateAdded) - Date.parse(b.dateAdded))
        return dataOldestDateAdded

      case "latest-date-added":
        const dataLatestDateAdded: employeeDataType[] = data.sort((a, b) => Date.parse(b.dateAdded) - Date.parse(a.dateAdded))
        return dataLatestDateAdded

      default:
        const activeEmployeeres: employeeDataType[] = data.filter((e: employeeDataType) => e.employeeStatus === true)
        const inactiveEmployeeres: employeeDataType[] = data.filter((e: employeeDataType) => e.employeeStatus === false)
        const defaultSortData: employeeDataType[] = [...activeEmployeeres, ...inactiveEmployeeres]
        return defaultSortData
    }    
  };

  const getEmployeeresList = (): employeeDataType[] => {
    let data: employeeDataType[];
    data = getDataViewSearchValue(employeeresData.value);
    data = getDataViewFitlering(data);
    data = getDataViewSort(data);

    return data
  };

  const data: employeeDataType[] = getEmployeeresList();

  const employeeresDataTable = data.map((e: employeeDataType): JSX.Element => {
    return (
      <tr key={e.employeeId} className="table-tr">
            <td className="table-td">{e.employeeId}</td>
            <td className="table-td">
              <div className={e.employeeStatus ? 'td__status-active' : 'td__status-inactive'}>
                {e.employeeStatus ? 'Aktywny' : 'Nieaktywny'}
              </div>
            </td>
            <td className="table-td table-td--primary-style">{e.employeeName}</td>
            <td className="table-td">{e.employeePosition}</td>
            <td className="table-td table-td--long-text-primary table-td--secondary-style">{shortenedTextFormat(e.additionalInformation)}</td>
            <td className="table-td">{dateStringToDateLocalString(e.dateAdded)}</td>
            <td className="table-td">
              <div className="table__buttons-container">
              <NavLink to={`/platform/employeeres/employee/${e.employeeId}`}>
                <div className="table-button">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
              </NavLink>
              <div className="table-button" onClick={() => {editSelectedEmployee(e)}}>
                <span className="material-symbols-outlined">edit</span>
              </div>
              <div className="table-button" onClick={() => {deleteSelectedEmployee
                (e.employeeId)}}>
                <span className="material-symbols-outlined">delete</span>
              </div>
              </div>
            </td>
          </tr>
    )
  });

  useEffect((): void => {
      getEmployeeresList()
  }, [employeeresPageSearchValue, employeeresPageFilterValue, employeeresPageSortValue]);

  useEffect((): void => {
    if (!employeeresData.loading) {
    saveToLocalstorage(EMPLOYEERES_LSTORAGE_NAME, employeeresData.value);
    } 
  }, [employeeresData.value]);

  return (
    <div className="main-content__table-container">
      <table className="table-container__table">
        <thead>
          <tr>
            <th className="table-th">ID</th>
            <th className="table-th">Status</th>
            <th className="table-th">Imię i nazwisko</th>
            <th className="table-th">Stanowisko</th>
            <th className="table-th">Dodatkowe informacje</th>
            <th className="table-th">Data dodania</th>
            <th className="table-th">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {employeeresDataTable}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeresContentTable;