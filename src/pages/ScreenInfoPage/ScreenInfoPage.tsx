import React, { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { PLATFORM_NAME } from '../../data/staticPlatformData';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getScreensData } from '../../redux/slices/screensPageSlice';
import { AppDispatch, RootState } from '../../redux/store';
import '../../sass/pages/ScreenInfoPage/ScreenInfoPage.css';
import { screenDataType } from '../../types/screenDataType';
import { screensPageSliceType } from '../../types/slices/screensPageSliceTypes';
import ScreenInfoContent from './components/ScreenInfoContent';
import ScreenInfoHeader from './components/ScreenInfoHeader';

function ScreenInfoPage() {
  const { id } = useParams();
  const navigate: NavigateFunction = useNavigate();

  const screensData: screensPageSliceType = useAppSelector((state: RootState) => state.screensPage);
  const dispatch: AppDispatch = useAppDispatch();

  const [selectedScreenData, setSelectedScreenData] = useState<screenDataType | null>(null);

  useEffect((): void => {
    if (screensData.loading == false && screensData.value.length > 0) {
      if (id != undefined) {
        const [selectedScreenDataElement]: screenDataType[] = screensData.value.filter((e: screenDataType) => e.screenId == parseInt(id));

        if (selectedScreenDataElement) {
          setSelectedScreenData(selectedScreenDataElement);
        } else {
          navigate("/platform/error");
        }
      } else {
        navigate("/platform/error");
      }
    } else {
    }
  }, [screensData.value]);

  useEffect((): void => {
    dispatch(getScreensData());
    document.title = `${PLATFORM_NAME} - Informacje o ekranie`;
  }, []);

  return (
    <main className={screensData.loading || screensData.error != null
      ? "main-screen-info-page main-screen-info-page--content-center"
      : "main-screen-info-page"}>
      {screensData.loading ? (
        <LoadingSpinner />
      ) : screensData.error != null ? (
        screensData.error
      ) : (
        <>
          <ScreenInfoHeader selectedScreenData={selectedScreenData}/>
          <ScreenInfoContent selectedScreenData={selectedScreenData}/>
        </>
      )}
    </main>
  );
}

export default ScreenInfoPage;