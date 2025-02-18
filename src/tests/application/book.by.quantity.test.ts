import { getBooksByQuantity } from "@/application/book.by.quantity";
import { BookService } from "@/services/bookService";
import { MOCK_BOOKS } from "@/tests/mocks/books";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("getBooksByQuantity", () => {
  it("should return all requested books", async () => {
    const mockBookService = {
      getBooksByQuantity: vi.fn().mockResolvedValue(MOCK_BOOKS),
    };

    const books = await getBooksByQuantity(
      mockBookService as unknown as BookService,
      100
    );

    expect(mockBookService.getBooksByQuantity).toHaveBeenCalledTimes(1);
    expect(books).toEqual(MOCK_BOOKS);
  });
});
