/**
 * @fileoverview Site-wide configuration used across metadata and the PWA manifest.
 */

/** Base path for the deployment, used as Vite's `base` and the PWA scope/start_url. */
export const SITE_BASE = "/html-entities-reference/";

/** Canonical base URL for the deployed site, including the trailing slash. */
export const SITE_URL = `https://www.karlhorning.dev${SITE_BASE}`;

/** Page title. */
export const SITE_TITLE = "HTML Entities Reference";

/** Short name used in the PWA manifest and home screen label (max ~12 chars). */
export const SITE_SHORT_NAME = "HTML Entities";

/** Page description used in meta tags and the PWA manifest. */
export const SITE_DESCRIPTION =
  "A searchable reference for HTML named character references. Filter by name, decimal code, hex code, or Unicode description, then click to copy.";

/** Author display name used in metadata. */
export const AUTHOR_NAME = "Karl Horning";

/** Canonical author URL. */
export const AUTHOR_URL = "https://www.karlhorning.dev";

/** Source code repository URL. */
export const REPO_URL =
  "https://github.com/Karl-Horning/html-entities-reference";

/** Year the project was first published, used for the copyright range. */
export const SITE_START_YEAR = 2025;

/** Brand colour used in the PWA manifest and theme-color meta tag. */
export const THEME_COLOR = "#0d0d0d";
