import type { Handle } from '@sveltejs/kit/hooks';
import { base } from '#lib/base.js';
import { LOCALE_TAGS, parsePath } from '#lib/locales.js';

// Sets <html lang> per page at prerender time, so each locale's files carry the right language.
export const handle: Handle = async ({ event, resolve }) => {
	const path = event.url.pathname.slice(base.length) || '/';
	const { locale } = parsePath(path);
	return resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', LOCALE_TAGS[locale]) });
};
