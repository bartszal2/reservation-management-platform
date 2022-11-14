import React from 'react'

const printPage = (): void => {
  window.print();
};

function PrintButton() {
  return (
    <button className="nav__button" onClick={() => printPage()}>
        <span className="material-symbols-outlined">print</span>
        Drukuj listę
    </button>
  )
}

export default PrintButton