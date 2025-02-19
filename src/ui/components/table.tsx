import { TabularBook } from "@/domain/book";
import { SortField } from "@/interfaces/sortfield";
import CustomImage from "@/ui/components/image";
import SortCell from "@/ui/components/sortcell";
import React, { useCallback, useMemo, useState } from "react";

export interface CustomTableProps {
  books: TabularBook[];
  showColor: boolean;
  onDeleteRow: (isbn: string) => void;
  onSortBooks: (books: TabularBook[]) => void;
}

const CustomTable: React.FC<CustomTableProps> = ({
  books,
  showColor,
  onDeleteRow,
  onSortBooks,
}) => {
  const [sortField, setSortField] = useState<SortField>("author");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = useCallback(
    (field: "author" | "title") => {
      const newOrder =
        sortField === field && sortOrder === "asc" ? "desc" : "asc";
      setSortField(field);
      setSortOrder(newOrder);

      const sortedBooks = [...books].sort(
        (a, b) =>
          a[field].localeCompare(b[field]) * (newOrder === "asc" ? 1 : -1)
      );

      onSortBooks(sortedBooks);
    },
    [books, sortField, sortOrder, onSortBooks]
  );

  const sortedBooks = useMemo(() => {
    return [...books].sort(
      (a, b) =>
        a[sortField].localeCompare(b[sortField]) *
        (sortOrder === "asc" ? 1 : -1)
    );
  }, [books, sortField, sortOrder]);

  return (
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
        {sortedBooks.map((book, index) => (
          <tr
            key={book.isbn}
            className={
              showColor && index % 2 === 0 ? "bg-gray-400" : "bg-white"
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
                onClick={() => onDeleteRow(book.isbn)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
