import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { UPDATE_SCREEN } from "../../../../redux/slices/screensPageSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { roomDataType } from "../../../../types/roomDataType";
import { screenDataType } from "../../../../types/screenDataType";
import { globalSettingsSliceType } from "../../../../types/slices/globalSettingsSliceTypes";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";

function EditScreenModalWindow() {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const editScreenElement: screenDataType | null = globalSettingsData.editScreenElement;
  const screensData: screenDataType[] = useAppSelector((state: RootState) => state.screensPage.value);
  const roomsData: roomDataType[] = useAppSelector((state: RootState) => state.roomsPage.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface editedScreenElement {
    screenId: number;
    screenName: string;
    roomName: string;
    screenLocation: string;
    screenStatus: boolean;
    screenType: string;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'screenName' | 'roomName' | 'screenLocation' | 'screenType' | 'checkAvailabilityRoomName';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  const initialEditedScreenData: editedScreenElement = {
    screenId: editScreenElement!.screenId,
    screenName: editScreenElement!.screenName,
    roomName: editScreenElement!.roomName,
    screenLocation: editScreenElement!.screenLocation,
    screenStatus: editScreenElement!.screenStatus,
    screenType: editScreenElement!.screenType,
    additionalInformation: editScreenElement!.additionalInformation ? editScreenElement!.additionalInformation : '',
    dateAdded: editScreenElement!.dateAdded,
    modificationDate: new Date().toJSON()
  };

  const initialClearEditedScreenData: editedScreenElement = {
    screenId: editScreenElement!.screenId,
    screenName: '',
    roomName: '',
    screenLocation: '',
    screenStatus: true,
    screenType: '',
    additionalInformation: '',
    dateAdded: editScreenElement!.dateAdded,
    modificationDate: new Date().toJSON()
  };

  const [editedScreen, setEditedScreen] = useState<editedScreenElement>(initialEditedScreenData);

  const initialFormValidationElementsData: formValidationElements = {
    screenName: { value: '', correctValidation: true },
    roomName: { value: '', correctValidation: true },
    screenLocation: { value: '', correctValidation: true },
    screenType: { value: '', correctValidation: true },
    checkAvailabilityRoomName: { value: '', correctValidation: true }
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

  const [currentRoomElement]: roomDataType[] = roomsData.filter((e: roomDataType) => e.roomName == editedScreen.roomName);

  const checkAvailabilityRoomName = (): void => {
    if (!currentRoomElement) {
      setEditedScreen((prevState: editedScreenElement) => {return {
        ...prevState, 
        roomName: ''}});
      setFormErrorMessage('Uwaga!');
      setFormValidationElements((prevState: formValidationElements) => {return {
        ...prevState,
        checkAvailabilityRoomName: {value: 'Brak danego pomieszczenia w danych o pomieszczeniach (Pole formularza: "Ekran dla pomieszczenia" zostało zresetowane)', correctValidation: false}}});
    }
  };

  const elementValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setEditedScreen((prevState: editedScreenElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const validateScreenNameInput = () => {
    if (editedScreen.screenName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, screenName: {value: 'Wprowadź nazwę ekranu', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, screenName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateRoomNameInput = () => {
    const screenRoomsData = screensData.map(e => e.roomName.toUpperCase())

    if (editedScreen.roomName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Wybierz pomieszczenie', correctValidation: false}}
      });
      return false;

    } else if (screenRoomsData.includes(editedScreen.roomName.toUpperCase()) && editedScreen.screenName != editScreenElement!.screenName) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Dane pomieszczenie posiada już swój ekran', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateScreenLocationInput = () => {
    if (editedScreen.screenLocation == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, screenLocation: {value: 'Wprowadź lokalizację ekranu', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, screenLocation: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateScreenTypeInput = () => {
    if (editedScreen.screenType == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, screenType: {value: 'Wybierz rodzaj ekranu', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, screenType: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const updateScreenElement = (): void => {
    setFormValidationElements(initialFormValidationElementsData);

    const correctValidationScreenName: boolean = validateScreenNameInput();
    const correctValidationRoomName: boolean = validateRoomNameInput();
    const correctValidationScreenLocation: boolean = validateScreenLocationInput();
    const correctValidationScreenType: boolean = validateScreenTypeInput();

    const correctValidation: boolean =
    correctValidationScreenName &&
    correctValidationRoomName &&
    correctValidationScreenLocation &&
    correctValidationScreenType
      ? true
      : false;

    if (correctValidation) {
      const editScreenElementIndex: number = screensData.indexOf(editScreenElement!)

      setFormErrorMessage('');
      dispatch(UPDATE_SCREEN({index: editScreenElementIndex, value: editedScreen}));
      dispatch(ADD_NOTIFICATION({notificationName: `Zaktualizowano ekran o ID: ${editedScreen.screenId}`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setEditedScreen(initialClearEditedScreenData);
  };

  useEffect(() => {
    checkAvailabilityRoomName();
  }, []);

  return (
      <>
          <div className="window__header">
              <div className="header__title">Edytowanie ekranu</div>
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
                          value={editedScreen.screenId} 
                          disabled 
                      />
                  </label>
                  <label className="form__label form__label--three-width">
                      Nazwa ekranu*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.screenName.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="text"
                          value={editedScreen.screenName}
                          name="screenName"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--two-width">
                      Rodzaj ekranu*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.screenType.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={editedScreen.screenType}
                            name="screenType"
                            onChange={elementValueHandler}
                        >
                            <option value=""></option>
                            <option value="horizontal">Poziomo</option>
                            <option value="vertical">Pionowo</option>
                        </select>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                      </div>
                  </label>
                  <label className="form__label form__label--two-width">
                      Ekran dla pomieszczenia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.roomName.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={editedScreen.roomName}
                            name="roomName"
                            onChange={elementValueHandler}
                        >
                            <option value=""></option>
                            {roomsData.map((e: roomDataType) => (
                                <option
                                    key={e.roomId}
                                    value={e.roomName}
                                >
                                    {e.roomName}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                      </div>
                  </label>
                  <label className="form__label form__label--two-width">
                      Lokalizacja ekranu*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.screenLocation.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="text"
                          value={editedScreen.screenLocation}
                          name="screenLocation"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--two-width">
                      Status ekranu*
                      <div className="from__group">
                        <div className={editedScreen.screenStatus ? "form__information-block form__information-block--active" : "form__information-block form__information-block--default"}>
                            {editedScreen.screenStatus ? 'Ekran aktywny' : 'Ekran nieaktywny'}
                        </div>
                        <input
                            className="form__checkbox-element"
                            type="checkbox"
                            checked={editedScreen.screenStatus}
                            name="screenStatus"
                            onChange={(e) => {setEditedScreen((prevState: editedScreenElement) => {return {
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
                      Dodatkowe informacje
                      <div className="form__textarea-element-with-icon">
                        <textarea
                            className="form__textarea-element"
                            value={editedScreen.additionalInformation}
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
                          value={dateStringToDateTimeInputFormat(editedScreen.dateAdded)}
                          disabled
                      />
                  </label>
                  <label className="form__label form__label--full-width">
                      Data modyfikacji
                      <input
                          className="form__input-element"
                          type="datetime-local"
                          value={dateStringToDateTimeInputFormat(editedScreen.modificationDate)}
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
                          onClick={() => updateScreenElement()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default EditScreenModalWindow;
