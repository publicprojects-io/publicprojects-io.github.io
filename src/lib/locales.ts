// Locales. Content is written once, in the international / British English
// that en-001 and en-gb share. `t(locale, text)` gives the text for a locale:
// en-us spelling is derived by rule; Welsh (cy-gb), Simplified Chinese
// (zh-cn, zh-001), Hindi (hi-in, hi-001), Arabic (ar-eg, ar-001), Spanish (es-mx,
// es-001, es-es), French (fr-fr, fr-001, fr-ca), Russian (ru-ru, ru-001, ru-by),
// Bengali (bn-bd, bn-001, bn-in), Indonesian (id-id, id-001, id-my), Thai (th-th, th-001), Japanese (ja-jp, ja-001), Korean (ko-kr, ko-001), Swahili (sw-tz, sw-001), Swedish (sv-se, sv-001), Dutch (nl-nl, nl-001), Vietnamese (vi-vn, vi-001), German (de-de, de-001, de-at), Portuguese (pt-br, pt-001, pt-pt), Urdu (ur-001), and Danish (da-001) come from the catalogues in locales/<locale>/messages.json,
// keyed by the English source text. Dates and
// numbers come from Intl. See spec/index.md § Locales.
import cyGb from '../../locales/cy-gb/messages.json' with { type: 'json' };
import zhCn from '../../locales/zh-cn/messages.json' with { type: 'json' };
import zh001 from '../../locales/zh-001/messages.json' with { type: 'json' };
import hiIn from '../../locales/hi-in/messages.json' with { type: 'json' };
import hi001 from '../../locales/hi-001/messages.json' with { type: 'json' };
import arEg from '../../locales/ar-eg/messages.json' with { type: 'json' };
import ar001 from '../../locales/ar-001/messages.json' with { type: 'json' };
import esMx from '../../locales/es-mx/messages.json' with { type: 'json' };
import es001 from '../../locales/es-001/messages.json' with { type: 'json' };
import esEs from '../../locales/es-es/messages.json' with { type: 'json' };
import frFr from '../../locales/fr-fr/messages.json' with { type: 'json' };
import fr001 from '../../locales/fr-001/messages.json' with { type: 'json' };
import frCa from '../../locales/fr-ca/messages.json' with { type: 'json' };
import ruRu from '../../locales/ru-ru/messages.json' with { type: 'json' };
import ru001 from '../../locales/ru-001/messages.json' with { type: 'json' };
import ruBy from '../../locales/ru-by/messages.json' with { type: 'json' };
import bnBd from '../../locales/bn-bd/messages.json' with { type: 'json' };
import bn001 from '../../locales/bn-001/messages.json' with { type: 'json' };
import bnIn from '../../locales/bn-in/messages.json' with { type: 'json' };
import idId from '../../locales/id-id/messages.json' with { type: 'json' };
import id001 from '../../locales/id-001/messages.json' with { type: 'json' };
import idMy from '../../locales/id-my/messages.json' with { type: 'json' };
import thTh from '../../locales/th-th/messages.json' with { type: 'json' };
import th001 from '../../locales/th-001/messages.json' with { type: 'json' };
import jaJp from '../../locales/ja-jp/messages.json' with { type: 'json' };
import ja001 from '../../locales/ja-001/messages.json' with { type: 'json' };
import koKr from '../../locales/ko-kr/messages.json' with { type: 'json' };
import ko001 from '../../locales/ko-001/messages.json' with { type: 'json' };
import swTz from '../../locales/sw-tz/messages.json' with { type: 'json' };
import sw001 from '../../locales/sw-001/messages.json' with { type: 'json' };
import svSe from '../../locales/sv-se/messages.json' with { type: 'json' };
import sv001 from '../../locales/sv-001/messages.json' with { type: 'json' };
import nlNl from '../../locales/nl-nl/messages.json' with { type: 'json' };
import nl001 from '../../locales/nl-001/messages.json' with { type: 'json' };
import viVn from '../../locales/vi-vn/messages.json' with { type: 'json' };
import vi001 from '../../locales/vi-001/messages.json' with { type: 'json' };
import deDe from '../../locales/de-de/messages.json' with { type: 'json' };
import de001 from '../../locales/de-001/messages.json' with { type: 'json' };
import deAt from '../../locales/de-at/messages.json' with { type: 'json' };
import ptBr from '../../locales/pt-br/messages.json' with { type: 'json' };
import pt001 from '../../locales/pt-001/messages.json' with { type: 'json' };
import ptPt from '../../locales/pt-pt/messages.json' with { type: 'json' };
import ur001 from '../../locales/ur-001/messages.json' with { type: 'json' };
import da001 from '../../locales/da-001/messages.json' with { type: 'json' };

