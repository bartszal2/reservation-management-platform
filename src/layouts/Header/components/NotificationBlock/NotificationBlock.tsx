import React, { useEffect } from "react";
import { NOTIFICATION_LSTORAGE_NAME } from "../../../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { CLEAR_NOTIFICATIONS_DATA, SET_NOTIFICATION_READ_STATUS } from "../../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { notificationDataType } from "../../../../types/notificationDataType";
import { globalSettingsSliceType } from "../../../../types/slices/globalSettingsSliceTypes";
import { saveToLocalstorage } from "../../../../utils/saveToLocalStorage";

function NotificationBlock(props: { viewNotification: boolean, viewNotificationHandler: Function }) {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const notificationsData: notificationDataType[] = globalSettingsData.notification.notificationsData;

  const dispatch: AppDispatch = useAppDispatch();

  const data: notificationDataType[] = notificationsData.slice().sort((a, b) => new Date(b.notificationDate).getTime() - new Date(a.notificationDate).getTime());

  const setNotificationReadStatus = (notificationId: number): void => {
    const [notificationElement]: notificationDataType[] = notificationsData.filter((e) => e.notificationId === notificationId);
    const index: number = notificationsData.indexOf(notificationElement);

    dispatch(SET_NOTIFICATION_READ_STATUS(index));
  }

  const clearNotificationsData = (): void => {
    dispatch(CLEAR_NOTIFICATIONS_DATA());
    localStorage.setItem(NOTIFICATION_LSTORAGE_NAME, JSON.stringify([]));
  }

  const notificationsList = data.map((e): JSX.Element => {
    return (
      <div key={e.notificationId}
        className={
          e.seenNotification
            ? "content__block"
            : "content__block content__block--unread"
        }
        onClick={() => setNotificationReadStatus(e.notificationId)}
      >
        <div className="content__title">
          <div
            className={
              e.seenNotification
                ? "content__status"
                : "content__status content__status--unread"
            }
          />
          {e.notificationName}
        </div>
        <div className="content__date">
          Data: {new Date(e.notificationDate).toLocaleDateString()} {new Date(e.notificationDate).toLocaleTimeString()}
        </div>
      </div>
    );
  });

  useEffect((): void => {
    if (data.length > 0) {
      saveToLocalstorage(NOTIFICATION_LSTORAGE_NAME, data);
    }
  }, [data]);

  return (
    <div
      className={
        props.viewNotification
          ? "element__notification-container element__notification-container--open"
          : "element__notification-container"
      }
    >
      <div className="notification-container__header">
        <div className="header__group">
          <div className="group__title">
            <span className="material-symbols-outlined">help</span>
            Powiadomienia
          </div>
          <button className="group__button" onClick={() => props.viewNotificationHandler()}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="header__text">
          Kliknij w powiadomienie, aby oznaczyć je jako przeczytane
          lub nieprzeczytane
        </div>
        <button className="header__button" onClick={() => clearNotificationsData()}>
          Wyczyść powiadomienia
        </button>
      </div>
      <div className="notification-container__content">{notificationsList}</div>
    </div>
  );
}

export default NotificationBlock;
