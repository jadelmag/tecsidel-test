import { TabularBook } from "@/domain/book";
import CustomInput from "@/ui/components/input";
import CustomTable from "@/ui/components/table";
import { INIT_BOOKS } from "@/ui/constants/book.constants";
import { DEBOUNCE_TIME } from "@/ui/constants/debouce.constants";
import { useBooks } from "@/ui/hooks/useBooks";
import { useTerm } from "@/ui/hooks/useTerm";
import { useCallback, useState } from "react";

const BookPage = () => {
  const { books } = useBooks(INIT_BOOKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [showColor, setShowColor] = useState(false);

  const { filteredBooks, updateFilteredBooks } = useTerm(
    books,
    searchTerm,
    DEBOUNCE_TIME
  );

  const handleRestore = useCallback(() => {
    updateFilteredBooks(books);
  }, [books, updateFilteredBooks]);

  const handleColor = useCallback(() => {
    setShowColor((prevState: boolean) => !prevState);
  }, []);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleDelete = useCallback(
    (isbn: string) => {
      updateFilteredBooks(filteredBooks.filter((book) => book.isbn !== isbn));
    },
    [filteredBooks, updateFilteredBooks]
  );

  const handleSortedBooks = useCallback(
    (sortedBooks: TabularBook[]) => {
      updateFilteredBooks(sortedBooks);
    },
    [updateFilteredBooks]
  );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Books Table</h1>
      <CustomInput searchTerm={searchTerm} onChangeTerm={handleSearch} />
      <div className="flex gap-2 my-4">
        <button
          className="p-2 bg-blue-500 text-white cursor-pointer"
          onClick={handleColor}
        >
          Add Color on Table
        </button>
        <button
          aria-label="restore books"
          className="p-2 bg-blue-500 text-white cursor-pointer"
          onClick={handleRestore}
        >
          Restore All
        </button>
      </div>
      <CustomTable
        books={filteredBooks}
        showColor={showColor}
        onDeleteRow={handleDelete}
        onSortBooks={handleSortedBooks}
      />
    </div>
  );
};

export default BookPage;
