import React from 'react';
import PrintButton from '../../../components/PrintButton/PrintButton';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { OPEN_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch } from '../../../redux/store';

function ScreensHeader() {
  const dispatch: AppDispatch = useAppDispatch();

  const addScreen = (): void => {
    dispatch(OPEN_MODAL_WINDOW('add-screen'));
  };

  return (
    <div className="main-screens-page__header">
        <div className="header__title">
          <span className="material-symbols-outlined">monitor</span>
          Ekrany
        </div>
        <div className="header__nav">
          <button className="nav__button" onClick={() => {addScreen()}}>
            <span className="material-symbols-outlined">add_circle</span>
            Dodaj ekran
          </button>
          <PrintButton/>
        </div>
      <div className="header__text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
        nam, ducimus quae deleniti recusandae sed corrupti dicta ullam autem
        cupiditate? Quae ex aliquam dignissimos fuga, mollitia repudiandae
        quaerat tempore rem cum explicabo fugiat cupiditate perferendis possimus
        voluptatibus temporibus laudantium libero incidunt tempora minus
        praesentium facilis saepe illo quidem. Consectetur est distinctio
        voluptatum iure iste molestiae mollitia doloremque et repellendus alias
        autem unde, magni inventore quae id illum. Facere est blanditiis enim,
        laudantium eos nostrum iusto, quas odit corporis corrupti fugit totam et
        sunt impedit nihil ducimus recusandae veniam ipsa commodi.
      </div>
    </div>
  )
}

export default ScreensHeader;