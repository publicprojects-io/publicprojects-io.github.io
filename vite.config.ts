import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// The site is served from the root of https://publicprojects.io (the org root
// Pages site with a custom domain), so BASE_PATH is normally unset. It stays
// available for previewing under a sub-path, e.g. BASE_PATH=/preview.
const base = (process.env.BASE_PATH ?? '').replace(/\/$/, '') as '' | `/${string}`;

export default defineConfig({
	define: { __BASE_PATH__: JSON.stringify(base) },
	plugins: [
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', strict: true }),
			paths: { base, relative: false },
			prerender: { handleHttpError: 'fail', handleMissingId: 'fail' }
		})
	],
	test: { include: ['src/**/*.test.ts'] }
});
