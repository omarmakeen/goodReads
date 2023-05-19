import { BookShelfs } from "../../interface/BookShelfs.interface";
import Shelf from "../../components/Shelf/Shelf";
import "./DashBoard.css";

const DashBoard = (props: { booksPerShelf: BookShelfs }) => {
  return (
    <>
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {props.booksPerShelf ? (
        <div className="list-books-content">
          <Shelf
            name="Currently Reading"
            books={props.booksPerShelf.currentlyReading}
          />
          <Shelf name="Want To Read" books={props.booksPerShelf.wantToRead} />
          <Shelf name="Read" books={props.booksPerShelf.read} />
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default DashBoard;
