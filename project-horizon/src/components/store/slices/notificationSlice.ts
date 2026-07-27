import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "success" | "error" | "warning" | "info";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  /** ms before auto-dismiss; 0/undefined = sticky until closed manually */
  duration?: number;
}

type AddNotificationPayload = Omit<Notification, "id"> & { id?: string };

interface NotificationState {
  items: Notification[];
}

const initialState: NotificationState = {
  items: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: {
      reducer(state, action: PayloadAction<Notification>) {
        state.items.push(action.payload);
      },
      prepare(payload: AddNotificationPayload) {
        return {
          payload: {
            id: payload.id ?? nanoid(),
            type: payload.type,
            message: payload.message,
            duration: payload.duration ?? 4000,
          },
        };
      },
    },

    removeNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },

    clearNotifications(state) {
      state.items = [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } =
  notificationSlice.actions;

export default notificationSlice.reducer;