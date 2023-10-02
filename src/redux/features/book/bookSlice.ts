/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchTerm: "",
  deleteBookModal: false,
  bookDeleteId: "",
  filterByGenre: "",
  filterByPublication: "",
  wishlist: localStorage.getItem("wishlist")
    ? JSON.parse(localStorage.getItem("wishlist"))
    : [],
  reading: localStorage.getItem("reading")
    ? JSON.parse(localStorage.getItem("reading"))
    : [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    handleSearchTerm: (state, action) => {
      state.searchTerm = action.payload as string;
    },
    handleDeleteBookModal: (state, action) => {
      state.deleteBookModal = action.payload.isOpen;
      state.bookDeleteId = action.payload._id;
    },
    handleGenreFilter: (state, action) => {
      state.filterByGenre = action.payload;
      state.filterByPublication = "";
    },
    handlePublicationFilter: (state, action) => {
      state.filterByPublication = action.payload;
    },
    addToWishlist: (state, action) => {
      const itemIndex = state.wishlist.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        const newWishlist = state.wishlist.filter(
          (item) => item._id !== action.payload._id
        );

        state.wishlist = newWishlist;
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      } else {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    addToReading: (state, action) => {
      const itemIndex = state.reading.findIndex(
        (item) => item._id === action.payload._id
      );

      if (itemIndex >= 0) {
        const newReading = state.reading.filter(
          (item) => item._id !== action.payload._id
        );
        state.reading = newReading;
        localStorage.setItem("reading", JSON.stringify(newReading));
      } else {
        const tempReading = {
          ...action.payload,
          status: "running",
        };
        state.reading.push(tempReading);
        localStorage.setItem("reading", JSON.stringify(state.reading));
      }
    },
    handleStatus: (state, action) => {
      const itemIndex = state.reading.findIndex(
        (item) => item._id === action.payload._id
      );
      state.reading[itemIndex].status = action.payload.status;

      localStorage.setItem("reading", JSON.stringify(state.reading));
    },
  },
});

export const {
  handleSearchTerm,
  handleDeleteBookModal,
  handleGenreFilter,
  handlePublicationFilter,
  addToWishlist,
  addToReading,
  handleStatus,
} = bookSlice.actions;

export default bookSlice.reducer;
