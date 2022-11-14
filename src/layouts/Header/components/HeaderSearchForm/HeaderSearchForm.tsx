import React, { useEffect, useState } from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux-hooks";
import { getNotificationsData } from "../../../../redux/slices/globalSettingsSlice";
import { AppDispatch } from "../../../../redux/store";

function HeaderSearchForm() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isMeetingsPage, setIsMeetingsPage] = useState<boolean>(false);

  const dispatch: AppDispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  useEffect((): void => {
    if (
      location.pathname.endsWith("/meetings") || location.pathname.includes("/meetings/")
    ) {
      setIsMeetingsPage(true);
    } else {
      setIsMeetingsPage(false);
    }
  }, [location.pathname]);

  useEffect((): void => {
    dispatch(getNotificationsData())
  }, []);

  return (
    <div className="header__search-form">
      <form className="search-form">
        <input
          className="search-form__input"
          type="text"
          placeholder="Wyszukaj spotkania..."
          disabled={isMeetingsPage}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <input
          type="button"
          className="search-form__button"
          value="Szukaj"
          disabled={isMeetingsPage}
          onClick={() => {
            isMeetingsPage ? navigate("#") : navigate(`/platform/meetings/${searchValue}`), setSearchValue('')}}
        />
      </form>
    </div>
  );
}

export default HeaderSearchForm;
