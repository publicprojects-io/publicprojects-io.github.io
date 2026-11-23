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

Some English text is used two ways: "GitHub stars" follows a number on the home
page and project cards ("16.5K+ GitHub stars"), and can stand alone as a label,
through `t(locale, text, 'label')`. The plain entry is the form after a number, in lower case like
"downloads". Where the stand-alone label differs, add it as `"label|GitHub stars"`
(Russian "звёзд на GitHub" after a number, "Звёзды на GitHub" as a label).
Languages that need only one form leave the `label|` entry out.

Words after an exact count on project cards ("753 GitHub stars", "120 downloads")
follow the language's plural rules. Add `"<category>|<text>"` for each
[plural category](https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html)
whose form differs from the plain entry. Russian, whose plain entries are the "many"
form, adds `one|` and `few|`: "1 звезда", "753 звезды", "5 звёзд".

After a compact count ("16 ألف", "2,8 млн") the words follow the unit word, not the
count. Add `"compact|<text>"` where that form differs from the plain entry. Arabic,
whose plain entries are the plural for 3 to 10, adds `one|`, `two|`, `many|`,
`other|`, and `compact|`: "1 تنزيل", "2 تنزيلان", "5 تنزيلات", "85 تنزيلًا",
"3,801 تنزيل", "93 مليون تنزيل".

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
| [`th-th`](th-th/messages.json) | ไทย (ประเทศไทย) (Thai, Thailand) | Draft: needs review by a first-language Thai speaker |
| [`th-001`](th-001/messages.json) | ไทย (โลก) (Thai, World) | Draft: a copy of `th-th`; keep the two in step |
| [`ja-jp`](ja-jp/messages.json) | 日本語（日本） (Japanese, Japan) | Draft: needs review by a first-language Japanese speaker |
| [`ja-001`](ja-001/messages.json) | 日本語（世界） (Japanese, World) | Draft: a copy of `ja-jp`; keep the two in step |
| [`ko-kr`](ko-kr/messages.json) | 한국어(대한민국) (Korean, South Korea) | Draft: needs review by a first-language Korean speaker |
| [`ko-001`](ko-001/messages.json) | 한국어(세계) (Korean, World) | Draft: a copy of `ko-kr`; keep the two in step |
| [`sw-tz`](sw-tz/messages.json) | Kiswahili (Tanzania) (Swahili, Tanzania) | Draft: needs review by a first-language Swahili speaker |
| [`sw-001`](sw-001/messages.json) | Kiswahili (Dunia) (Swahili, World) | Draft: a copy of `sw-tz`; keep the two in step |
| [`sv-se`](sv-se/messages.json) | Svenska (Sverige) (Swedish, Sweden) | Draft: needs review by a first-language Swedish speaker |
| [`sv-001`](sv-001/messages.json) | Svenska (världen) (Swedish, World) | Draft: a copy of `sv-se`; keep the two in step |
| [`nl-nl`](nl-nl/messages.json) | Nederlands (Nederland) (Dutch, Netherlands) | Draft: needs review by a first-language Dutch speaker |
| [`nl-001`](nl-001/messages.json) | Nederlands (wereld) (Dutch, World) | Draft: a copy of `nl-nl`; keep the two in step |
| [`vi-vn`](vi-vn/messages.json) | Tiếng Việt (Việt Nam) (Vietnamese, Vietnam) | Draft: needs review by a first-language Vietnamese speaker |
| [`vi-001`](vi-001/messages.json) | Tiếng Việt (Thế giới) (Vietnamese, World) | Draft: a copy of `vi-vn`; keep the two in step |
| [`de-de`](de-de/messages.json) | Deutsch (Deutschland) (German, Germany) | Draft: needs review by a first-language German speaker |
| [`de-001`](de-001/messages.json) | Deutsch (Welt) (German, World) | Draft: a copy of `de-de`; keep the two in step |
| [`de-at`](de-at/messages.json) | Deutsch (Österreich) (German, Austria) | Draft: `de-de` tuned for Austria; keep it in step with `de-de` |
| [`pt-br`](pt-br/messages.json) | Português (Brasil) (Portuguese, Brazil) | Draft: needs review by a first-language Portuguese speaker |
| [`pt-001`](pt-001/messages.json) | Português (Mundo) (Portuguese, World) | Draft: a copy of `pt-br`; keep the two in step |
| [`pt-pt`](pt-pt/messages.json) | Português (Portugal) (Portuguese, Portugal) | Draft: `pt-br` tuned for Portugal; keep it in step with `pt-br` |
| [`ur-001`](ur-001/messages.json) | اردو (دنیا) (Urdu, World) | Draft: needs review by a first-language Urdu speaker; right to left |
| [`da-001`](da-001/messages.json) | Dansk (verden) (Danish, World) | Draft: needs review by a first-language Danish speaker |

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
