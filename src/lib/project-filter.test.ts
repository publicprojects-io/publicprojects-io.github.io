import { describe, expect, it } from 'vitest';
import { PROJECTS } from './data/projects';
import { CATEGORIES, categoryOf, filterProjects } from './project-filter';

const slugs = (projects: { slug: string }[]) => projects.map((p) => p.slug);

describe('project filter', () => {
	it('lists each card category once, in catalogue order', () => {
		expect(CATEGORIES).toEqual([
			'Health care and medical',
			'Public value',
			'Software engineering leadership',
			'Business executive leadership'
		]);
	});

	it('shows every project with no category and no query', () => {
		expect(filterProjects('en-001', PROJECTS, '', '  ')).toEqual(PROJECTS);
	});

	it('filters by the category shown on the card', () => {
		const business = filterProjects('en-001', PROJECTS, 'Business executive leadership', '');
		expect(slugs(business)).toEqual(['objectives-and-key-results', 'key-performance-indicators', 'maturity-models']);
		const health = filterProjects('en-001', PROJECTS, 'Health care and medical', '');
		expect(health.every((p) => p.area === 'health')).toBe(true);
		const total = CATEGORIES.reduce((sum, c) => sum + filterProjects('en-001', PROJECTS, c, '').length, 0);
		expect(total).toBe(PROJECTS.length);
	});

	it('matches every word, in any case, across names, text, and tags', () => {
		expect(slugs(filterProjects('en-001', PROJECTS, '', 'NHS number'))).toContain('nhs-number');
		expect(slugs(filterProjects('en-001', PROJECTS, '', 'okr'))).toContain('objectives-and-key-results');
		expect(filterProjects('en-001', PROJECTS, '', 'rust').length).toBeGreaterThan(5);
		expect(filterProjects('en-001', PROJECTS, '', 'rust zzzz')).toEqual([]);
	});

	it('combines category and query', () => {
		const hits = filterProjects('en-001', PROJECTS, 'Software engineering leadership', 'rust');
		expect(hits.length).toBeGreaterThan(0);
		expect(hits.every((p) => categoryOf(p) === 'Software engineering leadership')).toBe(true);
	});

	it('matches translated text and the English name', () => {
		expect(slugs(filterProjects('fr-fr', PROJECTS, '', 'santé'))).not.toEqual([]);
		expect(slugs(filterProjects('fr-fr', PROJECTS, '', 'GitAlias'))).toEqual(['gitalias']);
	});
});
