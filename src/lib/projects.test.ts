import { describe, expect, it } from 'vitest';
import { HOME_FIRST, PROJECTS, homeProjects } from '#lib/data/projects.js';

describe('homeProjects', () => {
	it('puts the chosen nine first, then every other project once', () => {
		const slugs = homeProjects().map((p) => p.slug);
		expect(slugs.slice(0, 9)).toEqual(HOME_FIRST);
		expect([...slugs].sort()).toEqual(PROJECTS.map((p) => p.slug).sort());
	});
});
