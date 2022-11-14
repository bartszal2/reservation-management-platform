import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { employeeDataType } from '../../../types/employeeDataType';
import { employeeresPageSliceType } from '../../../types/slices/employeeresPageSliceTypes';

function EmployeeInfoHeader(props: {selectedEmployeeData: employeeDataType | null}) {
    const navigate: NavigateFunction = useNavigate();

    const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);
    const dispatch: AppDispatch = useAppDispatch();

    const editSelectedEmployee = (employeeElement: employeeDataType): void => {
      dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-employee', element: employeeElement}));
    }
  
    const deleteSelectedEmployee = (currentEmployeeId: number): void => {
      const [employeeElement]: employeeDataType[] = employeeresData.value.filter((e: employeeDataType) => e.employeeId === currentEmployeeId)
      const employeeElementIndex: number = employeeresData.value.indexOf(employeeElement)
      dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'employeeresData', index: (employeeElementIndex)}))
    }
  
    return (
      <div className="main-employee-info-page__header">
        <div className="header__group">
          <div className="group__title">
            <span className="material-symbols-outlined">groups</span>
            Pracownik - {props.selectedEmployeeData != null ? props.selectedEmployeeData.employeeName : ''}
          </div>
          <div className="group__nav">
            <button className="nav__button" onClick={() => {editSelectedEmployee(props.selectedEmployeeData!)}}>
              <span className="material-symbols-outlined">edit</span>
              Edytuj
            </button>
            <button className="nav__button" onClick={() => {deleteSelectedEmployee(props.selectedEmployeeData!.employeeId)}}>
              <span className="material-symbols-outlined">delete</span>
              Usuń
            </button>
            <button className="nav__button" onClick={() => {navigate('/platform/employeeres')}}>
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

export default EmployeeInfoHeader;