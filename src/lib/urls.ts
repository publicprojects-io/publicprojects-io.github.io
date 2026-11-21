// Every prerendered page path (without base), for the sitemap and llms.txt.
import { PROJECTS } from './data/projects';
import { LOCALES, localePath, type Locale } from './locales';
import { PAGES } from './pages';

export const SLUGS: string[] = [...PAGES.filter((p) => p.slug !== 'search').map((p) => p.slug), ...PROJECTS.map((p) => `projects/${p.slug}`)];

export function allPaths(): { locale: Locale; slug: string; path: string }[] {
	return LOCALES.flatMap((locale) => SLUGS.map((slug) => ({ locale, slug, path: localePath(locale, slug) })));
}
