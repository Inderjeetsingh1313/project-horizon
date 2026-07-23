import { createSlice } from "@reduxjs/toolkit";

export type Theme = "Light" | "Dark" | "System";
export type Language = "English" | "Hindi" | "French";

interface SettingsState {
  fullName: string;
  email: string;
  theme: Theme;
  language: Language;
  notifications: boolean;
}

const initialState: SettingsState = {
  fullName: "",
  email: "",
  theme: "Light",
  language: "English",
  notifications: true,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateField(state, action) {
      const { name, value } = action.payload;

      state[name as keyof SettingsState] = value as never;
    },

    resetSettings() {
      return initialState;
    },
  },
});

export const { updateField, resetSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
