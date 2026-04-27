import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useEntities } from "./useEntities";
import type { Entity } from "../types/entity";

const entity: Entity = {
  byte: 38,
  dec: [38],
  hex: ["U+0026"],
  char: "&",
  htmlNumberDecimal: "&#38;",
  htmlNumberHex: "&#x26;",
  htmlName: "&amp;",
  description: "AMPERSAND",
};

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useEntities", () => {
  it("starts with loading=true and an empty entity list", () => {
    // Never resolves, so the hook stays in its initial loading state.
    mockFetch.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useEntities());
    expect(result.current.loading).toBe(true);
    expect(result.current.entities).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it("populates entities and clears loading on a successful fetch", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ entities: [entity] }),
    });
    const { result } = renderHook(() => useEntities());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.entities).toEqual([entity]);
    expect(result.current.error).toBeNull();
  });

  it("sets an error message and clears loading when the response is not ok", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 404 });
    const { result } = renderHook(() => useEntities());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toMatch(/404/);
    expect(result.current.entities).toEqual([]);
  });

  it("sets an error message and clears loading on a network failure", async () => {
    mockFetch.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useEntities());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Network error");
    expect(result.current.entities).toEqual([]);
  });

  it("falls back to a generic message when the thrown error is not an Error instance", async () => {
    mockFetch.mockRejectedValue("string error");
    const { result } = renderHook(() => useEntities());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe("Failed to load entities");
  });
});
