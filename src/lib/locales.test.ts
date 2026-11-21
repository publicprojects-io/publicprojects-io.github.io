import { describe, expect, it } from 'vitest';
import { formatNumber, isTranslated, localePath, parsePath, pickLocale, t } from './locales';

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

describe('t for zh-cn and zh-001', () => {
	it('translates from the catalogues', () => {
		expect(t('zh-cn', 'Home')).toBe('首页');
		expect(t('zh-001', 'Software engineering')).toBe('软件工程');
	});
	it('marks catalogue locales as draft translations', () => {
		expect(isTranslated('zh-cn')).toBe(true);
		expect(isTranslated('cy-gb')).toBe(true);
		expect(isTranslated('en-us')).toBe(false);
	});
});

describe('t for hi-in and hi-001', () => {
	it('translates from the catalogues', () => {
		expect(t('hi-in', 'Home')).toBe('मुखपृष्ठ');
		expect(t('hi-001', 'Software engineering')).toBe('सॉफ़्टवेयर इंजीनियरिंग');
		expect(isTranslated('hi-in')).toBe(true);
	});
});

describe('formatNumber', () => {
	it('truncates compact numbers, so "+" stays true', () => {
		expect(formatNumber('en-001', 96_386_872, true)).toBe('96.3M');
		expect(formatNumber('zh-cn', 96_386_872, true)).toBe('9638万');
		expect(formatNumber('zh-cn', 16_513, true)).toBe('1.6万');
		expect(formatNumber('hi-in', 96_386_872, true)).toBe('9.6\u00a0क॰');
		expect(formatNumber('hi-in', 96_386_872)).toBe('9,63,86,872');
		expect(formatNumber('hi-in', 16_513, true)).toBe('16\u00a0हज़ार');
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
		expect(pickLocale(['zh-CN'])).toBe('zh-cn');
		expect(pickLocale(['zh-Hans-CN'])).toBe('zh-cn');
		expect(pickLocale(['zh'])).toBe('zh-001');
		expect(pickLocale(['zh-SG'])).toBe('zh-001');
		expect(pickLocale(['hi-IN'])).toBe('hi-in');
		expect(pickLocale(['hi'])).toBe('hi-001');
		expect(pickLocale(['hi-Latn-IN'])).toBe('hi-in');
		expect(pickLocale(['en'])).toBe('en-001');
		expect(pickLocale(['en-US'])).toBe('en-us');
		expect(pickLocale(['en-AU'])).toBe('en-001');
		expect(pickLocale(['fr-FR', 'en-GB'])).toBe('en-gb');
		expect(pickLocale(['fr-FR'])).toBe(null);
	});
});
