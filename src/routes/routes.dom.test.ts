// Every route page, mounted in a simulated browser, in more than one locale.
import { createRawSnippet, flushSync, mount, unmount, type Component } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PROJECTS } from '#lib/data/projects.js';
import type { Locale } from '#lib/locales.js';

const state = vi.hoisted(() => ({ page: { url: new URL('https://publicprojects.io/en-001/'), status: 200 } }));
vi.mock('$app/state', () => state);
const goto = vi.hoisted(() => vi.fn());
vi.mock('$app/navigation', () => ({ goto, afterNavigate: (callback: () => void) => callback() }));
vi.mock('@lilydesignsystem/svelte-picker-bar', async (importOriginal) => ({
	...(await importOriginal<object>()),
	default: (await import('#lib/components/testing/PropsSpy.svelte')).default
}));

const pages = import.meta.glob<{ default: Component<Record<string, unknown>> }>('./**/+page.svelte', { eager: true });
const Layout = (await import('./+layout.svelte')).default as Component<Record<string, unknown>>;
const ErrorPage = (await import('./+error.svelte')).default as Component<Record<string, unknown>>;

let shown: ReturnType<typeof mount> | undefined;
function show(Shown: Component<Record<string, unknown>>, props: Record<string, unknown>) {
	shown = mount(Shown, { target: document.body, props });
	flushSync();
}
afterEach(() => {
	if (shown) unmount(shown);
	shown = undefined;
	document.body.innerHTML = '';
	document.head.innerHTML = '';
});
const h1 = () => document.querySelector('h1')?.textContent?.trim();

const LOCALE_PAGES = Object.keys(pages).filter((path) => path.startsWith('./[locale=locale]/') && !path.includes('[slug]'));

describe('locale pages', () => {
	it('has a page for every route', () => {
		expect(LOCALE_PAGES.length).toBe(19);
	});

	for (const path of LOCALE_PAGES) {
		for (const locale of ['en-us', 'ar-001'] as Locale[]) {
			it(`${path} renders in ${locale}`, () => {
				show(pages[path].default, { data: { locale } });
				expect(h1()).toBeTruthy();
				expect(document.title).toContain('Public Projects');
			});
		}
	}
});

describe('on this page', () => {
	for (const slug of ['privacy-policy', 'cookie-policy', 'terms-of-use', 'accessibility-statement']) {
		it(`${slug} links to every section, and every section has a link`, () => {
			show(pages[`./[locale=locale]/${slug}/+page.svelte`].default, { data: { locale: 'ja-jp' } });
			const links = [...document.querySelectorAll('.on-this-page a')].map((a) => a.getAttribute('href'));
			const sections = [...document.querySelectorAll('h2[id]')].map((h) => `#${h.id}`);
			expect(links.length).toBeGreaterThan(5);
			expect(links).toEqual(sections);
			expect(document.querySelector('.on-this-page')?.getAttribute('aria-label')).toBe('このページの内容');
			const first = document.querySelector('.on-this-page a')!;
			expect(first.textContent).toBe(document.querySelector('h2[id]')!.textContent);
		});
	}
});

describe('project pages', () => {
	const ProjectPage = pages['./[locale=locale]/projects/[slug]/+page.svelte'].default;
	for (const project of PROJECTS) {
		it(`${project.slug} renders`, () => {
			show(ProjectPage, { data: { locale: 'en-gb', project } });
			expect(h1()).toBe(project.name);
			expect(Boolean(document.querySelector('.code-output'))).toBe(Boolean(project.usage));
		});
	}
});

describe('project page with no related projects', () => {
	it('leaves out the related section', () => {
		const ProjectPage = pages['./[locale=locale]/projects/[slug]/+page.svelte'].default;
		const all = [...PROJECTS];
		PROJECTS.splice(0, PROJECTS.length, all[0]);
		try {
			show(ProjectPage, { data: { locale: 'en-001', project: all[0] } });
			expect(document.querySelector('#related-heading')).toBeNull();
		} finally {
			PROJECTS.splice(0, PROJECTS.length, ...all);
		}
	});
});

