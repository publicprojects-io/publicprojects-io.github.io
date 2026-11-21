# Public Projects website: specification

This is the source of truth for the Public Projects website. Where the code and this
specification disagree, the specification wins: fix the code, or change the
specification on purpose and bring the code into line in the same commit.

Related specifications:

- [`lily-design-system-svelte-with-picker-bar/index.md`](lily-design-system-svelte-with-picker-bar/index.md): Lily Design System packages and PickerBar rules.

## 1. Goal

A user-friendly website for Joel Parker Henderson's public open-source projects:
open source for the public good.

### Subgoals

1. **Reach more people with the software.** Make every project easy to find (search
   engines, AI agents, site search), easy to understand in one sentence, and easy to
   share.
2. **Support evidence of global recognition and impact**, such as for a UK Global
   Talent Visa (Digital Technology) application. The site gives assessors and
   recommenders one public, checkable place for dated statistics, translations,
   citations, and leadership. The site itself never mentions the visa, and holds no
   private information (salary, recommender names, contact details).
3. **Help digital health groups** (health services, health-tech teams, public health
   organisations) discover projects relevant to their work, use them safely, and get
   involved. The site does not name the author's employer or any specific health
   organisation.

### Emphasis

- **The global importance of public open-source projects**: solve once and share
  everywhere, public money and public code, reach in many languages, safer software.
- **Public value, and health care and medical value**: what each project does for
  patients, carers, citizens, and public services.
- **Software engineering global leadership**: widely adopted practices (such as
  Architecture Decision Record), measured adoption, and external citation.

## 2. Audiences

| Audience | Needs | Primary pages |
| --- | --- | --- |
| Developers and health-tech teams worldwide | Find a library or guide, judge its quality, start using it | Projects, Health care, Engineering, Search |
| Public-sector leaders | Understand public value; find guides and metrics | Public value, Home |
| Digital health groups | See what fits their work; know it is safe and independent | Digital health teams |
| Assessors, recommenders, journalists | Verify impact and recognition quickly | Impact, About |

## 3. Implementation

- **SvelteKit 3** with Svelte 5 runes, TypeScript, and Vite 8. Configuration lives in
  `vite.config.ts` (SvelteKit 3 has no `svelte.config.js`). Imports use `#lib/…` with
  file extensions, per SvelteKit 3.
- **Static site**: `@sveltejs/adapter-static`, every route prerendered,
  `trailingSlash: 'always'`, `404.html` fallback. No server and no runtime network
  calls.
- **GitHub Pages**, organisation root site: this repository is
  `publicprojects-io/publicprojects-io.github.io`, served at the custom domain
  **https://publicprojects.io** (`static/CNAME`), like `lilydesignsystem.com`.
  `.github/workflows/deploy.yml` installs, checks, tests, builds, and deploys on push
  to `main`. The site lives at the domain root, so there is no base path.
  `BASE_PATH` (injected as `__BASE_PATH__`, read via `src/lib/base.ts`, because
  SvelteKit 3 removed `base` from `$app/paths`) exists only to preview a build under
  a sub-path. `SITE_ORIGIN` in `src/lib/site.ts` is `https://publicprojects.io`.
- **pnpm** only (pinned in `packageManager`). Node 26 or later.
- **Lily Design System** as npm dependencies, not vendored:
  `svelte-headless`, `svelte-picker-bar`, `svelte-theme-picker`,
  `svelte-locale-picker`, `svelte-text-size-picker`, `svelte-share-picker`,
  `svelte-search-picker`, and `themes`.

### Lily components

- **Header**: brand, `PickerBar`, and `NavigationMenu`. Also `SkipLink`, `Footer`,
  `ContainerWithFixedWidth`, `Card`, `Tag`, `TagGroup`, `InsetText`, and `ActionLink`.
- **Hero**: the home page uses Lily `Hero` and `HeroHeadline`, with a decorative SVG
  in the `media` snippet. It is drawn in `currentColor`, so it suits every theme.
- **PickerBar** (in this order, fixed by Lily): search, theme, locale, text size, share.
  - **Search**: the search picker sends `/<locale>/search/?<query>`.
  - **Theme**: every Lily default theme (`DEFAULT_THEMES`), with no custom themes. They
    are sorted alphabetically, with the United Kingdom and United States themes at
    the end (`src/lib/themes.ts`, tested). The default is `light`. Choices persist in
    `localStorage` and a cookie, and a pre-paint script in `app.html` avoids a flash.
    Theme CSS is copied from `@lilydesignsystem/themes` into `static/themes/` at
    build time (generated, git-ignored).
  - **Locale**: `en-001`, `en-gb`, `en-us`, `cy-gb`, `zh-cn`, `zh-001`, `hi-in`, and `hi-001`. Choosing one navigates to the same
    page in that locale.
  - **Text size**: Lily default sizes.
  - **Share**: Copy Link, Email Link, LinkedIn, Reddit, Bluesky, and Mastodon (through
    mastodonshare.com).
