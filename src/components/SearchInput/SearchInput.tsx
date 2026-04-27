import { useRef, useEffect } from "react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  /** The current query string. */
  value: string;
  /** Called with the updated query string on each input change. */
  onChange: (value: string) => void;
  /** The number of entities matching the current query. */
  resultCount: number;
  /** The total number of entities in the dataset. */
  totalCount: number;
}

/**
 * A labeled search input for filtering the entity grid.
 *
 * Supports ⌘K / Ctrl+K to focus the input from anywhere on the page.
 * Uses a `role="search"` landmark and an `aria-live` region so screen
 * readers announce the result count as the query changes.
 */
export function SearchInput({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isFiltered = value.trim().length > 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
  const statusText = isFiltered
    ? `${resultCount.toLocaleString()} of ${totalCount.toLocaleString()} ${resultCount === 1 ? "result" : "results"}`
    : "";

  return (
    <div className={styles.wrapper}>
      <div role="search">
        <label className={styles.label} htmlFor="entity-search">
          Filter entities
        </label>
        <div className={styles.inputWrapper}>
          <svg
            className={styles.icon}
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
          >
            <circle
              cx="8.5"
              cy="8.5"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M14 14l3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            id="entity-search"
            type="search"
            className={styles.input}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search by name, code, or description…"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.shortcut} aria-hidden="true">⌘K</kbd>
        </div>
      </div>
      <p
        className={styles.status}
        aria-live="polite"
        aria-atomic="true"
      >
        {statusText}
      </p>
    </div>
  );
}
