import { createRawSnippet, flushSync, mount, unmount, type Component } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PROJECTS, projectBySlug, type Project } from '#lib/data/projects.js';
import stats from '#lib/data/stats.json';
import AreaPage from './AreaPage.svelte';
import HeroArt from './HeroArt.svelte';
import ProjectCard from './ProjectCard.svelte';
import ProjectGrid from './ProjectGrid.svelte';
import Seo from './Seo.svelte';
import SitePickerBar from './SitePickerBar.svelte';

const goto = vi.fn();
vi.mock('$app/navigation', () => ({ goto: (href: string) => goto(href) }));
vi.mock('@lilydesignsystem/svelte-picker-bar', async (importOriginal) => ({
	...(await importOriginal<object>()),
	default: (await import('./testing/PropsSpy.svelte')).default
}));

let component: ReturnType<typeof mount> | undefined;
function show<P extends Record<string, any>>(Shown: Component<P>, props: P) {
	component = mount(Shown, { target: document.body, props });
	flushSync();
}
afterEach(() => {
	if (component) unmount(component);
	component = undefined;
	document.body.innerHTML = '';
	document.head.innerHTML = '';
	goto.mockReset();
});

const project = (slug: string): Project => projectBySlug(slug)!;
const text = (selector: string) => document.querySelector(selector)?.textContent?.trim();

describe('ProjectCard', () => {
	it('links to the project page, with its summary and stats', () => {
		show(ProjectCard, { project: project('nhs-number'), locale: 'en-us' });
		expect(document.querySelector('a')?.getAttribute('href')).toBe('/en-us/projects/nhs-number/');
		expect(document.body.textContent).toContain('NHS Number');
		expect(document.querySelector('.project-card-area')).toBeNull();
		expect(document.querySelector('.project-status')).toBeNull();
		expect(document.querySelector('.project-card-share')).toBeNull();
		const downloads = stats.crates['nhs-number'];
		const expected = downloads >= 10000 ? /^\d[\d.,]*K? downloads$/ : new RegExp(`^${downloads.toLocaleString('en-US')} downloads$`);
		expect(text('.project-card-facts li')).toMatch(expected);
	});

	it('shows the area or eyebrow, a quiet-free status, languages, and a share picker', () => {
		const demo = PROJECTS.find((p) => p.status === 'demonstration')!;
		show(ProjectCard, { project: { ...demo, languages: '60+ languages' }, locale: 'en-001', showArea: true, share: true });
		expect(text('.project-card-area')).toBe('Health care and medical');
		expect(text('.project-status')).toBe('Demonstration');
		expect(document.body.textContent).toContain('60+ languages');
		expect(document.querySelector('.project-card-share')).not.toBeNull();
	});

	it('copies the project link, and says so, or says when it cannot', async () => {
		show(ProjectCard, { project: project('fhir'), locale: 'en-001', share: true });
		const copy = async (writeText: (text: string) => Promise<void>) => {
			Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
			document.querySelector<HTMLButtonElement>('.project-card-share button')!.click();
			flushSync();
			const buttons = [...document.querySelectorAll<HTMLButtonElement>('.project-card-share button')];
			buttons[buttons.length - 1].click();
			await new Promise((resolve) => setTimeout(resolve, 0));
			flushSync();
			return document.querySelector('.project-card-share')!.textContent ?? '';
		};
		const written: string[] = [];
		expect(await copy(async (text) => void written.push(text))).toContain('Link copied to the clipboard');
		expect(written).toEqual(['https://publicprojects.io/en-001/projects/fhir/']);
		expect(await copy(() => Promise.reject(new Error('denied')))).toContain('Could not copy');
	});

	it('uses the eyebrow, compact counts for large numbers, and star labels', () => {
		show(ProjectCard, { project: project('objectives-and-key-results'), locale: 'en-001', showArea: true });
		expect(text('.project-card-area')).toBe('Business executive leadership');
		const big = PROJECTS.find((p) => p.stats?.some((ref) => ref.kind === 'github'))!;
		unmount(component!);
		show(ProjectCard, { project: big, locale: 'en-001' });
		expect(document.body.textContent).toMatch(/GitHub stars/);
	});
});

describe('ProjectGrid', () => {
	it('lists one card per project, with an optional three-column limit', () => {
		show(ProjectGrid, { projects: PROJECTS.slice(0, 4), locale: 'en-001' });
		expect(document.querySelectorAll('.card-grid > li').length).toBe(4);
		expect(document.querySelector('.card-grid-max-3')).toBeNull();
		unmount(component!);
		show(ProjectGrid, { projects: PROJECTS.slice(0, 2), locale: 'en-001', maxColumns: 3, headingLevel: 2 });
		expect(document.querySelector('.card-grid-max-3')).not.toBeNull();
		expect(document.querySelector('h2')).not.toBeNull();
	});
});

