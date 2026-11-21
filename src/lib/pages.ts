// The site's top-level pages: the single source for navigation, the sitemap,
// llms.txt, and search. Adding a page means adding it here. See spec/index.md § Pages.

/** nav: main navigation and footer. footer: the footer's policy row. */
export type PageInfo = { slug: string; name: string; description: string; nav: boolean; footer?: boolean };

export const PAGES: PageInfo[] = [
	{
		slug: '',
		name: 'Home',
		description: 'Free, open-source software, standards tooling, and guides for health care, public services, and software engineering.',
		nav: false
	},
	{
		slug: 'health',
		name: 'Health care',
		description: 'Open-source health data standards, clinical terminology, and patient-centred software: FHIR, HL7, SNOMED CT, openEHR, NHS Number, and the International Patient Summary.',
		nav: true
	},
	{
		slug: 'public-value',
		name: 'Public value',
		description: 'Guides, metrics, and tools that help public services create and evidence public value, stay secure, and reach everyone, in many languages.',
		nav: true
	},
	{
		slug: 'engineering',
		name: 'Software engineering',
		description: 'Software engineering leadership: architecture decision records, metrics, testing, and version-control practices used around the world.',
		nav: true
	},
	{
		slug: 'projects',
		name: 'All projects',
		description: 'Every Public Projects open-source project, with links, dated statistics, and the public value each one creates.',
		nav: true
	},
	{
		slug: 'digital-health-teams',
		name: 'Digital health teams',
		description: 'For digital health groups, such as health services, health-tech teams, and public health organisations: where these open-source projects can help, and how to get involved.',
		nav: true
	},
	{
		slug: 'impact',
		name: 'Impact',
		description: 'Dated, sourced statistics and recognition for Public Projects: downloads, stars, translations, and citations.',
		nav: true
	},
	{
		slug: 'donate',
		name: 'Donate',
		description: 'How to support Public Projects by donating time, money, or other help.',
		nav: true
	},
	{
		slug: 'about',
		name: 'About',
		description: 'About Public Projects and its author, Joel Parker Henderson, a software engineering leader in public digital health.',
		nav: true
	},
	{ slug: 'search', name: 'Search', description: 'Search Public Projects.', nav: false },
	{
		slug: 'accessibility-statement',
		name: 'Accessibility statement',
		description: 'How accessible the Public Projects website is, what we know falls short, and how to report a problem.',
		nav: false,
		footer: true
	},
	{
		slug: 'cookie-policy',
		name: 'Cookie policy',
		description: 'The Public Projects website sets no cookies. This page lists the preferences kept in your browser and how to manage them.',
		nav: false,
		footer: true
	},
	{
		slug: 'privacy-policy',
		name: 'Privacy policy',
		description: 'The Public Projects website collects no personal information. This page explains what that means and where the limits are.',
		nav: false,
		footer: true
	},
	{
		slug: 'terms-of-use',
		name: 'Terms of use',
		description: 'How you may use the Public Projects website and its open-source projects.',
		nav: false,
		footer: true
	},
	{
		slug: 'site-map',
		name: 'Site map',
		description: 'Every page on the Public Projects website.',
		nav: false,
		footer: true
	}
];

export function pageBySlug(slug: string): PageInfo {
	const info = PAGES.find((page) => page.slug === slug);
	if (!info) throw new Error(`Unknown page: ${slug}`);
	return info;
}
