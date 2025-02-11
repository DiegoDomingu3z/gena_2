import { createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  getAllUsers,
  getDepartments,
  getGroupLead,
  getLeads,
  getUsersInDepartment,
  removeDept,
  updateDepartmentName,
} from "./Thunks";
import { createAccount, deleteAccount } from "../Account/thunks";

export const DepartmentSlice = createSlice({
  name: "Department",
  initialState: {
    departments: [],
    loading: false,
    leads: [],
    users: [],
    groupLeads: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDepartments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.departments = action.payload;
        state.loading = false;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getLeads.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLeads.fulfilled, (state, action) => {
        state.leads = action.payload;
        state.loading = false;
      })
      .addCase(getLeads.rejected, (state, action) => {
        state.loading = false;
      })
      // create department
      .addCase(createDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
        state.loading = false;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
      })
      // get users in department
      .addCase(getUsersInDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsersInDepartment.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsersInDepartment.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(createAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.loading = false;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.errorCodes = action.error;
        state.loading = false;
      })
      // REMOVING DEPT
      .addCase(removeDept.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(removeDept.fulfilled, (state, action) => {
        state.departments = state.departments.filter(
          (f) => f._id != action.payload._id
        );
        state.loading = false;
      })
      .addCase(removeDept.rejected, (state, action) => {
        state.errorCodes = action.error;
        state.loading = false;
      })
      .addCase(getGroupLead.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getGroupLead.fulfilled, (state, action) => {
        state.groupLeads = action.payload;
        state.loading = false;
      })
      .addCase(getGroupLead.rejected, (state, action) => {
        state.errorCodes = action.error;
        state.loading = false;
      })
      .addCase(deleteAccount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        // state.departments.users = state.departments.users.filter(a => a._id != action.payload._id)
        state.loading = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateDepartmentName.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateDepartmentName.fulfilled, (state, action) => {
        let i = state.departments.findIndex(obj => obj._id === action.payload._id)
        if (i !== -1) {
          state.departments[i] = action.payload
        }
      })
  },
});

export default DepartmentSlice.reducer;
