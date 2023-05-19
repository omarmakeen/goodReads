import { Book } from "./Book.interface";

export interface BookShelfs {
    currentlyReading: Book[],
    wantToRead: Book[],
    read: Book[] 
}
