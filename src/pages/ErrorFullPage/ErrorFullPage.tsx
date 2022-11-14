import React, { useEffect } from 'react';
import { PLATFORM_NAME } from '../../data/staticPlatformData';
import '../../sass/pages/ErrorFullPage/ErrorFullPage.css';

function ErrorFullPage() {

  useEffect(() => {
    document.title = `${PLATFORM_NAME}`;
  }, [])

  return (
    <div className="main-error-full-page">
      <div className="main-error-full-page__title">Strona o podanym adresie nie istnieje</div>
      <div className="main-error-full-page__description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae odit earum repellat aut fugiat? Ea, dignissimos? Ratione excepturi quam est assumenda, eos ab et deleniti. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos nihil impedit repudiandae perspiciatis eos ratione. Recusandae necessitatibus eligendi rem maiores quo veniam? Ullam fuga ea voluptatum, perferendis dolores perspiciatis ipsam asperiores animi impedit in atque. Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </div>
    </div>
  )
}

export default ErrorFullPage;