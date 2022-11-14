import React, { useState } from "react";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { ADD_POSITION, REMOVE_POSITION, UPDATE_POSITION } from "../../../../redux/slices/employeePositionsSlice";
import { ADD_NOTIFICATION } from "../../../../redux/slices/globalSettingsSlice";
import { AppDispatch } from "../../../../redux/store";
import { employeePositionDataType } from "../../../../types/employeePositionDataType";

function EmployeePositionsBlock(props: { employeePositionsData: employeePositionDataType[] }) {
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

  const employeePositionNamesData: string[] = props.employeePositionsData.map((e: employeePositionDataType) => e.employeePositionName.toUpperCase());
  const newIdEmployeePositionElement: number = props.employeePositionsData.map((e: employeePositionDataType) => e.employeePositionId).sort((a, b) => b - a)[0] + 1;

  const addEmployeePosition = (): void => {
    const employeePositionInputValue: string = formElements.newValue;

    if (employeePositionInputValue == "") {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadź wartość do formularza",
      }});

    } else if (employeePositionNamesData.includes(employeePositionInputValue.toUpperCase())) {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadzona wartość już istnieje",
      }});

    } else {
      dispatch(
        ADD_POSITION({
          employeePositionId: newIdEmployeePositionElement,
          employeePositionName: employeePositionInputValue,
          dateAdded: new Date().toJSON(),
        })
      );
      dispatch(ADD_NOTIFICATION({notificationName: `Dodano nowe stanowisko pracownika o nazwie: ${employeePositionInputValue}`, notificationDate: new Date().toJSON(), seenNotification: false})), 
      setFormElements(initialClearFormElements);
    }
  };

  const editEmployeePosition = (elementId: number): void => {
    const editElementInputValue: string = formElements.editInput.newUpdateValue;
    const editElementValue: string = formElements.editInput.elementValue;

    if (editElementInputValue == "") {
      setFormElements((prevState: settingsFormData) => {return {
        ...prevState,
        validationError: "Wprowadź wartość do formularza",
      }});
    } else if (employeePositionNamesData.includes(editElementInputValue.toUpperCase()) && editElementValue.toUpperCase() != editElementInputValue.toUpperCase()){
        setFormElements((prevState: settingsFormData) => {return {
          ...prevState,
          validationError: "Wprowadzona wartość już istnieje",
        }});

    } else {
      const [employeePositionElement]: employeePositionDataType[] = props.employeePositionsData.filter((e: employeePositionDataType) => e.employeePositionId === elementId);
      const employeePositionElementIndex: number = props.employeePositionsData.indexOf(employeePositionElement);

      dispatch(
        UPDATE_POSITION({
          index: employeePositionElementIndex,
          value: {
            ...employeePositionElement,
            employeePositionName: editElementInputValue,
          },
        })
      );
      dispatch(ADD_NOTIFICATION({notificationName: `Zaktualizowano stanowisko pracownika`, notificationDate: new Date().toJSON(), seenNotification: false})), 

      setFormElements(initialClearFormElements);
    }
  };

  const removeEmployeePosition = (elementId: number): void => {
    const [employeePositionElement]: employeePositionDataType[] = props.employeePositionsData.filter((e: employeePositionDataType) => e.employeePositionId === elementId);
    const employeePositionElementIndex: number = props.employeePositionsData.indexOf(employeePositionElement);

    dispatch(ADD_NOTIFICATION({notificationName: `Usunięto stanowisko pracownika o nazwie: ${props.employeePositionsData[employeePositionElementIndex].employeePositionName}`, notificationDate: new Date().toJSON(), seenNotification: false})), 

    dispatch(REMOVE_POSITION(employeePositionElementIndex));

    setFormElements(initialClearFormElements);
  };

  return (
    <>
      <div className="block__header">
        <div className="header__title">Rodzaje stanowisk pracowników</div>
        <div className="header__stats">
          Ilosć danych: {props.employeePositionsData.length}
        </div>
      </div>
      <div className="block__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus minus quam accusantium veniam repellat perferendis architecto non! Necessitatibus adipisci qui ipsum iusto harum recusandae beatae voluptatibus id, nemo nesciunt mollitia sequi eius ut possimus delectus.
      </div>
      <div className="block__error">{formElements.validationError}</div>
      <div className="block__content">
        {props.employeePositionsData.length > 0 ? (
          <table className="content__table">
            <thead>
              <tr className="table-tr">
                <th className="table-th">ID</th>
                <th className="table-th">Nazwa</th>
                <th className="table-th">Opcje</th>
              </tr>
            </thead>
            <tbody>
              {props.employeePositionsData.map(
                (e: employeePositionDataType) => (
                  <tr className="table-tr" key={e.employeePositionId}>
                    <td className="table-td">{e.employeePositionId}</td>
                    <td className="table-td">
                      {formElements.editInput.elementId ===
                      e.employeePositionId ? (
                        <input
                          className="table-text-input"
                          type="text"
                          value={formElements.editInput.newUpdateValue}
                          onChange={(e) =>
                            setFormElements((prevState: settingsFormData) => {return {
                              ...prevState,
                              editInput: {
                                ...prevState.editInput,
                                newUpdateValue: e.target.value
                              },
                            }})
                          }
                        />
                      ) : (
                        e.employeePositionName
                      )}
                    </td>
                    <td className="table-td">
                      {formElements.editInput.elementId ===
                      e.employeePositionId ? null : (
                        <button
                          className="table-button"
                          onClick={() =>
                            setFormElements((prevState: settingsFormData) => {return {
                              ...prevState,
                              validationError: '',
                              editInput: {
                                ...prevState.editInput,
                                elementId: e.employeePositionId,
                                elementValue: e.employeePositionName,
                                newUpdateValue: e.employeePositionName
                              },
                            }})
                          }
                        >
                          Edytuj
                        </button>
                      )}

                      {formElements.editInput.elementId ===
                      e.employeePositionId ? (
                        <button
                          className="table-button"
                          onClick={() =>
                            editEmployeePosition(e.employeePositionId)
                          }
                        >
                          Zaktualizuj
                        </button>
                      ) : null}

                      {formElements.editInput.elementId ===
                      e.employeePositionId ? null : (
                        <button
                          className="table-button"
                          onClick={() =>
                            removeEmployeePosition(e.employeePositionId)
                          }
                        >
                          Usuń
                        </button>
                      )}

                      {formElements.editInput.elementId ===
                      e.employeePositionId ? (
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
              <tr className="table-tr" key={newIdEmployeePositionElement}>
                <td className="table-td">
                  {newIdEmployeePositionElement}
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
                      addEmployeePosition();
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

export default EmployeePositionsBlock;
