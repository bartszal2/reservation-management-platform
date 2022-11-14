import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux-hooks";
import { OPEN_SIDEBAR } from "../../../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../../../redux/store";
import { notificationDataType } from "../../../../types/notificationDataType";
import { globalSettingsSliceType } from "../../../../types/slices/globalSettingsSliceTypes";
import NotificationBlock from "../NotificationBlock/NotificationBlock";
import ProfileSettingsBlock from "../ProfileSettingsBlock/ProfileSettingsBlock";

function HeaderNavigation() {
  const globalSettingsData: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const notificationsData: notificationDataType[] = globalSettingsData.notification.notificationsData;
  const dispatch: AppDispatch = useAppDispatch();

  const [notificationQuantity, setNotificationQuantity] = useState<number>(0);

  const [viewNotification, setViewNotification] = useState<boolean>(false);
  const [viewProfileSettings, setViewProfileSettings] = useState<boolean>(false);

  const viewNotificationHandler = (): void => {
    setViewNotification((preValue: boolean) => !preValue);
  }

  const viewProfileSettingsHandler = (): void => {
    setViewProfileSettings((prevValue: boolean) => !prevValue);
  }

  useEffect((): void => {
    const newNotification: notificationDataType[] = notificationsData.filter((e: notificationDataType) => e.seenNotification === false);
    setNotificationQuantity(newNotification.length);
  }, [notificationsData]);

  return (
    <div className="header__nav">
      <NavLink to="/platform" className="nav__element">
        <span className="material-symbols-outlined">home</span>
      </NavLink>
      <div
        className={
          viewNotification
            ? "nav__element nav__element--active"
            : "nav__element"
        }
      >
        <div
          className="nav__element__content"
          onClick={() => viewNotificationHandler()}
        >
          <div className="content__notification-value">
            {notificationQuantity > 0 ? notificationQuantity : null}
          </div>
          <span className="material-symbols-outlined">notifications</span>
        </div>
        <NotificationBlock viewNotification={viewNotification} viewNotificationHandler={viewNotificationHandler}/>
      </div>
      <div
        className="nav__element nav__element--menu-mobile"
        onClick={() => {
          dispatch(OPEN_SIDEBAR());
        }}
      >
        <span className="material-symbols-outlined">menu</span>
      </div>
      <div
        className={
          viewProfileSettings
            ? "nav__element nav__element--user nav__element--active"
            : "nav__element nav__element--user"
        }
      >
        <div
          className="nav__element__content"
          onClick={() => viewProfileSettingsHandler()}
        >
          <div className="content__username__avatar"></div>
          <div className="content__username">
            <div className="username__name">Witaj, Adam Kowalski</div>
            <div className="username__role">Administrator</div>
          </div>
          <span className="material-symbols-outlined">arrow_drop_down</span>
        </div>
        <ProfileSettingsBlock viewProfileSettings={viewProfileSettings} viewProfileSettingsHandler={viewProfileSettingsHandler}/>
      </div>
    </div>
  );
}

export default HeaderNavigation;
