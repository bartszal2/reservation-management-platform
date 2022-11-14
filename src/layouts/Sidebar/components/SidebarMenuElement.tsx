import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { CLOSE_SIDEBAR } from '../../../redux/slices/globalSettingsSlice';
import { AppDispatch } from '../../../redux/store';

function SidebarMenuElement(props: {linkText: string; iconName: string; elementName: string; exactMatch: boolean}) {
    
    const dispatch: AppDispatch = useAppDispatch();

  return (
    <NavLink
        to={props.linkText}
        className={({ isActive }) =>
        isActive ? "menu__element menu__element--active" : "menu__element"
        }
        end={props.exactMatch}
        onClick={() => {
            dispatch(CLOSE_SIDEBAR());
        }}
        >
        <span className="material-symbols-outlined">{props.iconName}</span>
        {props.elementName}
    </NavLink>
  )
}

export default SidebarMenuElement