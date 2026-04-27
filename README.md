# HTML Entities Reference

A searchable reference for HTML named character references.

**Live site:** [karlhorning.dev/html-entities-reference](https://www.karlhorning.dev/html-entities-reference/)

## Stack

- **React 19**
- **TypeScript 5.9**
- **Vite 7**
- **Tailwind CSS v4**
- **CSS Modules**
- **Vitest** + **React Testing Library** + **jest-axe**
- Deployed to **GitHub Pages** via GitHub Actions

## Notable decisions

**Performance cap** — The full dataset contains 2,125 entities. Rendering all of them at once would mount thousands of DOM nodes, so the grid is capped at 200 when no query is active. All matching results appear as soon as a filter is applied.

**Filtering** — `filterEntities` searches across all five entity fields: HTML name, decimal code, hex code, character, and Unicode description. Typing `&amp;`, `&#38;`, `∀`, or `ampersand` all find the right card.

**Keyboard shortcut** — ⌘K / Ctrl+K focuses the search input from anywhere on the page.

**Browser zoom** — All sizing uses `rem` throughout, so browser zoom (⌘+ / Ctrl++) scales the entire layout proportionally — including the entity glyphs — without any JavaScript or media queries.

**Testing strategy** — Each concern is tested in isolation. Pure utilities use plain unit tests. Hooks use `renderHook` with fake timers where timing matters. Components use `vi.mock` to replace browser APIs that jsdom does not implement (Clipboard API), keeping tests deterministic. Accessibility is automated with jest-axe on every interactive component.

**CSS** — CSS Modules for component styles; design tokens defined as CSS custom properties in `index.css` for consistent theming across the app.

**CI/CD** — GitHub Actions builds and deploys to GitHub Pages on every push to `main`. The build step acts as a gate: a type error or broken import blocks deployment.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Script | Description |
| --- | --- |
| `dev` | Start the Vite development server |
| `build` | Type-check and build for production |
| `lint` | Run ESLint and format with Prettier |
| `lint:check` | Run ESLint and check Prettier formatting without writing |
| `preview` | Preview the production build locally |
| `test` | Run tests in watch mode |
| `test:run` | Run tests once and exit |

## Licence

Released under the [MIT Licence](./LICENSE) by [Karl Horning](https://github.com/Karl-Horning).
