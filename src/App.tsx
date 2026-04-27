import { useState, useMemo } from "react";
import { useEntities } from "./hooks/useEntities";
import { filterEntities } from "./utils/filterEntities";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { StatsPanel } from "./components/StatsPanel/StatsPanel";
import { EntityGrid } from "./components/EntityGrid/EntityGrid";
import styles from "./App.module.css";

/** Root application component. */
function App() {
  const { entities, loading, error } = useEntities();
  const [query, setQuery] = useState("");

  const filteredEntities = useMemo(
    () => filterEntities(entities, query),
    [entities, query]
  );

  return (
    <div className={styles.app}>
      <div className={styles.top}>
        <div className={styles.topMain}>
          <header className={styles.header}>
            <h1 className={styles.title}>HTML Entities</h1>
            <p className={styles.subtitle}>
              {entities.length > 0
                ? `${entities.length.toLocaleString()} named character references`
                : "Named character references"}
            </p>
          </header>
          {!loading && !error && (
            <SearchInput
              value={query}
              onChange={setQuery}
              resultCount={filteredEntities.length}
              totalCount={entities.length}
            />
          )}
        </div>
        <aside className={styles.topAside} aria-label="Dataset statistics">
          {!loading && !error && <StatsPanel entities={entities} />}
        </aside>
      </div>
      <main>
        {loading && (
          <p className={styles.status} aria-live="polite">
            Loading…
          </p>
        )}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        {!loading && !error && (
          <EntityGrid entities={filteredEntities} query={query} />
        )}
      </main>
    </div>
  );
}

export default App;
