import { flushSync, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import { PROJECTS } from '#lib/data/projects.js';
import ProjectFilter from './ProjectFilter.svelte';

let component: ReturnType<typeof mount> | undefined;
afterEach(() => {
	if (component) unmount(component);
	component = undefined;
	document.body.innerHTML = '';
});

const cards = () => document.querySelectorAll('.card-grid > li').length;
const status = () => document.querySelector('.project-filter-status')?.textContent?.trim();

describe('ProjectFilter', () => {
	it('shows every card, then filters by category and keyword', () => {
		component = mount(ProjectFilter, { target: document.body, props: { projects: PROJECTS, locale: 'en-001' } });
		flushSync();
		expect(cards()).toBe(PROJECTS.length);
		expect(status()).toBe(`Projects shown: ${PROJECTS.length}`);
		const buttons = [...document.querySelectorAll<HTMLButtonElement>('[role="radio"]')];
		expect(buttons.map((b) => b.textContent?.trim())).toEqual([
			`All categories (${PROJECTS.length})`,
			'Health Care (17)',
			'Public Value (6)',
			'Software Engineering (12)',
			'Business Leadership (3)'
		]);
		buttons[4].click();
		flushSync();
		expect(cards()).toBe(3);
		expect(buttons[4].getAttribute('aria-checked')).toBe('true');

		const input = document.querySelector<HTMLInputElement>('input[type="search"]')!;
		input.value = 'okr';
		input.dispatchEvent(new Event('input'));
		flushSync();
		expect(cards()).toBe(2);

		input.value = 'zzzz';
		input.dispatchEvent(new Event('input'));
		flushSync();
		expect(cards()).toBe(0);
		expect(document.querySelector('.project-filter-empty')?.textContent).toBe('No projects match. Try fewer words, or another category.');
		expect(status()).toBe('Projects shown: 0');
	});

	it('translates its labels', () => {
		component = mount(ProjectFilter, { target: document.body, props: { projects: PROJECTS, locale: 'fr-fr', share: true } });
		flushSync();
		expect(document.querySelector('input[type="search"]')?.getAttribute('aria-label')).toBe('Filtrer les projets par mot-clé');
		expect(document.querySelector('[role="radiogroup"]')?.getAttribute('aria-label')).toBe('Catégories de projets');
	});
});
