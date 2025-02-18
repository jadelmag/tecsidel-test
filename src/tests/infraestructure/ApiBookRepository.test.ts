import { Book } from "@/domain/book";
import { ApiBookRepository } from "@/infraestructure/ApiBookRepository";
import "@testing-library/jest-dom";
import axios from "axios";
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

vi.mock("axios");

describe("ApiBookRepository", () => {
  let apiBookRepository: ApiBookRepository;

  beforeEach(() => {
    apiBookRepository = new ApiBookRepository();
    vi.clearAllMocks();
  });

  describe("getBooksByQuantity", () => {
    it("should return books when API responds with valid data", async () => {
      vi.mocked(axios, true).get.mockResolvedValueOnce({
        data: [mockBooks],
      });
      const result = await apiBookRepository.getBooksByQuantity(1);

      expect(result).toEqual([]);
      expect(axios.get).toHaveBeenCalledWith(
        "https://fakerapi.it/api/v1/books?_quantity=1&_locale=es_ES"
      );
    });
  });

  it("should return an empty array on API error", async () => {
    vi.mocked(axios, true).get.mockRejectedValueOnce(() =>
      Promise.resolve(new Error("API Error"))
    );

    const result = await apiBookRepository.getBooksByQuantity(0);
    expect(result).toEqual([]);
  });

  it("should return an empty array when response data is invalid", async () => {
    vi.mocked(axios, true).get.mockResolvedValueOnce({
      data: null,
    });
    const result = await apiBookRepository.getBooksByQuantity(0);
    expect(result).toEqual([]);
  });
});
