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
| [`zh-cn`](zh-cn/messages.json) | 中文（中国） (Simplified Chinese, China) | Draft: needs review by a first-language Chinese speaker |
| [`zh-001`](zh-001/messages.json) | 中文（世界） (Simplified Chinese, World) | Draft: a copy of `zh-cn`; keep the two in step |
| [`hi-in`](hi-in/messages.json) | हिन्दी (भारत) (Hindi, India) | Draft: needs review by a first-language Hindi speaker |
| [`hi-001`](hi-001/messages.json) | हिन्दी (विश्व) (Hindi, World) | Draft: a copy of `hi-in`; keep the two in step |
| [`ar-eg`](ar-eg/messages.json) | العربية (مصر) (Arabic, Egypt) | Draft: needs review by a first-language Arabic speaker |
| [`ar-001`](ar-001/messages.json) | العربية (العالم) (Arabic, World) | Draft: a copy of `ar-eg`; keep the two in step |
| [`es-mx`](es-mx/messages.json) | Español (México) (Spanish, Mexico) | Draft: needs review by a first-language Spanish speaker |
| [`es-001`](es-001/messages.json) | Español (Mundo) (Spanish, World) | Draft: a copy of `es-mx`; keep the two in step |
| [`es-es`](es-es/messages.json) | Español (España) (Spanish, Spain) | Draft: `es-mx` tuned for Spain; keep it in step with `es-mx` |
| [`fr-fr`](fr-fr/messages.json) | Français (France) (French, France) | Draft: needs review by a first-language French speaker |
| [`fr-001`](fr-001/messages.json) | Français (Monde) (French, World) | Draft: a copy of `fr-fr`; keep the two in step |
| [`fr-ca`](fr-ca/messages.json) | Français (Canada) (French, Canada) | Draft: `fr-fr` tuned for Canada; keep it in step with `fr-fr` |
| [`ru-ru`](ru-ru/messages.json) | Русский (Россия) (Russian, Russia) | Draft: needs review by a first-language Russian speaker |
| [`ru-001`](ru-001/messages.json) | Русский (Мир) (Russian, World) | Draft: a copy of `ru-ru`; keep the two in step |
| [`ru-by`](ru-by/messages.json) | Русский (Беларусь) (Russian, Belarus) | Draft: a copy of `ru-ru`, since written Russian in Belarus follows the same standard; keep the two in step |
| [`bn-bd`](bn-bd/messages.json) | বাংলা (বাংলাদেশ) (Bengali, Bangladesh) | Draft: needs review by a first-language Bengali speaker |
| [`bn-001`](bn-001/messages.json) | বাংলা (বিশ্ব) (Bengali, World) | Draft: a copy of `bn-bd`; keep the two in step |
| [`bn-in`](bn-in/messages.json) | বাংলা (ভারত) (Bengali, India) | Draft: a copy of `bn-bd`, since the site uses no wording that differs between Bangladesh and India; keep the two in step |
| [`id-id`](id-id/messages.json) | Bahasa Indonesia (Indonesia) (Indonesian, Indonesia) | Draft: needs review by a first-language Indonesian speaker |
| [`id-001`](id-001/messages.json) | Bahasa Indonesia (Dunia) (Indonesian, World) | Draft: a copy of `id-id`; keep the two in step |
| [`id-my`](id-my/messages.json) | Bahasa Indonesia (Malaysia) (Indonesian, Malaysia) | Draft: a copy of `id-id`, for Indonesian speakers in Malaysia (Malay itself would be its own `ms` locale); keep the two in step |

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
