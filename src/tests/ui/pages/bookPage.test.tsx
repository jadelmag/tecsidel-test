import BookPage from "@/ui/pages/bookPage";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
});
