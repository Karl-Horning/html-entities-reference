import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import type { Entity } from "../../types/entity";
import styles from "./EntityCard.module.css";

interface EntityCardProps {
  entity: Entity;
}

/**
 * Displays a single HTML named character reference: its glyph,
 * copyable entity codes, and Unicode description.
 *
 * Each code is an independent button. Clicking copies that value to the
 * clipboard and briefly updates the button's `aria-label` to confirm the
 * action to screen readers.
 */
export function EntityCard({ entity }: EntityCardProps) {
  const { copy, copiedValue } = useCopyToClipboard();

  const codes = [
    { value: entity.htmlName, defaultClass: styles.codeName },
    { value: entity.htmlNumberDecimal, defaultClass: styles.codeNumeric },
    { value: entity.htmlNumberHex, defaultClass: styles.codeNumeric },
  ];

  return (
    <li className={styles.card} aria-label={entity.description}>
      <div className={styles.charArea} aria-hidden="true">
        <span className={styles.char}>{entity.char}</span>
      </div>
      <div className={styles.codes}>
        {codes.map(({ value, defaultClass }) => {
          const isCopied = copiedValue === value;
          return (
            <button
              key={value}
              type="button"
              className={`${styles.codeButton} ${isCopied ? styles.copied : defaultClass}`}
              onClick={() => void copy(value)}
              aria-label={isCopied ? `Copied ${value}` : `Copy ${value} to clipboard`}
            >
              {isCopied ? "Copied" : value}
            </button>
          );
        })}
      </div>
      <p className={styles.description}>{entity.description}</p>
    </li>
  );
}
