<script lang="ts">
	import { base } from '#lib/base.js';
	import { ActionLink, ContainerWithFixedWidth, Hero, HeroHeadline } from '@lilydesignsystem/svelte-headless';
	import HeroArt from '#lib/components/HeroArt.svelte';
	import ProjectGrid from '#lib/components/ProjectGrid.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { AREAS, PROJECTS, STATS_AS_OF, TOTALS, HOME_DOWNLOADS_FLOOR, homeProjects, type Area } from '#lib/data/projects.js';
	import { formatDate, formatNumber, localePath, t, tCount } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { PERSON, SITE_NAME, SITE_ORIGIN, SITE_TAGLINE } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const n = (value: number) => formatNumber(locale, value, true);

	const areas = Object.entries(AREAS) as [Area, (typeof AREAS)[Area]][];

	const reasons = [
		{
			heading: 'Solve it once, share it everywhere',
			text: 'Every health system needs to validate patient identifiers, exchange records, and code diagnoses. Open, shared building blocks mean each country does not have to pay to solve the same problem again.'
		},
		{
			heading: 'Public money, public code',
			text: 'Software funded for the public should serve the public. Open code can be inspected, audited, and improved by anyone, which builds trust and avoids lock-in to a single supplier.'
		},
		{
			heading: 'Reach everyone, in their own language',
			text: 'Many of these projects are translated into 50 or more languages, so that guidance on patient safety, public value, and good engineering is not limited to English speakers.'
		},
		{
			heading: 'Safer software by default',
			text: 'Memory-safe Rust libraries, rigorous tests, and open review reduce whole classes of security and reliability flaws in the systems people depend on.'
		}
	];
</script>

<Seo
	{locale}
	slug=""
	title={s(SITE_TAGLINE)}
	description={s(pageBySlug('').description)}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: `${SITE_ORIGIN}${base}/`,
		author: { '@type': 'Person', name: PERSON.name, url: PERSON.website, sameAs: [PERSON.github, PERSON.orcid, PERSON.linkedin] }
	}}
/>

<Hero class="site-hero" label={SITE_NAME}>
	<ContainerWithFixedWidth maxWidth="76rem">
		<HeroHeadline label={s(SITE_TAGLINE)}>
			{#snippet media()}<HeroArt />{/snippet}
			<div class="hero-copy">
			<h1>{s('Open source for the public good')}</h1>
			<p class="hero-lead">
				{s('Free, open-source software, standards tooling, and guides for health care, public services, and software engineering. Built in public, translated for the world, and free for anyone to use.')}
			</p>
			<div class="hero-actions">
				<ActionLink href={href('projects')}>{s('Explore the projects')}</ActionLink>
				<ActionLink href={href('health')}>{s('Health care projects')}</ActionLink>
				<ActionLink href={href('digital-health-teams')}>{s('For digital health teams')}</ActionLink>
			</div>
			</div>
		</HeroHeadline>
	</ContainerWithFixedWidth>
</Hero>

<ContainerWithFixedWidth maxWidth="76rem">
	<section class="stat-band" aria-labelledby="impact-heading">
		<h2 id="impact-heading" class="visually-hidden">{s('Impact at a glance')}</h2>
		<dl>
			<div><dt>{tCount(locale, 'downloads', HOME_DOWNLOADS_FLOOR, true)}</dt><dd>{n(HOME_DOWNLOADS_FLOOR)}+</dd></div>
			<div><dt>{tCount(locale, 'GitHub stars', TOTALS.ownerStars, true)}</dt><dd>{n(TOTALS.ownerStars)}+</dd></div>
			<div><dt>{s('languages for the most-translated guides')}</dt><dd>60+</dd></div>
			<div><dt>{s('open-source projects, including health care')}</dt><dd>{TOTALS.projects}</dd></div>
		</dl>
		<p class="stat-band-note">
			{s('Figures as of')} {formatDate(locale, STATS_AS_OF)}{s(', from GitHub, crates.io, and RubyGems.')}
			<a href={href('impact')}>{s('See every number and its source')}</a>.
		</p>
	</section>

	<section class="section" aria-labelledby="why-heading">
		<h2 id="why-heading">{s('Why public open source matters')}</h2>
		<p class="lead">
			{s('The hardest problems in health and public services are the same in every country. Open source lets the world work on them together, and lets every organisation, large or small, benefit from the result.')}
		</p>
		<div class="reason-grid">
			{#each reasons as reason (reason.heading)}
				<div class="reason">
					<h3>{s(reason.heading)}</h3>
					<p>{s(reason.text)}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="section" aria-labelledby="areas-heading">
		<h2 id="areas-heading">{s('Three areas of public value')}</h2>
		<ul class="card-grid area-grid" role="list">
			{#each areas as [key, area] (key)}
				<li>
					<div class="card area-card" data-area={key}>
						<h3><a href={href(area.slug)} data-lily-card-link="">{s(area.name)}</a></h3>
						<p>{s(area.summary)}</p>
						<p class="area-card-count">{PROJECTS.filter((p) => p.area === key).length} {tCount(locale, 'projects', PROJECTS.filter((p) => p.area === key).length)}</p>
					</div>
				</li>
			{/each}
		</ul>
	</section>

	<section class="section callout" aria-labelledby="teams-heading">
		<h2 id="teams-heading">{s('For digital health teams')}</h2>
		<p>
			{s('NHS Number validation, HL7 and FHIR integration, SNOMED CT terminology, architecture decision records, and public value business cases: see where these open-source projects can help your work, and how to get involved.')}
		</p>
		<p><ActionLink href={href('digital-health-teams')}>{s('Open the digital health teams page')}</ActionLink></p>
	</section>

	<!-- Spec: all other home page information comes first, then every project card, then the footer. -->
	<section class="section" aria-labelledby="projects-heading">
		<h2 id="projects-heading">{s('All projects')} ({PROJECTS.length})</h2>
		<ProjectGrid projects={homeProjects()} {locale} showArea share maxColumns={3} />
	</section>
</ContainerWithFixedWidth>
