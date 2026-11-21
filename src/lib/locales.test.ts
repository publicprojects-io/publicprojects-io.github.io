import { describe, expect, it } from 'vitest';
import { localePath, parsePath, pickLocale, t } from './locales';

describe('t', () => {
	it('leaves en-001 and en-gb unchanged', () => {
		expect(t('en-gb', 'Organisations recognise the programme.')).toBe('Organisations recognise the programme.');
		expect(t('en-001', 'colour')).toBe('colour');
	});
	it('converts to American spelling for en-us', () => {
		expect(t('en-us', 'Organisations recognise the programme.')).toBe('Organizations recognize the program.');
		expect(t('en-us', 'Colour, behaviour, catalogue, licence, centred')).toBe('Color, behavior, catalog, license, centered');
		expect(t('en-us', 'prioritise, internationalisation, localised')).toBe('prioritize, internationalization, localized');
	});
	it('does not touch words that only look similar', () => {
		expect(t('en-us', 'World Health Organization, organism, realistic, wise, promise')).toBe(
			'World Health Organization, organism, realistic, wise, promise'
		);
	});
});

describe('t for cy-gb', () => {
	it('translates from the catalogue', () => {
		expect(t('cy-gb', 'Home')).toBe('Hafan');
		expect(t('cy-gb', 'Software engineering')).toBe('Peirianneg meddalwedd');
	});
});

describe('paths', () => {
	it('round-trips locale paths', () => {
		expect(localePath('en-001', 'health')).toBe('/en-001/health/');
		expect(localePath('en-001')).toBe('/en-001/');
		expect(localePath('en-gb', 'health')).toBe('/en-gb/health/');
		expect(localePath('cy-gb', 'donate')).toBe('/cy-gb/donate/');
		expect(parsePath('/en-us/projects/fhir/')).toEqual({ locale: 'en-us', slug: 'projects/fhir', prefixed: true });
		expect(parsePath('/en-001/')).toEqual({ locale: 'en-001', slug: '', prefixed: true });
		expect(parsePath('/health/')).toEqual({ locale: 'en-001', slug: 'health', prefixed: false });
		expect(parsePath('/')).toEqual({ locale: 'en-001', slug: '', prefixed: false });
	});
	it('picks the best locale for a browser', () => {
		expect(pickLocale(['cy-GB', 'en'])).toBe('cy-gb');
		expect(pickLocale(['cy'])).toBe('cy-gb');
		expect(pickLocale(['en'])).toBe('en-001');
		expect(pickLocale(['en-US'])).toBe('en-us');
		expect(pickLocale(['en-AU'])).toBe('en-001');
		expect(pickLocale(['fr-FR', 'en-GB'])).toBe('en-gb');
		expect(pickLocale(['fr-FR'])).toBe(null);
	});
});
