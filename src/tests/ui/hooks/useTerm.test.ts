import { TabularBook } from "@/domain/book";
import { SIMPLE_MOCK_BOOK } from "@/tests/mocks/books";
import { useTerm } from "@/ui/hooks/useTerm";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useTerm Hook", () => {
  it("should return the initial list of books", () => {
    vi.mock("@/ui/hooks/useDebounce", () => ({
      useDebounce: vi.fn(() => ""),
    }));

    const { result } = renderHook(() => useTerm(SIMPLE_MOCK_BOOK, "", 300));

    expect(result.current.filteredBooks).toEqual(SIMPLE_MOCK_BOOK);
  });

  it("should filter books based on the search term", () => {
    vi.mock("@/ui/hooks/useDebounce", () => ({
      useDebounce: vi.fn(() => "Gerard Bonilla"), // Debe devolver un string
    }));

    const { result } = renderHook(() =>
      useTerm(SIMPLE_MOCK_BOOK, "Gerard Bonilla", 300)
    );

    expect(result.current.filteredBooks).toEqual(SIMPLE_MOCK_BOOK);
  });

  it("should update filtered books when updateFilteredBooks is called", () => {
    vi.mock("@/ui/hooks/useDebounce", () => ({
      useDebounce: vi.fn(() => ""),
    }));
    const addedBook: TabularBook = {
      title: "Es el pensamiento.",
      author: "Alejandra Linares",
      genre: "Commodi",
      description:
        "Europa, no quiso o\u00edr m\u00e1s; y aunque no tan graves como las que pudieran ocasionarme un bofet\u00f3n de mi amita. D. Alonso apret\u00f3 los pu\u00f1os al o\u00edr aquel triste recuerdo, y no necesit\u00e9 pronunciar una.",
      isbn: "9798627524764",

      published: "2022-02-22",
      publisher: "Dolores Inventore",
    };

    const { result } = renderHook(() => useTerm(SIMPLE_MOCK_BOOK, "", 300));

    act(() => {
      result.current.updateFilteredBooks([addedBook]);
    });

    expect(result.current.filteredBooks).toEqual([addedBook]);
  });
});
