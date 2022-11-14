import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEmployeeresData } from "../../redux/slices/employeeresPageSlice";
import { getMeetingsData } from "../../redux/slices/meetingsPageSlice";
import { getRoomsData } from "../../redux/slices/roomsPageSlice";
import { getScreensData } from "../../redux/slices/screensPageSlice";
import ScreenMeetingReservation from "./components/ScreenMeetingReservation";
import ScreenMeetingsList from "./components/ScreenMeetingsList";
import ScreenRoomName from "./components/ScreenRoomName";
import ScreenRoomStatus from "./components/ScreenRoomStatus";
import "../../sass/pages/ScreenPage/ScreenPage.css";
import { screenDataType } from "../../types/screenDataType";
import { valueLessThanTen } from "../../utils/valueLessThanTenFormat";
import { AppDispatch, RootState } from "../../redux/store";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { meetingsPageSliceType } from "../../types/slices/meetingsPageSliceTypes";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import { screensPageSliceType } from "../../types/slices/screensPageSliceTypes";
import { employeeresPageSliceType } from "../../types/slices/employeeresPageSliceTypes";

function ScreenPage() {
  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);
  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);
  const screensData: screensPageSliceType = useAppSelector((state: RootState) => state.screensPage);
  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);

  const dispatch: AppDispatch = useAppDispatch();

  const { id } = useParams();

  const [paramId, setParamId] = useState<number>(0);
  const [screenIdError, setScreenIdError] = useState<boolean>(false);
  const [countdownTime, setCountdownTime] = useState<string>("");
  const [screenSizeValidation, setScreenSizeValidation] = useState<boolean>(true);

  const timeUpdate: number = new Date(new Date().setMinutes(new Date().getMinutes() + 5)).getTime()

  const loadingContent: boolean =
    meetingsData.loading ||
    roomsData.loading ||
    screensData.loading ||
    employeeresData.loading;

  const countDownToUpdate = (): void => {
    let result: number = timeUpdate - new Date().getTime();

    let ms: number = result % 1000;
    result = (result - ms) / 1000;
    let sec: number = result % 60;
    result = (result - sec) / 60;
    let min: number = result % 60;
    let hours: number = (result - min) / 60;

    if (hours < 0) hours = 0
    if (min < 0) min = 0
    if (sec < 0) sec = 0

    hours == 0 && min == 0 && sec == 0 ? document.location.reload() : null;

    setCountdownTime(`${valueLessThanTen(min)}:${valueLessThanTen(sec)}`);
  };

  const checkScreenId = (id: string): void => {
    const [filteredScreensData]: screenDataType[] = screensData.value.filter((e: screenDataType) => e.screenId === parseInt(id));

    if (Object.keys(filteredScreensData).length > 0 && filteredScreensData.screenStatus) {
      setParamId(parseInt(id));
      setScreenIdError(false);
    } else {
      setScreenIdError(true);
    }
  };

  useEffect((): void => {
    if (screensData.value.length > 0) {
      if (id) {
        checkScreenId(id);
      } else {
        setScreenIdError(true);
      }
    }
  }, [screensData.loading]);

  useEffect(() => {
    countDownToUpdate();

    const timeInterval = setInterval(() => {
      countDownToUpdate();
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useEffect((): void => {
    dispatch(getMeetingsData());
    dispatch(getRoomsData());
    dispatch(getScreensData());
    dispatch(getEmployeeresData());
    document.title = `${PLATFORM_NAME}`;
  }, []);

  useEffect((): void => {
    if (window.screen.height == 1080 && window.screen.width == 1920 &&
        (window.outerHeight + (window.screen.height - window.screen.availHeight)) == 1080 && (window.outerWidth + (window.screen.width - window.screen.availWidth) == 1920) || 
        window.screen.height == 1920 && window.screen.width == 1080 &&
        (window.outerHeight + (window.screen.height - window.screen.availHeight) == 1920) && (window.outerWidth + (window.screen.width - window.screen.availWidth) == 1080)) {
      setScreenSizeValidation(true);
    } else {
      setScreenSizeValidation(false);
    }
  }, [window.screen.height, window.screen.width, window.outerHeight, window.outerWidth, window.screen.availHeight, window.screen.availWidth]);

  return (
    <div className="screen-page">
      {screenIdError ? (
        <div className="screen-page__error">
          <div className="error__title">Błąd ładowania ekranu</div>
          <div className="error__description">Podany adres strony nie istnieje lub ekran jest nieaktywny. Ullam magnam libero nulla sapiente placeat commodi! Nemo sunt laboriosam in ullam dolorem ex, explicabo est. Vero velit, voluptatibus quas in odio iusto excepturi voluptatum, fuga, earum laborum consectetur nobis iure veritatis accusamus suscipit sit iste ipsam?</div>
        </div>
      ) : (
        <>
          <div className="screen-page__format-text" style={{display: screenSizeValidation ? "none" : "flex"}}>
            Ekran obsługiwany jest na ekranch oraz w oknie w rozdzieczości 1920px x 1080px lub 1080px x 1920px. Quisquam consectetur iste obcaecati numquam architecto reprehenderit tempora quae, commodi sit laborum blanditiis cum, veniam velit, sapiente ullam eius saepe assumenda corporis pariatur veritatis voluptates modi nemo reiciendis. Officia repellat temporibus nulla non. Nisi quo exercitationem a?
          </div>
          <div className="screen-page__id">Screen ID {id}</div>
          <ScreenRoomName
            loadingContent={loadingContent}
            roomsData={roomsData.value}
            screensData={screensData.value}
            paramScreenId={paramId}
          />
          <ScreenRoomStatus
            loadingContent={loadingContent}
            roomsData={roomsData.value}
            screensData={screensData.value}
            meetingsData={meetingsData.value}
            paramScreenId={paramId}
          />
          <ScreenMeetingReservation
            loadingContent={loadingContent}
            roomsData={roomsData.value}
            screensData={screensData.value}
            meetingsData={meetingsData.value}
            paramScreenId={paramId}
          />
          <ScreenMeetingsList
            loadingContent={loadingContent}
            roomsData={roomsData.value}
            screensData={screensData.value}
            meetingsData={meetingsData.value}
            paramScreenId={paramId}
          />
          <div className="screen-page__update-countdown">
            Aktualizacja ekranu za {countdownTime}
          </div>
        </>
      )}
    </div>
  );
}

export default ScreenPage;
