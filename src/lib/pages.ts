// The site's top-level pages: the single source for navigation, the sitemap,
// llms.txt, and search. Adding a page means adding it here. See spec/index.md § Pages.

export type PageInfo = { slug: string; name: string; description: string; nav: boolean };

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
		name: 'Engineering',
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
		slug: 'nhs-wales',
		name: 'NHS Wales',
		description: 'For NHS Wales and Digital Health and Care Wales (DHCW) colleagues: where these open-source projects can help, and how to get involved.',
		nav: true
	},
	{
		slug: 'impact',
		name: 'Impact',
		description: 'Dated, sourced statistics and recognition for Public Projects: downloads, stars, translations, and citations.',
		nav: true
	},
	{
		slug: 'about',
		name: 'About',
		description: 'About Public Projects and its author, Joel Parker Henderson, Head of Software Engineering at NHS Wales Digital Health and Care Wales.',
		nav: true
	},
	{ slug: 'search', name: 'Search', description: 'Search Public Projects.', nav: false }
];

export function pageBySlug(slug: string): PageInfo {
	const info = PAGES.find((page) => page.slug === slug);
	if (!info) throw new Error(`Unknown page: ${slug}`);
	return info;
}
