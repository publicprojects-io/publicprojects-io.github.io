// Interface strings. Written once in international English; `ui(locale)`
// applies each locale's spelling. Every accessible name Lily asks for lives here.
import { spell, type Locale } from './locales';

const BASE = {
	skip: 'Skip to content',
	mainNav: 'Main',
	footerNav: 'Footer',
	languages: 'Languages',
	preferences: 'Display preferences',
	picker: {
		search: 'Search this site',
		searchInput: 'Search terms',
		searchSubmit: 'Search',
		theme: 'Colour theme',
		locale: 'Language',
		textSize: 'Text size',
		share: 'Share this page'
	},
	share: {
		copy: 'Copy Link',
		copied: 'Link copied to the clipboard',
		copyFailed: 'Could not copy: copy the link from the address bar',
		email: 'Email Link',
		linkedin: 'Share on LinkedIn',
		reddit: 'Share on Reddit',
		bluesky: 'Share on Bluesky',
		mastodon: 'Share on Mastodon'
	},
	activeTheme: 'Active theme',
	activeLanguage: 'Active language',
	breadcrumb: 'Breadcrumb',
	home: 'Home',
	asOf: 'as of',
	stars: 'GitHub stars',
	downloads: 'downloads',
	source: 'Source',
	footerAbout:
		'Public Projects are personal open-source projects by Joel Parker Henderson, built in the author’s own time. They are not products of, or endorsed by, any employer.',
	builtWith: 'Built with SvelteKit and the Lily Design System. Hosted on GitHub Pages.',
	viewSource: 'Source code for this site'
};

export type Ui = typeof BASE;

function spellAll<T>(locale: Locale, value: T): T {
	if (typeof value === 'string') return spell(locale, value) as T;
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, inner]) => [key, spellAll(locale, inner)])) as T;
	}
	return value;
}

const cache = new Map<Locale, Ui>();
export function ui(locale: Locale): Ui {
	let messages = cache.get(locale);
	if (!messages) cache.set(locale, (messages = spellAll(locale, BASE)));
	return messages;
}
