import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { ADD_EMPLOYEE } from "../../../../redux/slices/employeeresPageSlice";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { employeeDataType } from "../../../../types/employeeDataType";
import { employeePositionDataType } from "../../../../types/employeePositionDataType";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";

function AddEmployeeModalWindow() {
  const employeeresData: employeeDataType[] = useAppSelector((state: RootState) => state.employeeresPage.value);
  const employeePositionsData: employeePositionDataType[] = useAppSelector((state: RootState) => state.employeePositions.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface newEmployeeElement {
    employeeId: number;
    employeeName: string;
    employeePosition: string;
    employeeStatus: boolean;
    employeeCode: number | null;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: null | string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'employeeName' | 'employeePosition' | 'employeeCode';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  const generateEmployeeId = (): number => {
    let newIdValue: number;

    if (employeeresData.length > 0) {
      const [lastIdValue]: number[] = employeeresData
        .map((e: employeeDataType) => e.employeeId)
        .sort((a, b) => b - a);
      newIdValue = lastIdValue + 1;
      return newIdValue;
      
    } else {
      newIdValue = 1;
      return newIdValue;
    }
  };

  const initialNewEmployeeData: newEmployeeElement = {
    employeeId: generateEmployeeId(),
    employeeName: '',
    employeePosition: '',
    employeeStatus: true,
    employeeCode: null,
    additionalInformation: '',
    dateAdded: new Date().toJSON(),
    modificationDate: null
  };

  const [newEmployee, setNewEmployee] = useState<newEmployeeElement>(initialNewEmployeeData);

  const initialFormValidationElementsData: formValidationElements = {
    employeeName: { value: '', correctValidation: true },
    employeePosition: { value: '', correctValidation: true },
    employeeCode: { value: '', correctValidation: true }
  };

  const [formValidationElements, setFormValidationElements] = useState<formValidationElements>(initialFormValidationElementsData);

  const [formErrorMessage, setFormErrorMessage] = useState<string>('');

  const validationErrorsData = Object.values(formValidationElements).filter((key) => key.correctValidation == false && key.value.length > 0).map((key) => [key.value]);

  const formValidationMessage: JSX.Element = (
    <>
      <p className="information-block__title">{formErrorMessage}</p>
      <ul className="information-block__list">
        {validationErrorsData.map((e, index) => <li key={index} className="list__element">{e}</li>)}
      </ul>
    </>
  );

  const elementValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setNewEmployee((prevState: newEmployeeElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const elementNumberValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setNewEmployee((prevState: newEmployeeElement) => {return {
      ...prevState,
      [e.target.name]: parseInt(e.target.value)
    }})
  };

  const validateEmployeeNameInput = () => {
    if (newEmployee.employeeName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeeName: {value: 'Wprowadź nazwę pracownika', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeeName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateEmployeePositionInput = () => {
    if (newEmployee.employeePosition == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeePosition: {value: 'Wybierz stanowisko pracownika', correctValidation: false}}
      });
      return false;

    } else if (employeePositionsData.length == 0) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeePosition: {value: 'Brak stanowisk do wyświetlenia. Uzupełnij dane, aby wypełnić formularz', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeePosition: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateEmployeeCodeInput = () => {
    const employeeCodesData = employeeresData.map((e: employeeDataType) => e.employeeCode);

    if (newEmployee.employeeCode) {
      if (newEmployee.employeeCode.toString().length != 4) {
        setFormValidationElements((prevState: formValidationElements) => {
          return {...prevState, employeeCode: {value: 'Kod musi się składać z 4 liczb', correctValidation: false}}
        });
        return false;
    
      } else if (employeeCodesData.includes(newEmployee.employeeCode)) {
        setFormValidationElements((prevState: formValidationElements) => {
          return {...prevState, employeeCode: {value: 'Kod o takich numerach już istnieje', correctValidation: false}}
        });
        return false;
    
      } else {
        setFormValidationElements((prevState: formValidationElements) => {
          return {...prevState, employeeCode: {value: '', correctValidation: true}}
        });
        return true;
        
      }

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeeCode: {value: 'Wprowadź kod pracownika', correctValidation: false}}
      });
      return false;
    }
  };

  const addEmployeeToList = (): void => {
    const correctValidationEmployeeName: boolean = validateEmployeeNameInput();
    const correctValidationEmployeePosition: boolean = validateEmployeePositionInput();
    const correctValidationEmployeeCode: boolean = validateEmployeeCodeInput();

    const correctValidation: boolean =
    correctValidationEmployeeName &&
    correctValidationEmployeePosition &&
    correctValidationEmployeeCode
      ? true
      : false;

    if (correctValidation) {
      setFormErrorMessage('');
      dispatch(ADD_EMPLOYEE(newEmployee));
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowego pracownika o nazwie '${newEmployee.employeeName}'`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setNewEmployee(initialNewEmployeeData);
  };

  return (
      <>
          <div className="window__header">
              <div className="header__title">Dodawanie pracownika</div>
              <div className="header__nav">
                  <button className="nav__button" onClick={() => {dispatch(CLOSE_MODAL_WINDOW())}}>
                    <span className="material-symbols-outlined">close</span>
                  </button>
              </div>
          </div>
          <div className="window__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, aliquid! Recusandae modi nam quis delectus dolore voluptatem, tempora neque quaerat culpa inventore, illo alias debitis necessitatibus libero. Dicta, laborum vitae in impedit delectus itaque iusto.
          </div>
          <div className="window__content">
              <form className="content__form">
                  <label className="form__label">
                      ID
                      <input 
                          className="form__input-element" 
                          type="number" 
                          value={newEmployee.employeeId} 
                          disabled 
                      />
                  </label>
                  <label className="form__label form__label--three-width">
                      Nazwa pomieszczenia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.employeeName.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="text"
                          value={newEmployee.employeeName}
                          name="employeeName"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--two-width">
                      Status pracownika*
                      <div className="from__group">
                        <div className={newEmployee.employeeStatus ? "form__information-block form__information-block--active" : "form__information-block form__information-block--default"}>
                          {newEmployee.employeeStatus ? 'Pracownik aktywny' : 'Pracownik nieaktywny'}
                        </div>
                        <input
                            className="form__checkbox-element"
                            type="checkbox"
                            checked={newEmployee.employeeStatus}
                            name="employeeStatus"
                            onChange={(e) => {setNewEmployee((prevState: newEmployeeElement) => {return {
                              ...prevState,
                              [e.target.name]: e.target.checked
                            }})}}
                        />
                        <div className="form__checkbox">
                          <div className="checkbox__value"></div>
                        </div>
                      </div>
                  </label>
                  <label className="form__label form__label--two-width">
                      Kod pracownika*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.employeeCode.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="number"
                          min={0}
                          placeholder={newEmployee.employeeCode === null ? '0000' : ''}
                          name="employeeCode"
                          onChange={elementNumberValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--full-width">
                      Stanowisko pracownika*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.employeePosition.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={newEmployee.employeePosition}
                            name="employeePosition"
                            onChange={elementValueHandler}
                        >
                            <option value=""></option>
                            {employeePositionsData.map((e: employeePositionDataType) => (
                                <option
                                    key={e.employeePositionId}
                                    value={e.employeePositionName}
                                >
                                    {e.employeePositionName}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                      </div>
                  </label>
                  <label className="form__label form__label--full-width">
                      Dodatkowe informacje
                      <div className="form__textarea-element-with-icon">
                        <textarea
                            className="form__textarea-element"
                            value={newEmployee.additionalInformation}
                            name="additionalInformation"
                            onChange={elementValueHandler}
                        />
                        <span className="material-symbols-outlined">height</span>
                      </div>
                  </label>
                  <label className="form__label form__label--full-width">
                      Data dodania
                      <input
                          className="form__input-element"
                          type="datetime-local"
                          value={dateStringToDateTimeInputFormat(newEmployee.dateAdded)}
                          disabled
                      />
                  </label>
                  <div className="form__information-block form__information-block--error form__information-block--full-width">
                    {formValidationMessage}
                  </div>
                  <div className="form__group">
                      <input
                          className="form__button-element"
                          type="reset"
                          value="Wyczyść"
                          onClick={() => resetFormValues()}
                      />
                      <input
                          className="form__button-element"
                          type="button"
                          value="Dodaj"
                          onClick={() => addEmployeeToList()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default AddEmployeeModalWindow;
