# AGENTS.md

Instructions for AI coding agents (Claude Code, Codex, Cursor, and others) working in
this repository: the source for the Public Projects website, https://publicprojects.io,
a static SvelteKit 3 site on the `publicprojects-io` organisation's root GitHub Pages site.

## Specification-driven development

**`spec/` is the source of truth.**

- Before changing anything, read every file under `spec/`.
- Treat the specifications as strict requirements. If code and spec disagree, the spec
  wins: fix the code, or change the spec on purpose and bring the code into line in
  the same commit.

## Layout

| Path | Purpose |
| --- | --- |
| `spec/index.md` | Website specification |
| `spec/lily-design-system-svelte-with-picker-bar/` | Lily Design System and PickerBar rules |
| `static/CNAME` | Custom domain: `publicprojects.io` |
| `src/lib/data/projects.ts` | Project catalogue: the single source for project content |
| `src/lib/data/stats.json` | Dated statistics snapshot: the only source for numbers |
| `src/lib/pages.ts` | Top-level pages: navigation, sitemap, llms.txt, and search |
| `src/lib/locales.ts` | Locales, paths, `t()` (en-us spelling, catalogue lookup), and number and date formats |
| `locales/<locale>/messages.json` | Translation catalogues (cy-gb Welsh; zh-cn and zh-001 Simplified Chinese; hi-in and hi-001 Hindi; ar-eg and ar-001 Arabic, right to left; es-mx, es-001, and es-es Spanish; fr-fr, fr-001, and fr-ca French; ru-ru, ru-001, and ru-by Russian; bn-bd, bn-001, and bn-in Bengali; id-id, id-001, and id-my Indonesian; th-th and th-001 Thai; ja-jp and ja-001 Japanese; ko-kr and ko-001 Korean; sw-tz and sw-001 Swahili; sv-se and sv-001 Swedish; nl-nl and nl-001 Dutch; vi-vn and vi-001 Vietnamese; de-de, de-001, and de-at German; pt-br, pt-001, and pt-pt Portuguese; ur-001 Urdu, right to left; da-001 Danish), keyed by English source text; see `locales/README.md` |
| `src/lib/ui.ts` | Interface strings and accessible names |
| `.github/workflows/deploy.yml` | Check, test with coverage, build, and deploy to GitHub Pages |
| `.github/dependabot.yml` | Weekly npm and GitHub Actions update pull requests |
| `LICENSE.md`, `LICENSES/` | The site's licence choice (MIT, Apache-2.0, BSD-3-Clause, GPL-2.0-only, GPL-3.0-only, OGL-UK-3.0, or CC-BY-SA-4.0) and each licence text |

## Commands

Use **pnpm**, never npm or yarn.

```sh
pnpm install
pnpm dev          # copies Lily themes, starts the dev server
pnpm run check    # svelte-check: must report 0 errors and 0 warnings
pnpm test         # vitest unit tests
pnpm run coverage # the same tests; fails below 100% coverage of the TypeScript modules (routes included), or of
                  # the statements, functions, and lines of every component and page (CI runs this)
pnpm run build    # prerenders every page in every locale into build/
pnpm run preview  # serve build/ (restart it after each rebuild)
pnpm stats        # refresh stats.json from GitHub, crates.io, and RubyGems; review the diff
BASE_PATH=/preview pnpm run build   # optional: preview under a sub-path (production has none)
```

A change is done when `check`, `coverage` (or `test`), and `build` all pass.

Keep `typescript` on `^6`: TypeScript 7 has no JavaScript compiler API, and SvelteKit
refuses to run without it (`typescript_compiler_api_missing`). Dependabot opens a
weekly pull request for each npm and GitHub Actions update; merge one only after the
checks above pass on it.

## SvelteKit 3 notes

- Configuration lives in `vite.config.ts`; there is no `svelte.config.js`.
- Use `#lib/…` imports with extensions (`#lib/locales.js`, `#lib/components/X.svelte`).
  `src/params.ts` runs in plain Node, so it imports `#lib/locales.ts`.
- `base` is no longer exported by `$app/paths`. Import `base` from `#lib/base.js`.
- Param matchers live in `src/params.ts`, via `defineParams`. Hook types come from
  `@sveltejs/kit/hooks`.
- Use the Svelte MCP server's documentation for anything else that is version-specific.

## Rules

- **Never fabricate** statistics, citations, endorsements, users, or affiliations.
  Numbers come only from `stats.json`; recognition only with a public link. If a fact
  is not sourced, leave it out and note it under spec § Open items.
- **Keep private information out.** Personal research material contains private data
  (salary, recommenders, contacts). Never copy it into this public repository or site.
- **Independence**: keep the notices that these are personal projects, not products
  of, or endorsed by, any employer or health organisation. Do not name the
  author's employer or specific health organisations.
- **Clinical safety**: keep the notices on the health and digital health teams pages.
- **Write content once** in international / British English, and pass every visible
  string through `t(locale, text)`. en-us spelling is derived; add missing words to its
  list, with a test. Every new or changed string needs an entry in every
  catalogue (`locales/cy-gb`, `locales/zh-cn`, `locales/zh-001`, which is a copy of zh-cn, `locales/hi-in`, `locales/hi-001`, which is a copy of hi-in, `locales/ar-eg`, `locales/ar-001`, which is a copy of ar-eg, `locales/es-mx`, `locales/es-001`, which is a copy of es-mx, `locales/es-es`, which is es-mx tuned for Spain, `locales/fr-fr`, `locales/fr-001`, which is a copy of fr-fr, `locales/fr-ca`, which is fr-fr tuned for Canada, `locales/ru-ru`, `locales/ru-001` and `locales/ru-by`, which are copies of ru-ru, `locales/bn-bd`, `locales/bn-001` and `locales/bn-in`, which are copies of bn-bd, `locales/id-id`, and `locales/id-001` and `locales/id-my`, which are copies of id-id, `locales/th-th`, `locales/th-001`, which is a copy of th-th, `locales/ja-jp`, `locales/ja-001`, which is a copy of ja-jp, `locales/ko-kr`, `locales/ko-001`, which is a copy of ko-kr, `locales/sw-tz`, `locales/sw-001`, which is a copy of sw-tz, `locales/sv-se`, `locales/sv-001`, which is a copy of sv-se, `locales/nl-nl`, `locales/nl-001`, which is a copy of nl-nl, `locales/vi-vn`, `locales/vi-001`, which is a copy of vi-vn, `locales/de-de`, `locales/de-001`, which is a copy of de-de, `locales/de-at`, which is de-de tuned for Austria, `locales/pt-br`, `locales/pt-001`, which is a copy of pt-br, `locales/pt-pt`, which is pt-br tuned for Portugal, `locales/ur-001`, `locales/da-001`): run `I18N_STRICT=1 pnpm run build` (as CI does).
- **Add a page** by adding it to `src/lib/pages.ts`, then creating
  `src/routes/[locale=locale]/<slug>/+page.svelte`. Every page lives under a locale
  prefix (`/en-001/…`); the root `/` is only the language chooser.
- **Add a project** by adding it to `projects.ts`, and adding any stats key to
  `stats.json`.
- **Lily**: use npm packages, not vendored copies; Lily default themes only, with no
  custom themes; all accessible names from `ui.ts`. Do not edit `static/themes/`
  (it is generated).
- **Style** with theme tokens (`--color-*`, `--lily-*`), so that every theme works.
- Refer to the author by name, not by pronoun.
- Commit or deploy only when asked.
