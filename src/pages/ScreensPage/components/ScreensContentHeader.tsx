import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { SET_SCREENS_FILTER_VALUE, SET_SCREENS_SERACH_VALUE, SET_SCREENS_SORT_VALUE } from '../../../redux/slices/screensPageSlice';
import { AppDispatch } from '../../../redux/store';

function ScreensContentHeader() {
  const dispatch: AppDispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>();

  const selectSearchValue = (): void => {
    dispatch(SET_SCREENS_SERACH_VALUE(searchValue));
  };

  const selectFilterValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(SET_SCREENS_FILTER_VALUE(e.target.value));
  };

  const selectSortValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(SET_SCREENS_SORT_VALUE(e.target.value));
  };

  useEffect((): void => {
    if (searchValue == '') {
      dispatch(SET_SCREENS_SERACH_VALUE(''));
    }
  }, [searchValue]);

  useEffect((): void => {
    setSearchValue('');
  }, []);

  return (
    <div className="main-content__header">
      <div className="header__group">
        <div className="group__element-with-icon">
          <input type="text" className="group__input" placeholder="Szukaj..." onChange={(e) => {setSearchValue(e.target.value)}}/>
          <span className="material-symbols-outlined">search</span>
        </div>
        <input type="button" className="group__button" value="Szukaj" onClick={() => {selectSearchValue()}}/>
      </div>
      <div className="header__group">
        <label className="group__label">
          Filtrowanie widoku
          <div className="group__element-with-icon">
            <select className="group__select" onChange={(e) => {selectFilterValue(e)}}>
              <option value="defualt">Domyślnie</option>
              <option value="active-screens">Aktywne ekrany</option>
              <option value="inactive-screens">Nieaktywne ekrany</option>
              <option value="horizontal-screens">Ekrany (format poziomy)</option>
              <option value="vertical-screens">Ekrany (format pionowy)</option>
            </select>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </label>
        <label className="group__label">
          Sortowanie widoku
          <div className="group__element-with-icon">
            <select className="group__select" onChange={(e) => {selectSortValue(e)}}>
              <option value="default">Domyślnie</option>
              <option value="name-screen-sort-up">Nazwa ekranu (rosnąco)</option>
              <option value="name-screen-sort-down">Nazwa ekranu (malejąco)</option>
              <option value="oldest-date-added">Od najstarszej daty dodania</option>
              <option value="latest-date-added">Od najnowszej daty dodania</option>
            </select>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </label>
      </div>
    </div>
  )
}

export default ScreensContentHeader;