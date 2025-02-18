import SortCell from "@/ui/components/sortcell";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("SortCell", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the correct icon based on order", () => {
    const mockOnSort = vi.fn();

    render(
      <SortCell field="author" value="author" order="asc" onSort={mockOnSort} />
    );

    const iconAsc = screen.getByText(/▲/i);
    expect(iconAsc).toBeInTheDocument();

    render(
      <SortCell
        field="author"
        value="author"
        order="desc"
        onSort={mockOnSort}
      />
    );

    const iconDesc = screen.getByText(/▼/i);
    expect(iconDesc).toBeInTheDocument();
  });

  it("should call onSort with correct parameter when clicked", () => {
    const mockOnSort = vi.fn();
    render(
      <SortCell field="author" value="author" order="asc" onSort={mockOnSort} />
    );

    const cell = screen.getByText(/Author/i);
    fireEvent.click(cell);

    expect(mockOnSort).toHaveBeenCalledWith("author");
  });

  it("should render with correct classes and text", () => {
    const mockOnSort = vi.fn();
    render(
      <SortCell field="author" value="author" order="asc" onSort={mockOnSort} />
    );

    const cell = screen.getByText(/Author/i);
    expect(cell).toHaveClass("border p-2 cursor-pointer");
  });

  it("should render no icon when field does not match value", () => {
    const mockOnSort = vi.fn();

    render(
      <SortCell field="author" value="title" order="asc" onSort={mockOnSort} />
    );

    const icon = screen.queryByText("▲");
    expect(icon).not.toBeInTheDocument();
  });
});
