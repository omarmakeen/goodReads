import { useState } from "react";
import { Book as BookInterface } from "../../interface/Book.interface";
import Book from "../../components/Book/Book";
import "./Search.css";
import { useDispatch } from "react-redux";
import { searchBooks } from "../../redux-store/BookActions";

const Search = (props: { books: BookInterface[] | null }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useDispatch();

  const changeSearchValue = (event: any) => {
    setTimeout(() => {
      const searchInput = event.target.value
        ? event.target.value.toLowerCase()
        : "";

      if (searchValue !== searchInput) {
        setSearchValue(searchInput);

        if (searchInput) {
          dispatch(searchBooks(searchInput) as any);
        } else {
        }
      }
    }, 500);
  };

  return (
    <>
      <div>
        <div className="search-books-bar">
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              onChange={changeSearchValue}
            />
          </div>
        </div>

        <div id="search-testing-area">
          {true ? (
            <div className="search-books-results">
              <ol className="books-grid">
                {Array.isArray(props.books) && props.books.length ? (
                  props.books.map((book: BookInterface) => {
                    return <Book key={book.id} book={book} />;
                  })
                ) : (
                  <h1>No Books found</h1>
                )}
              </ol>
            </div>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
