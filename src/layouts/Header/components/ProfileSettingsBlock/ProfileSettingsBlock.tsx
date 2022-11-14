import React, { useEffect, useState } from "react";
import { PLATFORM_THEME_LSTORAGE_NAME } from "../../../../data/staticPlatformData";
import { saveToLocalstorage } from "../../../../utils/saveToLocalStorage";

function ProfileSettingsBlock(props: { viewProfileSettings: boolean, viewProfileSettingsHandler: Function }) {

  const [platformTheme, setPlatformTheme] = useState<string>("")

  const changePlatformTheme = (): void => {
    if (platformTheme == "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      saveToLocalstorage(PLATFORM_THEME_LSTORAGE_NAME, 'light');
      setPlatformTheme("light");

    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      saveToLocalstorage(PLATFORM_THEME_LSTORAGE_NAME, 'dark');
      setPlatformTheme("dark");
    }
  };

  useEffect((): void => {
    const localStoragePlatformTheme: string | null = localStorage.getItem(PLATFORM_THEME_LSTORAGE_NAME);

    if (localStoragePlatformTheme) {
      const themeValue: string = JSON.parse(localStoragePlatformTheme);
      setPlatformTheme(themeValue);
      
    } else {
      setPlatformTheme("dark");
    }
  }, []);

  return (
    <div
      className={
        props.viewProfileSettings
          ? "element__profile-settings-container element__profile-settings-container--open"
          : "element__profile-settings-container"
      }
    >
      <div className="profile-settings__header">
        <div className="header__title">
          <span className="material-symbols-outlined">help</span>
          Profil
        </div>
        <button className="header__button" onClick={() => props.viewProfileSettingsHandler()}>
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div className="profile-settings__content">
        <div className="content__element content__element--disabled">
          <span className="material-symbols-outlined">settings</span>
          Ustawienia profilu
        </div>
        <label
          className="content__element"
          onClick={() => changePlatformTheme()}
        >
          <span className="material-symbols-outlined">settings</span>
          <div className="element__theme">
            <div className="theme__title">Tryb platformy</div>
            <div className="theme__status">
              {platformTheme == "dark" ? "Tryb ciemny" : "Tryb jasny"}
            </div>
          </div>
        </label>
        <div className="content__element content__element--disabled">
          <span className="material-symbols-outlined">settings</span>
          Wyloguj
        </div>
      </div>
    </div>
  );
}

export default ProfileSettingsBlock;
