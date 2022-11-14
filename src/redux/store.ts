import { configureStore } from "@reduxjs/toolkit";
import roomsPage from "./slices/roomsPageSlice";
import meetingsPage from "./slices/meetingsPageSlice";
import screensPage from "./slices/screensPageSlice";
import employeeresPage from "./slices/employeeresPageSlice";
import globalSettings from "./slices/globalSettingsSlice";
import meetingCategories from "./slices/meetingCategoriesSlice";
import employeePositions from "./slices/employeePositionsSlice";
import roomTypes from "./slices/roomTypesSlice";

export const store = configureStore({
    reducer: {
        roomsPage: roomsPage,
        meetingsPage: meetingsPage,
        screensPage: screensPage,
        employeeresPage: employeeresPage,
        globalSettings: globalSettings,
        meetingCategories: meetingCategories,
        employeePositions: employeePositions,
        roomTypes: roomTypes
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;