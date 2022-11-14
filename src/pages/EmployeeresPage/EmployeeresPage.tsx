import React, { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { PLATFORM_NAME } from "../../data/staticPlatformData";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getEmployeePositionsData } from "../../redux/slices/employeePositionsSlice";
import { getEmployeeresData, SET_EMPLOYEERES_FILTER_VALUE, SET_EMPLOYEERES_SERACH_VALUE, SET_EMPLOYEERES_SORT_VALUE } from "../../redux/slices/employeeresPageSlice";
import { AppDispatch, RootState } from "../../redux/store";
import "../../sass/pages/EmployeeresPage/EmployeeresPage.css";
import { employeePositionsSliceType } from "../../types/slices/employeePositionsSliceTypes";
import { employeeresPageSliceType } from "../../types/slices/employeeresPageSliceTypes";
import EmployeeresContentHeader from "./components/EmployeeresContentHeader";
import EmployeeresContentTable from "./components/EmployeeresContentTable";
import EmployeeresHeader from "./components/EmployeeresHeader";

function EmployeeresPage() {
  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);
  const employeePositionsData: employeePositionsSliceType = useAppSelector((state: RootState) => state.employeePositions);

  const dispatch: AppDispatch = useAppDispatch();

  useEffect((): void => {
    dispatch(SET_EMPLOYEERES_SERACH_VALUE(''));
    dispatch(SET_EMPLOYEERES_FILTER_VALUE(''));
    dispatch(SET_EMPLOYEERES_SORT_VALUE(''));
    dispatch(getEmployeeresData());
    dispatch(getEmployeePositionsData());
    document.title = `${PLATFORM_NAME} - Pracownicy`;
  }, []);

  return (
    <main
      className={
        employeeresData.loading || employeeresData.error != null || employeePositionsData.loading || employeePositionsData.error != null
          ? "main-employeeres-page main-employeeres-page--content-center"
          : "main-employeeres-page"
      }
    >
      {employeeresData.loading || employeePositionsData.loading ? (
        <LoadingSpinner />
      ) : employeeresData.error != null || employeePositionsData.error != null ? (
        employeeresData.error || employeePositionsData.error
      ) : (
        <>
          <EmployeeresHeader />
          <div className="main-employeeres-page__main-content">
            <EmployeeresContentHeader />
            <EmployeeresContentTable />
          </div>
        </>
      )}
    </main>
  );
}

export default EmployeeresPage;
