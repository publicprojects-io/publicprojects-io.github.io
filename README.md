# Public Projects website

Source for [publicprojects.io](https://publicprojects.io): public open source for the
global good.

The site presents Joel Parker Henderson's free, open source projects in health care,
public value, and software engineering, with dated statistics that anyone can check,
in 20+ languages.

It is a static [SvelteKit](https://svelte.dev/docs/kit) site, built with the
[Lily Design System](https://github.com/LilyDesignSystem/lily-design-system) and
deployed to GitHub Pages on every push to `main`.

## Quick start

Use [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev                       # start the dev server
pnpm run check                 # type and Svelte checks: 0 errors, 0 warnings
pnpm run coverage              # unit and component tests, with coverage thresholds
I18N_STRICT=1 pnpm run build   # prerender every page in every locale into build/
```

## Where things live

- [`spec/index.md`](spec/index.md): the website specification, which is the source of truth.
- [`AGENTS.md`](AGENTS.md): instructions for contributors and AI coding agents.
- `src/lib/data/projects.ts`: the project catalogue.
- `src/lib/data/stats.json`: the dated statistics snapshot, refreshed with `pnpm stats`.
- `locales/`: translation catalogues; see [`locales/README.md`](locales/README.md).

## Contributing and security

See [publicprojects.io/en-001/contribute](https://publicprojects.io/en-001/contribute)
for how to help. Please report security issues privately, as described in
[`SECURITY.md`](SECURITY.md).

## License

See [`LICENSE.md`](LICENSE.md).
