import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "./slices/dashboardSlice";
import settingsReducer from "./slices/settingsSlice";
import notificationReducer from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    settings: settingsReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
