import { Book } from "@/domain/book";
import BookPage from "@/ui/pages/bookPage";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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

describe("BookPage", () => {
  it("should render the title correctly", () => {
    render(<BookPage />);

    const titleElement = screen.getByRole("heading", {
      level: 1,
      name: "Books Table",
    });
    expect(titleElement).toBeInTheDocument();
  });

  it("should render the CustomTable component", () => {
    render(<BookPage />);

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("filters books based on search input", async () => {
    render(<BookPage />);

    const searchInput = screen.getByPlaceholderText("Search by author");
    fireEvent.change(searchInput, { target: { value: "Beatriz" } });

    await waitFor(() => {
      const author = screen.getByText(/Beatriz Suarez/i);
      expect(author).toBeInTheDocument();
    });
  });

  it("toggles table row colors", async () => {
    render(<BookPage />);

    const colorButton = screen.getByText("Add Color on Table");
    fireEvent.click(colorButton);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveClass("bg-gray-400");
    });
  });

  it("deletes a book and restores the list", async () => {
    render(<BookPage />);

    const deletesButton = screen.getAllByRole("button", { name: /Delete/i });
    const firstDeleteButton = deletesButton[1];
    fireEvent.click(firstDeleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Gerard Bonilla/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Restore All"));

    await waitFor(() => {
      expect(screen.getByText(/Gerard Bonilla/i)).toBeInTheDocument();
    });
  });
});
