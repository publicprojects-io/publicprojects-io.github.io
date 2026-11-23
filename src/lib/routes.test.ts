// The route modules: machine-readable files and loaders.
import { describe, expect, it } from 'vitest';
import * as layout from '../routes/+layout';
import * as projectPage from '../routes/[locale=locale]/projects/[slug]/+page';
import * as llms from '../routes/llms.txt/+server';
import * as feed from '../routes/releases.xml/+server';
import * as robots from '../routes/robots.txt/+server';
import * as sitemap from '../routes/sitemap.xml/+server';
import { PROJECTS, STATS_AS_OF, releases } from './data/projects';
import { LOCALES } from './locales';
import { PAGES } from './pages';
import { SLUGS } from './urls';

type Load = (input: unknown) => unknown;

describe('root layout', () => {
	it('prerenders every route with trailing slashes', () => {
		expect(layout.prerender).toBe(true);
		expect(layout.trailingSlash).toBe('always');
	});

	it('passes a known locale through, and falls back to the default', () => {
		const load = layout.load as unknown as Load;
		expect(load({ params: { locale: 'fr-ca' } })).toEqual({ locale: 'fr-ca' });
		expect(load({ params: {} })).toEqual({ locale: 'en-001' });
		expect(load({ params: { locale: 'xx' } })).toEqual({ locale: 'en-001' });
	});
});

describe('project page', () => {
	const load = projectPage.load as unknown as (input: unknown) => Promise<Record<string, unknown>>;
	const parent = async () => ({ locale: 'en-gb' });

	it('prerenders every project in every locale', () => {
		const entries = (projectPage.entries as unknown as () => { locale: string; slug: string }[])();
		expect(entries.length).toBe(PROJECTS.length * LOCALES.length);
		expect(entries).toContainEqual({ locale: 'ar-001', slug: 'nhs-number' });
	});

	it('loads a project with the layout data', async () => {
		const data = await load({ params: { slug: 'fhir' }, parent });
		expect(data.locale).toBe('en-gb');
		expect((data.project as { name: string }).name).toBe('FHIR for Rust');
	});

	it('is a 404 for an unknown project', async () => {
		await expect(load({ params: { slug: 'no-such-project' }, parent })).rejects.toMatchObject({ status: 404 });
	});
});

describe('robots.txt', () => {
	it('allows everything and names the sitemap', async () => {
		const response = robots.GET();
		expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
		expect(await response.text()).toBe('User-agent: *\nAllow: /\n\nSitemap: https://publicprojects.io/sitemap.xml\n');
	});
});

describe('sitemap.xml', () => {
	it('lists every path in every locale, dated, with alternates', async () => {
		const response = sitemap.GET();
		expect(response.headers.get('Content-Type')).toBe('application/xml');
		const body = await response.text();
		expect(body.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
		expect(body.match(/<url>/g)?.length).toBe(SLUGS.length * LOCALES.length);
		expect(body.match(/<lastmod>/g)?.length).toBe(SLUGS.length * LOCALES.length);
		expect(body).toContain(`<loc>https://publicprojects.io/en-us/contribute/</loc><lastmod>${STATS_AS_OF}</lastmod>`);
		expect(body).toContain('<xhtml:link rel="alternate" hreflang="ar-001" href="https://publicprojects.io/ar-001/about/"/>');
		expect(body).not.toContain('/search/');
	});
});

describe('llms.txt', () => {
	it('maps every page, language, and project', async () => {
		const response = llms.GET();
		expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
		const body = await response.text();
		expect(body.startsWith('# Public Projects\n')).toBe(true);
		expect(body).toContain(`Statistics as of ${STATS_AS_OF}.`);
		for (const page of PAGES.filter((p) => p.slug !== 'search')) expect(body).toContain(`- [${page.name}](`);
		expect(body).not.toContain('/search/');
		expect(body.match(/^- \[.*\]\(https:\/\/publicprojects\.io\/[a-z0-9-]+\/\)$/gm)?.length).toBeGreaterThanOrEqual(LOCALES.length);
		for (const project of PROJECTS) expect(body).toContain(`/en-001/projects/${project.slug}/): ${project.summary}`);
		expect(body).toContain('## Health care and medical\n');
	});
});

describe('releases.xml', () => {
	it('is an Atom feed with one entry per package release, newest first', async () => {
		const response = feed.GET();
		expect(response.headers.get('Content-Type')).toBe('application/atom+xml; charset=utf-8');
		const body = await response.text();
		const rows = releases();
		expect(body).toContain('<feed xmlns="http://www.w3.org/2005/Atom">');
		expect(body).toContain('<link rel="self" type="application/atom+xml" href="https://publicprojects.io/releases.xml"/>');
		expect(body).toContain(`<updated>${rows[0].released}T00:00:00Z</updated>`);
		expect(body.match(/<entry>/g)?.length).toBe(rows.length);
		expect(body).toContain(`<id>tag:publicprojects.io,${rows[0].released}:${rows[0].registry}/${rows[0].name}/${rows[0].version}</id>`);
		expect(body).not.toMatch(/&(?!amp;|lt;|gt;|quot;)/);
	});

	it('escapes markup in text, and falls back to the stats date with no releases', async () => {
		const saved = [...PROJECTS];
		PROJECTS.splice(0, PROJECTS.length, { ...saved[0], name: 'A <b> & "c"', stats: [{ kind: 'crate', key: 'fhir' }] });
		try {
			expect(await feed.GET().text()).toContain('<title>A &lt;b&gt; &amp; &quot;c&quot;: fhir');
			PROJECTS.splice(0, PROJECTS.length, { ...saved[0], stats: [] });
			const body = await feed.GET().text();
			expect(body).toContain(`<updated>${STATS_AS_OF}T00:00:00Z</updated>`);
			expect(body).not.toContain('<entry>');
		} finally {
			PROJECTS.splice(0, PROJECTS.length, ...saved);
		}
	});
});