export const LOCALES = ['en-001', 'en-gb', 'en-us', 'cy-gb', 'zh-cn', 'zh-001', 'hi-in', 'hi-001', 'ar-eg', 'ar-001', 'es-mx', 'es-001', 'es-es', 'fr-fr', 'fr-001', 'fr-ca', 'ru-ru', 'ru-001', 'ru-by', 'bn-bd', 'bn-001', 'bn-in', 'id-id', 'id-001', 'id-my', 'th-th', 'th-001', 'ja-jp', 'ja-001', 'ko-kr', 'ko-001', 'sw-tz', 'sw-001', 'sv-se', 'sv-001', 'nl-nl', 'nl-001', 'vi-vn', 'vi-001', 'de-de', 'de-001', 'de-at', 'pt-br', 'pt-001', 'pt-pt', 'ur-001', 'da-001'] as const;
export type Locale = (typeof LOCALES)[number];

/**
 * en-001 (English, World) is the default: the fallback when a visitor's browser
 * prefers no supported language. Every locale, including the default, lives under
 * a /<locale>/ prefix, like lilydesignsystem.com. The bare site root is a language
 * chooser that redirects to the visitor's preferred locale.
 */
export const DEFAULT_LOCALE: Locale = 'en-001';

export const LOCALE_LABELS: Record<Locale, string> = {
	'en-001': 'English (World)',
	'en-gb': 'English (United Kingdom)',
	'en-us': 'English (United States)',
	'cy-gb': 'Cymraeg (Y Deyrnas Unedig)',
	'zh-cn': '中文（中国）',
	'zh-001': '中文（世界）',
	'hi-in': 'हिन्दी (भारत)',
	'hi-001': 'हिन्दी (विश्व)',
	'ar-eg': 'العربية (مصر)',
	'ar-001': 'العربية (العالم)',
	'es-mx': 'Español (México)',
	'es-001': 'Español (Mundo)',
	'es-es': 'Español (España)',
	'fr-fr': 'Français (France)',
	'fr-001': 'Français (Monde)',
	'fr-ca': 'Français (Canada)',
	'ru-ru': 'Русский (Россия)',
	'ru-001': 'Русский (Мир)',
	'ru-by': 'Русский (Беларусь)',
	'bn-bd': 'বাংলা (বাংলাদেশ)',
	'bn-001': 'বাংলা (বিশ্ব)',
	'bn-in': 'বাংলা (ভারত)',
	'id-id': 'Bahasa Indonesia (Indonesia)',
	'id-001': 'Bahasa Indonesia (Dunia)',
	'id-my': 'Bahasa Indonesia (Malaysia)',
	'th-th': 'ไทย (ประเทศไทย)',
	'th-001': 'ไทย (โลก)',
	'ja-jp': '日本語（日本）',
	'ja-001': '日本語（世界）',
	'ko-kr': '한국어(대한민국)',
	'ko-001': '한국어(세계)',
	'sw-tz': 'Kiswahili (Tanzania)',
	'sw-001': 'Kiswahili (Dunia)',
	'sv-se': 'Svenska (Sverige)',
	'sv-001': 'Svenska (världen)',
	'nl-nl': 'Nederlands (Nederland)',
	'nl-001': 'Nederlands (wereld)',
	'vi-vn': 'Tiếng Việt (Việt Nam)',
	'vi-001': 'Tiếng Việt (Thế giới)',
	'de-de': 'Deutsch (Deutschland)',
	'de-001': 'Deutsch (Welt)',
	'de-at': 'Deutsch (Österreich)',
	'pt-br': 'Português (Brasil)',
	'pt-001': 'Português (Mundo)',
	'pt-pt': 'Português (Portugal)',
	'ur-001': 'اردو (دنیا)',
	'da-001': 'Dansk (verden)'
};

