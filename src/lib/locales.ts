// Three English locales. Content is written once, in the international /
// British spelling that en-001 and en-gb share; en-us is derived from it by
// `spell()`. Dates and numbers come from Intl, so each locale formats them
// its own way. See spec/index.md § Locales.

export const LOCALES = ['en-001', 'en-gb', 'en-us'] as const;
export type Locale = (typeof LOCALES)[number];

/** en-001 (English, World) is the default and lives at the site root. */
export const DEFAULT_LOCALE: Locale = 'en-001';

/** Locales that live under a /<locale>/ prefix. */
export const PREFIXED_LOCALES = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

export const LOCALE_LABELS: Record<Locale, string> = {
	'en-001': 'English (World)',
	'en-gb': 'English (United Kingdom)',
	'en-us': 'English (United States)'
};

/** BCP 47 tag with canonical case, for <html lang>, hreflang, and Intl. */
export const LOCALE_TAGS: Record<Locale, string> = {
	'en-001': 'en-001',
	'en-gb': 'en-GB',
	'en-us': 'en-US'
};

export function isLocale(value: string | undefined): value is Locale {
	return (LOCALES as readonly string[]).includes(value ?? '');
}

/** The path of a page in a locale, without the base path. `slug` has no leading or trailing slash. */
export function localePath(locale: Locale, slug = ''): string {
	const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
	return slug ? `${prefix}/${slug}/` : `${prefix}/`;
}

/** Splits a path (without the base path) into its locale and slug. */
export function parsePath(pathname: string): { locale: Locale; slug: string } {
	const parts = pathname.split('/').filter(Boolean);
	if (isLocale(parts[0]) && parts[0] !== DEFAULT_LOCALE) {
		return { locale: parts[0], slug: parts.slice(1).join('/') };
	}
	return { locale: DEFAULT_LOCALE, slug: parts.join('/') };
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

/** Text as written for `locale`: unchanged for en-001 and en-gb, American spelling for en-us. */
export function spell(locale: Locale, text: string): string {
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
