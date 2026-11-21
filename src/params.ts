import { defineParams } from '@sveltejs/kit/params';
import { PREFIXED_LOCALES, type Locale } from '#lib/locales.ts';

// Only the prefixed locales appear in a path; the default locale lives at the root.
export const params = defineParams({
	locale: (param: string) => ((PREFIXED_LOCALES as string[]).includes(param) ? (param as Locale) : undefined)
});
