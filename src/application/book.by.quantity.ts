import { BookService } from "@/services/bookService";

export const getBooksByQuantity = async (
  bookService: BookService,
  quantity: number
) => {
  return await bookService.getBooksByQuantity(quantity);
};
