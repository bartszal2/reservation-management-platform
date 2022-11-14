import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION } from "../../../../redux/slices/globalSettingsSlice";
import { ADD_CATEGORY, REMOVE_CATEGORY, UPDATE_CATEGORY } from "../../../../redux/slices/meetingCategoriesSlice";
import { AppDispatch } from "../../../../redux/store";
import { meetingCategoryDataType } from "../../../../types/meetingCategoryDataType";

function MeetingCategoriesBlock(props: { meetingsCategoriesData: meetingCategoryDataType[] }) {
  const dispatch: AppDispatch = useAppDispatch();

  interface settingsFormData {
    validationError: string;
    newValue: string;
    editInput: {
      elementId: number;
      elementValue: string;
      newUpdateValue: string;
    }
  }

  const initialClearFormElements: settingsFormData = {
    validationError: "",
    newValue: "",
    editInput: {
      elementId: 0,
      elementValue: "",
      newUpdateValue: ""
    }
  };

  const [formElements, setFormElements] = useState<settingsFormData>(initialClearFormElements);

  const meetingCategoryNamesData: string[] = props.meetingsCategoriesData.map((e: meetingCategoryDataType) => e.meetingCategoryName.toUpperCase());
  const newIdMeetingCategoryElement: number = props.meetingsCategoriesData.map((e: meetingCategoryDataType) => e.meetingCategoryId).sort((a, b) => b - a)[0] + 1;

  const addMeetingCategory = (): void => {
    const meetingCategoryInputValue: string = formElements.newValue;

    if (meetingCategoryInputValue == "") {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadź wartość do formularza",
      }});

    } else if (meetingCategoryNamesData.includes(meetingCategoryInputValue.toUpperCase())) {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadzona wartość już istnieje",
      }});

    } else {
      dispatch(
        ADD_CATEGORY({
          meetingCategoryId: newIdMeetingCategoryElement,
          meetingCategoryName: meetingCategoryInputValue,
          dateAdded: new Date().toJSON(),
        })
      );
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowy rodzaj spotkania o nazwie: ${meetingCategoryInputValue}`, notificationDate: new Date().toJSON(), seenNotification: false})), 
      setFormElements(initialClearFormElements);
    }
  };

  const editMeetingCategory = (elementId: number): void => {
    const editElementInputValue: string = formElements.editInput.newUpdateValue;
    const editElementValue: string = formElements.editInput.elementValue;

    if (editElementInputValue == "") {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadź wartość do formularza",
      }});

    } else if (meetingCategoryNamesData.includes(editElementInputValue.toUpperCase()) && editElementValue.toUpperCase() != editElementInputValue.toUpperCase()) {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadzona wartość już istnieje",
      }});

    } else {
      const [meetingCategoryElement]: meetingCategoryDataType[] = props.meetingsCategoriesData.filter(
        (e: meetingCategoryDataType) => e.meetingCategoryId === elementId
      );
      const meetingCategoryIndex: number = props.meetingsCategoriesData.indexOf(
        meetingCategoryElement
      );

      dispatch(
        UPDATE_CATEGORY({
          index: meetingCategoryIndex,
          value: {
            ...meetingCategoryElement,
            meetingCategoryName: editElementInputValue,
          },
        })
      );
      dispatch(ADD_NOTIFICATION({notificationName: `Zaktualizowano rodzaj spotkania`, notificationDate: new Date().toJSON(), seenNotification: false})), 

      setFormElements(initialClearFormElements);
    }
  };

  const removeMeetingCategory = (elementId: number): void => {
    const [meetingCategoryElement]: meetingCategoryDataType[] = props.meetingsCategoriesData.filter(
      (e: meetingCategoryDataType) => e.meetingCategoryId === elementId
    );
    const meetingCategoryElementIndex: number = props.meetingsCategoriesData.indexOf(
      meetingCategoryElement
    );

    dispatch(ADD_NOTIFICATION({notificationName: `Usunięto rodzaj spotkania o nazwie: ${props.meetingsCategoriesData[meetingCategoryElementIndex].meetingCategoryName}`, notificationDate: new Date().toJSON(), seenNotification: false})), 

    dispatch(REMOVE_CATEGORY(meetingCategoryElementIndex));

    setFormElements(initialClearFormElements);
  };

  return (
    <>
      <div className="block__header">
        <div className="header__title">Kategorie spotkań</div>
        <div className="header__stats">
          Ilosć danych: {props.meetingsCategoriesData.length}
        </div>
      </div>
      <div className="block__description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium voluptatibus sequi nostrum animi vitae quaerat, dicta consequuntur vel tenetur. Molestiae eaque ab inventore esse veniam dicta, atque omnis autem similique sint laboriosam minus! Nobis, qui.
      </div>
      <div className="block__error">{formElements.validationError}</div>
      <div className="block__content">
        {props.meetingsCategoriesData.length > 0 ? (
          <table className="content__table">
            <thead>
              <tr className="table-tr">
                <th className="table-th">ID</th>
                <th className="table-th">Nazwa</th>
                <th className="table-th">Opcje</th>
              </tr>
            </thead>
            <tbody>
              {props.meetingsCategoriesData.map(
                (e: meetingCategoryDataType) => (
                  <tr className="table-tr" key={e.meetingCategoryId}>
                    <td className="table-td">{e.meetingCategoryId}</td>
                    <td className="table-td">
                      {formElements.editInput.elementId ===
                      e.meetingCategoryId ? (
                        <input
                          className="table-text-input"
                          type="text"
                          value={formElements.editInput.newUpdateValue}
                          onChange={(e) =>
                            setFormElements((prevState: settingsFormData) => {return {
                              ...prevState,
                              editInput: {
                                ...prevState.editInput,
                                nweUpdateValue: e.target.value,
                              },
                            }})
                          }
                        />
                      ) : (
                        e.meetingCategoryName
                      )}
                    </td>
                    <td className="table-td">
                      {formElements.editInput.elementId ===
                      e.meetingCategoryId ? null : (
                        <button
                          className="table-button"
                          onClick={() =>
                            setFormElements((prevState: settingsFormData) => {return {
                              ...prevState,
                              validationError: '',
                              editInput: {
                                ...prevState.editInput,
                                elementId: e.meetingCategoryId,
                                elementValue: e.meetingCategoryName,
                                newUpdateValue: e.meetingCategoryName,
                              },
                            }})
                          }
                        >
                          Edytuj
                        </button>
                      )}

                      {formElements.editInput.elementId ===
                      e.meetingCategoryId ? (
                        <button
                          className="table-button"
                          onClick={() =>
                            editMeetingCategory(e.meetingCategoryId)
                          }
                        >
                          Zaktualizuj
                        </button>
                      ) : null}

                      {formElements.editInput.elementId ===
                      e.meetingCategoryId ? null : (
                        <button
                          className="table-button"
                          onClick={() =>
                            removeMeetingCategory(e.meetingCategoryId)
                          }
                        >
                          Usuń
                        </button>
                      )}

                      {formElements.editInput.elementId ===
                      e.meetingCategoryId ? (
                        <button
                          className="table-button"
                          onClick={() =>
                            setFormElements(initialClearFormElements)
                          }
                        >
                          Wróć
                        </button>
                      ) : null}
                    </td>
                  </tr>
                )
              )}
              <tr className="table-tr" key={newIdMeetingCategoryElement}>
                <td className="table-td">
                  {newIdMeetingCategoryElement}
                </td>
                <td className="table-td">
                  <input
                    className="table-text-input"
                    type="text"
                    value={formElements.newValue}
                    onChange={(e) =>
                      setFormElements((prevState: settingsFormData) => {return {
                        ...prevState,
                        newValue: e.target.value,
                      }})
                    }
                  />
                </td>
                <td className="table-td">
                  <button
                    className="table-button"
                    onClick={() => {
                      addMeetingCategory();
                    }}
                  >
                    Dodaj
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <div className="content__error">Brak danych do wyświetlenia</div>
        )}
      </div>
    </>
  );
}

export default MeetingCategoriesBlock;
