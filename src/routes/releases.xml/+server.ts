// An Atom feed (RFC 4287) of the latest release of each published package, from stats.json.
import { base } from '#lib/base.js';
import { STATS_AS_OF, releases } from '#lib/data/projects.js';
import { DEFAULT_LOCALE, localePath } from '#lib/locales.js';
import { PERSON, SITE_NAME, SITE_ORIGIN } from '#lib/site.js';

export const prerender = true;

const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
	const url = (path: string) => `${SITE_ORIGIN}${base}${path}`;
	const rows = releases();
	const updated = rows.length ? rows[0].released : STATS_AS_OF;
	const entries = rows.map(
		(row) => `	<entry>
		<id>tag:publicprojects.io,${row.released}:${row.registry}/${row.name}/${row.version}</id>
		<title>${escape(`${row.project.name}: ${row.name} ${row.version}`)}</title>
		<updated>${row.released}T00:00:00Z</updated>
		<link rel="alternate" href="${escape(url(localePath(DEFAULT_LOCALE, `projects/${row.project.slug}`)))}"/>
		<link rel="related" href="${escape(row.href)}"/>
		<summary>${escape(`${row.name} ${row.version} on ${row.registry}. ${row.project.summary}`)}</summary>
	</entry>`
	);
	const body = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<id>${url('/releases.xml')}</id>
	<title>${escape(`${SITE_NAME}: releases`)}</title>
	<updated>${updated}T00:00:00Z</updated>
	<author><name>${escape(PERSON.name)}</name></author>
	<link rel="self" type="application/atom+xml" href="${url('/releases.xml')}"/>
	<link rel="alternate" type="text/html" href="${url(localePath(DEFAULT_LOCALE, 'releases'))}"/>
${entries.join('\n')}
</feed>
`;
	return new Response(body, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
