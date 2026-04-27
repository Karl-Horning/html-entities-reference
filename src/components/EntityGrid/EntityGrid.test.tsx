import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EntityGrid } from "./EntityGrid";
import type { Entity } from "../../types/entity";

// Render a minimal stub so EntityGrid tests are not coupled to EntityCard internals.
vi.mock("../EntityCard/EntityCard", () => ({
  EntityCard: ({ entity }: { entity: Entity }) => (
    <li data-testid="entity-card">{entity.htmlName}</li>
  ),
}));

const makeEntities = (count: number): Entity[] =>
  Array.from({ length: count }, (_, i) => ({
    byte: i + 1,
    dec: [i + 1],
    hex: [`U+${(i + 1).toString(16).toUpperCase().padStart(4, "0")}`],
    char: String.fromCharCode(i + 65),
    htmlNumberDecimal: `&#${i + 1};`,
    htmlNumberHex: `&#x${(i + 1).toString(16).toUpperCase()};`,
    htmlName: `&entity${i};`,
    description: `ENTITY ${i}`,
  }));

describe("EntityGrid", () => {
  it("renders one card per entity", () => {
    render(<EntityGrid entities={makeEntities(3)} query="" />);
    expect(screen.getAllByTestId("entity-card")).toHaveLength(3);
  });

  it("caps display at 200 when no query is active", () => {
    render(<EntityGrid entities={makeEntities(300)} query="" />);
    expect(screen.getAllByTestId("entity-card")).toHaveLength(200);
  });

  it("shows a status message explaining the cap", () => {
    render(<EntityGrid entities={makeEntities(300)} query="" />);
    expect(screen.getByRole("status")).toHaveTextContent(
      /showing 200 of 300/i
    );
  });

  it("shows all entities when a query is active, regardless of count", () => {
    render(<EntityGrid entities={makeEntities(300)} query="entity" />);
    expect(screen.getAllByTestId("entity-card")).toHaveLength(300);
  });

  it("does not show the cap message when a query is active", () => {
    render(<EntityGrid entities={makeEntities(300)} query="entity" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("does not show the cap message when the entity count is within the limit", () => {
    render(<EntityGrid entities={makeEntities(200)} query="" />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
