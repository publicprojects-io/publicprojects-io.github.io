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
| `src/lib/locales.ts` | Locales, paths, en-us spelling, and number and date formats |
| `src/lib/ui.ts` | Interface strings and accessible names |
| `.github/workflows/deploy.yml` | Check, test, build, and deploy to GitHub Pages |

## Commands

Use **pnpm**, never npm or yarn.

```sh
pnpm install
pnpm dev          # copies Lily themes, starts the dev server
pnpm run check    # svelte-check: must report 0 errors and 0 warnings
pnpm test         # vitest unit tests
pnpm run build    # prerenders every page in every locale into build/
pnpm run preview  # serve build/ (restart it after each rebuild)
pnpm stats        # refresh stats.json from GitHub, crates.io, and RubyGems; review the diff
BASE_PATH=/preview pnpm run build   # optional: preview under a sub-path (production has none)
```

A change is done when `check`, `test`, and `build` all pass.

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
  of, or endorsed by, NHS Wales, DHCW, or any employer.
- **Clinical safety**: keep the notices on the health and NHS Wales pages.
- **Write content once** in international / British English. en-us spelling is derived
  by `spell()`; add missing words to its list, with a test.
- **Add a page** by adding it to `src/lib/pages.ts`, then creating
  `src/routes/[[locale=locale]]/<slug>/+page.svelte`.
- **Add a project** by adding it to `projects.ts`, and adding any stats key to
  `stats.json`.
- **Lily**: use npm packages, not vendored copies; Lily default themes only, with no
  custom themes; all accessible names from `ui.ts`. Do not edit `static/themes/`
  (it is generated).
- **Style** with theme tokens (`--color-*`, `--lily-*`), so that every theme works.
- Refer to the author by name, not by pronoun.
- Commit or deploy only when asked.
