<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { PERSON, SITE_ORIGIN, SOURCE_URL } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
</script>

<Seo
	{locale}
	slug="about"
	title={s('About')}
	description={s(pageBySlug('about').description)}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: `${SITE_ORIGIN}${base}${localePath(locale, 'about')}`,
		mainEntity: {
			'@type': 'Person',
			name: PERSON.name,
			url: PERSON.website,
			sameAs: [PERSON.github, PERSON.orcid, PERSON.linkedin]
		}
	}}
/>

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{s('About Public Projects')}</h1>
		<p class="lead">
			{s('Public Projects collects open source software, standards tooling, and guides that create public value, especially in health care. Everything is free to use, study, change, and share.')}
		</p>
	</header>

	<div class="prose">
		<h2>{PERSON.name}</h2>
		<p>
			{s('Joel Parker Henderson is a software engineering leader in public digital health, growing engineering capabilities for agile delivery, analytics, automation, and AI, and advising executives on technology practices.')}
		</p>
		<p>
			{s('Since 2006, Joel has run SixArm Software Consulting, building and leading software teams from zero through launch and scale. Roles include Chief Technology Officer at a Y Combinator-backed startup, technology consultant to the CTO of a venture-backed fintech, and Principal Consultant at ThoughtWorks, where Joel grew a team from zero to twenty and coached Fortune 50 clients.')}
		</p>
		<p>
			{s('Joel has written guidebooks on agile change, project management, UI/UX design, software programming, innovation partnerships, startups, and business language, and maintains hundreds of open source repositories.')}
		</p>

		<h2>{s('Find Joel elsewhere')}</h2>
		<ul>
			<li><a href={PERSON.github}>GitHub</a></li>
			<li><a href={PERSON.orcid}>ORCID 0009-0000-4681-282X</a></li>
			<li><a href={PERSON.linkedin}>LinkedIn</a></li>
			<li><a href={PERSON.website}>joelparkerhenderson.com</a></li>
		</ul>

		<h2>{s('Principles')}</h2>
		<ul>
			<li><strong>{s('Open by default')}</strong>: {s('code, content, and decisions are public.')}</li>
			<li><strong>{s('Honest numbers')}</strong>: {s('every figure is dated and sourced;')} <a href={href('impact')}>{s('see the impact page')}</a>.</li>
			<li><strong>{s('For everyone')}</strong>: {s('accessible design and translation into many languages.')}</li>
			<li><strong>{s('Safety first')}</strong>: {s('health projects are building blocks, not certified medical devices.')}</li>
		</ul>

		<h2>{s('What Public Projects is not')}</h2>
		<ul>
			<li><strong>{s('Not a standards body')}</strong>: {s('the projects implement published standards; they do not set them.')}</li>
			<li><strong>{s('Not a vendor')}</strong>: {s('there is no paid tier, no licence fee, and nothing to buy.')}</li>
			<li><strong>{s('Not a medical device supplier')}</strong>: {s('using a health project in patient care needs the clinical safety work of the system that uses it.')}</li>
			<li><strong>{s('Not an employer’s programme')}</strong>: {s('these are personal projects, not products of any employer.')}</li>
			<li><strong>{s('Not a charity')}</strong>: {s('donations go to the author personally and are not tax-deductible.')}</li>
		</ul>

		<h2>{s('Independence')}</h2>
		<p>
			{s('Public Projects are personal open source projects, built in the author’s own time. They are not products of, or endorsed by, any employer or health organisation.')}
		</p>
		<p><a href={SOURCE_URL}>{s('The source code for this website')}</a> {s('is open too.')}</p>
	</div>
</ContainerWithFixedWidth>
