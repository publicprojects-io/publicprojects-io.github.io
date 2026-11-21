import { base } from '#lib/base.js';
import { STATS_AS_OF } from '#lib/data/projects.js';
import { LOCALES, LOCALE_TAGS, localePath } from '#lib/locales.js';
import { SITE_ORIGIN } from '#lib/site.js';
import { allPaths } from '#lib/urls.js';

export const prerender = true;

export function GET() {
	const url = (path: string) => `${SITE_ORIGIN}${base}${path}`;
	const entries = allPaths()
		.map(({ slug, path }) => {
			const alternates = LOCALES.map(
				(l) => `<xhtml:link rel="alternate" hreflang="${LOCALE_TAGS[l]}" href="${url(localePath(l, slug))}"/>`
			).join('');
			return `<url><loc>${url(path)}</loc><lastmod>${STATS_AS_OF}</lastmod>${alternates}</url>`;
		})
		.join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries}
</urlset>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
