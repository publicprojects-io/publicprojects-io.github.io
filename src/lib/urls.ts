// Every prerendered page path (without base), for the sitemap and llms.txt, and the
// path of a URL within the site.
import { base } from './base';
import { PROJECTS } from './data/projects';
import { LOCALES, localePath, type Locale } from './locales';
import { PAGES } from './pages';

export const SLUGS: string[] = [...PAGES.filter((p) => p.slug !== 'search').map((p) => p.slug), ...PROJECTS.map((p) => `projects/${p.slug}`)];

export function allPaths(): { locale: Locale; slug: string; path: string }[] {
	return LOCALES.flatMap((locale) => SLUGS.map((slug) => ({ locale, slug, path: localePath(locale, slug) })));
}

/** A URL's path within the site: without the base path, and "/" for the bare base. */
export function sitePath(pathname: string): string {
	return pathname.slice(base.length) || '/';
}

/**
 * An in-page anchor from a heading's English text, so that a link to a section is
 * the same in every locale: "What are cookies?" → "what-are-cookies".
 */
export function anchor(heading: string): string {
	return heading
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}
