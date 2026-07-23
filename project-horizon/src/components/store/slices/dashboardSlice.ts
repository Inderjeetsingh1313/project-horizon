import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface DashboardState {
  students: number;
  projects: number;
  assignments: number;
  attendance: string;
}

const initialState: DashboardState = {
  students: 120,
  projects: 8,
  assignments: 24,
  attendance: "92%",
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    incrementStudents(state) {
      state.students += 1;
    },

    incrementProjects(state) {
      state.projects += 1;
    },

    incrementAssignments(state) {
      state.assignments += 1;
    },

    updateAttendance(state, action: PayloadAction<string>) {
      state.attendance = action.payload;
    },
  },
});

export const {
  incrementStudents,
  incrementProjects,
  incrementAssignments,
  updateAttendance,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
