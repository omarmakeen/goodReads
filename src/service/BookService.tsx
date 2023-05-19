import { Book } from "../interface/Book.interface";
import { BookShelfs } from "../interface/BookShelfs.interface";
import { ApiConstants } from "../environment/ApiConstants";

let token = localStorage.token;

if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const requestHeaders: HeadersInit = new Headers();
requestHeaders.set("Content-Type", "application/json");
requestHeaders.set("Authorization", token);

export const getAllBooks: () => Promise<BookShelfs> = () =>
  fetch(`${ApiConstants.GET_ALL_BOOKS.url}`, { headers: requestHeaders })
    .then((res) => res.json())
    .then((data) => data.books)
    .then((response: any) => {
      const booksPerShelf: BookShelfs = {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      };
      for (const book of response) {
        const shelf: "currentlyReading" | "wantToRead" | "read" = book.shelf;
        booksPerShelf[shelf].push({
          id: book.id,
          title: book.title,
          authors: book.authors,
          image: book.imageLinks.thumbnail,
          shelf,
        });
      }
      return booksPerShelf;
    });

export const searchForBooks: (
  query: string,
  maxResults: number
) => Promise<Book[]> = (query: string, maxResults: number) =>
  fetch(`${ApiConstants.SEARCH_FOR_BOOKS.url}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({ query, maxResults }),
  })
    .then((res) => res.json())
    .then((data) => data.books)
    .then((response: any) => {
      const books: Book[] = [];

      if (!response.error) {
        for (const book of response) {
          const shelf: "currentlyReading" | "wantToRead" | "read" = book.shelf
            ? book.shelf
            : "none";
          books.push({
            id: book.id,
            title: book.title,
            authors: book.authors ? book.authors : [],
            image: book.imageLinks?.thumbnail,
            shelf,
          });
        }
      }

      return books;
    });

export const changeBookShelf = (bookId: string, shelf: string) =>
  fetch(`${ApiConstants.UPDATE_BOOK.url(bookId)}`, {
    method: "PUT",
    headers: requestHeaders,
    body: JSON.stringify({ shelf }),
  }).then((res) => res.json());
