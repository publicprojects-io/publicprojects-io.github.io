# Public Projects website: specification

This is the source of truth for the Public Projects website. Where the code and this
specification disagree, the specification wins: fix the code, or change the
specification on purpose and bring the code into line in the same commit.

Related specifications:

- [`lily-design-system-svelte-with-picker-bar/index.md`](lily-design-system-svelte-with-picker-bar/index.md): Lily Design System packages and PickerBar rules.

## 1. Goal

A user-friendly website for Joel Parker Henderson's public open source projects:
public open source for the global good.

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

- **The global importance of public open source projects**: solve once and share
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
  HTTPS is enforced, and the organisation has verified the domain; keep its DNS
  `TXT` record `_github-pages-challenge-publicprojects-io`, which GitHub rechecks.
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
  - **Locale**: `en-001`, `en-gb`, `en-us`, `cy-gb`, `zh-cn`, `zh-001`, `hi-in`, `hi-001`, `ar-eg`, `ar-001`, `es-mx`, `es-001`, `es-es`, `fr-fr`, `fr-001`, `fr-ca`, `ru-ru`, `ru-001`, `ru-by`, `bn-bd`, `bn-001`, `bn-in`, `id-id`, `id-001`, `id-my`, `th-th`, `th-001`, `ja-jp`, `ja-001`, `ko-kr`, `ko-001`, `sw-tz`, `sw-001`, `sv-se`, `sv-001`, `nl-nl`, `nl-001`, `vi-vn`, `vi-001`, `de-de`, `de-001`, `de-at`, `pt-br`, `pt-001`, `pt-pt`, `ur-001`, and `da-001`. Choosing one navigates to the same
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
| `ar-eg` العربية (مصر) (Arabic, Egypt) | `/ar-eg/` | translated, from `locales/ar-eg/messages.json`; right to left | `ar-EG` |
| `ar-001` العربية (العالم) (Arabic, World) | `/ar-001/` | translated, from `locales/ar-001/messages.json` (a copy of ar-eg); right to left | `ar-001` |
| `es-mx` Español (México) (Spanish, Mexico) | `/es-mx/` | translated, from `locales/es-mx/messages.json` | `es-MX` |
| `es-001` Español (Mundo) (Spanish, World) | `/es-001/` | translated, from `locales/es-001/messages.json` (a copy of es-mx) | `es-001` |
| `es-es` Español (España) (Spanish, Spain) | `/es-es/` | translated, from `locales/es-es/messages.json` (es-mx tuned for Spain) | `es-ES` |
| `fr-fr` Français (France) (French, France) | `/fr-fr/` | translated, from `locales/fr-fr/messages.json` | `fr-FR` |
| `fr-001` Français (Monde) (French, World) | `/fr-001/` | translated, from `locales/fr-001/messages.json` (a copy of fr-fr) | `fr-001` |
| `fr-ca` Français (Canada) (French, Canada) | `/fr-ca/` | translated, from `locales/fr-ca/messages.json` (fr-fr tuned for Canada) | `fr-CA` |
| `ru-ru` Русский (Россия) (Russian, Russia) | `/ru-ru/` | translated, from `locales/ru-ru/messages.json` | `ru-RU` |
| `ru-001` Русский (Мир) (Russian, World) | `/ru-001/` | translated, from `locales/ru-001/messages.json` (a copy of ru-ru) | `ru-001` |
| `ru-by` Русский (Беларусь) (Russian, Belarus) | `/ru-by/` | translated, from `locales/ru-by/messages.json` (a copy of ru-ru) | `ru-BY` |
| `bn-bd` বাংলা (বাংলাদেশ) (Bengali, Bangladesh) | `/bn-bd/` | translated, from `locales/bn-bd/messages.json` | `bn-BD` |
| `bn-001` বাংলা (বিশ্ব) (Bengali, World) | `/bn-001/` | translated, from `locales/bn-001/messages.json` (a copy of bn-bd) | `bn-001` |
| `bn-in` বাংলা (ভারত) (Bengali, India) | `/bn-in/` | translated, from `locales/bn-in/messages.json` (a copy of bn-bd) | `bn-IN` |
| `id-id` Bahasa Indonesia (Indonesia) (Indonesian, Indonesia) | `/id-id/` | translated, from `locales/id-id/messages.json` | `id-ID` |
| `id-001` Bahasa Indonesia (Dunia) (Indonesian, World) | `/id-001/` | translated, from `locales/id-001/messages.json` (a copy of id-id) | `id-001` |
| `id-my` Bahasa Indonesia (Malaysia) (Indonesian, Malaysia) | `/id-my/` | translated, from `locales/id-my/messages.json` (a copy of id-id) | `id-MY` |
| `th-th` ไทย (ประเทศไทย) (Thai, Thailand) | `/th-th/` | translated, from `locales/th-th/messages.json` | `th-TH` |
| `th-001` ไทย (โลก) (Thai, World) | `/th-001/` | translated, from `locales/th-001/messages.json` (a copy of th-th) | `th-001` |
| `ja-jp` 日本語（日本） (Japanese, Japan) | `/ja-jp/` | translated, from `locales/ja-jp/messages.json` | `ja-JP` |
| `ja-001` 日本語（世界） (Japanese, World) | `/ja-001/` | translated, from `locales/ja-001/messages.json` (a copy of ja-jp) | `ja-001` |
| `ko-kr` 한국어(대한민국) (Korean, South Korea) | `/ko-kr/` | translated, from `locales/ko-kr/messages.json` | `ko-KR` |
| `ko-001` 한국어(세계) (Korean, World) | `/ko-001/` | translated, from `locales/ko-001/messages.json` (a copy of ko-kr) | `ko-001` |
| `sw-tz` Kiswahili (Tanzania) (Swahili, Tanzania) | `/sw-tz/` | translated, from `locales/sw-tz/messages.json` | `sw-TZ` |
| `sw-001` Kiswahili (Dunia) (Swahili, World) | `/sw-001/` | translated, from `locales/sw-001/messages.json` (a copy of sw-tz) | `sw-001` |
| `sv-se` Svenska (Sverige) (Swedish, Sweden) | `/sv-se/` | translated, from `locales/sv-se/messages.json` | `sv-SE` |
| `sv-001` Svenska (världen) (Swedish, World) | `/sv-001/` | translated, from `locales/sv-001/messages.json` (a copy of sv-se) | `sv-001` |
| `nl-nl` Nederlands (Nederland) (Dutch, Netherlands) | `/nl-nl/` | translated, from `locales/nl-nl/messages.json` | `nl-NL` |
| `nl-001` Nederlands (wereld) (Dutch, World) | `/nl-001/` | translated, from `locales/nl-001/messages.json` (a copy of nl-nl) | `nl-001` |
| `vi-vn` Tiếng Việt (Việt Nam) (Vietnamese, Vietnam) | `/vi-vn/` | translated, from `locales/vi-vn/messages.json` | `vi-VN` |
| `vi-001` Tiếng Việt (Thế giới) (Vietnamese, World) | `/vi-001/` | translated, from `locales/vi-001/messages.json` (a copy of vi-vn) | `vi-001` |
| `de-de` Deutsch (Deutschland) (German, Germany) | `/de-de/` | translated, from `locales/de-de/messages.json` | `de-DE` |
| `de-001` Deutsch (Welt) (German, World) | `/de-001/` | translated, from `locales/de-001/messages.json` (a copy of de-de) | `de-001` |
| `de-at` Deutsch (Österreich) (German, Austria) | `/de-at/` | translated, from `locales/de-at/messages.json` (de-de tuned for Austria) | `de-AT` |
| `pt-br` Português (Brasil) (Portuguese, Brazil) | `/pt-br/` | translated, from `locales/pt-br/messages.json` | `pt-BR` |
| `pt-001` Português (Mundo) (Portuguese, World) | `/pt-001/` | translated, from `locales/pt-001/messages.json` (a copy of pt-br) | `pt-001` |
| `pt-pt` Português (Portugal) (Portuguese, Portugal) | `/pt-pt/` | translated, from `locales/pt-pt/messages.json` (pt-br tuned for Portugal) | `pt-PT` |
| `ur-001` اردو (دنیا) (Urdu, World) | `/ur-001/` | translated, from `locales/ur-001/messages.json`; right to left | `ur-001` |
| `da-001` Dansk (verden) (Danish, World) | `/da-001/` | translated, from `locales/da-001/messages.json` | `da-001` |

