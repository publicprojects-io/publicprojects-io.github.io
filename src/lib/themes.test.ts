import { describe, expect, it } from 'vitest';
import { DEFAULT_THEMES } from '@lilydesignsystem/svelte-picker-bar';
import { THEMES } from './themes';

describe('THEMES', () => {
	it('has every Lily default theme and nothing else', () => {
		expect([...THEMES].sort()).toEqual([...DEFAULT_THEMES].sort());
	});
	it('puts UK and US themes last, each group alphabetical', () => {
		const national = (s: string) => /^united-(kingdom|states)-/.test(s);
		const firstNational = THEMES.findIndex(national);
		expect(THEMES.slice(firstNational).every(national)).toBe(true);
		const rest = THEMES.slice(0, firstNational);
		expect(rest).toEqual([...rest].sort((a, b) => a.localeCompare(b, 'en')));
		expect(THEMES.at(-1)).toBe('united-states-web-design-system');
	});
});
