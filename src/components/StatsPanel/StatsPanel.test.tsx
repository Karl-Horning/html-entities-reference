import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsPanel } from "./StatsPanel";
import type { Entity } from "../../types/entity";

const make = (overrides: Partial<Entity> = {}): Entity => ({
  byte: 65,
  dec: [65],
  hex: ["U+0041"],
  char: "A",
  htmlNumberDecimal: "&#65;",
  htmlNumberHex: "&#x41;",
  htmlName: "&Atest;",
  description: "TEST CHARACTER",
  ...overrides,
});

const entities: Entity[] = [
  make({ htmlName: "&uarr;", description: "UPWARDS ARROW", byte: null }),
  make({
    htmlName: "&sum;",
    description: "MATHEMATICAL SUMMATION",
    dec: [8721, 8722],
    byte: null,
  }),
  make({ htmlName: "&Aacute;", description: "LATIN CAPITAL LETTER A WITH ACUTE", byte: 193 }),
  make({ htmlName: "&alpha;", description: "GREEK SMALL LETTER ALPHA", byte: null }),
  make({ htmlName: "&amp;", description: "AMPERSAND", byte: 38 }),
];

describe("StatsPanel", () => {
  it("renders the Properties section label", () => {
    render(<StatsPanel entities={entities} />);
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  it("shows the correct multi-codepoint count", () => {
    render(<StatsPanel entities={entities} />);
    // Only the mathematical summation entity has dec.length > 1.
    const multiRow = screen.getByText("Multi-codepoint").closest("div");
    expect(multiRow).toHaveTextContent("1");
  });

  it("shows the correct single-byte count", () => {
    render(<StatsPanel entities={entities} />);
    // Latin (193) and AMPERSAND (38) have byte !== null.
    const singleByteRow = screen.getByText("Single-byte").closest("div");
    expect(singleByteRow).toHaveTextContent("2");
  });

  it("renders the Groups section label", () => {
    render(<StatsPanel entities={entities} />);
    expect(screen.getByText("Groups")).toBeInTheDocument();
  });

  it("shows the correct Arrows count", () => {
    render(<StatsPanel entities={entities} />);
    const arrowsRow = screen.getByText("Arrows").closest("div");
    expect(arrowsRow).toHaveTextContent("1");
  });

  it("shows the correct Mathematical count", () => {
    render(<StatsPanel entities={entities} />);
    const mathRow = screen.getByText("Mathematical").closest("div");
    expect(mathRow).toHaveTextContent("1");
  });

  it("shows the correct Latin count", () => {
    render(<StatsPanel entities={entities} />);
    const latinRow = screen.getByText("Latin").closest("div");
    expect(latinRow).toHaveTextContent("1");
  });

  it("shows the correct Greek count", () => {
    render(<StatsPanel entities={entities} />);
    const greekRow = screen.getByText("Greek").closest("div");
    expect(greekRow).toHaveTextContent("1");
  });
});
