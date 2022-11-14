import React, { useEffect, useState } from "react";
import { MAX_HOURS_RESERVATION, MIN_HOURS_RESERVATION } from "../../../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION, CLOSE_MODAL_WINDOW } from "../../../../redux/slices/globalSettingsSlice";
import { ADD_MEETING } from "../../../../redux/slices/meetingsPageSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { employeeDataType } from "../../../../types/employeeDataType";
import { meetingCategoryDataType } from "../../../../types/meetingCategoryDataType";
import { meetingDataType } from "../../../../types/meetingDataType";
import { roomDataType } from "../../../../types/roomDataType";
import { convertDateAndTimeStringToMiliseconds } from "../../../../utils/convertDateAndTimeStringToMiliseconds";
import { dateStringToInputFormat } from "../../../../utils/dateStringToDateInputFormat";
import { dateStringToDateLocalString } from "../../../../utils/dateStringToDateLocalString";
import { dateStringToDateTimeInputFormat } from "../../../../utils/dateStringToDateTimeInputFormat";
import { dateToDateInputFormat } from "../../../../utils/dateToDateInputFormat";
import { valueLessThanTen } from "../../../../utils/valueLessThanTenFormat";

function AddMeetingModalWindow() {
  const meetingsData: meetingDataType[] = useAppSelector((state: RootState) => state.meetingsPage.value);
  const roomsData: roomDataType[] = useAppSelector((state: RootState) => state.roomsPage.value);
  const employeeresData: employeeDataType[] = useAppSelector((state: RootState) => state.employeeresPage.value);
  const meetingCategoriesData: meetingCategoryDataType[] = useAppSelector((state: RootState) => state.meetingCategories.value);

  const dispatch: AppDispatch = useAppDispatch();

  interface newMeetingElement {
    meetingId: number;
    meetingName: string;
    meetingCategory: string;
    roomName: string;
    employeeName: string;
    meetingPeopleNumber: number;
    meetingDate: string;
    meetingTimeStart: string;
    meetingTimeEnd: string;
    additionalInformation: string;
    dateAdded: string;
    modificationDate: null | string;
  }

  interface validationElementValue {
    value: string;
    correctValidation: boolean;
  }

  type validationElementName = 'meetingName' | 'meetingCategory' | 'roomName' | 'employeeName' | 'meetingPeopleNumber' | 'meetingDate' | 'meetingTimeStart' | 'meetingTimeEnd' | 'roomMeetingsConflictsData';

  type formValidationElements = {
    [key in validationElementName]: validationElementValue;
  }

  interface roomMeetingsConflictsData {
    meetingName: string;
    meetingStart: string;
    meetingEnd: string;
    meetingStartDateTimeMs: number;
    meetingEndDateTimeMs: number;
  }

  const generateMeetingID = (): number => {
    let newIdValue: number;

    if (meetingsData.length > 0) {
      const [lastIdValue]: number[] = meetingsData
        .map((e: meetingDataType) => e.meetingId)
        .sort((a, b) => b - a);
      newIdValue = lastIdValue + 1;
      return newIdValue;
      
    } else {
      newIdValue = 1;
      return newIdValue;
    }
  };

  const initialNewMeetingData: newMeetingElement = {
    meetingId: generateMeetingID(),
    meetingName: "",
    meetingCategory: "",
    roomName: "",
    employeeName: "",
    meetingPeopleNumber: 0,
    meetingDate: "",
    meetingTimeStart: "",
    meetingTimeEnd: "",
    additionalInformation: "",
    dateAdded: new Date().toJSON(),
    modificationDate: null
  };

  const [newMeeting, setNewMeeting] = useState<newMeetingElement>(initialNewMeetingData);

  const initialFormValidationElementsData: formValidationElements = {
    meetingName: { value: '', correctValidation: true },
    meetingCategory: { value: '', correctValidation: true },
    roomName: { value: '', correctValidation: true },
    employeeName: { value: '', correctValidation: true },
    meetingPeopleNumber: { value: '', correctValidation: true },
    meetingDate: { value: '', correctValidation: true },
    meetingTimeStart: { value: '', correctValidation: true },
    meetingTimeEnd: { value: '', correctValidation: true },
    roomMeetingsConflictsData: { value: '', correctValidation: true }
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

  const activeEmployeeresData: employeeDataType[] = employeeresData.filter((e: employeeDataType) => e.employeeStatus === true);
  const activeRoomsData: roomDataType[] = roomsData.filter((e: roomDataType) => e.roomStatus === true);

  const minPeopleNumberInRoom: number = newMeeting.roomName == "" ? 0 : roomsData.filter((e: roomDataType) => e.roomName == newMeeting.roomName)[0].minimumRoomPeople;
  const maxPeopleNumberInRoom: number = newMeeting.roomName == "" ? 0 : roomsData.filter((e: roomDataType) => e.roomName == newMeeting.roomName)[0].maximumRoomPeople;

  const elementValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setNewMeeting((prevState: newMeetingElement) => {return {
      ...prevState,
      [e.target.name]: e.target.value
    }})
  };

  const elementNumberValueHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void => {
    setNewMeeting((prevState: newMeetingElement) => {return {
      ...prevState,
      [e.target.name]: parseInt(e.target.value)
    }})
  };

  const validateMeetingNameInput = (): boolean => {
    if (newMeeting.meetingName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingName: {value: 'Wprowadź nazwę pomieszczenia', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateMeetingCategoryInput = (): boolean => {
    if (newMeeting.meetingCategory == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingCategory: {value: 'Wybierz kategorię spotkania', correctValidation: false}}
      });
      return false;

    } else if (meetingCategoriesData.length == 0) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingCategory: {value: 'Brak kategorii do wyświetlenia. Uzupełnij dane, aby wypełnić formularz', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingCategory: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateEmployeeNameInput = (): boolean => {
    if (newMeeting.employeeName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeeName: {value: 'Wybierz organizatora spotkania', correctValidation: false}}
      });
      return false;

    } else if (employeeresData.length == 0) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeeName: {value: 'Brak pracowników do wyświetlenia. Uzupełnij dane, aby wyświetlić formularz', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, employeeName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateMeetingDateInput = (): boolean => {
    if (newMeeting.meetingDate == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingDate: {value: 'Wprowadź datę spotkania', correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingDate < dateToDateInputFormat(new Date())) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingDate: {value: `Błędnie wprowadzona data spotkania. Minimalnie od ${new Date().toLocaleDateString()}`, correctValidation: false}}
      });
      return false;

    } else if (new Date(newMeeting.meetingDate).toLocaleDateString() == new Date().toLocaleDateString() && `${valueLessThanTen(new Date().getHours())}:${valueLessThanTen(new Date().getMinutes())}` > MAX_HOURS_RESERVATION) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingDate: {value: 'Na dzień dzisiejszy nie możesz utworzyć spotkania', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingDate: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateMeetingTimeStartInput = (): boolean => {
    if (newMeeting.meetingDate == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeStart: {value: '', correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingTimeStart == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeStart: {value: 'Wprowadź godzinę rozpoczęcia spotkania', correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingTimeStart < MIN_HOURS_RESERVATION) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeStart: {value: `Błędnie wprowadzona godzina rozpoczęcia. Minimalnie od ${MIN_HOURS_RESERVATION}`, correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingTimeStart >= newMeeting.meetingTimeEnd) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeStart: {value: 'Godzina rozpoczęcia powinna być mniejsza od zakończenia', correctValidation: false}}
      });
      return false;

    } else if (new Date(newMeeting.meetingDate).toLocaleDateString() == new Date().toLocaleDateString() && newMeeting.meetingTimeStart <= `${valueLessThanTen(new Date().getHours())}:${valueLessThanTen(new Date().getMinutes())}`) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeStart: {value: 'Godzina powinna być większa od aktualnej', correctValidation: false}}
      });
      return false;
      
    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeStart: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateMeetingTimeEndInput = (): boolean => {
    if (newMeeting.meetingDate == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeEnd: {value: '', correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingTimeEnd == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeEnd: {value: 'Wprowadź godzinę zakończenia spotkania', correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingTimeEnd > MAX_HOURS_RESERVATION) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeEnd: {value: `Błędnie wprowadozna godzina zakończenia. Maksymalnie do ${MAX_HOURS_RESERVATION}`, correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingTimeEnd <= newMeeting.meetingTimeStart) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeEnd: {value: 'Godzina zakończenia powinna być większa od rozpoczęcia', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingTimeEnd: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateMeetingRoomInput = (): boolean => {
    if (newMeeting.roomName == "") {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: 'Wybierz pomieszczenie', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomName: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateMeetingPeopleNumberInput = (): boolean => {
    if (!formValidationElements.roomName.correctValidation) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingPeopleNumber: {value: '', correctValidation: false}}
      });
      return false;

    } else if (isNaN(newMeeting.meetingPeopleNumber) || newMeeting.meetingPeopleNumber == 0) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingPeopleNumber: {value: 'Wprowadź ilość osób na spotkaniu', correctValidation: false}}
      });
      return false;

    } else if (newMeeting.meetingPeopleNumber < minPeopleNumberInRoom || newMeeting.meetingPeopleNumber > maxPeopleNumberInRoom) {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingPeopleNumber: {value: 'Wprowadź poprawnie ilość osób na spotkaniu', correctValidation: false}}
      });
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingPeopleNumber: {value: '', correctValidation: true}}
      });
      return true;
    }
  };

  const validateCheckRoomMeetingsConflicts= (): boolean => {
    const meetingRoomDateTimeData: roomMeetingsConflictsData[] = meetingsData.filter((e: meetingDataType) => e.roomName == newMeeting.roomName).map((e: meetingDataType) => {return {
      meetingName: e.meetingName, 
      meetingStart: e.meetingTimeStart, 
      meetingEnd: e.meetingTimeEnd, 
      meetingStartDateTimeMs: convertDateAndTimeStringToMiliseconds(e.meetingDate, e.meetingTimeStart), 
      meetingEndDateTimeMs: convertDateAndTimeStringToMiliseconds(e.meetingDate, e.meetingTimeEnd)
    }});

    const inputMeetingStartMs: number = convertDateAndTimeStringToMiliseconds(newMeeting.meetingDate, newMeeting.meetingTimeStart);
    const inputMeetingEndMs: number = convertDateAndTimeStringToMiliseconds(newMeeting.meetingDate, newMeeting.meetingTimeEnd);
    
    const filteredRoomMeetingsData: roomMeetingsConflictsData[] = meetingRoomDateTimeData.filter((e: roomMeetingsConflictsData) => e.meetingEndDateTimeMs >= inputMeetingStartMs && e.meetingStartDateTimeMs <= inputMeetingEndMs)

    if (filteredRoomMeetingsData.length > 0) {
      setFormValidationElements((prevState: formValidationElements) => {
        filteredRoomMeetingsData.sort((a, b) => a.meetingStartDateTimeMs - b.meetingStartDateTimeMs);

        return {...prevState, roomDateTimeMeetingData: {value: `Nie możesz zaplanować spotkania na dany dzień i w określonych godzinach (${newMeeting.meetingTimeStart} - ${newMeeting.meetingTimeEnd}), ponieważ wtedy pomieszczenie jest zajęte ${filteredRoomMeetingsData.map(e => ` (${e.meetingStart} - ${e.meetingEnd}: ${e.meetingName})`)}`, correctValidation: false}}
      })
  
      return false;

    } else {
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, roomDateTimeMeetingData: {value: '', correctValidation: true}}
      })
  
      return true;
    }
  };

  const addMeetingToList = (): void => {
    const correctValidationMeetingName: boolean = validateMeetingNameInput();
    const correctValidationMeetingCategory: boolean = validateMeetingCategoryInput();
    const correctValidationMeetingRoom: boolean = validateMeetingRoomInput();
    const correctValidationEmployeeName: boolean = validateEmployeeNameInput();
    const correctValidationPeopleNumber: boolean = validateMeetingPeopleNumberInput();
    const correctValidationMeetingDate: boolean = validateMeetingDateInput();
    const correctValidationMeetingTimeStart: boolean = validateMeetingTimeStartInput();
    const correctValidationMeetingTimeEnd: boolean = validateMeetingTimeEndInput();
    const correctValidationRoomMeetingsConflicts: boolean = validateCheckRoomMeetingsConflicts();

    const correctValidation: boolean =
    correctValidationMeetingName &&
    correctValidationMeetingCategory &&
    correctValidationMeetingRoom &&
    correctValidationEmployeeName &&
    correctValidationPeopleNumber &&
    correctValidationMeetingDate &&
    correctValidationMeetingTimeStart &&
    correctValidationMeetingTimeEnd &&
    correctValidationRoomMeetingsConflicts
      ? true
      : false;

    if (correctValidation) {
      setFormErrorMessage('');
      dispatch(ADD_MEETING(newMeeting));
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowe spotkanie o nazwie '${newMeeting.meetingName}' zaplanowane na dzień ${dateStringToDateLocalString(newMeeting.meetingDate)}`, notificationDate: new Date().toJSON(), seenNotification: false})) ;
      dispatch(CLOSE_MODAL_WINDOW());
    } else {
      setFormErrorMessage('Sprawdź poprawność wypełnienia formularza');
    }
  };

  const resetFormValues = (): void => {
    setFormValidationElements(initialFormValidationElementsData);
    setFormErrorMessage('');
    setNewMeeting(initialNewMeetingData);
  };

  useEffect((): void => {
    newMeeting.roomName.length == 0 ? (
      setFormValidationElements((prevState: formValidationElements) => {
        return {...prevState, meetingPeopleNumber: {value: '', correctValidation: true}}
      })
    ) : null
  }, [newMeeting.roomName]);

  return (
      <>
          <div className="window__header">
              <div className="header__title">Dodawanie spotkania</div>
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
                          value={newMeeting.meetingId} 
                          disabled 
                      />
                  </label>
                  <label className="form__label form__label--three-width">
                      Nazwa spotkania*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.meetingName.value}
                      </div>
                      <input
                          className="form__input-element"
                          type="text"
                          value={newMeeting.meetingName}
                          name="meetingName"
                          onChange={elementValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--two-width">
                      Kategoria spotkania*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.meetingCategory.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={newMeeting.meetingCategory}
                            name="meetingCategory"
                            onChange={elementValueHandler}
                        >
                            <option value=""></option>
                            {meetingCategoriesData.map((e: meetingCategoryDataType) => (
                                <option
                                    key={e.meetingCategoryId}
                                    value={e.meetingCategoryName}
                                >
                                    {e.meetingCategoryName}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                      </div>
                  </label>
                  <label className="form__label form__label--two-width">
                      Organizator*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.employeeName.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={newMeeting.employeeName}
                            name="employeeName"
                            onChange={elementValueHandler}
                        >
                            <option value=""></option>
                            {activeEmployeeresData.map((e: employeeDataType) => (
                                <option
                                    key={e.employeeId}
                                    value={e.employeeName}
                                >
                                    {e.employeeName}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined">arrow_drop_down</span>
                      </div>
                  </label>
                  <label className="form__label form__label--two-width">
                      Data spotkania*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.meetingDate.value}
                      </div>
                      <div className="form__element-with-icon">
                        <input
                            className="form__input-element"
                            type="date"
                            value={dateStringToInputFormat(newMeeting.meetingDate)}
                            name="meetingDate"
                            onChange={elementValueHandler}
                        />
                        <span className="material-symbols-outlined">calendar_month</span>
                      </div>
                  </label>
                  <label className="form__label">
                      Godzina rozpoczęcia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.meetingTimeStart.value}
                      </div>
                      <div className="form__element-with-icon">
                        <input
                            className="form__input-element"
                            type="time"
                            value={newMeeting.meetingTimeStart}
                            disabled={newMeeting.meetingDate.length > 0 ? false : true}
                            placeholder="00:00"
                            name="meetingTimeStart"
                            onChange={elementValueHandler}
                        />
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                  </label>
                  <label className="form__label">
                      Godzina zakończenia*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.meetingTimeEnd.value}
                      </div>
                      <div className="form__element-with-icon">
                        <input
                            className="form__input-element"
                            type="time"
                            value={newMeeting.meetingTimeEnd}
                            disabled={newMeeting.meetingDate.length > 0 ? false : true}
                            placeholder="00:00"
                            name="meetingTimeEnd"
                            onChange={elementValueHandler}
                        />
                        <span className="material-symbols-outlined">schedule</span>
                      </div>
                  </label>
                  <label className="form__label form__label--two-width">
                      Pomieszczenie*
                      <div className="form__information-block form__information-block--error">
                          {formValidationElements.roomName.value}
                      </div>
                      <div className="form__element-with-icon">
                        <select
                            className="form__select-element"
                            value={newMeeting.roomName}
                            name="roomName"
                            onChange={(e) => {elementValueHandler(e), validateMeetingPeopleNumberInput()}}
                        >
                            <option value=""></option>
                            {activeRoomsData.map((e: roomDataType) => (
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
                      Ilość osób*
                      <div className="form__information-block form__information-block--error">
                        {formValidationElements.meetingPeopleNumber.value}
                      </div>
                      {newMeeting.roomName == '' 
                        ? null 
                        : (
                          <div className="form__information-block form__information-block--default">
                            Min. osób: {minPeopleNumberInRoom == 0 ? 1 : minPeopleNumberInRoom} / Max. osób: {maxPeopleNumberInRoom}
                        </div>                         
                      )}
                      <input
                          className="form__input-element"
                          type="number"
                          value={newMeeting.meetingPeopleNumber}
                          disabled={newMeeting.roomName.length > 0 ? false : true}
                          min={0}
                          name="meetingPeopleNumber"
                          onChange={elementNumberValueHandler}
                      />
                  </label>
                  <label className="form__label form__label--full-width">
                      Dodatkowe informacje
                      <div className="form__textarea-element-with-icon">
                        <textarea
                            className="form__textarea-element"
                            value={newMeeting.additionalInformation}
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
                          value={dateStringToDateTimeInputFormat(newMeeting.dateAdded)}
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
                          onClick={() => addMeetingToList()}
                      />
                  </div>
              </form>
          </div>
      </>
  )
}

export default AddMeetingModalWindow;