/** BCP 47 tag with canonical case, for <html lang>, hreflang, and Intl. */
export const LOCALE_TAGS: Record<Locale, string> = {
	'en-001': 'en-001',
	'en-gb': 'en-GB',
	'en-us': 'en-US',
	'cy-gb': 'cy-GB',
	'zh-cn': 'zh-CN',
	'zh-001': 'zh-001',
	'hi-in': 'hi-IN',
	'hi-001': 'hi-001',
	'ar-eg': 'ar-EG',
	'ar-001': 'ar-001',
	'es-mx': 'es-MX',
	'es-001': 'es-001',
	'es-es': 'es-ES',
	'fr-fr': 'fr-FR',
	'fr-001': 'fr-001',
	'fr-ca': 'fr-CA',
	'ru-ru': 'ru-RU',
	'ru-001': 'ru-001',
	'ru-by': 'ru-BY',
	'bn-bd': 'bn-BD',
	'bn-001': 'bn-001',
	'bn-in': 'bn-IN',
	'id-id': 'id-ID',
	'id-001': 'id-001',
	'id-my': 'id-MY',
	'th-th': 'th-TH',
	'th-001': 'th-001',
	'ja-jp': 'ja-JP',
	'ja-001': 'ja-001',
	'ko-kr': 'ko-KR',
	'ko-001': 'ko-001',
	'sw-tz': 'sw-TZ',
	'sw-001': 'sw-001',
	'sv-se': 'sv-SE',
	'sv-001': 'sv-001',
	'nl-nl': 'nl-NL',
	'nl-001': 'nl-001',
	'vi-vn': 'vi-VN',
	'vi-001': 'vi-001',
	'de-de': 'de-DE',
	'de-001': 'de-001',
	'de-at': 'de-AT',
	'pt-br': 'pt-BR',
	'pt-001': 'pt-001',
	'pt-pt': 'pt-PT',
	'ur-001': 'ur-001',
	'da-001': 'da-001'
};

/** Text direction for <html dir> and for any element that shows a locale's own name. */
export function localeDir(locale: Locale): 'ltr' | 'rtl' {
	return locale.startsWith('ar-') || locale.startsWith('ur-') ? 'rtl' : 'ltr';
}

/**
 * The tag Intl formats with. Arabic and Bengali use Western digits: ar-EG would
 * otherwise use Arabic-Indic digits (٩٦٬٣٨٦) and bn-BD Bengali digits (৯,৬৩,৮৬,৮৭২),
 * while the text around them, such as "FHIR R5" and version numbers, keeps Western
 * digits. Bengali keeps its lakh and crore grouping ("9,63,86,872", "9.6 কো"). es-001 is a copy of es-mx, so
 * it formats like es-MX ("96,386,872"), not like Spain ("96.386.872").
 */
function intlTag(locale: Locale): string {
	if (locale === 'es-001') return 'es-MX';
	return locale.startsWith('ar-') || locale.startsWith('bn-') ? `${LOCALE_TAGS[locale]}-u-nu-latn` : LOCALE_TAGS[locale];
}

export function isLocale(value: string | undefined): value is Locale {
	return (LOCALES as readonly string[]).includes(value ?? '');
}

/** The path of a page in a locale, without the base path. `slug` has no leading or trailing slash. */
export function localePath(locale: Locale, slug = ''): string {
	return slug ? `/${locale}/${slug}/` : `/${locale}/`;
}

/**
 * Splits a path (without the base path) into its locale and slug. A path with no
 * locale prefix (the root chooser, or an old unprefixed link) reports the default
 * locale and `prefixed: false`.
 */
export function parsePath(pathname: string): { locale: Locale; slug: string; prefixed: boolean } {
	const parts = pathname.split('/').filter(Boolean);
	if (isLocale(parts[0])) return { locale: parts[0], slug: parts.slice(1).join('/'), prefixed: true };
	return { locale: DEFAULT_LOCALE, slug: parts.join('/'), prefixed: false };
}

/**
 * The supported locale that best matches a browser's language preferences
 * (navigator.languages): an exact match, then language plus region, then the
 * language's world (-001) variant, then any locale in that language (cy → cy-gb).
 * Null when nothing matches.
 */
