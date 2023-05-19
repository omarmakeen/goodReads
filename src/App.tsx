import "./App.css";
import { useEffect, useState } from "react";
import DashBoard from "./views/Dashboard/DashBoard";
import Search from "./views/Search/Search";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BookShelfs } from "./interface/BookShelfs.interface";
import { getBooks } from "./redux-store/BookActions";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  const dispatch = useDispatch();

  const allBooksPerShelf: BookShelfs = useSelector(
    (state: any) => state.books.allBooksPerShelf
  );

  useEffect(() => {
    if (!allBooksPerShelf) {
      dispatch(getBooks() as any);
    }
  }, [dispatch, allBooksPerShelf]);

  const booksForQuery = useSelector((state: any) => state.books.booksForQuery);

  return (
    <div className="app">
      <BrowserRouter>
        {showSearchPage ? (
          <Search books={booksForQuery} />
        ) : (
          <DashBoard booksPerShelf={allBooksPerShelf} />
        )}
      </BrowserRouter>
      <div className="open-search">
        <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
      </div>
    </div>
  );
}

export default App;
