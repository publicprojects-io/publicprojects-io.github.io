// llms.txt (https://llmstxt.org): a plain-text map of the site for AI agents and search tools.
import { base } from '#lib/base.js';
import { AREAS, PROJECTS, STATS_AS_OF, type Area } from '#lib/data/projects.js';
import { PAGES } from '#lib/pages.js';
import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, localePath } from '#lib/locales.js';
import { PERSON, SITE_NAME, SITE_ORIGIN, SITE_TAGLINE } from '#lib/site.js';

export const prerender = true;

export function GET() {
	const url = (path: string) => `${SITE_ORIGIN}${base}${path}`;
	const lines = [
		`# ${SITE_NAME}`,
		'',
		`> ${SITE_TAGLINE}: free, open-source software, standards tooling, and guides for health care, public services, and software engineering, by ${PERSON.name}. Statistics as of ${STATS_AS_OF}.`,
		'',
		'## Pages',
		'',
		...PAGES.filter((p) => p.slug !== 'search').map((p) => `- [${p.name}](${url(localePath(DEFAULT_LOCALE, p.slug))}): ${p.description}`),
		'',
		'## Languages',
		'',
		...LOCALES.map((l) => `- [${LOCALE_LABELS[l]}](${url(localePath(l))})`),
		''
	];
	for (const [key, area] of Object.entries(AREAS) as [Area, (typeof AREAS)[Area]][]) {
		lines.push(`## ${area.name}`, '');
		for (const p of PROJECTS.filter((project) => project.area === key)) {
			lines.push(`- [${p.name}](${url(localePath(DEFAULT_LOCALE, `projects/${p.slug}`))}): ${p.summary}`);
		}
		lines.push('');
	}
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
