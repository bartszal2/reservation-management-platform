import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { ADD_ROOM } from "../../../../redux/slices/roomsPageSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { roomDataType } from "../../../../types/roomDataType";
import { roomTypeDataType } from "../../../../types/roomTypeDataType";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";

function AddRoomModalWindow() {
  const roomsData: roomDataType[] = useAppSelector((state: RootState) => state.roomsPage.value);
  const roomTypesData: roomTypeDataType[] = useAppSelector((state: RootState) => state.roomTypes.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface newRoomElement {
    roomId: number;
    roomName: string;
    roomNumber: string;
    minimumRoomPeople: number;
    maximumRoomPeople: number;
    roomStatus: boolean;
    roomType: string;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: null | string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'roomName' | 'roomNumber' | 'minimumRoomPeople' | 'maximumRoomPeople' | 'roomType';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  const generateRoomId = (): number => {
    let newIdValue: number;

    if (roomsData.length > 0) {
      const [lastIdValue]: number[] = roomsData
        .map((e: roomDataType) => e.roomId)
        .sort((a, b) => b - a);
      newIdValue = lastIdValue + 1;
      return newIdValue;
      
    } else {
      newIdValue = 1;
      return newIdValue;
    }
  };

  const initialNewRoomData: newRoomElement = {
    roomId: generateRoomId(),
    roomName: '',
    roomNumber: '',
    minimumRoomPeople: 0,
    maximumRoomPeople: 0,
    roomStatus: true,
    roomType: '',
    additionalInformation: "",
    dateAdded: new Date().toJSON(),
    modificationDate: null
  };

  const [newRoom, setNewRoom] = useState<newRoomElement>(initialNewRoomData);

  const initialFormValidationElementsData: formValidationElements = {
    roomName: { value: '', correctValidation: true },
    roomNumber: { value: '', correctValidation: true },
    minimumRoomPeople: { value: '', correctValidation: true },
    maximumRoomPeople: { value: '', correctValidation: true },
    roomType: { value: '', correctValidation: true }
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
    setNewRoom((prevState: newRoomElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const elementNumberValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setNewRoom((prevState: newRoomElement) => {return {
      ...prevState,
      [e.target.name]: parseInt(e.target.value)
    }})
  };

  const validateRoomNameInput = () => {
    const roomNamesData = roomsData.map((e: roomDataType) => e.roomName.toUpperCase())

    if (newRoom.roomName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Wprowadź nazwę pomieszczenia', correctValidation: false}}
      });
      return false;

    } else if (roomNamesData.includes(newRoom.roomName.toUpperCase())) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Pomieszczenie o takiej nazwie już istnieje', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateRoomNumberInput = () => {
    const roomNumbersData = roomsData.map(e => e.roomNumber.toUpperCase())

    if (newRoom.roomNumber == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomNumber: {value: 'Wprowadź numer pomieszczenia', correctValidation: false}}
      });
      return false;

    } else if (roomNumbersData.includes(newRoom.roomNumber.toUpperCase())) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomNumber: {value: 'Pomieszcenie o takim numerze już istnieje', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomNumber: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateRoomMinPeopleInput = () => {
    if (newRoom.minimumRoomPeople == 0 || isNaN(newRoom.minimumRoomPeople)) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, minimumRoomPeople: {value: 'Wprowadź minimalną ilość osób', correctValidation: false}}
      });
      return false;

    } else if (newRoom.minimumRoomPeople > newRoom.maximumRoomPeople) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, minimumRoomPeople: {value: 'Błędna wartość min. liczba jest większa od max. liczby', correctValidation: false}}
      });
      return false;

    } else if (newRoom.minimumRoomPeople == newRoom.maximumRoomPeople) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, minimumRoomPeople: {value: 'Błędna wartość min. liczby. Wartości są sobie równe', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, minimumRoomPeople: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateRoomMaxPeopleInput = () => {
    if (newRoom.maximumRoomPeople == 0 || isNaN(newRoom.maximumRoomPeople)) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, maximumRoomPeople: {value: 'Wprowadź maksymalną ilość osób', correctValidation: false}}
      });
      return false;

    } else if (newRoom.maximumRoomPeople < newRoom.minimumRoomPeople) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, maximumRoomPeople: {value: 'Błędna wartość max. liczba jest mniejsza od min. liczby', correctValidation: false}}
      });
      return false;

    } else if (newRoom.maximumRoomPeople == newRoom.minimumRoomPeople) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, maximumRoomPeople: {value: 'Błędna wartość min. liczby. Wartości są sobie równe', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, maximumRoomPeople: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateRoomTypeInput = () => {
    if (newRoom.roomType == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomType: {value: 'Wybierz typ pomieszczenia', correctValidation: false}}
      });
      return false;

    } else if (roomTypesData.length == 0) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomType: {value: 'Brak rodzajów pomieszczeń do wyświetlenia. Uzupełnij dane, aby wyświetlić formularz', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomType: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const addRoomToList = (): void => {
    const correctValidationRoomName: boolean = validateRoomNameInput();
    const correctValidationRoomNumber: boolean = validateRoomNumberInput();
    const correctValidationMinRoomPeople: boolean = validateRoomMinPeopleInput();
    const correctValidationMaxRoomPeople: boolean = validateRoomMaxPeopleInput();
    const correctValidationRoomTypes: boolean = validateRoomTypeInput();

    const correctValidation: boolean =
    correctValidationRoomName &&
    correctValidationRoomNumber &&
    correctValidationMinRoomPeople &&
    correctValidationMaxRoomPeople &&
    correctValidationRoomTypes
      ? true
      : false;

    if (correctValidation) {
      setFormErrorMessage('');
      dispatch(ADD_ROOM(newRoom));
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowe pomieszczenie o nazwie '${newRoom.roomName}'`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setNewRoom(initialNewRoomData);
  };

  return (
      <>
          <div className="window__header">
              <div className="header__title">Dodawanie pomieszczenia</div>
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
                          value={newRoom.roomId} 
                          disabled 
                      />
                  </label>
                  <label className="form__label form__label--three-width">
                      Nazwa pomieszczenia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.roomName.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="text"
                          value={newRoom.roomName}
                          name="roomName"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label">
                      Number pomieszczenia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.roomNumber.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="text"
                          value={newRoom.roomNumber}
                          name="roomNumber"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label">
                      Minimalna ilość osób*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.minimumRoomPeople.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="number"
                          value={newRoom.minimumRoomPeople}
                          min={0}
                          name="minimumRoomPeople"
                          onChange={elementNumberValueHandler}
                      />
                  </label>
                  <label className="form__label">
                      Maksymalna ilość osób*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.maximumRoomPeople.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="number"
                          value={newRoom.maximumRoomPeople}
                          min={0}
                          name="maximumRoomPeople"
                          onChange={elementNumberValueHandler}
                      />
                  </label>
                  <label className="form__label">
                      Status pomieszczenia*
                      <div className="label__group">
                        <div className={newRoom.roomStatus ? "form__information-block form__information-block--active" : "form__information-block form__information-block--default"}>
                          {newRoom.roomStatus ? 'Pomieszczenie aktywne' : 'Pomieszczenie nieaktywne'}
                        </div>
                        <input
                            className="form__checkbox-element"
                            type="checkbox"
                            checked={newRoom.roomStatus}
                            name="roomStatus"
                            onChange={(e) => {setNewRoom((prevState: newRoomElement) => {return {
                              ...prevState,
                              [e.target.name]: e.target.checked
                            }})}}
                        />
                        <div className="form__checkbox">
                          <div className="checkbox__value"></div>
                        </div>
                      </div>
                  </label>
                  <label className="form__label form__label--full-width">
                      Typ pomieszczenia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.roomType.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={newRoom.roomType}
                            name="roomType"
                            onChange={elementValueHandler}
                        >
                            <option value=""></option>
                            {roomTypesData.map((e: roomTypeDataType) => (
                                <option
                                    key={e.roomTypeId}
                                    value={e.roomTypeName}
                                >
                                    {e.roomTypeName}
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
                            value={newRoom.additionalInformation}
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
                          value={dateStringToDateTimeInputFormat(newRoom.dateAdded)}
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
                          onClick={() => addRoomToList()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default AddRoomModalWindow;
