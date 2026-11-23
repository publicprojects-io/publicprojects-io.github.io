import { afterEach, describe, expect, it, vi } from 'vitest';
import { handle } from '../hooks.server';
import { params } from '../params';
import { base } from './base';
import { PROJECTS } from './data/projects';
import { LOCALES, t } from './locales';
import { PAGES, pageBySlug } from './pages';
import { shareTargets } from './share';
import { ISSUES_URL, SITE_ORIGIN, SOURCE_URL } from './site';
import { ui } from './ui';
import { SLUGS, allPaths } from './urls';

describe('t with a missing translation', () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllEnvs();
	});

	it('falls back to English and reports the text once', () => {
		vi.stubEnv('I18N_STRICT', '');
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		expect(t('fr-fr', 'Text with no translation, one')).toBe('Text with no translation, one');
		expect(t('fr-fr', 'Text with no translation, one')).toBe('Text with no translation, one');
		expect(warn).toHaveBeenCalledTimes(1);
		expect(warn.mock.calls[0][0]).toBe('I18N_MISSING fr-fr "Text with no translation, one"');
	});

	it('fails instead under I18N_STRICT', () => {
		vi.stubEnv('I18N_STRICT', '1');
		expect(() => t('de-de', 'Text with no translation, two')).toThrow('Missing de-de translation: Text with no translation, two');
	});
});

describe('ui', () => {
	it('keeps international English, derives US spelling, and translates', () => {
		expect(ui('en-001').picker.theme).toBe('Colour theme');
		expect(ui('en-us').picker.theme).toBe('Color theme');
		expect(ui('fr-fr').home).toBe(t('fr-fr', 'Home'));
		expect(ui('fr-fr').projectFilter.query).toBe(t('fr-fr', 'Filter projects by keyword'));
	});

	it('caches each locale', () => {
		expect(ui('de-de')).toBe(ui('de-de'));
	});

	it('has a string for every name, in every locale', () => {
		const leaves = (value: unknown): unknown[] =>
			value && typeof value === 'object' ? Object.values(value).flatMap(leaves) : [value];
		for (const locale of LOCALES) for (const leaf of leaves(ui(locale))) expect(typeof leaf).toBe('string');
	});
});

describe('shareTargets', () => {
	const targets = shareTargets(ui('en-001'));
	const url = 'https://publicprojects.io/en-001/';
	const title = 'Public Projects & friends';
	const hrefs = Object.fromEntries(targets.map((target) => [target.id, (target.href as (u: string, t: string) => string)(url, title)]));

	it('offers email, LinkedIn, Reddit, Bluesky, and Mastodon, in that order', () => {
		expect(targets.map((target) => target.id)).toEqual(['email', 'linkedin', 'reddit', 'bluesky', 'mastodon']);
		expect(targets.map((target) => target.label)).toEqual(['Email Link', 'Share on LinkedIn', 'Share on Reddit', 'Share on Bluesky', 'Share on Mastodon']);
	});

	it('encodes the URL and title into each link', () => {
		const u = encodeURIComponent(url);
		const tt = encodeURIComponent(title);
		expect(hrefs.email).toBe(`mailto:?subject=${tt}&body=${u}`);
		expect(hrefs.linkedin).toBe(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`);
		expect(hrefs.reddit).toBe(`https://www.reddit.com/submit?url=${u}&title=${tt}`);
		expect(hrefs.bluesky).toBe(`https://bsky.app/intent/compose?text=${encodeURIComponent(`${title} ${url}`)}`);
		expect(hrefs.mastodon).toBe(`https://mastodonshare.com/?text=${tt}&url=${u}`);
	});

	it('opens email in the same tab', () => {
		expect(targets.find((target) => target.id === 'email')?.newTab).toBe(false);
	});
});

describe('pages and paths', () => {
	it('finds a page by slug, and fails loudly for an unknown one', () => {
		expect(pageBySlug('about').name).toBe('About');
		expect(() => pageBySlug('no-such-page')).toThrow('Unknown page: no-such-page');
	});

	it('lists every page except search, and every project', () => {
		expect(SLUGS).not.toContain('search');
		expect(SLUGS.length).toBe(PAGES.length - 1 + PROJECTS.length);
		expect(new Set(SLUGS).size).toBe(SLUGS.length);
	});

	it('gives every slug a path in every locale', () => {
		const paths = allPaths();
		expect(paths.length).toBe(LOCALES.length * SLUGS.length);
		expect(paths).toContainEqual({ locale: 'en-us', slug: 'about', path: '/en-us/about/' });
		expect(new Set(paths.map((p) => p.path)).size).toBe(paths.length);
	});
});

describe('site constants', () => {
	it('serves from the custom domain with no base path', () => {
		expect(SITE_ORIGIN).toBe('https://publicprojects.io');
		expect(base).toBe('');
		expect(ISSUES_URL).toBe(`${SOURCE_URL}/issues`);
	});
});

describe('locale param matcher', () => {
	it('accepts every locale and nothing else', () => {
		type Result = { value?: string; issues?: unknown[] };
		const matcher = params.locale as unknown as { '~standard': { validate: (value: string) => Result } };
		const match = (param: string) => matcher['~standard'].validate(param);
		for (const locale of LOCALES) expect(match(locale)).toEqual({ value: locale });
		expect(match('en').issues).toHaveLength(1);
		expect(match('xx-yy').issues).toHaveLength(1);
	});
});

describe('handle hook', () => {
	const run = async (pathname: string) => {
		const html = '<html lang="%lang%" dir="%dir%">';
		let out = '';
		await handle({
			event: { url: new URL(`https://publicprojects.io${pathname}`) },
			resolve: async (_event: unknown, options: { transformPageChunk: (input: { html: string; done: boolean }) => string }) => {
				out = options.transformPageChunk({ html, done: true });
				return new Response(out);
			}
		} as never);
		return out;
	};

	it('sets lang and dir for each locale', async () => {
		expect(await run('/en-us/about/')).toBe('<html lang="en-US" dir="ltr">');
		expect(await run('/ar-001/')).toBe('<html lang="ar-001" dir="rtl">');
	});

	it('uses the default locale for the root chooser', async () => {
		expect(await run('')).toMatch(/^<html lang="en[^"]*" dir="ltr">$/);
	});
});

describe('anchor', () => {
	it('makes a stable, readable id from English heading text', async () => {
		const { anchor } = await import('./urls');
		expect(anchor('What are cookies?')).toBe('what-are-cookies');
		expect(anchor('  Licences & trademarks  ')).toBe('licences-trademarks');
		expect(anchor('If you are not happy with our reply')).toBe('if-you-are-not-happy-with-our-reply');
	});
});
