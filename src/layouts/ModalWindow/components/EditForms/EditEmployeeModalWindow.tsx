import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { UPDATE_EMPLOYEE } from "../../../../redux/slices/employeeresPageSlice";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { employeeDataType } from "../../../../types/employeeDataType";
import { employeePositionDataType } from "../../../../types/employeePositionDataType";
import { globalSettingsSliceType } from "../../../../types/slices/globalSettingsSliceTypes";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";

function EditEmployeeModalWindow() {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const editEmployeeElement: employeeDataType | null = globalSettingsData.editEmployeeElement;
  const employeeresData: employeeDataType[] = useAppSelector((state: RootState) => state.employeeresPage.value);
  const employeePositionsData: employeePositionDataType[] = useAppSelector((state: RootState) => state.employeePositions.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface editedEmployeeElement {
    employeeId: number;
    employeeName: string;
    employeePosition: string;
    employeeStatus: boolean;
    employeeCode: number | null;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'employeeName' | 'employeePosition' | 'employeeCode' | 'checkAvailabilityEmployeePosition';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  const initialEditedEmployeeData: editedEmployeeElement = {
    employeeId: editEmployeeElement!.employeeId,
    employeeName: editEmployeeElement!.employeeName,
    employeePosition: editEmployeeElement!.employeePosition,
    employeeStatus: editEmployeeElement!.employeeStatus,
    employeeCode: editEmployeeElement!.employeeCode,
    additionalInformation: editEmployeeElement!.additionalInformation ? editEmployeeElement!.additionalInformation : '',
    dateAdded: editEmployeeElement!.dateAdded,
    modificationDate: new Date().toJSON()
  };

  const initialClearEditedEmployeeData: editedEmployeeElement = {
    employeeId: editEmployeeElement!.employeeId,
    employeeName: '',
    employeePosition: '',
    employeeStatus: true,
    employeeCode: null,
    additionalInformation: '',
    dateAdded: editEmployeeElement!.dateAdded,
    modificationDate: new Date().toJSON()
  };

  const [editedEmployee, setEditedEmployee] = useState<editedEmployeeElement>(initialEditedEmployeeData);

  const initialFormValidationElementsData: formValidationElements = {
    employeeName: { value: '', correctValidation: true },
    employeePosition: { value: '', correctValidation: true },
    employeeCode: { value: '', correctValidation: true },
    checkAvailabilityEmployeePosition: { value: '', correctValidation: true }
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

  const [currentEmployeePositionElement]: employeePositionDataType[] = employeePositionsData.filter((e: employeePositionDataType) => e.employeePositionName == editedEmployee.employeePosition);

  const checkAvailabilityEmployeePosition = (): void => {
    if (!currentEmployeePositionElement) {
      setEditedEmployee((prevState: editedEmployeeElement) => {return {
        ...prevState, 
        employeePosition: ''}});
      setFormErrorMessage('Uwaga!');
      setFormValidationElements((prevState: formValidationElements) => {return {
        ...prevState,
        checkAvailabilityEmployeePosition: {value: 'Brak danego stanowiska w danych o stanowiskach pracowników (Pole formularza: "Stanowisko pracownika" zostało zresetowane)', correctValidation: false}}});
    }
  };

  const elementValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setEditedEmployee((prevState: editedEmployeeElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const elementNumberValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setEditedEmployee((prevState: editedEmployeeElement) => {return {
      ...prevState,
      [e.target.name]: parseInt(e.target.value)
    }})
  };

  const validateEmployeeNameInput = () => {
    if (editedEmployee.employeeName == "") {
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
    if (editedEmployee.employeePosition == "") {
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

    if (editedEmployee.employeeCode) {
      if (editedEmployee.employeeCode.toString().length != 4) {
        setFormValidationElements((prevState: formValidationElements) => {
          return {...prevState, employeeCode: {value: 'Kod musi się składać z 4 liczb', correctValidation: false}}
        });
        return false;
    
      } else if (employeeCodesData.includes(editedEmployee.employeeCode) && editedEmployee.employeeCode != editEmployeeElement!.employeeCode) {
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

  const updateEmployeeElement = (): void => {
    setFormValidationElements(initialFormValidationElementsData);

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
      const editEmployeeElementIndex: number = employeeresData.indexOf(editEmployeeElement!)

      setFormErrorMessage('');
      dispatch(UPDATE_EMPLOYEE({index: editEmployeeElementIndex, value: editedEmployee}));
      dispatch(ADD_NOTIFICATION({notificationName: `Zaktualizowano informacje o pracowniku o ID: ${editedEmployee.employeeId}`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setEditedEmployee(initialClearEditedEmployeeData);
  };

  useEffect(() => {
    checkAvailabilityEmployeePosition();
  }, []);

  return (
      <>
          <div className="window__header">
              <div className="header__title">Edytowanie pracownika</div>
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
                          value={editedEmployee.employeeId} 
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
                          value={editedEmployee.employeeName}
                          name="employeeName"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--two-width">
                      Status pracownika*
                      <div className="label__group">
                        <div className={editedEmployee.employeeStatus ? "form__information-block form__information-block--active" : "form__information-block form__information-block--default"}>
                            {editedEmployee.employeeStatus ? 'Pracownik aktywny' : 'Pracownik nieaktywny'}
                        </div>
                        <input
                            className="form__checkbox-element"
                            type="checkbox"
                            checked={editedEmployee.employeeStatus}
                            name="employeeStatus"
                            onChange={(e) => {setEditedEmployee((prevState: editedEmployeeElement) => {return {
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
                          value={editedEmployee.employeeCode ? editedEmployee.employeeCode : 0}
                          min={0}
                          placeholder={editedEmployee.employeeCode === null ? '0000' : ''}
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
                            value={editedEmployee.employeePosition}
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
                            value={editedEmployee.additionalInformation}
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
                          value={dateStringToDateTimeInputFormat(editedEmployee.dateAdded)}
                          disabled
                      />
                  </label>
                  <label className="form__label form__label--full-width">
                      Data modyfikacji
                      <input
                          className="form__input-element"
                          type="datetime-local"
                          value={dateStringToDateTimeInputFormat(editedEmployee.modificationDate)}
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
                          value="Zaktualizuj"
                          onClick={() => updateEmployeeElement()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default EditEmployeeModalWindow;
