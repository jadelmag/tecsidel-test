import { getBooksByQuantity } from "@/application/book.by.quantity";
import { Book, TabularBook } from "@/domain/book";
import { BookServiceFactory } from "@/services/bookServiceFactory";
import { useEffect, useState } from "react";

const bookService = BookServiceFactory.create();

export const useBooks = (initQuantity: number) => {
  const [books, setBooks] = useState<TabularBook[]>([]);

  const handleGetBooksByQuantity = async (quantity: number) => {
    const books: Book[] = await getBooksByQuantity(bookService, quantity);
    const tabularBooks: TabularBook[] = books.map(({ id, image, ...rest }) => rest);
    setBooks(tabularBooks);
  };

  useEffect(() => {
    handleGetBooksByQuantity(initQuantity);
  }, [initQuantity]);

  return {
    handleGetBooksByQuantity,
    books,
  };
};
