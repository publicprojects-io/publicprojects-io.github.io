// Site-wide constants. See spec/index.md.

/** Origin the site is served from: the custom domain on the org root Pages site (static/CNAME). */
export const SITE_ORIGIN = 'https://publicprojects.io';
export const SITE_NAME = 'Public Projects';
export const SITE_TAGLINE = 'Open source for the public good';
export const SOURCE_URL = 'https://github.com/publicprojects-io/publicprojects-io.github.io';

export const PERSON = {
	name: 'Joel Parker Henderson',
	role: 'Head of Software Engineering, NHS Wales Digital Health and Care Wales (DHCW)',
	github: 'https://github.com/joelparkerhenderson',
	orcid: 'https://orcid.org/0009-0000-4681-282X',
	linkedin: 'https://uk.linkedin.com/in/joelparkerhenderson',
	website: 'https://joelparkerhenderson.com',
	links: 'https://linkr.ee/joelparkerhenderson'
} as const;

/** Default Lily theme. Kept in sync with src/app.html. */
export const DEFAULT_THEME = 'light';

/** localStorage keys. Kept in sync with the pre-paint script in src/app.html. */
export const STORAGE_KEYS = {
	theme: 'publicprojects-theme',
	textSize: 'publicprojects-text-size',
	locale: 'publicprojects-locale'
} as const;
