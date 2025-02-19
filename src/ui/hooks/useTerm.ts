import { TabularBook } from "@/domain/book";
import { useDebounce } from "@/ui/hooks/useDebounce";
import { useCallback, useEffect, useState } from "react";

export const useTerm = (
  books: TabularBook[],
  searchTerm: string,
  debounceTime: number
) => {
  const [filteredBooks, setFilteredBooks] = useState<TabularBook[]>(books);
  const debouncedSearchTerm = useDebounce(searchTerm, debounceTime);

  const handleDebouncedFilter = useCallback(
    (query: string) => {
      setFilteredBooks(
        books.filter((book) =>
          book.author.toLowerCase().includes(query.toLowerCase())
        )
      );
    },
    [books]
  );

  const updateFilteredBooks = useCallback((updatedBooks: TabularBook[]) => {
    setFilteredBooks(updatedBooks);
  }, []);

  useEffect(() => {
    handleDebouncedFilter(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleDebouncedFilter]);

  return { filteredBooks, updateFilteredBooks };
};
