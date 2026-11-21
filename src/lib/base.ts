// The deploy base path ("" or "/<repo>"), injected by vite.config.ts from BASE_PATH.
// SvelteKit 3 removed `base` from $app/paths; this keeps one explicit source for
// building both relative links and absolute URLs (canonical, sitemap).
export const base: string = __BASE_PATH__;
