import { formatDate } from "@/ui/utils/date.functions";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("formatDate", () => {
  it('should return "---" for an invalid date string', () => {
    expect(formatDate("invalid-date")).toBe("---");
    expect(formatDate("")).toBe("---");
  });

  it("should return the correct formatted date for a valid string", () => {
    const validDate = "2025-02-19T00:00:00Z";
    expect(formatDate(validDate)).toBe("19-02-2025");
  });

  it("should handle single digit days and months correctly", () => {
    const dateSingleDigit = "2025-03-05T00:00:00Z";
    expect(formatDate(dateSingleDigit)).toBe("05-03-2025");
  });

  it("should handle dates without time correctly", () => {
    const dateNoTime = "2025-02-19";
    expect(formatDate(dateNoTime)).toBe("19-02-2025");
  });
});
