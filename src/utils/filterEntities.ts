import type { Entity } from "../types/entity";

/**
 * Filters the entity list against a query string.
 *
 * Matches case-insensitively against the HTML name, numeric codes, rendered
 * character, and Unicode description. Returns all entities when the query is
 * empty or whitespace-only.
 *
 * @param entities The full entity list to filter.
 * @param query The search query string.
 * @returns The subset of entities that match the query.
 */
export function filterEntities(entities: Entity[], query: string): Entity[] {
  const q = query.trim().toLowerCase();
  if (!q) return entities;

  return entities.filter(
    (entity) =>
      entity.htmlName.toLowerCase().includes(q) ||
      entity.htmlNumberDecimal.toLowerCase().includes(q) ||
      entity.htmlNumberHex.toLowerCase().includes(q) ||
      entity.char.toLowerCase().includes(q) ||
      entity.description.toLowerCase().includes(q)
  );
}
