import CustomInput from "@/ui/components/input";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("CustomInput", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render with the correct placeholder and value", () => {
    const searchTerm = "John Doe";
    const mockOnChange = vi.fn();

    render(<CustomInput searchTerm={searchTerm} onChangeTerm={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Search by author");

    expect(inputElement).toHaveValue(searchTerm);
    expect(inputElement).toHaveAttribute("placeholder", "Search by author");
    expect(inputElement).toHaveClass("border p-2 w-full");
  });

  it("should call onChangeTerm when the value changes", async () => {
    const searchTerm = "John Doe";
    const mockOnChange = vi.fn();
    render(<CustomInput searchTerm={searchTerm} onChangeTerm={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Search by author");

    await fireEvent.change(inputElement, { target: { value: "Jane Doe" } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it("should render an empty input when searchTerm is an empty string", () => {
    const mockOnChange = vi.fn();
    render(<CustomInput searchTerm="" onChangeTerm={mockOnChange} />);

    const inputElement = screen.getByPlaceholderText("Search by author");
    expect(inputElement).toHaveValue("");
  });
});
