import { describe, it, expect } from "vitest";
import { filterEntities } from "./filterEntities";
import type { Entity } from "../types/entity";

const make = (overrides: Partial<Entity> = {}): Entity => ({
  byte: 193,
  dec: [193],
  hex: ["U+00C1"],
  char: "Á",
  htmlNumberDecimal: "&#193;",
  htmlNumberHex: "&#xC1;",
  htmlName: "&Aacute;",
  description: "LATIN CAPITAL LETTER A WITH ACUTE",
  ...overrides,
});

const entities: Entity[] = [
  make(),
  make({
    byte: 38,
    dec: [38],
    hex: ["U+0026"],
    char: "&",
    htmlNumberDecimal: "&#38;",
    htmlNumberHex: "&#x26;",
    htmlName: "&amp;",
    description: "AMPERSAND",
  }),
  make({
    byte: null,
    dec: [8704],
    hex: ["U+2200"],
    char: "∀",
    htmlNumberDecimal: "&#8704;",
    htmlNumberHex: "&#x2200;",
    htmlName: "&forall;",
    description: "FOR ALL",
  }),
];

describe("filterEntities", () => {
  it("returns all entities when the query is empty", () => {
    expect(filterEntities(entities, "")).toHaveLength(3);
  });

  it("returns all entities when the query is whitespace only", () => {
    expect(filterEntities(entities, "   ")).toHaveLength(3);
  });

  it("matches by htmlName case-insensitively", () => {
    expect(filterEntities(entities, "aacute")).toHaveLength(1);
    expect(filterEntities(entities, "&Aacute;")).toHaveLength(1);
  });

  it("matches by description case-insensitively", () => {
    expect(filterEntities(entities, "ampersand")).toHaveLength(1);
    expect(filterEntities(entities, "AMPERSAND")).toHaveLength(1);
  });

  it("matches by htmlNumberDecimal", () => {
    expect(filterEntities(entities, "&#38;")).toHaveLength(1);
  });

  it("matches by htmlNumberHex", () => {
    expect(filterEntities(entities, "&#x26;")).toHaveLength(1);
  });

  it("matches by char", () => {
    // ∀ (FOR ALL) does not appear in any htmlName or numeric code, only in char.
    expect(filterEntities(entities, "∀")).toHaveLength(1);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterEntities(entities, "zzzzz")).toHaveLength(0);
  });

  it("matches multiple entities when the term is shared across them", () => {
    // &#  appears in every htmlNumberDecimal and htmlNumberHex.
    expect(filterEntities(entities, "&#")).toHaveLength(3);
  });
});
