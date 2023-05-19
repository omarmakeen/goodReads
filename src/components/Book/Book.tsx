import { Book as BookInterface } from '../../interface/Book.interface';
import DropDown from '../DropDown/DropDown';
import "./Book.css";

const Book = (props: { book: BookInterface }) => {
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${props.book.image})`,
            }}
          ></div>
          <DropDown bookId={props.book.id} currentShelf={props.book.shelf} />
        </div>
        <div className="book-title">{props.book.title}</div>
        <div className="book-authors">{props.book.authors}</div>
      </div>
    </li>
  );
};

export default Book;
