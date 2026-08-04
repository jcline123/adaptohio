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
  injects an "On this page" table of contents on pages with 6+ `<h2>` headings
  (or a nested section/group/program TOC when `main` has `data-toc="grouped"`,
  used on `sports.html`),
  adds a "Back to top" button on long pages, and lazy-plays ambient videos. When
  editing pages, keep the `pages` array in `site.js` in sync with the actual
  `*.html` files.

### Sitemap (`sitemap.xml`)
Update `sitemap.xml` in the **same change** whenever page work warrants it. Do this
automatically; do not wait to be asked.

- **Content edits** to an existing page: bump that URL's `<lastmod>` to today's date
  (`YYYY-MM-DDT00:00:00+00:00`).
- **New page**: add a `<url>` entry (homepage stays priority `1.00`; interior pages
  use `0.80`), and add the page to the `pages` array in `site.js` if it belongs in
  site navigation.
- **Rename / remove page**: update or remove the matching sitemap entry (and
  `site.js` / any in-page links).
- Shared chrome-only edits (`site.js`, `interior.css`) do not require bumping every
  URL unless a specific page's content also changed.

### Lint / test / build
- None exist. There is no linter, no test suite, and no build command. Do not add
  one unless explicitly asked.

### Run it (development)
- Serve the repo root with any static file server, e.g. `python3 -m http.server 8000`
  (Python 3 is preinstalled), then open `http://localhost:8000/index.html`.
- Do NOT open the pages via `file://` — `site.js` derives the current page from the
  URL path, so relative links and the "current page" highlight only behave
  correctly when served over HTTP.

### Voice, tone, and content stance (must match on every edit)
Adapt Ohio is a family-kept notebook, not a brand, nonprofit brochure, or medical
authority. Written by Gwen's parents (first person plural: "we" / "our family"),
about their daughter Gwendolyn / Gwen. Any new copy or edits must sound like the
same family writing another page of the same site.

**Who they are talking to:** other parents figuring things out — especially early
on — who want honest, practical experience from someone who has been there. Not
clinicians, journalists, or marketers.

**Core stance (stated on the homepage and echoed everywhere):**
- "We're not experts, and this isn't a step-by-step plan. It's simply one family's
  growing collection."
- Share what *they* tried, liked, struggled with, or are still figuring out.
- Own that some things are useful now and some are saved for later.
- Experience is centered on limb difference (fibular hemimelia / bilateral BK
  amputation), but many resources may help families of kids with other
  disabilities too — say that lightly when relevant, don't stretch it.
- Prefer "might be useful," "worked for us," "we are still looking into it" over
  absolute advice. Never present the family's choices as the right answer for
  every family (see `school.html` on private school: personal reasons, not a
  recommendation to copy).