describe('Seo', () => {
	const meta = (selector: string, attribute = 'content') => document.head.querySelector(selector)?.getAttribute(attribute);

	it('sets the title, canonical, alternates, and social card for a page', () => {
		show(Seo, { locale: 'fr-ca', slug: 'about', title: 'À propos', description: 'D' });
		expect(document.title).toBe('À propos · Public Projects');
		expect(meta('link[rel="canonical"]', 'href')).toBe('https://publicprojects.io/fr-ca/about/');
		expect(meta('link[hreflang="x-default"]', 'href')).toBe('https://publicprojects.io/en-001/about/');
		expect(document.head.querySelectorAll('link[rel="alternate"]').length).toBeGreaterThan(40);
		expect(meta('meta[property="og:locale"]')).toBe('fr_CA');
		expect(meta('meta[property="og:image"]')).toBe('https://publicprojects.io/social-card.png');
		expect(meta('meta[name="twitter:card"]')).toBe('summary_large_image');
		expect(document.head.querySelector('script[type="application/ld+json"]')).toBeNull();
	});

	it('names the home page first, points x-default at the root chooser, and escapes JSON-LD', () => {
		show(Seo, { locale: 'en-001', slug: '', title: 'Home', description: 'D', jsonLd: { name: '</script>' } });
		expect(document.title).toBe('Public Projects: Home');
		expect(meta('link[hreflang="x-default"]', 'href')).toBe('https://publicprojects.io/');
		expect(document.head.querySelector('meta[property="og:locale"]')).toBeNull();
		expect(document.head.innerHTML).toContain('{"name":"\\u003c/script>"}');
	});
});

describe('AreaPage', () => {
	const intro = createRawSnippet(() => ({ render: () => '<p class="intro">Intro</p>' }));
	const after = createRawSnippet(() => ({ render: () => '<p class="after">After</p>' }));

	it('shows the area, its intro, and its projects', () => {
		show(AreaPage, { area: 'public-value', locale: 'en-001', intro });
		expect(text('h1')).toBe('Public value');
		expect(text('.intro')).toBe('Intro');
		expect(text('#projects-heading')).toBe(`Projects (${PROJECTS.filter((p) => p.area === 'public-value').length})`);
		expect(document.querySelector('.after')).toBeNull();
	});

	it('adds content after the projects when given', () => {
		show(AreaPage, { area: 'health', locale: 'en-001', intro, after });
		expect(text('.after')).toBe('After');
	});
});

describe('HeroArt', () => {
	it('is decorative', () => {
		show(HeroArt, {});
		expect(document.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
	});
});

describe('SitePickerBar', () => {
	type Spied = {
		searchProps: { action: string; navigate: (href: string) => void };
		themeProps: { onChange: (value: string) => void; cookieName: string };
		localeProps: { value: string; onChange: (code: string) => void };
		shareProps: { title: string };
		labels: Record<string, string>;
	};
	const spied = () => (globalThis as unknown as { spiedProps: Spied }).spiedProps;

	it('passes translated labels, the search page, and no cookie to the PickerBar', () => {
		show(SitePickerBar, { locale: 'de-de', slug: 'about', title: 'Über' });
		expect(spied().searchProps.action).toBe('/de-de/search/');
		expect(spied().themeProps.cookieName).toBe('');
		expect(spied().shareProps.title).toBe('Über · Public Projects');
		expect(spied().localeProps.value).toBe('de-de');
		expect(spied().labels.theme).not.toBe('Colour theme');
		spied().searchProps.navigate('/de-de/search/?q=fhir');
		expect(goto).toHaveBeenCalledWith('/de-de/search/?q=fhir');
	});

	it('moves to the same page in another locale, and ignores the current or an unknown one', () => {
		show(SitePickerBar, { locale: 'en-gb', slug: 'impact', title: 'Impact' });
		spied().localeProps.onChange('en-gb');
		spied().localeProps.onChange('xx-yy');
		expect(goto).not.toHaveBeenCalled();
		spied().localeProps.onChange('ja-jp');
		expect(goto).toHaveBeenCalledWith('/ja-jp/impact/');
	});

	it('announces the active theme and language', () => {
		show(SitePickerBar, { locale: 'en-001', slug: '', title: 'Home' });
		const live = () => [...document.querySelectorAll('[aria-live="polite"]')].map((el) => el.textContent?.trim());
		expect(live()[1]).toMatch(/^Active language: /);
		spied().themeProps.onChange('dark');
		flushSync();
		expect(live()[0]).toBe('Active theme: Dark');
	});
});
