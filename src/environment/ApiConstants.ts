import { BACKEND_URL } from "./AppEnvironment";

export const ApiConstants = {
    GET_ALL_BOOKS: {
        url: BACKEND_URL + '/books',
        method: 'GET'
    },
    SEARCH_FOR_BOOKS: {
        url: BACKEND_URL + '/search',
        method: 'GET'
    },
    UPDATE_BOOK: {
        url: (bookId: string) => BACKEND_URL + `/books/${bookId}`,
        method: 'GET'
    },
};