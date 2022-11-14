import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { PLATFORM_NAME } from '../../data/staticPlatformData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getEmployeePositionsData } from '../../redux/slices/employeePositionsSlice';
import { getEmployeeresData } from '../../redux/slices/employeeresPageSlice';
import { AppDispatch, RootState } from '../../redux/store';
import '../../sass/pages/EmployeeInfoPage/EmployeeInfoPage.css';
import { employeeDataType } from '../../types/employeeDataType';
import { employeePositionsSliceType } from '../../types/slices/employeePositionsSliceTypes';
import { employeeresPageSliceType } from '../../types/slices/employeeresPageSliceTypes';
import EmployeeInfoContent from './components/EmployeeInfoContent';
import EmployeeInfoHeader from './components/EmployeeInfoHeader';

function EmployeeInfoPage() {
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const employeeresData: employeeresPageSliceType = useAppSelector((state: RootState) => state.employeeresPage);
  const employeePositionsData: employeePositionsSliceType = useAppSelector((state: RootState) => state.employeePositions);
  const dispatch: AppDispatch = useAppDispatch();

  const [selectedEmployeeData, setSelectedEmployeeData] = useState<employeeDataType | null>(null);

  useEffect((): void => {
    if (employeeresData.loading == false && employeeresData.value.length > 0) {
      if (id != undefined) {
        const [selectedEmployeeDataElement]: employeeDataType[] = employeeresData.value.filter((e: employeeDataType) => e.employeeId == parseInt(id));

        if (selectedEmployeeDataElement) {
          setSelectedEmployeeData(selectedEmployeeDataElement);
        } else {
          navigate("/error");
        }
      } else {
        navigate("/error");
      }
    } else {
    }
  }, [employeeresData.value]);

  useEffect((): void => {
    dispatch(getEmployeeresData());
    dispatch(getEmployeePositionsData());
    document.title = `${PLATFORM_NAME} - Informacje o pracowniku`;
  }, []);

  return (
    <main className={employeeresData.loading || employeeresData.error != null || employeePositionsData.loading || employeePositionsData.error != null
      ? "main-employee-info-page main-employee-info-page--content-center"
      : "main-employee-info-page"}>
      {employeeresData.loading || employeePositionsData.loading ? (
        <LoadingSpinner />
      ) : employeeresData.error != null || employeePositionsData.error != null ? (
        employeeresData.error || employeePositionsData.error
      ) : (
        <>
          <EmployeeInfoHeader selectedEmployeeData={selectedEmployeeData}/>
          <EmployeeInfoContent selectedEmployeeData={selectedEmployeeData}/>
        </>
      )}
    </main>
  );
}

export default EmployeeInfoPage;