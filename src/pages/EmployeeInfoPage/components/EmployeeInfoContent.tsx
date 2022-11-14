import React from 'react';
import { employeeDataType } from '../../../types/employeeDataType';
import { dateStringToLocalString } from '../../../utils/dateStringToLocalString';

function EmployeeInfoContent(props: {selectedEmployeeData: employeeDataType | null}) {

    return (
        <div className="main-employee-info-page__content">
          <div className="content__element content__element--three-width">
            <div className="element__title">ID | Imię i nazwisko</div>
            <div className="element__value">{props.selectedEmployeeData != null ? `${props.selectedEmployeeData.employeeId} | ${props.selectedEmployeeData.employeeName}` : ''}</div>
          </div>
          <div className={props.selectedEmployeeData != null ? props.selectedEmployeeData.employeeStatus ? 'content__element content__element--active' : 'content__element content__element--inactive' : 'content__element'}>
            <div className="element__title">Status pracownika</div>
            <div className="element__value">{props.selectedEmployeeData != null ? props.selectedEmployeeData.employeeStatus ? 'Aktywny' : 'Nieaktywny' : ''}</div>
          </div>
          <div className="content__element content__element--two-width">
            <div className="element__title">Stanowisko</div>
            <div className="element__value">{props.selectedEmployeeData != null ? props.selectedEmployeeData.employeePosition : ''}</div>
          </div>
          <div className="content__element content__element--two-width">
            <div className="element__title">Kod pracownika</div>
            <div className="element__value">{props.selectedEmployeeData != null ? props.selectedEmployeeData.employeeCode : ''}</div>
          </div>
          <div className="content__element content__element--two-width">
            <div className="element__title">Dodatkowe informacje</div>
            <div className="element__value">{props.selectedEmployeeData != null ? props.selectedEmployeeData.additionalInformation : ''}</div>
        </div>          
          <div className="content__element">
            <div className="element__title">Data dodania</div>
            <div className="element__value">{props.selectedEmployeeData != null ? dateStringToLocalString(props.selectedEmployeeData.dateAdded) : ''}</div>
        </div>
        <div className="content__element">
            <div className="element__title">Data modyfikacji</div>
            <div className="element__value">{props.selectedEmployeeData != null ? props.selectedEmployeeData.modificationDate != null ? dateStringToLocalString(props.selectedEmployeeData.modificationDate) : '' : ''}</div>
        </div>
        </div>
      )
}

export default EmployeeInfoContent;