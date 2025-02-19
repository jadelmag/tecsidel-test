import { getBooksByQuantity } from "@/application/book.by.quantity";
import { Book } from "@/domain/book";
import { BookService } from "@/services/bookService";
import { SIMPLE_MOCK_BOOK } from "@/tests/mocks/books";
import { formatDate } from "@/ui/utils/date.functions";
import "@testing-library/jest-dom";
import { beforeEach } from "node:test";
import { describe, expect, it, vi } from "vitest";

const updatedPublishedDate = (books: Book[]) => {
  const updatedBooks: Book[] = books.map((book: Book) => ({
    ...book,
    published: formatDate(book.published),
  }));
  return updatedBooks;
};

describe("getBooksByQuantity", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all requested books", async () => {
    const mockUpdatedBooks = updatedPublishedDate(SIMPLE_MOCK_BOOK);
    const mockBookService = {
      getBooksByQuantity: vi.fn().mockResolvedValue(mockUpdatedBooks),
    };

    const books = await getBooksByQuantity(
      mockBookService as unknown as BookService,
      100
    );

    const updatedBooks = updatedPublishedDate(books);

    expect(mockBookService.getBooksByQuantity).toHaveBeenCalledTimes(1);
    expect(updatedBooks).toEqual(mockUpdatedBooks);
  });
});
