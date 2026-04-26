import type { Entity } from "../../types/entity";
import { EntityCard } from "../EntityCard/EntityCard";
import styles from "./EntityGrid.module.css";

const DEFAULT_LIMIT = 200;

interface EntityGridProps {
  entities: Entity[];
  /** The active search query. When empty, results are capped at {@link DEFAULT_LIMIT}. */
  query: string;
}

/**
 * Renders a responsive grid of {@link EntityCard} components.
 *
 * Shows the first {@link DEFAULT_LIMIT} entities when no query is active to avoid
 * rendering all 2,125 at once. Shows all matches when a query is set.
 */
export function EntityGrid({ entities, query }: EntityGridProps) {
  const isFiltered = query.trim().length > 0;
  const visible = isFiltered ? entities : entities.slice(0, DEFAULT_LIMIT);
  const isCapped = !isFiltered && entities.length > DEFAULT_LIMIT;

  return (
    <section aria-label="HTML entities">
      {isCapped && (
        <p className={styles.cap} role="status">
          Showing {DEFAULT_LIMIT} of {entities.length.toLocaleString()}{" "}
          entities. Filter to see more.
        </p>
      )}
      <ul className={styles.grid} role="list">
        {visible.map((entity) => (
          <EntityCard key={entity.htmlName} entity={entity} />
        ))}
      </ul>
    </section>
  );
}
