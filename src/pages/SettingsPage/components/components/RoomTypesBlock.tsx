import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { ADD_NOTIFICATION } from "../../../../redux/slices/globalSettingsSlice";
import { ADD_TYPE, REMOVE_TYPE, UPDATE_TYPE } from "../../../../redux/slices/roomTypesSlice";
import { AppDispatch } from "../../../../redux/store";
import { roomTypeDataType } from "../../../../types/roomTypeDataType";

function RoomTypesBlock(props: { roomTypesData: roomTypeDataType[] }) {
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

  const roomTypeNamesData: string[] = props.roomTypesData.map((e: roomTypeDataType) => e.roomTypeName.toUpperCase());
  const newIdRoomTypeElement: number = props.roomTypesData.map((e: roomTypeDataType) => e.roomTypeId).sort((a, b) => b - a)[0] + 1;

  const addRoomType = (): void => {
    const roomTypeInputValue: string = formElements.newValue;

    if (roomTypeInputValue == "") {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadź wartość do formularza",
      }});

    } else if (roomTypeNamesData.includes(roomTypeInputValue.toUpperCase())) {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadzona wartość już istnieje",
      }});

    } else {
      dispatch(
        ADD_TYPE({
          roomTypeId: newIdRoomTypeElement,
          roomTypeName: roomTypeInputValue,
          dateAdded: new Date().toJSON(),
        })
      );
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowy rodzaj pomieszczenia o nazwie: ${roomTypeInputValue}`, notificationDate: new Date().toJSON(), seenNotification: false})), 
      setFormElements(initialClearFormElements);
    }
  };

  const editRoomType = (elementId: number): void => {
    const editElementInputValue: string = formElements.editInput.newUpdateValue;
    const editElementValue: string = formElements.editInput.elementValue;

    if (editElementInputValue == "") {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        error: "Wprowadź wartość do formularza",
      }});

    } else if (roomTypeNamesData.includes(editElementInputValue.toUpperCase()) && editElementValue.toUpperCase() != editElementInputValue.toUpperCase()
    ) {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        error: "Wprowadzona wartość już istnieje",
      }});

    } else {
      const [roomTypeElement]: roomTypeDataType[] = props.roomTypesData.filter((e: roomTypeDataType) => e.roomTypeId === elementId);
      const roomTypeElementIndex: number = props.roomTypesData.indexOf(roomTypeElement);

      dispatch(
        UPDATE_TYPE({
          index: roomTypeElementIndex,
          value: { ...roomTypeElement, roomTypeName: editElementInputValue },
        })
      );

      dispatch(ADD_NOTIFICATION({notificationName: `Zaktualizowano rodzaj pomieszczenia`, notificationDate: new Date().toJSON(), seenNotification: false})), 

      setFormElements(initialClearFormElements);
    }
  };

  const removeRoomType = (elementId: number): void => {
    const [roomTypeElement]: roomTypeDataType[] = props.roomTypesData.filter((e: roomTypeDataType) => e.roomTypeId === elementId);
    const roomTypeElementIndex: number = props.roomTypesData.indexOf(roomTypeElement);

    dispatch(ADD_NOTIFICATION({notificationName: `Usunięto rodzaj pomieszczenia o nazwie: ${props.roomTypesData[roomTypeElementIndex].roomTypeName}`, notificationDate: new Date().toJSON(), seenNotification: false})), 

    dispatch(REMOVE_TYPE(roomTypeElementIndex));

    setFormElements(initialClearFormElements);
  };

  return (
    <>
      <div className="block__header">
        <div className="header__title">Rodzaje pomieszczeń</div>
        <div className="header__stats">
          Ilosć danych: {props.roomTypesData.length}
        </div>
      </div>
      <div className="block__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum adipisci consequatur nemo molestiae perspiciatis? Aperiam quibusdam aliquid eligendi ipsum et, quasi, a aut nisi hic modi quis voluptatum, soluta necessitatibus sint ut esse iusto atque.
      </div>
      <div className="block__error">{formElements.validationError}</div>
      <div className="block__content">
        {props.roomTypesData.length > 0 ? (
          <table className="content__table">
            <thead>
              <tr className="table-tr">
                <th className="table-th">ID</th>
                <th className="table-th">Nazwa</th>
                <th className="table-th">Opcje</th>
              </tr>
            </thead>
            <tbody>
              {props.roomTypesData.map((e: roomTypeDataType) => (
                <tr className="table-tr" key={e.roomTypeId}>
                  <td className="table-td">{e.roomTypeId}</td>
                  <td className="table-td">
                    {formElements.editInput.elementId === e.roomTypeId ? (
                      <input
                        className="table-text-input"
                        type="text"
                        value={formElements.editInput.newUpdateValue}
                        onChange={(e) =>
                          setFormElements((prevState: settingsFormData) => {return {
                            ...prevState,
                            editInput: {
                              ...prevState.editInput,
                              newUpdateValue: e.target.value,
                            },
                          }})
                        }
                      />
                    ) : (
                      e.roomTypeName
                    )}
                  </td>
                  <td className="table-td">
                    {formElements.editInput.elementId ===
                    e.roomTypeId ? null : (
                      <button
                        className="table-button"
                        onClick={() =>
                          setFormElements((prevState: settingsFormData) => {return {
                            ...prevState,
                            validationError: '',
                            editInput: {
                              ...prevState.editInput,
                              elementId: e.roomTypeId,
                              elementValue: e.roomTypeName,
                              newUpdateValue: e.roomTypeName
                            },
                          }})
                        }
                      >
                        Edytuj
                      </button>
                    )}

                    {formElements.editInput.elementId === e.roomTypeId ? (
                      <button className="table-button" onClick={() => editRoomType(e.roomTypeId)}>
                        Zaktualizuj
                      </button>
                    ) : null}

                    {formElements.editInput.elementId ===
                    e.roomTypeId ? null : (
                      <button className="table-button" onClick={() => removeRoomType(e.roomTypeId)}>
                        Usuń
                      </button>
                    )}

                    {formElements.editInput.elementId === e.roomTypeId ? (
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
              ))}
              <tr className="table-tr" key={newIdRoomTypeElement}>
                <td className="table-td">
                  {newIdRoomTypeElement}
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
                      addRoomType();
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

export default RoomTypesBlock;
