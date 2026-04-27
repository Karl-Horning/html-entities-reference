import { useMemo } from "react";
import type { Entity } from "../../types/entity";
import { filterEntities } from "../../utils/filterEntities";
import styles from "./StatsPanel.module.css";

interface StatsPanelProps {
  /** The full, unfiltered entity list used to compute dataset statistics. */
  entities: Entity[];
}

/**
 * Displays fixed statistics about the HTML entities dataset.
 *
 * Intended as a supplementary panel; hidden on mobile and tablet via CSS.
 * Statistics are derived from the entity list and recomputed only when it changes.
 */
export function StatsPanel({ entities }: StatsPanelProps) {
  const properties = useMemo(
    () => [
      {
        label: "Multi-codepoint",
        value: entities.filter((e) => e.dec.length > 1).length,
      },
      {
        label: "Single-byte",
        value: entities.filter((e) => e.byte !== null).length,
      },
    ],
    [entities]
  );

  const groups = useMemo(
    () => [
      { label: "Arrows", value: filterEntities(entities, "arrow").length },
      {
        label: "Mathematical",
        value: filterEntities(entities, "mathematical").length,
      },
      { label: "Latin", value: filterEntities(entities, "latin").length },
      { label: "Greek", value: filterEntities(entities, "greek").length },
    ],
    [entities]
  );

  return (
    <div className={styles.panel}>
      <p className={styles.sectionLabel}>Properties</p>
      <dl className={styles.list}>
        {properties.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt className={styles.term}>{label}</dt>
            <dd className={styles.value}>{value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
      <div className={styles.divider} aria-hidden="true" />
      <p className={styles.sectionLabel}>Groups</p>
      <dl className={styles.list}>
        {groups.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt className={styles.term}>{label}</dt>
            <dd className={styles.value}>{value.toLocaleString()}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