describe('search page', () => {
	const SearchPage = pages['./[locale=locale]/search/+page.svelte'].default;
	const search = (query: string) => {
		history.replaceState(null, '', `/en-001/search/${query}`);
		show(SearchPage, { data: { locale: 'en-001' } });
		return document.querySelector('[aria-live="polite"]')?.textContent?.trim() ?? '';
	};

	it('reads the query from the address and lists results', () => {
		expect(search('?unaccent+ruby')).toBe('1 result for “unaccent ruby”');
		expect(document.querySelectorAll('.search-results li').length).toBe(1);
	});

	it('counts several results, and shows nothing for no query or a malformed one', () => {
		expect(search('?rust')).toMatch(/^\d+ results for “rust”$/);
		unmount(shown!);
		shown = undefined;
		expect(search('')).toBe('');
		unmount(shown!);
		shown = undefined;
		expect(search('?%E0%A4%A')).toBe('');
	});

	it('keeps the query in the address when the form is submitted', () => {
		search('?fhir');
		const form = document.querySelector('form')!;
		const input = document.querySelector<HTMLInputElement>('#search-query')!;
		input.value = 'hl7 rust ';
		input.dispatchEvent(new Event('input'));
		flushSync();
		expect(document.querySelector('[aria-live="polite"]')?.textContent).toContain('“hl7 rust ”');
		form.dispatchEvent(new Event('submit', { cancelable: true }));
		expect(location.search).toBe('?hl7%20rust');
	});
});

describe('layout', () => {
	const children = createRawSnippet(() => ({ render: () => '<p class="child">Page</p>' }));
	const at = (path: string, locale: Locale) => {
		state.page.url = new URL(`https://publicprojects.io${path}`);
		show(Layout, { data: { locale }, children });
	};

	it('wraps a page with the header, navigation, and footer', () => {
		at('/en-001/impact/', 'en-001');
		expect(document.querySelector('.child')).not.toBeNull();
		expect(document.querySelector('.site-nav a[aria-current="page"]')?.textContent).toBe('Impact');
		expect(document.querySelector('.draft-notice')).toBeNull();
		expect(document.documentElement.lang).toBe('en-001');
		expect(document.querySelector('.site-colophon')?.textContent).toContain(String(new Date().getFullYear()));
		const spied = (globalThis as unknown as { spiedProps: { localeProps: { onChange: (code: string) => void } } }).spiedProps;
		spied.localeProps.onChange('de-at');
		expect(goto).toHaveBeenCalledWith('/de-at/impact/');
	});

	it('marks the current policy page, and shows the draft notice for a translation', () => {
		at('/ar-001/security/', 'ar-001');
		expect(document.querySelector('.site-footer-policies a[aria-current="page"]')).not.toBeNull();
		expect(document.querySelector('.draft-notice')).not.toBeNull();
		expect(document.documentElement.dir).toBe('rtl');
	});

	it('titles a project page by the project, and an unknown page by the tagline', () => {
		at('/en-001/projects/fhir/', 'en-001');
		expect((globalThis as { spiedProps?: { shareProps: { title: string } } }).spiedProps?.shareProps.title).toBe('FHIR for Rust · Public Projects');
		unmount(shown!);
		shown = undefined;
		at('/en-001/projects/no-such-project/', 'en-001');
		expect((globalThis as { spiedProps?: { shareProps: { title: string } } }).spiedProps?.shareProps.title).toBe(
			'Public open source work for the global good · Public Projects'
		);
	});
});

describe('error page', () => {
	it('says when a page is not found, in the locale of the address', () => {
		state.page = { url: new URL('https://publicprojects.io/fr-fr/missing/'), status: 404 };
		show(ErrorPage, {});
		expect(h1()).toBe('Page introuvable');
		expect(document.title).toBe('404 · Public Projects');
	});

	it('says when something else went wrong, at the root too', () => {
		state.page = { url: new URL('https://publicprojects.io'), status: 500 };
		show(ErrorPage, {});
		expect(h1()).toBe('Something went wrong');
	});
});

describe('root language chooser', () => {
	it('redirects from the head before the app loads', () => {
		const replace = vi.fn();
		vi.stubGlobal('location', { ...location, replace });
		show(pages['./+page.svelte'].default, {});
		vi.unstubAllGlobals();
		expect(document.head.innerHTML).toContain('location.replace');
	});
});
