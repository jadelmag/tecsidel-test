import {
  Book,
  bookSchema,
  TabularBook,
  tabularBookSchema,
} from "@/domain/book";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("bookSchema", () => {
  it("should validate a valid book object", () => {
    const validBook: Book = {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      description: "A novel set in the 1920s...",
      isbn: "9780743273565",
      image: "image_url",
      published: "1925",
      publisher: "Scribner",
    };

    const result = bookSchema.safeParse(validBook);
    expect(result.success).toBe(true);
  });

  it("should throw an error if id is not a positive integer", () => {
    const invalidBook: Book = {
      id: -1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      description: "A novel set in the 1920s...",
      isbn: "9780743273565",
      image: "image_url",
      published: "1925",
      publisher: "Scribner",
    };

    const result = bookSchema.safeParse(invalidBook);
    expect(result.success).toBe(false);
  });
});

describe("tabularBookSchema", () => {
  it("should validate a valid tabular book object", () => {
    const validTabularBook: TabularBook = {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      genre: "Fiction",
      description: "A novel set in the 1920s...",
      isbn: "9780743273565",
      published: "1925",
      publisher: "Scribner",
    };

    const result = tabularBookSchema.safeParse(validTabularBook);
    expect(result.success).toBe(true);
  });
});
