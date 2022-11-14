import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux-hooks';
import { OPEN_ARGEEMENT_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { screenDataType } from '../../../types/screenDataType';

function ScreenInfoHeader(props: {selectedScreenData: screenDataType | null}) {
    const navigate: NavigateFunction = useNavigate()

    const screensData = useAppSelector((state: RootState) => state.screensPage);
    const dispatch: AppDispatch = useAppDispatch();
    
    const editSelectedScreen = (screenElement: screenDataType): void => {
      dispatch(OPEN_EDIT_MODAL_WINDOW({type: 'edit-screen', element: screenElement}));
    };
  
    const deleteSelectedScreen = (currentScreenId: number): void => {
      const [screenElement]: screenDataType[] = screensData.value.filter((e: screenDataType) => e.screenId === currentScreenId);
      const screenElementIndex: number = screensData.value.indexOf(screenElement);
      dispatch(OPEN_ARGEEMENT_MODAL_WINDOW({type: 'delete-agreement', dataType: 'screensData', index: (screenElementIndex)}));
    };
  
    return (
      <div className="main-screen-info-page__header">
        <div className="header__group">
          <div className="group__title">
            <span className="material-symbols-outlined">groups</span>
            Ekran - {props.selectedScreenData != null ? props.selectedScreenData.screenName : ''}
          </div>
          <div className="group__nav">
            <button className="nav__button" onClick={() => {editSelectedScreen(props.selectedScreenData!)}}>
              <span className="material-symbols-outlined">edit</span>
              Edytuj
            </button>
            <button className="nav__button" onClick={() => {deleteSelectedScreen(props.selectedScreenData!.screenId)}}>
              <span className="material-symbols-outlined">delete</span>
              Usuń
            </button>
            <button className="nav__button" onClick={() => {navigate('/platform/screens')}}>
              <span className="material-symbols-outlined">settings</span>
              Wróć
            </button>
          </div>
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
    );
  }

export default ScreenInfoHeader;