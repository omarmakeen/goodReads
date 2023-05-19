import { bookActions } from "./BookSlice";
import {
  getAllBooks,
  searchForBooks,
  changeBookShelf,
} from "../service/BookService";

export const getBooks = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await getAllBooks();
      return response;
    };

    try {
      const booksPerShelf = await fetchData();
      dispatch(
        bookActions.setBooks({
          allBooksPerShelf: booksPerShelf || [],
        })
      );
    } catch (error) {}
  };
};

export const searchBooks = (query: string) => {
  return async (dispatch: any) => {
    const searchForABook = async () => {
      const response = await searchForBooks(query, 10);
      return response;
    };

    try {
      const booksForQuery = await searchForABook();

      dispatch(
        bookActions.searchForBooks({
          booksForQuery: booksForQuery || [],
        })
      );
    } catch (error) {}
  };
};

export const updateBook = (
  bookId: string,
  newShelf: string,
  currentShelf: string
) => {
  return async (dispatch: any) => {
    const updateABook = async () => {
      const response = await changeBookShelf(bookId, newShelf);
      return response;
    };

    try {
      await updateABook();
      dispatch(
        bookActions.changeBookShelf({
          bookId: bookId,
          newShelf: newShelf,
          currentShelf: currentShelf,
        } as any)
      );
    } catch (error) {}
  };
};
