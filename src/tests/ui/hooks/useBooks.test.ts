import { getBooksByQuantity } from "@/application/book.by.quantity";
import { Book } from "@/domain/book";
import { useBooks } from "@/ui/hooks/useBooks";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBooks: Book[] = [
  {
    id: 1,
    title: "Test Book",
    author: "John Doe",
    genre: "Fiction",
    description: "A great book",
    isbn: "123-456",
    image: "test.jpg",
    published: "2022",
    publisher: "Test Publisher",
  },
];
vi.mock("@/application/book.by.quantity", () => ({
  getBooksByQuantity: vi.fn(async () => mockBooks),
}));

describe("useBooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch books on mount with initial quantity", async () => {
    const { result } = renderHook(() => useBooks(5));

    expect(getBooksByQuantity).toHaveBeenCalledWith(expect.anything(), 5);

    await act(async () => {
      await result.current.handleGetBooksByQuantity(5);
    });

    expect(result.current.books).toEqual([
      {
        title: "Test Book",
        author: "John Doe",
        genre: "Fiction",
        description: "A great book",
        isbn: "123-456",
        published: "2022",
        publisher: "Test Publisher",
      },
    ]);
  });

  it("should update books when handleGetBooksByQuantity is called", async () => {
    const { result } = renderHook(() => useBooks(3));

    await act(async () => {
      await result.current.handleGetBooksByQuantity(10);
    });

    expect(getBooksByQuantity).toHaveBeenCalledWith(expect.anything(), 10);

    expect(result.current.books).toEqual([
      {
        title: "Test Book",
        author: "John Doe",
        genre: "Fiction",
        description: "A great book",
        isbn: "123-456",
        published: "2022",
        publisher: "Test Publisher",
      },
    ]);
  });
});
