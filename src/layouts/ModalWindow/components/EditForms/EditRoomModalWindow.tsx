import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { UPDATE_ROOM } from "../../../../redux/slices/roomsPageSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { roomDataType } from "../../../../types/roomDataType";
import { roomTypeDataType } from "../../../../types/roomTypeDataType";
import { globalSettingsSliceType } from "../../../../types/slices/globalSettingsSliceTypes";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";

function EditRoomModalWindow() {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const editRoomElement: roomDataType | null = globalSettingsData.editRoomElement;
  const roomsData: roomDataType[] = useAppSelector((state: RootState) => state.roomsPage.value);
  const roomTypesData: roomTypeDataType[] = useAppSelector((state: RootState) => state.roomTypes.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface editedRoomElement {
    roomId: number;
    roomName: string;
    roomNumber: string;
    minimumRoomPeople: number;
    maximumRoomPeople: number;
    roomStatus: boolean;
    roomType: string;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'roomName' | 'roomNumber' | 'minimumRoomPeople' | 'maximumRoomPeople' | 'roomType' | 'checkAvailabilityRoomType';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  const initialEditedRoomData: editedRoomElement = {
    roomId: editRoomElement!.roomId,
    roomName: editRoomElement!.roomName,
    roomNumber: editRoomElement!.roomNumber,
    minimumRoomPeople: editRoomElement!.minimumRoomPeople,
    maximumRoomPeople: editRoomElement!.maximumRoomPeople,
    roomStatus: editRoomElement!.roomStatus,
    roomType: editRoomElement!.roomType,
    additionalInformation: editRoomElement!.additionalInformation ? editRoomElement!.additionalInformation : '',
    dateAdded: editRoomElement!.dateAdded,
    modificationDate: new Date().toJSON()
  };

  const initialClearEditedMeetingData: editedRoomElement = {
    roomId: editRoomElement!.roomId,
    roomName: '',
    roomNumber: '',
    minimumRoomPeople: 0,
    maximumRoomPeople: 0,
    roomStatus: true,
    roomType: '',
    additionalInformation: "",
    dateAdded: editRoomElement!.dateAdded,
    modificationDate: new Date().toJSON()
  };

  const [editedRoom, setEditedRoom] = useState<editedRoomElement>(initialEditedRoomData);

  const initialFormValidationElementsData: formValidationElements = {
    roomName: { value: '', correctValidation: true },
    roomNumber: { value: '', correctValidation: true },
    minimumRoomPeople: { value: '', correctValidation: true },
    maximumRoomPeople: { value: '', correctValidation: true },
    roomType: { value: '', correctValidation: true },
    checkAvailabilityRoomType: { value: '', correctValidation: true }
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

  const [currentRoomTypeElement]: roomTypeDataType[] = roomTypesData.filter((e: roomTypeDataType) => e.roomTypeName == editedRoom.roomType);

  const checkAvailabilityRoomType = (): void => {
    if (!currentRoomTypeElement) {
      setEditedRoom((prevState: editedRoomElement) => {return {
        ...prevState, 
        roomType: ''}});
      setFormErrorMessage('Uwaga!');
      setFormValidationElements((prevState: formValidationElements) => {return {
        ...prevState,
        checkAvailabilityRoomType: {value: 'Brak danego typu pomieszczenia w danych o typach pomieszczeń (Pole formularza: "Typ pomieszczenia" zostało zresetowane)', correctValidation: false}}});
    }
  };

  const elementValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setEditedRoom((prevState: editedRoomElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const elementNumberValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setEditedRoom((prevState: editedRoomElement) => {return {
      ...prevState,
      [e.target.name]: parseInt(e.target.value)
    }})
  };

  const validateRoomNameInput = () => {
    const roomNamesData = roomsData.map((e: roomDataType) => e.roomName.toUpperCase())

    if (editedRoom.roomName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Wprowadź nazwę pomieszczenia', correctValidation: false}}
      });
      return false;

    } else if (roomNamesData.includes(editedRoom.roomName.toUpperCase()) && editedRoom.roomName != editRoomElement!.roomName) {
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

    if (editedRoom.roomNumber == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomNumber: {value: 'Wprowadź numer pomieszczenia', correctValidation: false}}
      });
      return false;

    } else if (roomNumbersData.includes(editedRoom.roomNumber.toUpperCase()) && editedRoom.roomNumber != editRoomElement!.roomNumber) {
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
    if (editedRoom.minimumRoomPeople == 0 || isNaN(editedRoom.minimumRoomPeople)) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, minimumRoomPeople: {value: 'Wprowadź minimalną ilość osób', correctValidation: false}}
      });
      return false;

    } else if (editedRoom.minimumRoomPeople > editedRoom.maximumRoomPeople) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, minimumRoomPeople: {value: 'Błędna wartość min. liczba jest większa od max. liczby', correctValidation: false}}
      });
      return false;

    } else if (editedRoom.minimumRoomPeople == editedRoom.maximumRoomPeople) {
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
    if (editedRoom.maximumRoomPeople == 0 || isNaN(editedRoom.maximumRoomPeople)) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, maximumRoomPeople: {value: 'Wprowadź maksymalną ilość osób', correctValidation: false}}
      });
      return false;

    } else if (editedRoom.maximumRoomPeople < editedRoom.minimumRoomPeople) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, maximumRoomPeople: {value: 'Błędna wartość max. liczba jest mniejsza od min. liczby', correctValidation: false}}
      });
      return false;

    } else if (editedRoom.maximumRoomPeople == editedRoom.minimumRoomPeople) {
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
    if (editedRoom.roomType == "") {
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

  const updateRoomElement = (): void => {
    setFormValidationElements(initialFormValidationElementsData);

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
      const editRoomElementIndex: number = roomsData.indexOf(editRoomElement!)

      setFormErrorMessage('');
      dispatch(UPDATE_ROOM({index: editRoomElementIndex, value: editedRoom}));
      dispatch(ADD_NOTIFICATION({notificationName: `Zaktualizowano pomieszczenie o ID: ${editedRoom.roomId}`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setEditedRoom(initialClearEditedMeetingData);
  };

  useEffect(() => {
    checkAvailabilityRoomType();
  }, []);

  return (
      <>
          <div className="window__header">
              <div className="header__title">Edytowanie pomieszczenia</div>
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
                          value={editedRoom.roomId} 
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
                          value={editedRoom.roomName}
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
                          value={editedRoom.roomNumber}
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
                          value={editedRoom.minimumRoomPeople}
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
                          value={editedRoom.maximumRoomPeople}
                          min={0}
                          name="maximumRoomPeople"
                          onChange={elementNumberValueHandler}
                      />
                  </label>
                  <label className="form__label">
                      Status pomieszczenia*
                      <div className="label__group">
                        <div className={editedRoom.roomStatus ? "form__information-block form__information-block--active" : "form__information-block form__information-block--default"}>
                            {editedRoom.roomStatus ? 'Pomieszczenie aktywne' : 'Pomieszczenie nieaktywne'}
                        </div>
                        <input
                            className="form__checkbox-element"
                            type="checkbox"
                            checked={editedRoom.roomStatus}
                            name="roomStatus"
                            onChange={(e) => {setEditedRoom((prevState: editedRoomElement) => {return {
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
                            value={editedRoom.roomType}
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
                            value={editedRoom.additionalInformation}
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
                          value={dateStringToDateTimeInputFormat(editedRoom.dateAdded)}
                          disabled
                      />
                  </label>
                  <label className="form__label form__label--full-width">
                      Data modyfikacji
                      <input
                          className="form__input-element"
                          type="datetime-local"
                          value={dateStringToDateTimeInputFormat(editedRoom.modificationDate)}
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
                          onClick={() => updateRoomElement()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default EditRoomModalWindow;
