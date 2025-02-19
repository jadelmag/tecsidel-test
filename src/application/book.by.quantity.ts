import { Book } from "@/domain/book";
import { BookService } from "@/services/bookService";
import { formatDate } from "@/ui/utils/date.functions";

export const getBooksByQuantity = async (
  bookService: BookService,
  quantity: number
) => {
  const books: Book[] = await bookService.getBooksByQuantity(quantity);

  const updatedBooks: Book[] = books.map((book: Book) => ({
    ...book,
    published: formatDate(book.published),
  }));

  return updatedBooks;
};
