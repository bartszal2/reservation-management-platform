import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux-hooks";
import { SET_MEETINGS_FILTER_VALUE, SET_MEETINGS_SERACH_VALUE, SET_MEETINGS_SORT_VALUE } from "../../../redux/slices/meetingsPageSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { meetingsPageSliceType } from "../../../types/slices/meetingsPageSliceTypes";

function MeetingsContentHeader() {
  const meetingsData: meetingsPageSliceType = useAppSelector((state: RootState) => state.meetingsPage);
  
  const dispatch: AppDispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>(meetingsData.pageData.searchValue);

  const selectSearchValue = (): void => {
    dispatch(SET_MEETINGS_SERACH_VALUE(searchValue));
  };

  const selectFilterValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(SET_MEETINGS_FILTER_VALUE(e.target.value));
  };

  const selectSortValue = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(SET_MEETINGS_SORT_VALUE(e.target.value));
  };

  useEffect((): void => {
    if (searchValue == '') {
      dispatch(SET_MEETINGS_SERACH_VALUE(''))
    }
  }, [searchValue]);

  useEffect((): void => {
    setSearchValue(meetingsData.pageData.searchValue)
  }, [meetingsData.pageData.searchValue]);

  return (
    <div className="main-content__header">
      <div className="header__group">
        <div className="group__element-with-icon">
          <input type="text" className="group__input" placeholder="Szukaj..." value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
          <span className="material-symbols-outlined">search</span>
        </div>
        <input type="button" className="group__button" value="Szukaj" onClick={() => {selectSearchValue()}}/>
      </div>

      <div className="header__group">
        <label className="group__label">
          Filtrowanie widoku
          <div className="group__element-with-icon">
            <select className="group__select" onChange={(e) => {selectFilterValue(e)}}>
              <option value="default">Domyślnie</option>
              <option value="meetings-active">Spotkania w dniu dzisiejszym</option>
              <option value="meetings-planned">Spotkania zaplanowane</option>
              <option value="meetings-ended">Spotkania zakończone</option>
            </select>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </label>
        <label className="group__label">
          Sortowanie widoku
          <div className="group__element-with-icon">
            <select className="group__select" onChange={(e) => {selectSortValue(e)}}>
              <option value="default">Domyślnie</option>
              <option value="name-meeting-sort-up">Nazwa spotkania (rosnąco)</option>
              <option value="name-meeting-sort-down">Nazwa spotkania (malejąco)</option>
              <option value="oldest-meetings">Od najstarszej daty spotkania</option>
              <option value="latest-meetings">Od najnowszej daty spotkania</option>
            </select>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </div>
        </label>
      </div>
    </div>
  );
}

export default MeetingsContentHeader;
