import type { Handle } from '@sveltejs/kit/hooks';
import { LOCALE_TAGS, localeDir, parsePath } from '#lib/locales.js';
import { sitePath } from '#lib/urls.js';

// Sets <html lang> and <html dir> per page at prerender time, so each locale's files carry the right language.
export const handle: Handle = async ({ event, resolve }) => {
	const path = sitePath(event.url.pathname);
	const { locale } = parsePath(path);
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', LOCALE_TAGS[locale]).replace('%dir%', localeDir(locale)) });
};
