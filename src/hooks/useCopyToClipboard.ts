import { useState, useCallback, useEffect, useRef } from "react";

/** The return value of {@link useCopyToClipboard}. */
interface UseCopyToClipboardResult {
  /** The value most recently written to the clipboard, or null when idle. */
  copiedValue: string | null;
  /** Writes a string to the clipboard and holds {@link copiedValue} for {@link resetDelay} milliseconds. */
  copy: (value: string) => Promise<void>;
}

/**
 * Provides a clipboard write function with temporary confirmation state.
 *
 * Fails silently when the Clipboard API is unavailable or permission is denied.
 *
 * @param resetDelay Milliseconds before `copiedValue` resets to null. Defaults to 1500.
 * @returns A copy function and the most recently copied value.
 */
export function useCopyToClipboard(resetDelay = 1500): UseCopyToClipboardResult {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copy = useCallback(
    async (value: string) => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
      try {
        await navigator.clipboard.writeText(value);
        setCopiedValue(value);
        timeoutRef.current = setTimeout(() => setCopiedValue(null), resetDelay);
      } catch {
        // Clipboard API unavailable or permission denied.
      }
    },
    [resetDelay]
  );

  return { copiedValue, copy };
}
