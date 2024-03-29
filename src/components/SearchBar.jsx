import { useState, useContext } from "react";
import DataContext from "../context/DataContext";
import SearchSelection from "./SearchSelection";

const SearchBar = () => {
  const { setToBeAdded } = useContext(DataContext);

  const [searchValue, setSearchValue] = useState("");
  const [bookList, setBookList] = useState({});

  const handleBack = () => {
    setToBeAdded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&maxResults=40`
      );
      if (!response.ok) {
        console.error("Book fetch did not go through");
      }
      const books = await response.json();
      console.log(books);
      setBookList(books);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(`${value}`);
  };

  return (
    <div className="flex flex-col flex-wrap">
      <div className="w-full flex justify-center h-[5dvh]">
        <button className="h-8 ml-4 mt-4 px-4 cursor-pointer rounded-md shadow-md hover:shadow-inner hover:bg-warmBrown duration-300 bg-midBrown text-softWhite font-semibold" onClick={handleBack}>
          Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row justify-center items-align box-border flex-wrap"
      >
        <div className="w-full flex justify-center">
          <input
            onChange={handleChange}
            className="mb-7 h-8 border bg-softWhite w-80 focus:border-testShadow focus:outline-none focus:searchbar-box-shadow duration-300 px-2 text-softBlack rounded-md"
            type="text"
            placeholder="Search books and authors..."
          />
          <input
            type="submit"
            className="h-8 ml-4 px-4 cursor-pointer rounded-md shadow-md hover:shadow-inner hover:bg-warmBrown duration-300 bg-midBrown text-softWhite font-semibold"
          ></input>
        </div>

        {bookList.items ? (
          <div className="justify-center flex-grow flex text-center">
            <ul
              className="overflow-auto bg-softWhite rounded-md flex-grow addForm-box-shadow flex-wrap flex h-[65dvh] w-[40dvw] p-5"
            >
              {bookList.items.map((book, index) => {
                return <SearchSelection key={index} book={book} />;
              })}
            </ul>
          </div>
        ) : (
          <span></span>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
