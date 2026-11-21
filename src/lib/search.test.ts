import { describe, expect, it } from 'vitest';
import { search, searchIndex } from './search';

describe('search', () => {
	const index = searchIndex('en-001');
	it('finds projects by name, tag, and description', () => {
		expect(search(index, 'fhir').map((e) => e.title)).toContain('FHIR for Rust');
		expect(search(index, 'snomed ct')[0].title).toBe('SNOMED for Rust');
		expect(search(index, 'NHS Number').map((e) => e.title)).toContain('NHS Number');
	});
	it('returns nothing for an empty query', () => {
		expect(search(index, '   ')).toEqual([]);
	});
	it('uses locale paths', () => {
		expect(searchIndex('en-us')[1].path).toBe('/en-us/health/');
	});
});
