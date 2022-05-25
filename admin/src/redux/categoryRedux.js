import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories = action.payload.data;
    },
    getCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Add
    addCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addCategorySuccess: (state, action) => {
      state.isFetching = false;
      console.log("action.payload",action.payload);
      state.categories.push(action.payload);
    },
    addCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //EDIT ALL BELOW
    //Delete
    deleteCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories.splice(
        state.categories.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //Update
    updateCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.categories[
        state.categories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.category;
    },
    updateCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  addCategoryStart,
  addCategorySuccess,
  addCategoryFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
