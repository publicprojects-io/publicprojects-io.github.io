import { defineParams } from '@sveltejs/kit/params';
import { LOCALES, type Locale } from '#lib/locales.ts';

// Every page lives under a /<locale>/ prefix, including the default locale.
export const params = defineParams({
	locale: (param: string) => ((LOCALES as readonly string[]).includes(param) ? (param as Locale) : undefined)
});
