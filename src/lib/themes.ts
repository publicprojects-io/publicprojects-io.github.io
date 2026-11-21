// Theme order for the theme picker, per
// spec/lily-design-system-svelte-with-picker-bar/index.md: every Lily default
// theme (no custom themes), alphabetically, with the United Kingdom and United
// States themes at the end, after all the others.
import { DEFAULT_THEMES } from '@lilydesignsystem/svelte-picker-bar';

const isUkOrUs = (slug: string) => slug.startsWith('united-kingdom-') || slug.startsWith('united-states-');
const byName = (a: string, b: string) => a.localeCompare(b, 'en');

export const THEMES: string[] = [
	...DEFAULT_THEMES.filter((slug) => !isUkOrUs(slug)).sort(byName),
	...DEFAULT_THEMES.filter(isUkOrUs).sort(byName)
];
