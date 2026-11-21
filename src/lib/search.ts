// The search index: every page and project, built from the same data the
// pages render, so search can never disagree with the site.
import { AREAS, PROJECTS } from './data/projects';
import { localePath, spell, type Locale } from './locales';
import { PAGES } from './pages';

export type SearchEntry = { path: string; title: string; description: string; text: string };

export function searchIndex(locale: Locale): SearchEntry[] {
	const s = (text: string) => spell(locale, text);
	const pages = PAGES.filter((p) => p.slug !== 'search').map((p) => ({
		path: localePath(locale, p.slug),
		title: s(p.name),
		description: s(p.description)
	}));
	const projects = PROJECTS.map((p) => ({
		path: localePath(locale, `projects/${p.slug}`),
		title: p.name,
		description: s(p.summary),
		extra: [p.description, p.value, AREAS[p.area].name, ...p.tags].map(s).join(' ')
	}));
	return [...pages, ...projects].map(({ path, title, description, ...rest }) => ({
		path,
		title,
		description,
		text: [title, description, 'extra' in rest ? rest.extra : ''].join(' ').toLocaleLowerCase('en')
	}));
}

/** Entries that contain every word of the query; title matches first. */
export function search(index: SearchEntry[], query: string): SearchEntry[] {
	const words = query.toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
	if (!words.length) return [];
	const hits = index.filter((entry) => words.every((word) => entry.text.includes(word)));
	const inTitle = (entry: SearchEntry) => words.some((word) => entry.title.toLocaleLowerCase('en').includes(word));
	return hits.sort((a, b) => Number(inTitle(b)) - Number(inTitle(a)));
}