export function pickLocale(preferred: readonly string[]): Locale | null {
	for (const raw of preferred) {
		const parts = raw.trim().toLowerCase().replace(/_/g, '-').split('-').filter(Boolean);
		if (!parts.length) continue;
		const region = parts.slice(1).find((part) => /^([a-z]{2}|\d{3})$/.test(part));
		for (const candidate of [parts.join('-'), region ? `${parts[0]}-${region}` : '', `${parts[0]}-001`]) {
			if (isLocale(candidate)) return candidate;
		}
		const sameLanguage = LOCALES.find((locale) => locale.startsWith(`${parts[0]}-`));
		if (sameLanguage) return sameLanguage;
	}
	return null;
}

/**
 * Inline script for the site root: sends the browser to `pickLocale()` of its
 * languages, or to the default locale when it has none or none match. It runs
 * as the page's head is parsed, before the app loads, so there is no wait.
 * Plain ES5 so it runs in any browser; tests check it agrees with `pickLocale()`.
 */
export function rootRedirectScript(base = ''): string {
	return `(function () {
	var L = ${JSON.stringify(LOCALES)};
	function has(c) { return L.indexOf(c) !== -1; }
	function pick(prefs) {
		for (var i = 0; i < prefs.length; i++) {
			var parts = String(prefs[i] || '').trim().toLowerCase().replace(/_/g, '-').split('-').filter(Boolean);
			if (!parts.length) continue;
			var region = '';
			for (var j = 1; j < parts.length; j++) if (/^([a-z]{2}|\\d{3})$/.test(parts[j])) { region = parts[j]; break; }
			var tries = [parts.join('-'), region ? parts[0] + '-' + region : '', parts[0] + '-001'];
			for (var k = 0; k < tries.length; k++) if (has(tries[k])) return tries[k];
			for (var m = 0; m < L.length; m++) if (L[m].indexOf(parts[0] + '-') === 0) return L[m];
		}
		return null;
	}
	var nav = window.navigator || {};
	var prefs = nav.languages && nav.languages.length ? nav.languages : [nav.language];
	location.replace(${JSON.stringify(base)} + '/' + (pick(prefs) || ${JSON.stringify(DEFAULT_LOCALE)}) + '/');
})();`;
}

// British → American spelling. Whole words only, so names such as
// "World Health Organization" (already American) are untouched.
const WORDS: Record<string, string> = {
	analyse: 'analyze',
	analysed: 'analyzed',
	analysing: 'analyzing',
	behaviour: 'behavior',
	behaviours: 'behaviors',
	catalogue: 'catalog',
	catalogues: 'catalogs',
	centre: 'center',
	centred: 'centered',
	centres: 'centers',
	colour: 'color',
	colours: 'colors',
	defence: 'defense',
	favour: 'favor',
	honour: 'honor',
	judgement: 'judgment',
	labour: 'labor',
	licence: 'license',
	licences: 'licenses',
	paediatric: 'pediatric',
	programme: 'program',
	programmes: 'programs',
	travelling: 'traveling'
};

// -ise / -isation verbs and nouns: organise, organisation, recognised, …
const ISE_STEMS = [
	'author', 'categor', 'character', 'digit', 'emphas', 'global', 'international', 'local', 'maxim',
	'minim', 'modern', 'optim', 'organ', 'personal', 'priorit', 'real', 'recogn', 'special',
	'standard', 'summar', 'util', 'visual'
];
const ISE = new RegExp(`\\b(${ISE_STEMS.join('|')})is(e|ed|es|ing|ation|ations|er|ers)\\b`, 'gi');
const WORD = new RegExp(`\\b(${Object.keys(WORDS).join('|')})\\b`, 'gi');

function matchCase(source: string, target: string): string {
	return source[0] === source[0].toUpperCase() ? target[0].toUpperCase() + target.slice(1) : target;
}

const CATALOGUES: Partial<Record<Locale, Record<string, string>>> = { 'cy-gb': cyGb, 'zh-cn': zhCn, 'zh-001': zh001, 'hi-in': hiIn, 'hi-001': hi001, 'ar-eg': arEg, 'ar-001': ar001, 'es-mx': esMx, 'es-001': es001, 'es-es': esEs, 'fr-fr': frFr, 'fr-001': fr001, 'fr-ca': frCa, 'ru-ru': ruRu, 'ru-001': ru001, 'ru-by': ruBy, 'bn-bd': bnBd, 'bn-001': bn001, 'bn-in': bnIn, 'id-id': idId, 'id-001': id001, 'id-my': idMy, 'th-th': thTh, 'th-001': th001, 'ja-jp': jaJp, 'ja-001': ja001, 'ko-kr': koKr, 'ko-001': ko001, 'sw-tz': swTz, 'sw-001': sw001, 'sv-se': svSe, 'sv-001': sv001, 'nl-nl': nlNl, 'nl-001': nl001, 'vi-vn': viVn, 'vi-001': vi001, 'de-de': deDe, 'de-001': de001, 'de-at': deAt, 'pt-br': ptBr, 'pt-001': pt001, 'pt-pt': ptPt, 'ur-001': ur001, 'da-001': da001 };