- **Every locale has a path prefix**, including the default, like lilydesignsystem.com:
  `https://publicprojects.io/en-001/donate/`. Routes live under
  `src/routes/[locale=locale]/`.
- **The site root `/` is a language chooser.** With JavaScript, an inline script in its
  head (`rootRedirectScript()`) runs before the app loads and redirects at once to
  the locale that best matches the browser's languages (`pickLocale()`: exact match,
  then language and region, then the language's `-001` variant, then any locale in that
  language, so `cy` goes to `cy-gb`; `zh` and other Chinese regions go to `zh-001`; `hi` and Hindi outside India go to `hi-001`; `ar` and Arabic outside Egypt go to `ar-001`; `es` and Spanish outside Mexico and Spain go to `es-001`; `fr` and French outside France and Canada go to `fr-001`; `ru` and Russian outside Russia and Belarus go to `ru-001`; `bn` and Bengali outside Bangladesh and India go to `bn-001`; `id` and Indonesian outside Indonesia and Malaysia go to `id-001`; `th` and Thai outside Thailand go to `th-001`; `ja` and Japanese outside Japan go to `ja-001`; `ko` and Korean outside South Korea go to `ko-001`; `sw` and Swahili outside Tanzania go to `sw-001`; `sv` and Swedish outside Sweden go to `sv-001`; `nl` and Dutch outside the Netherlands, such as `nl-BE`, go to `nl-001`; `vi` and Vietnamese outside Vietnam go to `vi-001`; `de` and German outside Germany and Austria, such as `de-CH`, go to `de-001`; `pt` and Portuguese outside Brazil and Portugal, such as `pt-AO`, go to `pt-001`; `ur` and every Urdu region, such as `ur-PK` and `ur-IN`, go to `ur-001`; `da` and every Danish region, such as `da-DK`, go to `da-001`), falling back to `en-001` when the browser has no language preference or none
  matches. It stores nothing.
  Without JavaScript it lists every language by its own name.
