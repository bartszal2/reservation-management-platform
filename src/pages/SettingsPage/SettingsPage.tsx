import React, { useEffect } from 'react';
import { PLATFORM_NAME } from '../../data/staticPlatformData';
import '../../sass/pages/SettingsPage/SettingsPage.css';
import SettingsContentTable from './components/SettingsContentTable';
import SettingsHeader from './components/SettingsHeader';

function SettingsPage() {

  useEffect((): void => {
    document.title = `${PLATFORM_NAME} - Ustawienia`;
  }, []);

  return (
      <main className="main-settings-page">
        <SettingsHeader/>
        <div className="main-settings-page__content">
          <SettingsContentTable/>
        </div>
      </main>
  )
}

export default SettingsPage;