/** Locales translated from a catalogue. Their translations are drafts until reviewed, so their pages show a notice. */
export function isTranslated(locale: Locale): boolean {
	return locale in CATALOGUES;
}
const reported = new Set<string>();

/**
 * Text for `locale`: unchanged for en-001 and en-gb, American spelling for
 * en-us, and the catalogue translation for other locales. A missing translation falls
 * back to English and is reported once (I18N_MISSING) during the build; set
 * I18N_STRICT=1 to make it fail the build instead.
 */
export function t(locale: Locale, text: string): string {
	const catalogue = CATALOGUES[locale];
	if (catalogue) {
		const translated = catalogue[text];
		if (translated !== undefined) return translated;
		if (!reported.has(text)) {
			reported.add(text);
			if (typeof process !== 'undefined' && process.env?.I18N_STRICT) throw new Error(`Missing ${locale} translation: ${text}`);
			console.warn(`I18N_MISSING ${locale} ${JSON.stringify(text)}`);
		}
		return text;
	}
	if (locale !== 'en-us') return text;
	return text
		.replace(WORD, (word) => matchCase(word, WORDS[word.toLowerCase()]))
		.replace(ISE, (_, stem: string, suffix: string) => `${stem}iz${suffix}`);
}

/**
 * The words after a count, such as "GitHub stars" in "753 GitHub stars", in the plural
 * form `locale` uses for that count. A catalogue may hold `"<category>|<text>"`, where
 * category is an Intl.PluralRules category (one, two, few, many, zero), for example
 * Russian "few|GitHub stars" ("753 звезды на GitHub"); without one, the plain entry
 * is used. A compact count ("16,5 тыс.", "16 ألف") is followed by its unit word, not
 * the count itself, so it uses `"compact|<text>"` (Arabic "16 ألف نجمة على GitHub"),
 * else the plain entry (Russian "16,5 тыс. звёзд на GitHub").
 */
export function tCount(locale: Locale, text: string, count: number, compact = false): string {
	const catalogue = CATALOGUES[locale];
	if (catalogue) {
		const category = compact ? 'compact' : new Intl.PluralRules(intlTag(locale)).select(count);
		const translated = catalogue[`${category}|${text}`];
		if (translated !== undefined) return translated;
	}
	return t(locale, text);
}

/**
 * A number for `locale`. Compact numbers are truncated, never rounded up, because
 * the site shows them with a "+" ("96.3M+"). Chinese, Japanese, Korean, Hindi, Arabic, and Urdu units are wide words
 * (万, हज़ार, مليون, ہزار), so once the number before the unit has two or more digits the decimal
 * is dropped, to fit the stat cards ("9638万+", "16 हज़ार+").
 */
export function formatNumber(locale: Locale, value: number, compact = false): string {
	if (!compact) return new Intl.NumberFormat(intlTag(locale)).format(value);
	const format = (digits: number) =>
		new Intl.NumberFormat(intlTag(locale), { notation: 'compact', maximumFractionDigits: digits, roundingMode: 'trunc' }).format(value);
	const text = format(1);
	const wideUnits = locale.startsWith('zh-') || locale.startsWith('ja-') || locale.startsWith('ko-') || locale.startsWith('hi-') || locale.startsWith('ar-') || locale.startsWith('ur-');
	return wideUnits && /\d{2}/.test(text) ? format(0) : text;
}

/**
 * A long date for `locale`. Russian drops the trailing "г." ("21 ноября 2026", not
 * "21 ноября 2026 г."), because the site often puts a full stop straight after a date.
 */
export function formatDate(locale: Locale, isoDate: string): string {
	const text = new Intl.DateTimeFormat(intlTag(locale), { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${isoDate}T00:00:00Z`));
	return locale.startsWith('ru-') ? text.replace(/\s*г\.$/, '') : text;
}
