import { describe, expect, it } from 'vitest';
import { localePath, parsePath, spell } from './locales';

describe('spell', () => {
	it('leaves en-001 and en-gb unchanged', () => {
		expect(spell('en-gb', 'Organisations recognise the programme.')).toBe('Organisations recognise the programme.');
		expect(spell('en-001', 'colour')).toBe('colour');
	});
	it('converts to American spelling for en-us', () => {
		expect(spell('en-us', 'Organisations recognise the programme.')).toBe('Organizations recognize the program.');
		expect(spell('en-us', 'Colour, behaviour, catalogue, licence, centred')).toBe('Color, behavior, catalog, license, centered');
		expect(spell('en-us', 'prioritise, internationalisation, localised')).toBe('prioritize, internationalization, localized');
	});
	it('does not touch words that only look similar', () => {
		expect(spell('en-us', 'World Health Organization, organism, realistic, wise, promise')).toBe(
			'World Health Organization, organism, realistic, wise, promise'
		);
	});
});

describe('paths', () => {
	it('round-trips locale paths', () => {
		expect(localePath('en-001', 'health')).toBe('/health/');
		expect(localePath('en-gb', 'health')).toBe('/en-gb/health/');
		expect(localePath('en-us')).toBe('/en-us/');
		expect(parsePath('/en-us/projects/fhir/')).toEqual({ locale: 'en-us', slug: 'projects/fhir' });
		expect(parsePath('/health/')).toEqual({ locale: 'en-001', slug: 'health' });
	});
});