**Tone:**
- Warm, plainspoken, calm, and practical. Parent-to-parent.
- Honest about hard parts (surgery recovery, wound vac in the crib, skin issues,
  kids asking about Gwen's legs) without being dramatic, clinical, or
  inspirational-poster.
- Quietly hopeful and matter-of-fact about Gwen as a kid who walks, runs, plays,
  and keeps them busy — ability is shown through concrete moments, not slogans.
- Light humor is okay when it is real and understated (e.g. the literal
  "band-aid fix," Price is Right keeping a 9-month-old still). Never forced cute.
- Grateful and specific when thanking people/orgs (Hustle Bike Labs, therapists,
  schools) — name what they did, don't gush generically.
- Inclusive language that treats disability as ordinary life. Prefer "limb
  difference," "prosthetics," "nub," and Gwen's actual activities over euphemism
  or tragedy framing. Avoid "inspiring," "special needs journey" marketing speak,
  "differently abled," and charity-poster phrasing.

**How pages are written:**
- Lead with the family's experience, then add broader Central Ohio / national
  options. On list pages (sports, groups, resources), Gwen-tried items come
  first; later sections are programs and resources collected for other families
  to explore. The page intro can explain that split once. Do **not** repeat
  "we have not tried this yet" (or similar) on every untried card. It gets
  redundant fast as more listings are added. Only call out tried vs. not-tried
  when it really helps, or when Joshua asks for it.
- Concrete details beat abstractions: ages, locations (Hilliard, Dublin,
  Columbus), product names (Scout foot, Formula foot, Aquaphor), what changed
  and why, what still didn't work.
- Short paragraphs. Plain vocabulary. Conversational contractions ("we've,"
  "didn't," "it's").
- Soft recommendations: "we highly recommend," "worth knowing it exists,"
  "something to consider if…" — never hard sells or affiliate energy.
- Leave room for other families' paths. Flag when something is still in progress
  ("we are still learning how the scholarship works," "Gwen has not started
  kindergarten yet").
- Photos/videos are real family moments with plain captions, not stock or
  marketing imagery. Captions stay short and observational.

**Copy mechanics (site pages):**
- Do not use em dashes (—) or en dashes (–) in page copy. Use commas, periods,
  parentheses, or a plain hyphen in compound words when needed.
- Write like a parent talking to another parent. Avoid AI-sounding cadence:
  stacked adjectives, brochure phrasing, "inclusive supportive empowering"
  piles, and overly tidy parallel lists of benefits.
- Keep program blurbs short and specific. Say what it is, who it is for, and
  where to learn more. Match the length and plainness of neighboring cards.

**What to avoid when editing or adding content:**
- Expert/authority voice, medical advice, or "you should" prescriptions.
- Corporate, SEO-stuffed, or brochure copy. Don't turn resource blurbs into
  generic org boilerplate — keep the family's angle ("why this mattered to us").
- Over-polished or hyperbolic praise. Understate rather than oversell.
- Speaking for Gwen's feelings unless the page already does so from observation
  ("Gwen loves…", "she's having a lot of fun"). Don't invent interior monologue.
- Expanding scope into topics the family hasn't lived or researched without a
  clear source. For explore-list cards, plain factual blurbs are enough; do not
  pad them with "we haven't tried this yet" disclaimers by default.

### Media assets (images & videos)
When asked to add photos or videos, process the files before committing — do not
drop originals in as-is.

**Always:**
- Optimize for the web (reasonable resolution/bitrate; prefer modern formats
  when they fit existing pages, e.g. `.webp` where playgrounds already use it,
  otherwise match neighboring assets on that page).
- Strip all metadata/EXIF/GPS/camera info from every new image and video before
  it lands in `images/` (privacy + smaller files). Re-strip if re-exporting.
- Store media under `images/` and reference with relative paths.
- Match the markup patterns already used on that page (and prefer patterns
  shared via `interior.css` / existing pages) so new blocks look consistent.

**Images — match existing markup:**
- Wrap single photos in `<div class="image-wrapper">` with
  `<img … loading="lazy" decoding="async">` plus width/height and a short
  descriptive `alt`, then `<p class="caption">…</p>`.
- Captions stay short and observational (same voice as the rest of the site).
- Multi-photo layouts (e.g. Disney collage, Budsies, Set 6) should reuse that
  page's existing collage structure rather than inventing a new one.

**Hosted ambient videos (family clips in `images/`):**
- Autoplay ambient loops — **no sound, no controls**. Current pattern:
  `<video autoplay muted loop playsinline preload="metadata" width="…" height="…" aria-describedby="…-caption">`
  with a `<source src="images/….mp4" type="video/mp4">` and a matching
  `.caption` / `aria-describedby` id.
- Do **not** add `controls`, audio tracks meant to be heard, or click-to-play UI
  for these clips. `site.js` already finds `video[autoplay][muted][loop]`,
  forces `muted`, and pauses when off-screen / reduced-motion.
- Wrap like neighboring videos on the page (`embedded-video-wrapper` /
  `embedded-video-frame` on prosthetics, `media-collage` figures on sports, etc.).

**Exception:** YouTube embeds on `representation.html` are intentional third-party
embeds with normal iframe player controls — do not convert those into ambient
`<video>` tags unless asked.

## Keeping this file current

`AGENTS.md` is the project memory for agents and humans. **Update it in the same
change** whenever we establish a lasting convention, decision, voice note, media
pattern, deployment detail, or “do / don’t” that future edits should follow.
Prefer short, concrete bullets over narrative. If a working-log entry becomes a
stable rule, promote it into the sections above and trim the log.

### Working log

- **2026-08-04** — Local workspace set up at iCloud `AdaptOhioProject`, cloned from
  `jcline123/adaptohio` (`main`). Brought `AGENTS.md` in from cloud branch
  `cursor/setup-dev-environment-f0a4` (draft PR #3). Going forward, keep this file
  updated as we work.
- **2026-08-04** — Sports page uses `data-toc="grouped"` for a nested On this page
  dropdown (h2 sections → h3 groups → h4 programs). Default TOC on other pages
  stays flat h2-only at the 6+ heading threshold.
- **2026-08-04** — Moved Adaptive Ascents out of Community Recreation Programs into
  its own Adaptive Climbing group. It was only under city rec because of the Aug 3
  regrouping; it is Vertical Adventures' private gym program (Columbus / Worthington
  area), not a municipal parks offering.
- **2026-08-04** — Moved Dublin Dance Centre into a new Adaptive Dance group with
  Columbus Children's Theatre Seated Dance (link to CCT classes page, not a specific
  ticket URL). Community Recreation now holds only city parks/rec programs.
- **2026-08-04** — Copy rules: no em/en dashes in page copy; keep blurbs plain and
  non-AI-sounding; do not stamp "we have not tried this yet" on every explore-list
  card (page structure already separates Gwen-tried from later listings).
- **2026-08-04** — Always update `sitemap.xml` with page changes (bump `<lastmod>`,
  add/remove URLs as needed). Do not wait to be asked.
