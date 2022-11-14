import React, { useEffect, useState } from "react";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { CLOSE_SIDEBAR } from "../../redux/slices/globalSettingsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { globalSettingsSliceType } from "../../types/slices/globalSettingsSliceTypes";
import { valueLessThanTen } from "../../utils/valueLessThanTenFormat";
import SidebarMenuElement from "./components/SidebarMenuElement";

function Sidebar() {
  const globalSettings: globalSettingsSliceType = useAppSelector((state: RootState) => state.globalSettings);
  const dispatch: AppDispatch = useAppDispatch();

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [sidebarWeekCalendar, setSidebarWeekCalendar] = useState<currentWeekData[]>([]);

  interface currentWeekData {
    dateDayValue: number;
    dateValue: Date;
  }

  const shortNamesDayOfWeeks: string[] = ["PN", "WT", "ŚR", "CZ", "PT", "SB", "ND"];

  const changeFirstDayOfWeek = (value: number): number => {
    if (value == 0) {
      return 6;
    } else {
      return value - 1;
    }
  };

  const convertDayOfNumber = (value: number): number => {
    if (value == 0) {
      return 6;
    } else {
      return value - 1;
    }
  };

  const generateDataCurrentWeek = (): void => {
    const currentDateValue: Date = new Date();
    const firstDayOfCurrentWeekDate: Date = new Date(new Date().setDate(currentDateValue.getDate() - changeFirstDayOfWeek(currentDateValue.getDay())));

    const currentWeekData: currentWeekData[] = [];

    for (let i = 0; i <= 6; i++) {
      currentWeekData.push({
        dateDayValue: i,
        dateValue: new Date(new Date().setDate(firstDayOfCurrentWeekDate.getDate() + i))
      })
    }

    setSidebarWeekCalendar(currentWeekData);
  };

  const weekCalendarContent = sidebarWeekCalendar.map((e: currentWeekData): JSX.Element => {
    return (
      <div
        key={e.dateDayValue}
        className={
          e.dateDayValue == convertDayOfNumber(currentDate.getDay())
            ? "content__calendar-day content__calendar-day--active"
            : "content__calendar-day"
        }
      >
        <div className="calendar-day__number">
          {valueLessThanTen(e.dateValue.getDate())}
        </div>
        <div className="calendar-day__name">
          {shortNamesDayOfWeeks[e.dateDayValue]}
        </div>
      </div>
    );
  });

  useEffect((): void => {
    generateDataCurrentWeek();
  }, []);

  useEffect((): void => {
    setInterval((): void => {
      setCurrentDate(new Date());
      generateDataCurrentWeek();
    }, 1000);
  }, []);

  return (
    <nav className={globalSettings.viewSidebar ? "sidebar sidebar--open" : "sidebar"}>
      <div className="sidebar__logoname">
        <div className="logoname__title">{PLATFORM_NAME}</div>
        <div className="logoname__close-menu" onClick={() => {dispatch(CLOSE_SIDEBAR())}}>
          <span className="material-symbols-outlined">close</span>
        </div>
      </div>
      <div className="sidebar__menu">
        <SidebarMenuElement linkText="/platform" iconName="dashboard" elementName="Dashboard" exactMatch={true} />
        <SidebarMenuElement linkText="platform/meetings" iconName="groups" elementName="Spotkania" exactMatch={false} />
        <SidebarMenuElement linkText="platform/rooms" iconName="meeting_room" elementName="Pomieszczenia" exactMatch={false} />
        <SidebarMenuElement linkText="platform/employeeres" iconName="group" elementName="Pracownicy" exactMatch={false} />
        <SidebarMenuElement linkText="platform/screens" iconName="monitor" elementName="Ekrany" exactMatch={false} />
        <SidebarMenuElement linkText="platform/settings" iconName="settings" elementName="Ustawienia" exactMatch={false} />
        <SidebarMenuElement linkText="platform/help" iconName="help" elementName="Pomoc" exactMatch={false} />
      </div>
      <div className="sidebar__calendar">
        <div className="calendar__header">
          Aktualnie:
          <div className="calendar__datetime">
            {currentDate.toLocaleString()}
          </div>
        </div>
        <div className="calendar__content">{weekCalendarContent}</div>
      </div>
    </nav>
  );
}

export default Sidebar;