- **Unprefixed paths** (such as `/donate/`) are not pages and are not forwarded: like
  lilydesignsystem.com, they show "Page not found".
- Content is written once, in international / British English, and every visible
  string passes through `t(locale, text)` in `src/lib/locales.ts`.
  - en-us: `t()` applies an explicit, tested British-to-American word list. Add words
    there; never fork content.
  - cy-gb, zh-cn, zh-001, hi-in, hi-001, ar-eg, ar-001, es-mx, es-001, es-es, fr-fr, fr-001, fr-ca, ru-ru, ru-001, ru-by, bn-bd, bn-001, bn-in, id-id, id-001, id-my, th-th, th-001, ja-jp, ja-001, ko-kr, ko-001, sw-tz, sw-001, sv-se, sv-001, nl-nl, nl-001, vi-vn, vi-001, de-de, de-001, de-at, pt-br, pt-001, pt-pt, ur-001, da-001: `t()` looks the English text up in `locales/<locale>/messages.json` (see
    `locales/README.md`). A missing entry falls back to English and is reported as
    `I18N_MISSING` during the build; CI builds with `I18N_STRICT=1`, which fails on any
    missing entry.
  - Where one English string is used two ways and a language needs two
    translations, `t(locale, text, 'label')` first looks up `"label|<text>"`, then
    the plain entry. "GitHub stars" is the form after a number (home page tile,
    project cards); "label|GitHub stars" is the project page label.
  - Words after an exact count (project cards) use `tCount()`, which picks the
    language's plural form (Intl.PluralRules) from `"<category>|<text>"`, else the
    plain entry. Russian has `one|` and `few|` forms for "GitHub stars" and
    "downloads"; Arabic has `one|`, `two|`, `many|`, `other|`, and `compact|` forms.
    Compact counts ("16,5 тыс.", "16 ألف"), on cards and the home page tiles, use
    `"compact|<text>"`, else the plain entry.
  - The Welsh, Chinese, Hindi, Arabic, Spanish, French, Russian, Bengali, Indonesian, Thai, Japanese, Korean, Swahili, Swedish, Dutch, Vietnamese, German, Portuguese, Urdu, and Danish translations are drafts. Every page in a catalogue locale
    (`isTranslated()`) shows a notice saying so, in that language, with a
    link to report errors, until a first-language speaker has reviewed it.
