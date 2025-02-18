import { ApiBookRepository } from "@/infraestructure/ApiBookRepository";
import { BookService } from "@/services/bookService";
import { BookServiceFactory } from "@/services/bookServiceFactory";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("BookServiceFactory", () => {
  it("should create a BookService with ApiBookRepository", () => {
    const mockApiRepo = vi
      .fn()
      .mockImplementation(() => new ApiBookRepository());
    const mockBookService = vi
      .fn()
      .mockImplementation(() => new BookService(mockApiRepo()));
    expect(mockBookService.getMockName()).toBe("spy");

    const bookService = BookServiceFactory.create();

    expect(bookService).toBeInstanceOf(BookService);
    expect(bookService["bookRepository"]).toBeInstanceOf(ApiBookRepository);
  });

  it("should call getBookRepository with correct argument", () => {
    const spyGetBookRepository = vi.spyOn(
      BookServiceFactory,
      "getBookRepository"
    );

    BookServiceFactory.create();

    expect(spyGetBookRepository).toHaveBeenCalled();
  });
});
