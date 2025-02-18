import { useDebounce } from "@/ui/hooks/useDebounce";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useDebounce", () => {
  vi.useFakeTimers();

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));

    expect(result.current).toBe("test");
  });

  it("should return the debounced value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      {
        initialProps: { value: "initial" },
      }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });

    expect(result.current).toBe("initial");

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });
});
