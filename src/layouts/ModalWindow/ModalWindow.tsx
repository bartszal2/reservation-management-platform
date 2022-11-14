import React from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import { RootState } from "../../redux/store";
import { globalSettingsSliceType, modalWindowType } from "../../types/slices/globalSettingsSliceTypes";
import AddEmployeeModalWindow from "./components/AddForms/AddEmployeeModalWindow";
import AddMeetingModalWindow from "./components/AddForms/AddMeetingModalWindow";
import AddRoomModalWindow from "./components/AddForms/AddRoomModalWindow";
import AddScreenModalWindow from "./components/AddForms/AddScreenModalWindow";
import DeleteAgreementModalWindow from "./components/DeleteAgreementModalWindow";
import EditEmployeeModalWindow from "./components/EditForms/EditEmployeeModalWindow";
import EditMeetingModalWindow from "./components/EditForms/EditMeetingModalWindow";
import EditRoomModalWindow from "./components/EditForms/EditRoomModalWindow";
import EditScreenModalWindow from "./components/EditForms/EditScreenModalWindow";

function ModalWindow() {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const typeOfModalWindow: modalWindowType | null = globalSettingsData.typeOfModalWindow;

  const getModalWindow = (): JSX.Element => {
    switch (typeOfModalWindow) {
      case "add-employee":
        return <AddEmployeeModalWindow/>;

      case "add-meeting":
        return <AddMeetingModalWindow/>;

      case "add-room":
        return <AddRoomModalWindow/>;

      case "add-screen":
        return <AddScreenModalWindow/>;

      case "edit-employee":
        return <EditEmployeeModalWindow/>;

      case "edit-meeting":
        return <EditMeetingModalWindow/>;

      case "edit-room":
        return <EditRoomModalWindow/>;

      case "edit-screen":
        return <EditScreenModalWindow/>;

      case "delete-agreement":
        return <DeleteAgreementModalWindow/>;

      default:
        return <></>;
    }
  }

  return (
    <>
      <div className={globalSettingsData.viewModalWindow ? 'modal-container modal-container-open' : 'modal-container modal-container-closed'}>
        {globalSettingsData.viewModalWindow
          ? (
            <div className="modal-container__window">
              {getModalWindow()}
            </div>
          )
          : null 
        }
      </div>
    </>
  );
}

export default ModalWindow;
