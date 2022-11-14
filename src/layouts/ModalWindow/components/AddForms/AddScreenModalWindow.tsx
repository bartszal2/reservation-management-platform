import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { ADD_SCREEN } from "../../../../redux/slices/screensPageSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { roomDataType } from "../../../../types/roomDataType";
import { screenDataType } from "../../../../types/screenDataType";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";

function AddScreenModalWindow() {
  const screensData: screenDataType[] = useAppSelector((state: RootState) => state.screensPage.value);
  const roomsData: roomDataType[] = useAppSelector((state: RootState) => state.roomsPage.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface newScreenElement {
    screenId: number;
    screenName: string;
    roomName: string;
    screenLocation: string;
    screenStatus: boolean;
    screenType: string;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: null | string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'screenName' | 'roomName' | 'screenLocation' | 'screenType';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  const generateScreenId = (): number => {
    let newIdValue: number;

    if (screensData.length > 0) {
      const [lastIdValue]: number[] = screensData
        .map((e: screenDataType) => e.screenId)
        .sort((a, b) => b - a);
      newIdValue = lastIdValue + 1;
      return newIdValue;
      
    } else {
      newIdValue = 1;
      return newIdValue;
    }
  };

  const initialNewScreenData: newScreenElement = {
    screenId: generateScreenId(),
    screenName: '',
    roomName: '',
    screenLocation: '',
    screenStatus: true,
    screenType: '',
    additionalInformation: '',
    dateAdded: new Date().toJSON(),
    modificationDate: null
  };

  const [newScreen, setNewScreen] = useState<newScreenElement>(initialNewScreenData);

  const initialFormValidationElementsData: formValidationElements = {
    screenName: { value: '', correctValidation: true },
    roomName: { value: '', correctValidation: true },
    screenLocation: { value: '', correctValidation: true },
    screenType: { value: '', correctValidation: true }
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
    setNewScreen((prevState: newScreenElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const validateScreenNameInput = () => {
    if (newScreen.screenName == "") {
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

    if (newScreen.roomName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Wybierz pomieszczenie', correctValidation: false}}
      });
      return false;

    } else if (screenRoomsData.includes(newScreen.roomName.toUpperCase())) {
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
    if (newScreen.screenLocation == "") {
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
    if (newScreen.screenType == "") {
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

  const addScreenToList = (): void => {
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
      setFormErrorMessage('');
      dispatch(ADD_SCREEN(newScreen));
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowy ekran o nazwie '${newScreen.screenName}'`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setNewScreen(initialNewScreenData);
  };

  return (
      <>
          <div className="window__header">
              <div className="header__title">Dodawanie ekranu</div>
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
                          value={newScreen.screenId} 
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
                          value={newScreen.screenName}
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
                            value={newScreen.screenType}
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
                            value={newScreen.roomName}
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
                          value={newScreen.screenLocation}
                          name="screenLocation"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--two-width">
                      Status ekranu*
                      <div className="from__group">
                        <div className={newScreen.screenStatus ? "form__information-block form__information-block--active" : "form__information-block form__information-block--default"}>
                          {newScreen.screenStatus ? 'Ekran aktywny' : 'Ekran nieaktywny'}
                        </div>
                        <input
                            className="form__checkbox-element"
                            type="checkbox"
                            checked={newScreen.screenStatus}
                            name="screenStatus"
                            onChange={(e) => {setNewScreen((prevState: newScreenElement) => {return {
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
                            value={newScreen.additionalInformation}
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
                          value={dateStringToDateTimeInputFormat(newScreen.dateAdded)}
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
                          onClick={() => addScreenToList()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default AddScreenModalWindow;
