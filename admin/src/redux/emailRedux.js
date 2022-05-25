import { createSlice } from "@reduxjs/toolkit";

export const emailsSlice = createSlice({
  name: "email",
  initialState: {
    emails: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getEmailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getEmailSuccess: (state, action) => {
      state.isFetching = false;
      state.emails = action.payload;
    },
    getEmailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { getEmailStart, getEmailSuccess, getEmailFailure } =
  emailsSlice.actions;

export default emailsSlice.reducer;
