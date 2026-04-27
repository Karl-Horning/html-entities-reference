import { useState, useEffect } from "react";
import type { Entity, EntityData } from "../types/entity";

/** The return value of {@link useEntities}. */
interface UseEntitiesResult {
  /** The full list of entities, empty until loading completes. */
  entities: Entity[];
  /** True while the data fetch is in progress. */
  loading: boolean;
  /** An error message if the fetch failed, otherwise null. */
  error: string | null;
}

/**
 * Fetches the HTML entities dataset from `/data/html_entities.json`.
 *
 * @returns The entity list, a loading flag, and any fetch error.
 */
export function useEntities(): UseEntitiesResult {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/html_entities.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch entities: ${res.status}`);
        return res.json() as Promise<EntityData>;
      })
      .then((data) => {
        setEntities(data.entities);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(
          err instanceof Error ? err.message : "Failed to load entities"
        );
        setLoading(false);
      });
  }, []);

  return { entities, loading, error };
}
