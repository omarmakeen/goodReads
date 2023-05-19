import Book from '../Book/Book';
import { Book as BookInterface } from '../../interface/Book.interface';
import './Shelf.css';

const Shelf = (props: {
  name: string,
  books: BookInterface[]
}) => {

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            (Array.isArray(props.books) && props.books.length) ? (props.books.map((book: BookInterface) => {
              return <Book key={book.id} book={book} />
            })) : (<h1> No Books Here</h1>)
          }
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
