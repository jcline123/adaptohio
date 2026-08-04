# adaptohio

Adapt Ohio (`www.adaptohio.com`) is a static, multi-page informational website for
families of children with limb differences. It is plain HTML/CSS/JS with **no build
step, no package manager, and no test/lint tooling**, and is deployed via GitHub
Pages (see `CNAME`).

## Cursor Cloud specific instructions

### What this codebase is
- Static site only: hand-authored `*.html` pages, one shared stylesheet
  (`interior.css`), one shared script (`site.js`), plus `images/`, `robots.txt`,
  and `sitemap.xml`. There is nothing to compile or install.
- `site.js` runs on every page and progressively enhances it: it hardens
  `target="_blank"` links, builds the footer navigation from the `pages` array,
  injects an "On this page" table of contents on pages with 6+ `<h2>` headings,
  adds a "Back to top" button on long pages, and lazy-plays ambient videos. When
  editing pages, keep the `pages` array in `site.js` in sync with the actual
  `*.html` files.

### Lint / test / build
- None exist. There is no linter, no test suite, and no build command. Do not add
  one unless explicitly asked.

### Run it (development)
- Serve the repo root with any static file server, e.g. `python3 -m http.server 8000`
  (Python 3 is preinstalled), then open `http://localhost:8000/index.html`.
- Do NOT open the pages via `file://` — `site.js` derives the current page from the
  URL path, so relative links and the "current page" highlight only behave
  correctly when served over HTTP.
