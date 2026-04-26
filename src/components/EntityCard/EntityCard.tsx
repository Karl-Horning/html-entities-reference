import type { Entity } from "../../types/entity";
import styles from "./EntityCard.module.css";

interface EntityCardProps {
  entity: Entity;
}

/**
 * Displays a single HTML named character reference: its glyph,
 * entity codes, and Unicode description.
 *
 * All visual content is wrapped in `aria-hidden` because the `<li>`'s
 * `aria-label` already provides a complete description for screen readers.
 * When interactive copy buttons are added, they must sit outside
 * that wrapper so they remain in the accessibility tree.
 */
export function EntityCard({ entity }: EntityCardProps) {
  const ariaLabel = `${entity.description}. Named: ${entity.htmlName}. Decimal: ${entity.htmlNumberDecimal}. Hex: ${entity.htmlNumberHex}.`;

  return (
    <li className={styles.card} aria-label={ariaLabel}>
      <div aria-hidden="true">
        <div className={styles.charArea}>
          <span className={styles.char}>{entity.char}</span>
        </div>
        <div className={styles.codes}>
          <span className={styles.codeName}>{entity.htmlName}</span>
          <span className={styles.codeNumeric}>{entity.htmlNumberDecimal}</span>
          <span className={styles.codeNumeric}>{entity.htmlNumberHex}</span>
        </div>
        <p className={styles.description}>{entity.description}</p>
      </div>
    </li>
  );
}
