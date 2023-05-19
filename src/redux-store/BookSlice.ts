import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../interface/Book.interface";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    allBooksPerShelf: null,
    shelfChanges: null,
    booksForQuery: null,
  },
  reducers: {
    setBooks(state: any, action) {
      state.allBooksPerShelf = action.payload.allBooksPerShelf;
    },
    changeBookShelf(state: any, action: any) {
      const currentShelf: "currentlyReading" | "wantToRead" | "read" | "none" =
        action.payload.currentShelf;

      const newShelf: "currentlyReading" | "wantToRead" | "read" | "none" =
        action.payload.newShelf;

      if (state.allBooksPerShelf) {
        if (currentShelf !== "none" && state.allBooksPerShelf[currentShelf]) {
          let bookIndexInOverview: number = state.allBooksPerShelf[
            currentShelf
          ].findIndex((book: Book) => book.id === action.payload.bookId);

          const modifiedBook: Book = {
            ...state.allBooksPerShelf[currentShelf][bookIndexInOverview],
            shelf: newShelf,
          };

          state.allBooksPerShelf[currentShelf].splice(bookIndexInOverview, 1);

          if (newShelf !== "none") {
            state.allBooksPerShelf[newShelf].push(modifiedBook);
          }
        }
      }

      if (Array.isArray(state.booksForQuery)) {
        let bookIndexInSearch: number = state.booksForQuery.findIndex(
          (book: Book) => book.id === action.payload.bookId
        );

        if (bookIndexInSearch >= 0) {
          const modifiedBook: Book = {
            ...state.booksForQuery[bookIndexInSearch],
            shelf: newShelf,
          };

          state.booksForQuery[bookIndexInSearch] = modifiedBook;

          if (
            currentShelf === "none" &&
            newShelf !== "none" &&
            state.allBooksPerShelf
          ) {
            state.allBooksPerShelf[newShelf].push(
              state.booksForQuery[bookIndexInSearch]
            );
          }
        }
      }
    },
    searchForBooks(state: any, action) {
      state.booksForQuery = action.payload.booksForQuery;
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice;
