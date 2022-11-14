import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NOTIFICATION_LSTORAGE_NAME } from '../../data/staticPlatformData';
import { globalSettingsSliceType } from '../../types/slices/globalSettingsSliceTypes';

export const getNotificationsData = createAsyncThunk(
    'globalSettings/getNotificationsData',
    async () => {
        const promise = new Promise<[]>((resolve, reject) => {
            const getDataFromLocalstorage = localStorage.getItem(NOTIFICATION_LSTORAGE_NAME)

            if (getDataFromLocalstorage != null) {
                resolve(JSON.parse(getDataFromLocalstorage))
            } else {
                resolve([])
            }
        })
        return promise
    }
);

const initialState: globalSettingsSliceType = {
    viewSidebar: false,
    viewModalWindow: false,
    typeOfModalWindow: null,
    editMeetingElement: null,
    editRoomElement: null,
    editEmployeeElement: null,
    editScreenElement: null,
    agreementIndexElement: null,
    agreementDataType: null,
    notification: {
        notificationsData: []
    }
};

export const globalSettingsSlice = createSlice({
    name: 'globalSettings',
    initialState,
    reducers: {
        OPEN_SIDEBAR: (state) => {
            state.viewSidebar = true;
        },
        CLOSE_SIDEBAR: (state) => {
            state.viewSidebar = false;
        },
        OPEN_MODAL_WINDOW: (state, action) => {
            state.viewModalWindow = true;
            state.typeOfModalWindow = action.payload;
        },
        OPEN_EDIT_MODAL_WINDOW: (state, action) => {
            state.viewModalWindow = true;
            state.typeOfModalWindow = action.payload.type;
            switch (action.payload.type) {
                case "edit-employee":
                    state.editEmployeeElement = action.payload.element;
                    break;

                case "edit-meeting":
                    state.editMeetingElement = action.payload.element;
                    break;

                case "edit-room":
                    state.editRoomElement = action.payload.element;
                    break;

                case "edit-screen":
                    state.editScreenElement = action.payload.element;
                    break;
            }
        },
        OPEN_ARGEEMENT_MODAL_WINDOW: (state, action) => {
            state.viewModalWindow = true;
            state.typeOfModalWindow = action.payload.type;
            state.agreementIndexElement = action.payload.index;
            state.agreementDataType = action.payload.dataType;
        },
        CLOSE_MODAL_WINDOW: (state) => {
            state.viewModalWindow = false;
            state.typeOfModalWindow = null;
            state.editMeetingElement = null;
            state.editRoomElement = null;
            state.editEmployeeElement = null;
            state.editScreenElement = null;
            state.agreementIndexElement = null;
        },
        ADD_NOTIFICATION: (state, action) => {
            let [newId] = state.notification.notificationsData.map((e) => e.notificationId).sort((a, b) => b - a)

            if (newId) {
                ++newId;
            } else {
                newId = 1;
            }

            state.notification.notificationsData.push({notificationId: newId, ...action.payload})
        },
        SET_NOTIFICATION_READ_STATUS: (state, action) => {
            const data = state.notification.notificationsData
            data[action.payload].seenNotification = !data[action.payload].seenNotification
            
            state.notification.notificationsData = data
        },
        CLEAR_NOTIFICATIONS_DATA: (state) => {
            state.notification.notificationsData = []
        }
    }, extraReducers: (builder) => {
        builder.addCase(getNotificationsData.pending, (state) => {
            state.notification.notificationsData = [];
        }),
        builder.addCase(getNotificationsData.fulfilled, (state, action) => {
            state.notification.notificationsData = action.payload;
        }),
        builder.addCase(getNotificationsData.rejected, (state) => {
            state.notification.notificationsData = [];
        })
    }
});

export const {OPEN_SIDEBAR, CLOSE_SIDEBAR, OPEN_MODAL_WINDOW, OPEN_EDIT_MODAL_WINDOW, OPEN_ARGEEMENT_MODAL_WINDOW, CLOSE_MODAL_WINDOW, ADD_NOTIFICATION, SET_NOTIFICATION_READ_STATUS, CLEAR_NOTIFICATIONS_DATA} = globalSettingsSlice.actions;

export const settingsPage = (state: {globalSettings: {value: globalSettingsSliceType}}) => state.globalSettings.value;

export default globalSettingsSlice.reducer;