- **Styling**: `src/app.css` holds layout only, using the active theme's tokens
  (`--color-*`, `--lily-*`). Never hard-code colours that would break a theme.

## 4. Locales

| Locale | Path prefix | Text | `<html lang>` |
| --- | --- | --- | --- |
| `en-001` English (World), default | `/en-001/` | international / British English source | `en-001` |
| `en-gb` English (United Kingdom) | `/en-gb/` | same as source | `en-GB` |
| `en-us` English (United States) | `/en-us/` | American spelling, derived by rule | `en-US` |
| `cy-gb` Cymraeg (Welsh) | `/cy-gb/` | translated, from `locales/cy-gb/messages.json` | `cy-GB` |
| `zh-cn` 中文（中国） (Simplified Chinese, China) | `/zh-cn/` | translated, from `locales/zh-cn/messages.json` | `zh-CN` |
| `zh-001` 中文（世界） (Simplified Chinese, World) | `/zh-001/` | translated, from `locales/zh-001/messages.json` (a copy of zh-cn) | `zh-001` |
| `hi-in` हिन्दी (भारत) (Hindi, India) | `/hi-in/` | translated, from `locales/hi-in/messages.json` | `hi-IN` |
| `hi-001` हिन्दी (विश्व) (Hindi, World) | `/hi-001/` | translated, from `locales/hi-001/messages.json` (a copy of hi-in) | `hi-001` |

- **Every locale has a path prefix**, including the default, like lilydesignsystem.com:
  `https://publicprojects.io/en-001/donate/`. Routes live under
  `src/routes/[locale=locale]/`.
- **The site root `/` is a language chooser.** With JavaScript it redirects at once to
  the locale that best matches the browser's languages (`pickLocale()`: exact match,
  then language and region, then the language's `-001` variant, then any locale in that
  language, so `cy` goes to `cy-gb`; `zh` and other Chinese regions go to `zh-001`; `hi` and Hindi outside India go to `hi-001`), falling back to `en-001`. It stores nothing.
  Without JavaScript it lists every language by its own name.
- **Unprefixed paths** (such as `/donate/`) are not pages and are not forwarded: like
  lilydesignsystem.com, they show "Page not found".
- Content is written once, in international / British English, and every visible
  string passes through `t(locale, text)` in `src/lib/locales.ts`.
  - en-us: `t()` applies an explicit, tested British-to-American word list. Add words
    there; never fork content.
  - cy-gb, zh-cn, zh-001, hi-in, hi-001: `t()` looks the English text up in `locales/<locale>/messages.json` (see
    `locales/README.md`). A missing entry falls back to English and is reported as
    `I18N_MISSING` during the build; CI builds with `I18N_STRICT=1`, which fails on any
    missing entry.
  - The Welsh, Chinese, and Hindi translations are drafts. Every page in a catalogue locale
    (`isTranslated()`) shows a notice saying so, in that language, with a
    link to report errors, until a first-language speaker has reviewed it.
- Not translated: project names, technical tags, Lily theme names, and proper names
  ("World Health Organization").
- Dates and numbers use `Intl` with the locale's tag ("21 November 2026",
  "November 21, 2026", "21 Tachwedd 2026").
- Every page carries `hreflang` alternates for every locale plus `x-default`
  (the en-001 page; for the home page, the root chooser). The footer links to the current page in each locale, which also lets the
  prerender crawler find every locale.
- The language choice is held in the URL, not in browser storage.

## 5. Pages

`src/lib/pages.ts` is the single list of top-level pages. Navigation, the sitemap,
`llms.txt`, and search all read from it. Each page exists in all three locales.

