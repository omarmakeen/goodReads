import "./DropDown.css";
import { useDispatch } from 'react-redux';
import { updateBook } from '../../redux-store/BookActions';

const shelfOptions = [
  {
    option: 'Currently Reading',
    value: 'currentlyReading',
  },
  {
    option: 'Want to Read',
    value: 'wantToRead',
  },
  {
    option: 'Read',
    value: 'read',
  },
];

const DropDown = (props: { currentShelf: any; bookId: string }) => {
  const dispatch = useDispatch();

  const ChangeShelfHandler = (event: any) => {
    const newShelf = event.target.value;

    const currentShelf = props.currentShelf;

    dispatch(updateBook(props.bookId, newShelf, currentShelf) as any);
  };

  return (
    <div className="book-shelf-changer">
      <select
        data-testid="shelf-dropdown"
        value={props.currentShelf}
        onChange={ChangeShelfHandler}
      >
        <option value="none" disabled>
          Move to...
        </option>
        {shelfOptions.map((shelf) => {
          return (
            <option value={shelf.value}>
              {shelf.option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
