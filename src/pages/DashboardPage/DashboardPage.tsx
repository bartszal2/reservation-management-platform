import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEmployeeresData } from "../../redux/slices/employeeresPageSlice";
import { getRoomsData } from "../../redux/slices/roomsPageSlice";
import { getMeetingsData } from "../../redux/slices/meetingsPageSlice";
import { getScreensData } from "../../redux/slices/screensPageSlice";
import "../../sass/pages/DashboardPage/DashboardPage.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { AppDispatch, RootState } from "../../redux/store";
import { screenDataType } from "../../types/screenDataType";
import { meetingDataType } from "../../types/meetingDataType";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { roomsPageSliceType } from "../../types/slices/roomsPageSliceTypes";
import { meetingsPageSliceType } from "../../types/slices/meetingsPageSliceTypes";
import { screensPageSliceType } from "../../types/slices/screensPageSliceTypes";
import { employeeresPageSliceType } from "../../types/slices/employeeresPageSliceTypes";

function DashboardPage() {
  const roomsData: roomsPageSliceType = useAppSelector((state: RootState) => state.roomsPage);
  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);
  const screensData: screensPageSliceType = useAppSelector((state: RootState) => state.screensPage);
  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);

  const dispatch: AppDispatch = useAppDispatch();

  const currentDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59);
  const dayCurrentDate: number = new Date().getDay();

  const lastTwoWeeksDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 14, 0, 0, 0);

  const currentWeekDateStart: Date = dayCurrentDate > 0
    ? new Date(new Date().setDate(currentDate.getDate() - dayCurrentDate + 1))
    : new Date(new Date().setDate(currentDate.getDate() - 6))

  const weekDateStart = new Date(currentWeekDateStart.getFullYear(), currentWeekDateStart.getMonth(), currentWeekDateStart.getDate(), 0, 0, 0);

  const currentWeekDateEnd: Date = dayCurrentDate > 0
    ? new Date(new Date().setDate(currentDate.getDate() + 7 - dayCurrentDate))
    : new Date(new Date().setDate(currentDate.getDate() + 6))

  const weekDateEnd: Date = new Date(currentWeekDateEnd.getFullYear(), currentWeekDateEnd.getMonth(), currentWeekDateEnd.getDate(), 23, 59, 59);


  const meetingsStatistics: number = meetingsData.value.length;
  const roomsStatistics: number = roomsData.value.length;
  const employeeresStatistics: number = employeeresData.value.length;

  const meetingsCreateLastTwoWeeksStatistics: number = meetingsData.value.filter((e: meetingDataType) => new Date(e.dateAdded).getTime() >= lastTwoWeeksDate.getTime() && new Date(e.dateAdded).getTime() <= currentDate.getTime()).length;

  const meetingsCurrentWeekStatistics: number = meetingsData.value.filter((e: meetingDataType) => new Date(e.meetingDate).getTime() >= weekDateStart.getTime() && new Date(e.meetingDate).getTime() <= weekDateEnd.getTime()).length;

  const activeScreensStatistics: number = screensData.value.filter((e: screenDataType) => e.screenStatus === true).length;

  useEffect((): void => {
    dispatch(getRoomsData());
    dispatch(getMeetingsData());
    dispatch(getScreensData());
    dispatch(getEmployeeresData());
    document.title = `${PLATFORM_NAME}`;
  }, []);

  return (
      <main className="main-dashboard-page">
        <div className="main-dashboard-page__element main-dashboard-page__element--1">
          <div className="element__title">
            Platforma do zarządzania rezerwacją pomieszczeń oraz Digital Signage System
          </div>
          <div className="element__description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem velit quisquam exercitationem! Id similique alias tempore repellat voluptatum incidunt officiis doloribus porro obcaecati, hic animi laudantium. Eveniet ipsum, ut ex corrupti exercitationem, quidem quo officia aliquam magni, esse ullam? Laboriosam ut cum expedita est deleniti! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, fugiat dolore officia tempora dolorem id placeat quae architecto error enim, non magnam nisi omnis repudiandae accusamus quasi, quos sunt repellendus eos neque tenetur facere sapiente!
          </div>
          <span className="material-symbols-outlined">groups</span>
        </div>
        <div className="main-dashboard-page__element main-dashboard-page__element--2">
          {
            meetingsData.loading
              ? <LoadingSpinner/>
              : meetingsData.error != null 
                ? meetingsData.error
                : (
                  <>
                  <div className="element__stats-value">{meetingsStatistics}</div>
                  <div className="element__stats-title">Spotkań</div>
                  <div className="element__stats-description">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exercitationem quisquam at sint blanditiis quam pariatur nostrum sapiente veniam iure.
                  </div>
                </>
                )
          }
        </div>
        <div className="main-dashboard-page__element main-dashboard-page__element--3">
          {
            roomsData.loading
              ? <LoadingSpinner/>
              : roomsData.error != null
                ? roomsData.error
                : (
                  <>
                    <div className="element__stats-value">{roomsStatistics}</div>
                    <div className="element__stats-title">Pomieszczeń</div>
                    <div className="element__stats-description">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exercitationem quisquam at sint blanditiis quam pariatur nostrum sapiente veniam iure.
                    </div>
                  </>
                )
          }
        </div>
        <div className="main-dashboard-page__element main-dashboard-page__element--4">
          {
            employeeresData.loading
              ? <LoadingSpinner/>
              : employeeresData.error != null
                ? employeeresData.error
                : (
                  <>
                    <div className="element__stats-value">{employeeresStatistics}</div>
                    <div className="element__stats-title">Pracowników</div>
                    <div className="element__stats-description">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exercitationem quisquam at sint blanditiis quam pariatur nostrum sapiente veniam iure.
                    </div>
                  </>
                )
          }
        </div>
        <div className="main-dashboard-page__element main-dashboard-page__element--5">
          {
            meetingsData.loading
              ? <LoadingSpinner/>
              : meetingsData.error != null
                ? meetingsData.error
                : (
                  <>
                    <div className="element__stats-value">{meetingsCreateLastTwoWeeksStatistics}</div>
                    <div className="element__stats-title">Spotkań utworzonych w ostatnich dwóch tygodniach</div>
                    <div className="element__stats-description">
                      Lorem {lastTwoWeeksDate.toLocaleDateString()} - {currentDate.toLocaleDateString()} ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exercitationem quisquam at sint blanditiis quam pariatur nostrum sapiente veniam iure. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere iure vitae sapiente, dicta itaque doloremque? Natus dolor excepturi quasi similique itaque beatae. Iure repellat itaque est culpa, enim nemo neque.
                    </div>
                  </>
                )

          }
        </div>
        <div className="main-dashboard-page__element main-dashboard-page__element--6">
          {
            meetingsData.loading
              ? <LoadingSpinner/>
              : meetingsData.error != null
                ? meetingsData.error
                : (
                  <>
                    <div className="element__stats-value">{meetingsCurrentWeekStatistics}</div>
                    <div className="element__stats-title">Spotkań w aktualnym tygodniu</div>
                    <div className="element__stats-description">
                      Lorem {weekDateStart.toLocaleDateString()} - {weekDateEnd.toLocaleDateString()} ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exercitationem quisquam at sint apiente veniam iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptas aut reiciendis nisi, assumenda facere.
                    </div>
                  </>
                )
          }
        </div>
        <div className="main-dashboard-page__element main-dashboard-page__element--7">
          {
            screensData.loading
              ? <LoadingSpinner/>
              : screensData.error != null
                ? screensData.error
                : (
                  <>
                    <div className="element__stats-value">{activeScreensStatistics}</div>
                    <div className="element__stats-title">Aktywnych ekranów</div>
                    <div className="element__stats-description">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate exercitationem quisquam at sint blanditiis quam pariatur nostrum sapiente veniam iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quae cum illo eaque consequuntur velit?
                    </div>
                    <span className="material-symbols-outlined">monitor</span>
                  </>
                )
          }
        </div>
      </main>
  );
}

export default DashboardPage;
