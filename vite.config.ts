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
	test: {
		projects: [
			{ extends: true, test: { name: 'node', include: ['src/**/*.test.ts'], exclude: ['src/**/*.dom.test.ts'] } },
			// Components, mounted in a simulated browser so that event handlers and onMount run.
			{
				extends: true,
				resolve: { conditions: ['browser'] },
				test: { name: 'dom', include: ['src/**/*.dom.test.ts'], environment: 'happy-dom' }
			}
		],
		// `pnpm run coverage`, which CI runs, fails below 100% for the TypeScript modules, routes included.
		coverage: {
			provider: 'v8',
			include: ['src/*.ts', 'src/lib/**/*.ts', 'src/routes/**/*.ts', 'src/lib/components/*.svelte', 'src/routes/**/*.svelte'],
			exclude: ['**/*.test.ts', '**/*.d.ts'],
			thresholds: {
				'src/**/*.ts': { statements: 100, functions: 100, lines: 100, branches: 100 },
				// Components and pages: every statement, function, and line. Every branch left is a
				// `?? ''` fallback the Svelte compiler adds to text such as `{a} ({b})`, which no
				// input reaches; the branch floor stops real branches going untested unnoticed.
				'src/{lib/components,routes}/**/*.svelte': { statements: 100, functions: 100, lines: 100, branches: 70 }
			}
		}
	}
});
