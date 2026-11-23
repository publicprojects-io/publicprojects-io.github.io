// The site has no base path in production; BASE_PATH=/preview builds under one.
import { describe, expect, it, vi } from 'vitest';

vi.mock('#lib/base.js', () => ({ base: '/preview' }));

describe('handle hook under a base path', () => {
	it('strips the base path, and treats the bare base as the root chooser', async () => {
		const { handle } = await import('../hooks.server');
		const run = async (pathname: string) => {
			let out = '';
			await handle({
				event: { url: new URL(`https://example.org${pathname}`) },
				resolve: async (_event: unknown, options: { transformPageChunk: (input: { html: string; done: boolean }) => string }) => {
					out = options.transformPageChunk({ html: '%lang% %dir%', done: true });
					return new Response(out);
				}
			} as never);
			return out;
		};
		expect(await run('/preview/ur-001/')).toBe('ur-001 rtl');
		expect(await run('/preview')).toMatch(/^en\S* ltr$/);
	});

	it('gives the path within the site', async () => {
		const { sitePath } = await import('./urls');
		expect(sitePath('/preview/en-us/about/')).toBe('/en-us/about/');
		expect(sitePath('/preview')).toBe('/');
	});
});
