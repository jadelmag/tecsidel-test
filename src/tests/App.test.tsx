import App from "@/App";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/ui/pages/bookPage", () => ({
  default: () => <div>Mocked Page</div>,
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render bookPage component", () => {
    render(<App />);

    const pageElement = screen.getByText(/Mocked Page/i);
    expect(pageElement).toBeInTheDocument();
  });
});
