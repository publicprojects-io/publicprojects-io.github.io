import type { LayoutLoad } from './$types';
import { DEFAULT_LOCALE, isLocale } from '#lib/locales.js';

// Fully static: every route is prerendered for GitHub Pages.
export const prerender = true;
export const trailingSlash = 'always';

export const load: LayoutLoad = ({ params }) => {
	const raw = (params as { locale?: string }).locale;
	return { locale: isLocale(raw) ? raw : DEFAULT_LOCALE };
};
