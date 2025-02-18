import CustomImage from "@/ui/components/image";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("CustomImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the image with correct alt text and src", () => {
    const author = "John Doe";
    render(<CustomImage author={author} />);

    const imageElement = screen.getByAltText(author);

    expect(imageElement).toHaveAttribute(
      "src",
      `https://robohash.org/${encodeURIComponent(author)}`
    );
    expect(imageElement).toHaveClass("w-10 h-10 rounded-full");
  });

  it("should render with a different author", () => {
    const author = "Jane Smith";
    render(<CustomImage author={author} />);

    const imageElement = screen.getByAltText(author);
    expect(imageElement).toHaveAttribute(
      "src",
      `https://robohash.org/${encodeURIComponent(author)}`
    );
  });
});
