import { createSlice } from "@reduxjs/toolkit";

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
    setStudents(state, action) {
      state.students = action.payload;
    },

    setProjects(state, action) {
      state.projects = action.payload;
    },

    setAssignments(state, action) {
      state.assignments = action.payload;
    },

    setAttendance(state, action) {
      state.attendance = action.payload;
    },
  },
});

export const { setStudents, setProjects, setAssignments, setAttendance } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
