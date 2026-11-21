# Locales

Translations for the Public Projects website.

The site's text is written once, in international / British English, in the
source code. Each translated locale has a folder here with a `messages.json`
catalogue that maps each English source string to its translation:

```json
{
	"Home": "Hafan",
	"Software engineering": "Peirianneg meddalwedd"
}
```

| Locale | Language | Status |
| --- | --- | --- |
| [`cy-gb`](cy-gb/messages.json) | Cymraeg (Welsh, United Kingdom) | Draft: needs review by a first-language Welsh speaker |

English locales (`en-001`, `en-gb`, `en-us`) need no catalogue: `en-us` spelling is
derived by rule in `src/lib/locales.ts`.

## Reviewing or editing a translation

1. Edit the value, never the key. The key must match the English source exactly.
2. Keep the same meaning, links, and numbers. Some strings are fragments that sit
   either side of a link or a number; read the page to see the context.
3. Run `pnpm run build`. It prints `I18N_MISSING` for any English text that has
   no translation. `I18N_STRICT=1 pnpm run build` fails instead, and CI runs it that
   way.

When English text changes in the source, its old key stops matching. The build then
reports the new text as missing, so add its translation here and delete the old
entry.
