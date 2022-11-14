import React, { useEffect } from 'react';
import { PLATFORM_NAME } from '../../data/staticPlatformData';
import '../../sass/pages/HelpPage/HelpPage.css';
import HelpContent from './components/HelpContent';
import HelpHeader from './components/HelpHeader';

function HelpPage() {

  useEffect((): void => {
    document.title = `${PLATFORM_NAME} - Pomoc`;
  }, []);
  
  return (
      <main className="main-help-page">
        <HelpHeader/>
        <div className="main-help-page__content">
          <HelpContent/>
        </div>
      </main>
  )
}

export default HelpPage;