import { TabularBook } from "@/domain/book";
import CustomImage from "@/ui/components/image";
import CustomInput from "@/ui/components/input";
import SortCell from "@/ui/components/sortcell";
import { INIT_BOOKS } from "@/ui/constants/book.constants";
import { useBooks } from "@/ui/hooks/useBooks";
import { useDebounce } from "@/ui/hooks/useDebounce";
import React, { JSX, useCallback, useEffect, useState } from "react";

const CustomTable: React.FC = (): JSX.Element => {
  const { books } = useBooks(INIT_BOOKS);
  const [filteredBooks, setFilteredBooks] = useState<TabularBook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"author" | "title" | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showTableColor, setTableColor] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 800);

  const handleDelete = (isbn: string) => {
    setFilteredBooks(filteredBooks.filter((book: TabularBook) => book.isbn !== isbn));
  };

  const handleRestore = () => {
    setFilteredBooks(books);
  };

  const handleColor = () => {
    setTableColor((prevState: boolean) => !prevState);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field: "author" | "title") => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);

    const sortedData = [...filteredBooks].sort((a, b) => {
      if (a[field] < b[field]) return newOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredBooks(sortedData);
  };

  const handleDebouncedFilter = useCallback(
    (query: string) => {
      setFilteredBooks(
        books.filter((book: TabularBook) =>
          book.author.toLowerCase().includes(query.toLowerCase())
        )
      );
    },
    [books]
  );

  useEffect(() => {
    handleDebouncedFilter(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleDebouncedFilter]);

  useEffect(() => {
    if (books.length > 0) {
      setFilteredBooks(books);
    }
  }, [books]);

  return (
    <>
      <CustomInput searchTerm={searchTerm} onChangeTerm={handleSearch} />
      <button
        className="my-4 p-2 bg-blue-500 text-white cursor-pointer"
        onClick={handleColor}
      >
        Add Color on Table
      </button>

      <button
        className="my-4 ml-2 p-2 bg-blue-500 text-white cursor-pointer"
        onClick={handleRestore}
      >
        Restore All
      </button>

      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Avatar</th>
            <SortCell
              value="Author"
              field={sortField}
              order={sortOrder}
              onSort={() => handleSort("author")}
            />
            <SortCell
              value="Title"
              field={sortField}
              order={sortOrder}
              onSort={() => handleSort("title")}
            />
            <th className="border p-2">Genre</th>
            <th className="border p-2">Published</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book: TabularBook, index: number) => (
            <tr
              key={book.isbn}
              className={
                showTableColor
                  ? index % 2 === 0
                    ? "bg-gray-400"
                    : "bg-white"
                  : "bg-white"
              }
            >
              <td className="border p-2">
                <CustomImage author={book.author} />
              </td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.published}</td>
              <td className="border p-2">
                <button
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(book.isbn)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomTable;
