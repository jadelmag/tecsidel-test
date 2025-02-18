import { Book } from "@/domain/book";
import { BookRepositoryInterface } from "@/ports/bookRepository";
import "@testing-library/jest-dom";
import { describe, expect, it, vi } from "vitest";

describe("BookRepositoryInterface", () => {
  it("should return an array of books when getBooksByQuantity is called", async () => {
    const mockBooks: Book[] = [
      {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        description: "A novel set in the 1920s...",
        isbn: "9780743273565",
        image: "image_url",
        published: "1925",
        publisher: "Scribner",
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        description: "A novel set in a totalitarian regime...",
        isbn: "9780451524935",
        image: "image_url",
        published: "1949",
        publisher: "Secker & Warburg",
      },
    ];
    const repository: BookRepositoryInterface = {
      getBooksByQuantity: vi.fn().mockResolvedValue(mockBooks),
    };

    const books = await repository.getBooksByQuantity(2);

    expect(books).toEqual(mockBooks);
    expect(repository.getBooksByQuantity).toHaveBeenCalledWith(2);
  });

  it("should return an empty array when there are no books", async () => {
    const mockBooks: Book[] = [];
    const repository: BookRepositoryInterface = {
      getBooksByQuantity: vi.fn().mockResolvedValue(mockBooks),
    };

    const books = await repository.getBooksByQuantity(0);
    expect(books).toEqual([]);
    expect(repository.getBooksByQuantity).toHaveBeenCalledWith(0);
  });

  it("should throw an error when the repository fails", async () => {
    const repository: BookRepositoryInterface = {
      getBooksByQuantity: vi
        .fn()
        .mockRejectedValue(new Error("Failed to fetch books")),
    };
    try {
      await repository.getBooksByQuantity(2);
    } catch (error) {
      expect(error).toEqual(new Error("Failed to fetch books"));
    }
  });
});