| Slug | Purpose |
| --- | --- |
| `` (home) | See § Home page below |
| `health` | Health care and medical projects; the standards they serve; a clinical safety notice; trademark notices |
| `public-value` | Public value projects; translation and accessibility as public value |
| `engineering` | Software engineering leadership (nav label "Software engineering"); adoption and citation |
| `projects` | Every project, grouped by area |
| `projects/<slug>` | One page per project: summary, links, about, public value, "Use it" (where a verified example exists), recognition (where any), key facts, topics, related projects. See § Project pages |
| `project-status` | What each status means and the rule that decides it, with a count per status |
| `security` | Security policy: private reporting through GitHub private vulnerability reporting on the affected repository, what to include, safety-relevant reports, coordinated disclosure |
| `digital-health-teams` | For digital health groups: an independence and clinical safety notice, a table mapping needs to projects, why open source fits (with UK examples: Service Standard point 12, Technology Code of Practice), and how to get involved |
| `impact` | Every statistic with its date and source link; GitHub stars by account (joelparkerhenderson, gitalias, sixarm: every owned repository, including forks) and by project; recognition; translations; method |
| `donate` | How to donate time (code, docs, translation, testing, sharing) and money (PayPal or Venmo to the author's email), and to ask about other ways; donations go to the author personally, not tax-deductible |
| `about` | About the site and the author; principles; independence |
| `search` | Client-side search results (not in nav, sitemap, or llms.txt) |
| `accessibility-statement` | Aim (WCAG 2.2 AA, no conformance claim), what is checked, known shortfalls, other formats, reporting, plans |
| `cookie-policy` | No cookies; what cookies are; the two localStorage keys (`publicprojects-theme`, `publicprojects-text-size`); managing storage; other sites; concerns; changes |
| `privacy-policy` | Collects nothing; device storage; hosting (GitHub Pages); sharing; contact; rights; children; changes |
| `terms-of-use` | Use of the site; per-project licences; trademarks and independence; health and clinical use; no warranty; responsible use; links; changes |
| `site-map` | Every page and project, grouped, plus locales and machine-readable files |

Main navigation (in the header, and repeated in the footer): Health care, Public
value, Software engineering, All projects, Digital health teams, Impact, Donate,
About. The footer's policy row: Security, Accessibility statement, Cookie policy,
Privacy policy, Terms of use, Site map. The footer colophon is © year, name, GitHub,
ORCID, LinkedIn. The footer has no locale links: language is chosen with the header's
locale picker or the root chooser.

### Home page

In this order: all relevant information first, then the entire list of project cards,
then the footer.

1. Hero: headline, lead, and action links. No eyebrow above the headline.
2. Headline numbers, dated, with a link to the Impact page.
3. Why public open source matters.
4. The three areas.
5. The digital health teams callout.
6. All projects: every project card, with its area. Each card has a Lily Share button
   (SharePicker, with a visible "Share" label) in its lower-left corner that shares
   that project's page, not the home page, with the same destinations as the header.

### Project pages

Each project page has a key-facts list, from dated, sourced data:

- **Status** (see `project-status`), computed by `statusOf()`: archived repository,
  then the project's own override (demonstration or pre-release), then a package
  version below 1.0.0 (pre-release), then no commit for over a year (maintenance),
  else active. Cards show the status too.
- **Current version** and release date, for crates and gems.
- **Licence**: from the registry for packages; otherwise as the project's licence
  file or README states it, recorded in `projects.ts`. If the repository states no
  licence, the page says "Not stated in the repository". Never assume one.
- **Maintainer**, **latest commit**, area, downloads or stars, translations, source.
- For health projects: **Clinical Safety Officer**, **medical device position**, and
  **clinical safety documentation**, defaulting to "None named", "No assessment
  published" and "None published", with links where a project publishes documents.
- A "Use it" section for projects with a verified example: install command, code,
  and the real output, with the version it was run against. Examples must be run
  before they are published.

### Header

Logo, navigation links, and the PickerBar share one row (the header container is
84rem, wider than the 76rem content, so English fits one line from about 1200px).
The logo and PickerBar never shrink; the links may wrap within their space. Below
60rem the header stacks.

Machine-readable routes: `sitemap.xml` (all locales, with `xhtml:link` alternates),
`llms.txt`, and `robots.txt`. Pages include schema.org JSON-LD: `WebSite` on home,
`SoftwareSourceCode` or `CreativeWork` on projects, and `ProfilePage` on about.

## 6. Content

### The project catalogue

`src/lib/data/projects.ts` is the single source for every project. Each project has a
`slug`, `name`, `area` (`health`, `public-value`, or `engineering`), a one-sentence
`summary`, a `description`, a `value` (why it matters to the public), `links`,
optional `stats` (pointers into `stats.json`), an optional `languages` (a translation
count the project itself publishes), `tags`, `repo` (main repository), and optionally
`licence`, `status`, `clinicalSafety`, `usage`, and `recognition`.

### Content integrity (strict)

- **Never fabricate** numbers, citations, endorsements, users, or affiliations.
- Facts come only from public, checkable sources: the project's own site, its
  repository, its registry page (crates.io, RubyGems), the author's ORCID record, or
  the author's public CV.
- **Numbers come only from `src/lib/data/stats.json`** (repositories, crates, gems,
  per-account totals in `owners`, each project repository's latest commit and archived
  flag in `repos`, and package versions and licences), which carries an `asOf` date.
  Refresh it with `pnpm stats` (`scripts/refresh-stats.mjs`), review the diff, and
  commit. Headline totals are derived from `stats.json` in code, never typed by hand.
- Translation counts ("60+ languages") only where the project publishes them.
- Recognition only with a public link. Currently: the GitHub Blog article "Why write
  ADRs" links to the ADR repository. Add others, such as analyst citations or
  talks, only with a public URL.
- **Independence**: the projects are personal, built in the author's own time. They
  are not products of, or endorsed by, any employer or health organisation. The footer,
  digital health teams page, and About page all say so. Do not name the author's
  employer or specific health organisations, except where a project's own scope names
  them (for example, the NHS Number crate's supported NHS bodies).
- **Clinical safety**: health projects are building blocks, not certified medical
  devices. Health pages state that live clinical use needs the adopting
  organisation's own clinical safety assessment (DCB0129 and DCB0160).
  Demonstration projects say they are not for medical use.
- **Trademarks**: HL7®, FHIR®, SNOMED CT®, and openEHR® notices on the health page.
- **Pronouns**: refer to the author by name ("Joel"), not by pronoun, in every language.
- **No cookies**: the theme picker's cookie is disabled (`cookieName: ''`). Adding any
  cookie, analytics, or third-party request requires updating the cookie and privacy
  policies first.
- **Contact**: the issue tracker, and the author's email only where the author asked
  for it (the donate page).

### Writing style

- Plain, warm, confident English. Short sentences. Lead with what it does for people.
- Write the public value of each project, not only its features.
- No hype words ("revolutionary", "world-class"). Let dated numbers speak.

## 7. Search

`src/lib/search.ts` builds an index from `PAGES` and `PROJECTS` (name, summary,
description, public value, area, and tags), with each locale's spelling. Matching is
case-insensitive and requires every query word; title matches rank first. The search
page reads the query from `location.search` after hydration, because the page is
prerendered once.

## 8. Accessibility

- WCAG 2.2 AA. A skip link, landmarks (header, nav, main, footer), one `h1` per page,
  and logical heading order.
- Every Lily accessible name comes from `src/lib/ui.ts`.
- Visually hidden live regions announce the active theme and language.
- Tables have header cells with `scope`. Whole-card links use a single real link.
- Colour comes from the active theme, so every Lily theme stays legible. Motion
  respects `prefers-reduced-motion`.

## 9. Quality bar

Before a change is done:

```sh
pnpm run check   # svelte-kit sync + svelte-check: 0 errors, 0 warnings
pnpm test        # vitest: spelling, paths, search, theme order
pnpm run build   # prerenders every page in every locale; fails on broken links or missing ids
```

CI runs the same three commands before deploying.

## 10. Acceptance criteria

1. The home page shows a Lily Hero, headline numbers dated from `stats.json`, the
   three areas, and then every project card, each with a lower-left Share button.
2. The header has a Lily PickerBar with search, all Lily default themes (sorted, UK
   and US last), locales en-001, en-gb, en-us, cy-gb, zh-cn, zh-001, hi-in, and hi-001, text size, and the six share
   options.
3. Choosing a locale navigates to the same page in that locale; en-us pages use
   American spelling; cy-gb pages are fully Welsh and zh-cn and zh-001 pages fully Simplified Chinese, and hi-in and hi-001 pages fully Hindi, with the draft notice.
4. Searching from the picker lands on the search page with matching results.
5. Every project has a page in all three locales, with a source link and date for
   every number.
6. The digital health teams page maps needs to projects and states independence and clinical
   safety.
7. `sitemap.xml`, `llms.txt`, `robots.txt`, canonical URLs, and `hreflang` use `https://publicprojects.io`.
8. The site deploys to GitHub Pages from `main` and serves at https://publicprojects.io over HTTPS.

## 11. Open items

- Domain setup for `publicprojects.io`. At the DNS provider: apex `A` records
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and
  `AAAA` `2606:50c0:8000::153` through `8003::153`), plus `www` `CNAME`
  `publicprojects-io.github.io`. On GitHub: verify the domain for the organisation,
  set Pages to deploy from GitHub Actions with custom domain `publicprojects.io`, and
  enforce HTTPS.
- Add recognition that has a public URL: analyst citations, talks, hackathon judging,
  and media coverage.
- First-language review of the Welsh, Chinese, and Hindi translations, then remove the draft notice for each.
- zh-001 is a copy of zh-cn. Traditional Chinese readers (zh-TW, zh-HK) are sent to zh-001; add zh-tw if a Traditional catalogue is made.
- hi-001 is a copy of hi-in. Some sentence-final full stops and commas around links come from page templates, so Chinese and Hindi pages show "." or "," there instead of "。" or "।".
- Consider more locales, each with its own catalogue under `locales/`.
- Add an Open Graph image.