- Project names are translated when they describe the project ("Care Plan" →
  "Cynllun Gofal"), keeping standard and product names inside them ("FHIR for Rust" →
  "FHIR ar gyfer Rust"). Brand and product names stay in English (Lily Design System,
  GitAlias, Assertables, Num, Bold Contacts, Unicode Separated Values, Demo Rust Axum).
  Every project name is a catalogue entry, brands mapping to themselves, so the strict
  build catches a new project with no entry. Search still matches the English name, and
  the JSON-LD keeps the English name beside its English description.
- Not translated: technical tags, Lily theme names, and proper names
  ("World Health Organization").
- Arabic and Urdu are written right to left. `localeDir()` sets `<html dir="rtl">` at prerender
  time, the layout keeps `lang` and `dir` in step when the language picker navigates
  in the browser, and the root chooser marks each language's own name with its
  direction. Styles use logical properties (`margin-inline-start`, not `margin-left`),
  so layouts mirror without separate rules.
- Arabic numbers and dates use Western digits (`ar-EG-u-nu-latn`), in both Arabic
  locales, so they match the digits in the text, such as "FHIR R5" and version numbers.
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
| `projects/<slug>` | One page per project: summary, links, about, public value, "Use it" (where a verified example exists), recognition (where any), related projects; no key-facts column. See § Project pages |
| `project-status` | What each status means and the rule that decides it, with a count per status |
| `releases` | The latest release of each published crate and gem, newest first (date, project, package, version), from `stats.json` via `releases()`; links to the Atom feed. Linked from Impact and the site map |
| `security` | Security policy: private reporting through GitHub private vulnerability reporting on the affected repository, what to include, safety-relevant reports, coordinated disclosure |
| `contribute` | How to contribute: no permission needed; ways to help (report a problem, documentation, code, translation); ground rules (no real patient or personal data, security reports privately, each project's licence); the Contributor Covenant 2.1 code of conduct, with conduct reports by email to the author via the Donate page. Linked from Donate › Donate time and Digital health teams › How to get involved |
| `digital-health-teams` | For digital health groups: an independence and clinical safety notice, a table mapping needs to projects, why open source fits (with UK examples: Service Standard point 12, Technology Code of Practice), and how to get involved |
| `impact` | Every statistic with its date and source link; GitHub stars by account (joelparkerhenderson, gitalias, sixarm: every owned repository, including forks) and by project; recognition; translations; method |
| `donate` | How to donate time (code, docs, translation, testing, sharing) and money (PayPal or Venmo to the author's email), and to ask about other ways; donations go to the author personally, not tax-deductible |
| `about` | About the site and the author; principles; what Public Projects is not (not a standards body, vendor, medical device supplier, employer’s programme, or charity); independence |
| `search` | Client-side search results (not in nav, sitemap, or llms.txt) |
| `accessibility-statement` | Aim (WCAG 2.2 AA, no conformance claim), what is checked, known shortfalls, other formats, reporting, plans |
| `cookie-policy` | No cookies; what cookies are; the two localStorage keys (`publicprojects-theme`, `publicprojects-text-size`); managing storage; other sites; concerns; changes |
| `privacy-policy` | Collects nothing; device storage; hosting (GitHub Pages); sharing; contact; rights; children; changes |
| `terms-of-use` | Use of the site; per-project licences; trademarks and independence; health and clinical use; no warranty; responsible use; links; changes |
| `site-map` | Every page and project, grouped, plus locales and machine-readable files |

The four policy pages (accessibility statement, cookie policy, privacy policy, terms of use)
open with an "On this page" list (`OnThisPage`, Lily `ContentsNav`) linking to each section.
Section anchors come from the English heading (`anchor()` in `urls.ts`), so a link to a
section is the same in every locale; the prerender fails if a link has no target.

Main navigation (in the header, and repeated in the footer): Health care, Public
value, Software engineering, All projects, Digital health teams, Impact, Donate,
About. The footer's policy row: Security, Contribute, Accessibility statement, Cookie policy,
Privacy policy, Terms of use, Site map. The footer colophon is © year, name, GitHub,
ORCID, LinkedIn. The footer has no locale links: language is chosen with the header's
locale picker or the root chooser.

### Home page

In this order: all relevant information first, then the entire list of project cards,
then the footer.

1. Hero: headline, lead, and action links. No eyebrow above the headline.
2. Headline numbers from `stats.json`, with no date or source line under them: the
   Impact page gives each number's date and source.
   Downloads show as a round floor, "80M+" over the label "Downloads", which must
   stay at or below the total in `stats.json`; the Impact page shows the exact total.
3. Why public open source matters.
4. The three areas. (The hero's action links lead to the digital health teams
   page; there is no separate callout for it.)
5. All projects: every project card, with its area above the project name.
   Objectives and Key Results, Key Performance Indicators, and Maturity Models show
   "Business executive leadership" there instead; they stay in the software
   engineering leadership area everywhere else. Each card has a Lily SharePicker,
   with its default icon button as in the header, in its lower-left corner. It shares
   that project's page, not the home page, with the same destinations as the header.
   The grid shows at most three cards to a row. The first three rows are, in order:
   - Public Value Guide and Metrics, Health Economics Guide and Metrics, Software
     Engineering Guide and Metrics;
   - Ways of Working, International Patient Summary, Architecture Decision Record;
   - Coordinated Vulnerability Disclosure, Queueing Theory, Assertables.

   Above the cards, a project filter (`ProjectFilter`, logic in
   `src/lib/project-filter.ts`): a Lily `SearchInput` that keeps the projects
   containing every keyword (in the page's language, the English name, and the tags),
   and a Lily `SegmentGroup` of categories with their counts: All categories, then
   each name shown above project names on cards (Health care and medical, Public
   value, Software engineering leadership, Business executive leadership). The two
   combine. A live status line gives the number shown, and a message replaces the
   grid when nothing matches. Filtering keeps the order above. It runs in the
   browser, so the controls appear after hydration; without JavaScript every card
   shows.

   Every other project follows in catalogue order (`HOME_FIRST` in `projects.ts`).

### Project pages

Each project page has a single column: summary, links, about, public value, "Use it",
recognition, and related projects. It has no key-facts column: no status, version,
licence, maintainer, latest commit, stars, downloads, source, topics, or clinical
safety list.

- **Status** (see `project-status`), computed by `statusOf()`: archived repository,
  then the project's own override (demonstration or pre-release), then a package
  version below 1.0.0 (pre-release), then no commit for over a year (maintenance),
  else active. Cards show the status, except active and pre-release, which are
  common enough to be noise on a card.
- A "Use it" section for projects with a verified example: install command, code,
  and the real output, with the version it was run against. Examples must be run
  before they are published.

### Header

Logo, navigation links, and the PickerBar share one row (the header container is
84rem, wider than the 76rem content, so English fits one line from about 1200px).
The logo and PickerBar never shrink; the links may wrap within their space. Below
60rem the header stacks.

Every page shares one social card image, `static/social-card.png` (1200 × 630, made
from `scripts/social-card.html`): the logo, "Public Projects", "publicprojects.io", and
the hero art, in Lily's default light theme. It has no other words, so it serves every
locale. Pages set `og:image` with its size and `og:image:alt` (the site name), and
`twitter:card` `summary_large_image`.

Machine-readable routes: `sitemap.xml` (all locales, with `xhtml:link` alternates),
`llms.txt`, `robots.txt`, and `releases.xml`, an Atom feed of the same releases as the
`releases` page, which every page links to with `<link rel="alternate">`. Pages include schema.org JSON-LD: `WebSite` on home,
`SoftwareSourceCode` or `CreativeWork` on projects, and `ProfilePage` on about.

## 6. Content

### The project catalogue

`src/lib/data/projects.ts` is the single source for every project. Each project has a
`slug`, `name`, `area` (`health`, `public-value`, or `engineering`), a one-sentence
`summary`, a `description`, a `value` (why it matters to the public), `links`,
optional `stats` (pointers into `stats.json`), an optional `languages` (a translation
count the project itself publishes), `tags`, `repo` (main repository), and optionally
`status`, `usage`, and `recognition`.

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
pnpm run coverage # the same, failing below 100% coverage of src/*.ts, src/lib/**/*.ts, and src/routes/**/*.ts,
                  # or of the statements, functions, and lines of every component and page (.svelte)
pnpm run build   # prerenders every page in every locale; fails on broken links or missing ids
```

CI runs check, coverage, and build before deploying.

Tests run in two Vitest projects: `node` (`*.test.ts`) and `dom` (`*.dom.test.ts`, happy-dom),
which mounts the components and every page, in more than one locale, so that event
handlers and `onMount` run.

## 10. Acceptance criteria

1. The home page shows a Lily Hero, headline numbers from `stats.json` (dated and sourced on the Impact page), the
   three areas, and then a category and keyword filter above every project card, each with a lower-left Lily SharePicker, and a status pill only when the status
   is demonstration or archived.
2. The header has a Lily PickerBar with search, all Lily default themes (sorted, UK
   and US last), locales en-001, en-gb, en-us, cy-gb, zh-cn, zh-001, hi-in, hi-001, ar-eg, ar-001, es-mx, es-001, es-es, fr-fr, fr-001, fr-ca, ru-ru, ru-001, ru-by, bn-bd, bn-001, bn-in, id-id, id-001, id-my, th-th, th-001, ja-jp, ja-001, ko-kr, ko-001, sw-tz, sw-001, sv-se, sv-001, nl-nl, nl-001, vi-vn, vi-001, de-de, de-001, de-at, pt-br, pt-001, pt-pt, ur-001, and da-001, text size, and the six share
   options.
3. Choosing a locale navigates to the same page in that locale; en-us pages use
   American spelling; cy-gb pages are fully Welsh and zh-cn and zh-001 pages fully Simplified Chinese, hi-in and hi-001 pages fully Hindi, ar-eg and ar-001 pages fully Arabic and right to left, es-mx, es-001, and es-es pages fully Spanish, fr-fr, fr-001, and fr-ca pages fully French, ru-ru, ru-001, and ru-by pages fully Russian, bn-bd, bn-001, and bn-in pages fully Bengali, id-id, id-001, and id-my pages fully Indonesian, th-th and th-001 pages fully Thai, ja-jp and ja-001 pages fully Japanese, ko-kr and ko-001 pages fully Korean, sw-tz and sw-001 pages fully Swahili, sv-se and sv-001 pages fully Swedish, nl-nl and nl-001 pages fully Dutch, vi-vn and vi-001 pages fully Vietnamese, de-de, de-001, and de-at pages fully German, pt-br, pt-001, and pt-pt pages fully Portuguese, ur-001 pages fully Urdu and right to left, and da-001 pages fully Danish, with the draft notice.
4. Searching from the picker lands on the search page with matching results.
5. Every project has a page in all three locales, with a source link and date for
   every number.
6. The digital health teams page maps needs to projects and states independence and clinical
   safety.
7. `sitemap.xml`, `llms.txt`, `robots.txt`, canonical URLs, and `hreflang` use `https://publicprojects.io`.
8. The site deploys to GitHub Pages from `main` and serves at https://publicprojects.io over HTTPS.

## 11. Open items

- Add recognition that has a public URL: analyst citations, talks, hackathon judging,
  and media coverage.
- First-language review of the Welsh, Chinese, Hindi, Arabic, Spanish, French, Russian, Bengali, Indonesian, Thai, Japanese, Korean, Swahili, Swedish, Dutch, Vietnamese, German, Portuguese, Urdu, and Danish translations, then remove the draft notice for each.
- zh-001 is a copy of zh-cn. Traditional Chinese readers (zh-TW, zh-HK) are sent to zh-001; add zh-tw if a Traditional catalogue is made.
- hi-001 is a copy of hi-in. Some sentence-final full stops and commas around links come from page templates, so Chinese, Hindi, and Arabic pages show "." or "," there instead of "。", "।", or "،".
- ar-001 is a copy of ar-eg. Arabic uses Western digits; a reviewer may prefer
  Arabic-Indic digits (٠١٢٣) for ar-eg.
- es-001 is a copy of es-mx, in neutral Latin American Spanish addressing the reader as
  "tú". es-es is es-mx tuned for Spain, still with "tú": vocabulary such as "historia
  clínica", "coste", "fiable", "ordenador", and "a fecha de". Numbers follow each tag:
  es-MX and es-001 "96,386,872"; es-ES "96.386.872".
- fr-001 is a copy of fr-fr, addressing the reader as "vous", with French
  typography (a non-breaking space before ":" and inside « », a narrow one before
  ";", "!", and "?"). fr-ca is fr-fr tuned for Canada: vocabulary such as "témoin"
  for cookie, "courriel", "proche aidant", "cadriciel", and "instrument médical", and
  no space before ";", "!", and "?". Numbers: fr-FR and fr-001 group with a narrow
  space, fr-CA with a non-breaking space.
- ru-001 and ru-by are copies of ru-ru, addressing the reader as "вы", with « »
  quotation marks. Written Russian in Belarus follows the same standard as in
  Russia, so ru-by needs no tuning. Product and standard names stay in Latin
  script, and so does the author's name, so that it matches where the site inserts
  it. Sentences split around a link use the case each link text needs, which is
  usually the nominative ("См. также:" before a link). Dates drop the trailing
  "г." ("21 ноября 2026"), because a full stop often follows a date. Russian nouns
  after a number take one of three forms (1 результат, 3 результата, 5
  результатов), but a fragment such as "results for" has one translation, which
  uses the "5" form, as does "free, open source projects" after the project count
  (right for 38 projects). `tCount()` adds the "1" and "3" forms for these, the
  home page area counts, and the card and tile counts.
- bn-001 and bn-in are copies of bn-bd, addressing the reader as "আপনি". The site
  uses no wording that differs between Bangladesh and India, so bn-in needs no
  tuning. Numbers use Western digits, as in Arabic, to match the digits in the text
  ("60+", "FHIR R5"), with lakh and crore grouping ("9,63,86,872", "9.6 কো").
  Product and standard names, and the author's name, stay in Latin script.
  Sentences split around a link put the link first as the subject ("[নিরাপত্তা
  নীতি] ব্যাখ্যা করে") or after a colon, because Bengali case endings attach to the
  word. Full stops that page templates add after links show as "." rather than "।".
- id-001 and id-my are copies of id-id, in formal Indonesian addressing the reader
  as "Anda". id-my is for Indonesian speakers in Malaysia; Malay itself would be
  its own `ms` locale. Numbers group with dots and use a decimal comma
  ("96.386.872", "9,6 jt"), and dates read "21 November 2026". Indonesian word
  order follows English closely, so split sentences keep the English pattern.
  Established technical loanwords stay in English where Indonesian developers use
  them (commit, issue, crate, browser), and standard names stay as published.
- th-001 is a copy of th-th, in polite written Thai that mostly leaves out "you"
  ("คุณ" where needed). Dates use the Buddhist era, as Thai readers expect
  ("21 พฤศจิกายน 2569"); a year in running text says "ค.ศ." ("ตั้งแต่ ค.ศ. 2006").
  Numbers use Western digits and Latin compact units ("96.3M", "16.5K"), as Intl
  gives for Thai. Thai has no plural forms. Sentences are separated by a space, as
  in Thai, with no full stop; full stops that page templates add after links still
  show as ".". Split sentences keep a leading comma where the English has one.
- ja-001 is a copy of ja-jp, in polite written Japanese (です・ます調) that leaves out
  "you". Dates are "2026年11月21日"; compact numbers use 万 and drop the decimal once the
  number before the unit has two digits, as Chinese does ("9638万+", "1.6万+"). Japanese
  has no plural forms. Full stops and commas that page templates add after links show
  as "." or "," instead of "。" or "、".
- ko-001 is a copy of ko-kr, in formal written Korean (합니다체) that leaves out "you".
  Dates are "2026년 11월 21일"; compact numbers use 만 and drop the decimal once the
  number before the unit has two digits, as Chinese and Japanese do ("9638만+",
  "1.6만+"). Korean has no plural forms. Where a sentence is split around a link, the
  link stands as its own word, so a particle after it is written with a space before it.
- sw-001 is a copy of sw-tz, in standard written Swahili (Kiswahili sanifu). Dates are
  "21 Novemba 2026"; compact numbers follow CLDR ("elfu 16.5+", "96M+"). Count words
  have `one|` singular forms ("mradi 1", "miradi 15"); the template puts the number
  before the noun, where Swahili would put it after.
- sv-001 is a copy of sv-se, in standard Swedish, addressing the reader as "du". Dates are
  "21 november 2026"; numbers group with spaces ("96 386 872") and compact numbers follow
  CLDR ("16,5 tn+", "96,3 mn+"). Count words have `one|` singular forms ("1 nedladdning",
  "120 nedladdningar").
- nl-001 is a copy of nl-nl, in standard Dutch, addressing the reader as "je". Dates are
  "21 november 2026"; numbers group with full stops ("96.386.872") and compact numbers follow
  CLDR ("16,5K+", "96,3 mln.+"). Count words have `one|` singular forms ("1 project",
  "12 projecten").
- vi-001 is a copy of vi-vn, in standard Vietnamese, addressing the reader as "bạn". Dates
  are "21 tháng 11, 2026"; numbers group with full stops ("96.386.872") and compact numbers
  follow CLDR ("16,5 N+", "96,3 Tr+"). Vietnamese nouns do not inflect, so count words
  need no plural forms ("1 dự án", "12 dự án").
- de-001 is a copy of de-de, addressing the reader as "Sie", with „ “ quotation marks
  and gender-neutral wording without gender stars ("Mitarbeitende", "Patientinnen und
  Patienten"). de-at is de-de tuned for Austria: vocabulary and spelling such as
  "Spital" and "selbständig"; dates say "Jänner". Numbers: de-DE and de-001
  "96.386.872", de-AT "96 386 872" (a non-breaking space); compact "96,3 Mio.+".
  German CLDR has no compact form for thousands, so "16.513+" shows in full. Count
  words add the singular ("1 Projekt", "12 Projekte").
- pt-001 is a copy of pt-br, in Brazilian Portuguese, addressing the reader as "você"
  where needed but preferring impersonal phrasing, with “ ” quotation marks. pt-pt is
  pt-br tuned for Portugal: vocabulary and spelling such as "equipa", "ficheiro",
  "utilizador", "partilhar", and "registo". Numbers: pt-BR and pt-001 "96.386.872",
  compact "96,3 mi+" and "16,5 mil+"; pt-PT "96 386 872" (a non-breaking space),
  compact "96,3 M+". Count words add the singular ("1 projeto", "12 projetos").
- ur-001 is the only Urdu locale, for readers in Pakistan, India, and elsewhere. It
  addresses the reader as "آپ", is right to left like Arabic, and uses the Urdu full
  stop "۔" and comma "،"; full stops and commas that page templates add after links
  still show as "." and ",". Product and standard names, and the author's name, stay
  in Latin script. Numbers use Western digits, as Intl gives for Urdu ("96,386,872"),
  with crore and thousand compact units ("9.6 کروڑ+", "16 ہزار+"). Count words add
  the singular ("1 پروجیکٹ", "12 پروجیکٹس").
- da-001 is the only Danish locale, for readers in Denmark and elsewhere, in standard
  Danish, addressing the reader as "du". Dates are "21. november 2026"; numbers group
  with full stops ("96.386.872") and compact numbers follow CLDR ("96,3 mio.+",
  "16,5 t+"). Count words add the singular ("1 projekt", "1 download", "753 downloads").
- Consider more locales, each with its own catalogue under `locales/`.
- Add an Open Graph image.
