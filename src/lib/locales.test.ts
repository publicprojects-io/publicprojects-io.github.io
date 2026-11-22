import { describe, expect, it } from 'vitest';
import { formatDate, formatNumber, isTranslated, localeDir, localePath, parsePath, pickLocale, t, tCount } from './locales';

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

describe('project names', () => {
	it('translates descriptive names and keeps brand names', () => {
		expect(t('cy-gb', 'Care Plan')).toBe('Cynllun Gofal');
		expect(t('zh-001', 'FHIR for Rust')).toBe('面向 Rust 的 FHIR');
		expect(t('hi-in', 'Maturity Models')).toBe('परिपक्वता मॉडल');
		expect(t('zh-cn', 'Lily Design System')).toBe('Lily Design System');
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
	it('uses Western digits for Arabic', () => {
		expect(formatNumber('ar-eg', 96_386_872)).toBe('96,386,872');
		expect(formatNumber('ar-eg', 96_386_872, true)).toBe('96\u00a0مليون');
		expect(formatDate('ar-eg', '2026-11-21')).toBe('21 نوفمبر 2026');
	});
});

describe('Spanish', () => {
	it('formats numbers by region', () => {
		expect(formatNumber('es-mx', 96_386_872)).toBe('96,386,872');
		expect(formatNumber('es-es', 96_386_872)).toBe('96.386.872');
		expect(formatNumber('es-mx', 96_386_872, true)).toBe('96.3\u00a0M');
		expect(formatNumber('es-es', 96_386_872, true)).toBe('96,3\u00a0M');
		expect(formatNumber('es-001', 96_386_872)).toBe('96,386,872');
		expect(formatNumber('es-001', 16_513, true)).toBe('16.5\u00a0k');
		expect(formatDate('es-mx', '2026-11-21')).toBe('21 de noviembre de 2026');
		expect(isTranslated('es-es')).toBe(true);
		expect(localeDir('es-mx')).toBe('ltr');
	});
});

describe('French', () => {
	it('translates and formats numbers by region', () => {
		expect(t('fr-fr', 'Home')).toBe('Accueil');
		expect(t('fr-001', 'Software engineering')).toBe('Génie logiciel');
		expect(t('fr-ca', 'Cookie policy')).toBe('Politique relative aux témoins');
		expect(t('fr-fr', 'Cookie policy')).toBe('Politique relative aux cookies');
		expect(formatNumber('fr-fr', 96_386_872)).toBe('96\u202f386\u202f872');
		expect(formatNumber('fr-ca', 96_386_872)).toBe('96\u00a0386\u00a0872');
		expect(formatNumber('fr-001', 16_513, true)).toBe('16,5\u00a0k');
		expect(formatDate('fr-ca', '2026-11-21')).toBe('21 novembre 2026');
		expect(isTranslated('fr-ca')).toBe(true);
		expect(localeDir('fr-fr')).toBe('ltr');
	});
});

describe('Russian', () => {
	it('translates and formats numbers and dates', () => {
		expect(t('ru-ru', 'Home')).toBe('Главная');
		expect(t('ru-by', 'Cookie policy')).toBe('Политика использования файлов cookie');
		expect(t('ru-001', 'Software engineering')).toBe('Программная инженерия');
		expect(formatNumber('ru-ru', 96_386_872)).toBe('96\u00a0386\u00a0872');
		expect(formatNumber('ru-by', 96_386_872, true)).toBe('96,3\u00a0млн');
		expect(formatDate('ru-ru', '2026-11-21')).toBe('21 ноября 2026');
		expect(isTranslated('ru-001')).toBe(true);
		expect(localeDir('ru-ru')).toBe('ltr');
	});
});

describe('Bengali', () => {
	it('translates, with Western digits in lakh and crore grouping', () => {
		expect(t('bn-bd', 'Home')).toBe('প্রথম পাতা');
		expect(t('bn-in', 'Cookie policy')).toBe('কুকি নীতি');
		expect(t('bn-001', 'Software engineering')).toBe('সফটওয়্যার প্রকৌশল');
		expect(formatNumber('bn-bd', 96_386_872)).toBe('9,63,86,872');
		expect(formatNumber('bn-in', 96_386_872, true)).toBe('9.6\u00a0কো');
		expect(formatNumber('bn-001', 16_513, true)).toBe('16.5\u00a0হা');
		expect(formatDate('bn-bd', '2026-11-21')).toBe('21 নভেম্বর, 2026');
		expect(isTranslated('bn-in')).toBe(true);
		expect(localeDir('bn-bd')).toBe('ltr');
	});
});

describe('Indonesian', () => {
	it('translates, with dot grouping and decimal comma', () => {
		expect(t('id-id', 'Home')).toBe('Beranda');
		expect(t('id-my', 'Cookie policy')).toBe('Kebijakan cookie');
		expect(t('id-001', 'Software engineering')).toBe('Rekayasa perangkat lunak');
		expect(formatNumber('id-id', 96_386_872)).toBe('96.386.872');
		expect(formatNumber('id-my', 9_638_687, true)).toBe('9,6\u00a0jt');
		expect(formatNumber('id-001', 16_513, true)).toBe('16,5\u00a0rb');
		expect(formatDate('id-id', '2026-11-21')).toBe('21 November 2026');
		expect(isTranslated('id-my')).toBe(true);
		expect(localeDir('id-id')).toBe('ltr');
	});
});

describe('localeDir', () => {
	it('is right to left for Arabic only', () => {
		expect(localeDir('ar-eg')).toBe('rtl');
		expect(localeDir('ar-001')).toBe('rtl');
		expect(localeDir('hi-in')).toBe('ltr');
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
		expect(pickLocale(['ar-EG'])).toBe('ar-eg');
		expect(pickLocale(['ar'])).toBe('ar-001');
		expect(pickLocale(['ar-SA'])).toBe('ar-001');
		expect(pickLocale(['fr-FR'])).toBe('fr-fr');
		expect(pickLocale(['fr'])).toBe('fr-001');
		expect(pickLocale(['fr-CA'])).toBe('fr-ca');
		expect(pickLocale(['fr-BE'])).toBe('fr-001');
		expect(pickLocale(['ru-RU'])).toBe('ru-ru');
		expect(pickLocale(['ru'])).toBe('ru-001');
		expect(pickLocale(['ru-BY'])).toBe('ru-by');
		expect(pickLocale(['ru-KZ'])).toBe('ru-001');
		expect(pickLocale(['bn-BD'])).toBe('bn-bd');
		expect(pickLocale(['bn'])).toBe('bn-001');
		expect(pickLocale(['bn-IN'])).toBe('bn-in');
		expect(pickLocale(['id-ID'])).toBe('id-id');
		expect(pickLocale(['id'])).toBe('id-001');
		expect(pickLocale(['id-MY'])).toBe('id-my');
		expect(pickLocale(['en'])).toBe('en-001');
		expect(pickLocale(['en-US'])).toBe('en-us');
		expect(pickLocale(['en-AU'])).toBe('en-001');
		expect(pickLocale(['de-DE', 'en-GB'])).toBe('en-gb');
		expect(pickLocale(['de-DE'])).toBe(null);
	});
});

describe('t with a label context', () => {
	it('uses the label entry where a catalogue has one, else the plain entry', () => {
		expect(t('ru-ru', 'GitHub stars')).toBe('звёзд на GitHub');
		expect(t('ru-ru', 'GitHub stars', 'label')).toBe('Звёзды на GitHub');
		expect(t('fr-fr', 'GitHub stars', 'label')).toBe('Étoiles GitHub');
		expect(t('zh-cn', 'GitHub stars', 'label')).toBe(t('zh-cn', 'GitHub stars'));
		expect(t('en-001', 'GitHub stars', 'label')).toBe('GitHub stars');
	});
});

describe('tCount', () => {
	it('uses the plural form for the count, and the plain entry after a compact count', () => {
		expect(tCount('ru-ru', 'GitHub stars', 1)).toBe('звезда на GitHub');
		expect(tCount('ru-ru', 'GitHub stars', 753)).toBe('звезды на GitHub');
		expect(tCount('ru-by', 'GitHub stars', 5)).toBe('звёзд на GitHub');
		expect(tCount('ru-001', 'downloads', 21)).toBe('загрузка');
		expect(tCount('ru-ru', 'downloads', 1234)).toBe('загрузки');
		expect(tCount('ru-ru', 'downloads', 21_000, true)).toBe('загрузок');
		expect(tCount('fr-fr', 'GitHub stars', 753)).toBe('étoiles GitHub');
		expect(tCount('en-001', 'downloads', 1)).toBe('downloads');
	});
});

describe('tCount in Arabic', () => {
	it('uses the dual, the plural for 3 to 10, and the singular from 11 and after a compact count', () => {
		expect(tCount('ar-eg', 'GitHub stars', 1)).toBe('نجمة على GitHub');
		expect(tCount('ar-eg', 'GitHub stars', 2)).toBe('نجمتان على GitHub');
		expect(tCount('ar-001', 'GitHub stars', 7)).toBe('نجوم GitHub');
		expect(tCount('ar-eg', 'downloads', 85)).toBe('تنزيلًا');
		expect(tCount('ar-eg', 'downloads', 333)).toBe('تنزيلًا');
		expect(tCount('ar-eg', 'downloads', 3801)).toBe('تنزيل');
		expect(tCount('ar-eg', 'downloads', 103)).toBe('تنزيلات');
		expect(tCount('ar-eg', 'downloads', 93_535_411, true)).toBe('تنزيل');
		expect(tCount('ru-ru', 'downloads', 93_535_411, true)).toBe('загрузок');
	});
});

describe('tCount for project and search counts', () => {
	it('picks the Russian and Arabic forms for the count', () => {
		expect(tCount('ru-ru', 'projects', 17)).toBe('проектов');
		expect(tCount('ru-ru', 'projects', 22)).toBe('проекта');
		expect(tCount('ru-ru', 'results for', 21)).toBe('результат по запросу');
		expect(tCount('ar-eg', 'projects', 6)).toBe('مشروعات');
		expect(tCount('ar-eg', 'projects', 17)).toBe('مشروعًا');
		expect(tCount('ar-eg', 'results for', 2)).toBe('نتيجتان للبحث عن');
		expect(tCount('en-001', 'projects', 17)).toBe('projects');
	});
});
