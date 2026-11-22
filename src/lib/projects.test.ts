import { describe, expect, it } from 'vitest';
import { HOME_DOWNLOADS_FLOOR, HOME_FIRST, PROJECTS, TOTALS, homeProjects } from '#lib/data/projects.js';

describe('homeProjects', () => {
	it('puts the chosen nine first, then every other project once', () => {
		const slugs = homeProjects().map((p) => p.slug);
		expect(slugs.slice(0, 9)).toEqual(HOME_FIRST);
		expect([...slugs].sort()).toEqual(PROJECTS.map((p) => p.slug).sort());
	});
});

describe('HOME_DOWNLOADS_FLOOR', () => {
	it('never claims more downloads than stats.json records', () => {
		expect(HOME_DOWNLOADS_FLOOR).toBeLessThanOrEqual(TOTALS.downloads);
	});
});
