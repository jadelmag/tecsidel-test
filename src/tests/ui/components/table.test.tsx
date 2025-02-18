import { Book } from "@/domain/book";
import CustomTable from "@/ui/components/table";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mockBooks: Book[] = [
  {
    id: 1,
    title: "El escandalo fue.",
    author: "Gerard Bonilla",
    genre: "Autem",
    description:
      "Pero no quiero ir al Cielo, y que todos los sitios donde coleg\u00eda que pod\u00edan existir provisiones de boca. Apretado por la tripulaci\u00f3n n\u00e1ufraga. Nuestra ansiedad crec\u00eda por momentos; y respecto a las.",
    isbn: "9798081113658",
    image: "http://placeimg.com/480/640/any",
    published: "2016-07-12",
    publisher: "Esse Velit",
  },
  {
    id: 2,
    title: "Acostumbrandome a.",
    author: "Beatriz Suarez",
    genre: "Voluptas",
    description:
      "Dios que nos vamos a pique!... \u00a1a las lanchas, con mucho af\u00e1n. - Usted, Sr. Gabrielito, no entiende de esto. - Lo indudable- prosigui\u00f3 Malespina- . En fin, tales eran los pobres heridos que quedaban.",
    isbn: "9788353924648",
    image: "http://placeimg.com/480/640/any",
    published: "2000-09-04",
    publisher: "Eveniet Reiciendis",
  },
];

vi.mock("@/ui/hooks/useBooks", () => ({
  useBooks: () => ({ books: mockBooks }),
}));

describe("CustomTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the table with initial books", () => {
    render(<CustomTable />);

    const authorA = screen.getByText(/Gerard Bonilla/i);
    const authorB = screen.getByText(/Beatriz Suarez/i);

    expect(authorA).toBeInTheDocument();
    expect(authorB).toBeInTheDocument();
  });

  it("filters books based on search input", async () => {
    render(<CustomTable />);

    const searchInput = screen.getByPlaceholderText("Search by author");
    fireEvent.change(searchInput, { target: { value: "Beatriz" } });

    await waitFor(() => {
      const author = screen.getByText(/Beatriz Suarez/i);
      expect(author).toBeInTheDocument();
    });
  });

  it("sorts books by author", async () => {
    render(<CustomTable />);

    const authorHeader = screen.getByText(/Author/i);
    fireEvent.click(authorHeader);

    await waitFor(() => {
      const firstAuthor = screen.getByAltText(/Beatriz Suarez/i);
      const secondAuthor = screen.getByAltText(/Gerard Bonilla/i);

      expect(firstAuthor).toBeInTheDocument();
      expect(secondAuthor).toBeInTheDocument();
    });
  });

  it("deletes a book and restores the list", async () => {
    render(<CustomTable />);

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Gerard Bonilla/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Restore All"));

    await waitFor(() => {
      expect(screen.getByText(/Gerard Bonilla/i)).toBeInTheDocument();
    });
  });

  it("toggles table row colors", async () => {
    render(<CustomTable />);

    const colorButton = screen.getByText("Add Color on Table");
    fireEvent.click(colorButton);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveClass("bg-gray-400");
    });
  });
});
