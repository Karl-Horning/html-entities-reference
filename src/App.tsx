import { useEntities } from "./hooks/useEntities";
import { EntityGrid } from "./components/EntityGrid/EntityGrid";
import styles from "./App.module.css";

/** Root application component. */
function App() {
  const { entities, loading, error } = useEntities();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>HTML Entities</h1>
        <p className={styles.subtitle}>
          {entities.length > 0
            ? `${entities.length.toLocaleString()} named character references`
            : "Named character references"}
        </p>
      </header>
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
        {!loading && !error && <EntityGrid entities={entities} query="" />}
      </main>
    </div>
  );
}

export default App;
