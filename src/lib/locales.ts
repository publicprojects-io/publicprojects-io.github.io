// Locales. Content is written once, in the international / British English
// that en-001 and en-gb share. `t(locale, text)` gives the text for a locale:
// en-us spelling is derived by rule; Welsh (cy-gb) comes from the catalogue in
// locales/cy-gb/messages.json, keyed by the English source text. Dates and
// numbers come from Intl. See spec/index.md § Locales.
import cyGb from '../../locales/cy-gb/messages.json' with { type: 'json' };

export const LOCALES = ['en-001', 'en-gb', 'en-us', 'cy-gb'] as const;
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
	'cy-gb': 'Cymraeg (Y Deyrnas Unedig)'
};

/** BCP 47 tag with canonical case, for <html lang>, hreflang, and Intl. */
export const LOCALE_TAGS: Record<Locale, string> = {
	'en-001': 'en-001',
	'en-gb': 'en-GB',
	'en-us': 'en-US',
	'cy-gb': 'cy-GB'
};

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

const CATALOGUES: Partial<Record<Locale, Record<string, string>>> = { 'cy-gb': cyGb };
const reported = new Set<string>();

/**
 * Text for `locale`: unchanged for en-001 and en-gb, American spelling for
 * en-us, and the catalogue translation for cy-gb. A missing translation falls
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

export function formatNumber(locale: Locale, value: number, compact = false): string {
	return new Intl.NumberFormat(LOCALE_TAGS[locale], compact ? { notation: 'compact', maximumFractionDigits: 1 } : {}).format(value);
}

export function formatDate(locale: Locale, isoDate: string): string {
	return new Intl.DateTimeFormat(LOCALE_TAGS[locale], { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${isoDate}T00:00:00Z`));
}
