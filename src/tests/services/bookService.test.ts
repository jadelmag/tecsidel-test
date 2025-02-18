import { BookRepositoryInterface } from "@/ports/bookRepository";
import { BookService } from "@/services/bookService";
import { MOCK_BOOKS } from "@/tests/mocks/books";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("BookService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call getBooksByQuantity on the repository and return books", async () => {
    const mockRepository: BookRepositoryInterface = {
      getBooksByQuantity: vi.fn().mockResolvedValue(MOCK_BOOKS),
    };
    const bookService = new BookService(mockRepository);

    const books = await bookService.getBooksByQuantity(1);

    expect(books).toEqual(MOCK_BOOKS);
    expect(mockRepository.getBooksByQuantity).toHaveBeenCalledWith(1);
  });

  it("should call getBooksByQuantity on the repository and return an empty array", async () => {
    const mockRepository: BookRepositoryInterface = {
      getBooksByQuantity: vi.fn().mockResolvedValue([]),
    };
    const bookService = new BookService(mockRepository);

    const books = await bookService.getBooksByQuantity(0);

    expect(books).toEqual([]);
  });

  it("should handle errors properly when the repository fails", async () => {
    const mockRepository: BookRepositoryInterface = {
      getBooksByQuantity: vi
        .fn()
        .mockRejectedValue(new Error("Repository error")),
    };
    const bookService = new BookService(mockRepository);

    try {
      await bookService.getBooksByQuantity(1);
    } catch (error) {
      expect(error).toEqual(new Error("Repository error"));
    }
  });
});
