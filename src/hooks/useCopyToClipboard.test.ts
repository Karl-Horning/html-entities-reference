import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCopyToClipboard } from "./useCopyToClipboard";

const writeText = vi.fn().mockResolvedValue(undefined);

// Mock the Clipboard API since jsdom does not implement it.
Object.defineProperty(navigator, "clipboard", {
  value: { writeText },
  writable: true,
  configurable: true,
});

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    writeText.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("writes the value to the clipboard", async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    await act(() => result.current.copy("&amp;"));
    expect(writeText).toHaveBeenCalledWith("&amp;");
  });

  it("sets copiedValue after a successful copy", async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    await act(() => result.current.copy("&amp;"));
    expect(result.current.copiedValue).toBe("&amp;");
  });

  it("resets copiedValue to null after the delay", async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));
    await act(() => result.current.copy("&amp;"));
    expect(result.current.copiedValue).toBe("&amp;");
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.copiedValue).toBeNull();
  });

  it("resets the timer when a second copy happens before the delay elapses", async () => {
    const { result } = renderHook(() => useCopyToClipboard(1000));
    await act(() => result.current.copy("&amp;"));
    await act(() => result.current.copy("&#38;"));
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.copiedValue).toBe("&#38;");
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.copiedValue).toBeNull();
  });

  it("fails silently when the clipboard API throws", async () => {
    writeText.mockRejectedValueOnce(new Error("Permission denied"));
    const { result } = renderHook(() => useCopyToClipboard());
    await act(() => result.current.copy("&amp;"));
    expect(result.current.copiedValue).toBeNull();
  });
});
