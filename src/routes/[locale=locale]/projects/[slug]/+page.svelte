<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth, Tag, TagGroup } from '@lilydesignsystem/svelte-headless';
	import ProjectGrid from '#lib/components/ProjectGrid.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import {
		AREAS,
		PROJECTS,
		STATS_AS_OF,
		STATUS_NAMES,
		clinicalSafetyOf,
		lastCommitOf,
		licenceOf,
		statSource,
		statValue,
		statusOf,
		versionOf
	} from '#lib/data/projects.js';
	import { formatDate, formatNumber, localePath, t } from '#lib/locales.js';
	import { PERSON } from '#lib/site.js';
	import { ui } from '#lib/ui.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const project = $derived(data.project);
	const m = $derived(ui(locale));
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const area = $derived(AREAS[project.area]);
	const related = $derived(PROJECTS.filter((p) => p.area === project.area && p.slug !== project.slug).slice(0, 3));
	// The stat source link is lower case after its number ("753 (source)"), except in
	// German, where nouns keep their capital ("753 (Quelle)").
	const sourceLink = $derived(locale.startsWith('de-') ? m.source : m.source.toLowerCase());
	const status = $derived(statusOf(project));
	const version = $derived(versionOf(project));
	const licence = $derived(licenceOf(project));
	const safety = $derived(clinicalSafetyOf(project));
	const date = (iso: string) => formatDate(locale, iso);
	const isCode = $derived(project.links.some((l) => /^https:\/\/(crates\.io|rubygems\.org|github\.com)\//.test(l.href)));
</script>

<Seo
	{locale}
	slug={`projects/${project.slug}`}
	title={s(project.name)}
	description={s(project.summary)}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': isCode ? 'SoftwareSourceCode' : 'CreativeWork',
		name: project.name,
		description: project.summary,
		url: project.links[0]?.href,
		keywords: project.tags.join(', '),
		isAccessibleForFree: true,
		author: { '@type': 'Person', name: PERSON.name, url: PERSON.website }
	}}
/>

<ContainerWithFixedWidth maxWidth="76rem">
	<nav class="breadcrumb" aria-label={m.breadcrumb}>
		<ol>
			<li><a href={href('')}>{m.home}</a></li>
			<li><a href={href(area.slug)}>{s(area.name)}</a></li>
			<li aria-current="page">{s(project.name)}</li>
		</ol>
	</nav>
	<header class="page-header" data-area={project.area}>
		<h1>{s(project.name)}</h1>
		<p class="lead">{s(project.summary)}</p>
		<ul class="link-buttons" role="list">
			{#each project.links as link (link.href)}
				<li><a class="button" href={link.href} rel="external">{s(link.label)}</a></li>
			{/each}
		</ul>
	</header>

	<div class="detail-grid">
		<div class="prose">
			<h2>{s('About this project')}</h2>
			<p>{s(project.description)}</p>
			<h2>{s('Public value')}</h2>
			<p>{s(project.value)}</p>
			{#if project.usage}
				<h2>{s('Use it')}</h2>
				<p>{s('Install:')}</p>
				<pre class="code"><code>{project.usage.install}</code></pre>
				<p>{s('Example:')}</p>
				<pre class="code"><code>{project.usage.code}</code></pre>
				<p>{s('Output:')}</p>
				<pre class="code code-output"><code>{project.usage.output}</code></pre>
				<p class="small">{s('Output from version')} {project.usage.version}, {s('installed from crates.io.')}</p>
			{/if}
			{#if project.recognition?.length}
				<h2>{s('Recognition')}</h2>
				<ul>
					{#each project.recognition as item (item.href)}
						<li><a href={item.href}>{s(item.label)}</a></li>
					{/each}
				</ul>
			{/if}
		</div>
		<aside class="detail-facts" aria-labelledby="facts-heading">
			<h2 id="facts-heading">{s('Key facts')}</h2>
			<dl>
				<dt>{s('Status')}</dt>
				<dd>
					<a href={href('project-status')}><span class="project-status" data-status={status}>{s(STATUS_NAMES[status])}</span></a>
				</dd>
				{#if version}
					<dt>{s('Current version')}</dt>
					<dd>{version.version} <span class="small">({s('released')} {date(version.released)})</span></dd>
				{/if}
				<dt>{s('Licence')}</dt>
				<dd>{#if licence}<code class="licence">{licence}</code>{:else}{s('Not stated in the repository')}{/if}</dd>
				<dt>{s('Maintainer')}</dt>
				<dd>{PERSON.name}</dd>
				<dt>{s('Latest commit')}</dt>
				<dd>{date(lastCommitOf(project))}</dd>
				<dt>{s('Area')}</dt>
				<dd><a href={href(area.slug)}>{s(area.name)}</a></dd>
				{#each project.stats ?? [] as ref (ref.key)}
					{@const stat = statValue(ref)}
					<dt>{stat.label === 'stars' ? t(locale, 'GitHub stars', 'label') : s('Downloads')}</dt>
					<dd>
						{formatNumber(locale, stat.value)}
						<span class="small">(<a href={statSource(ref)}>{sourceLink}</a>)</span>
					</dd>
				{/each}
				{#if project.languages}
					<dt>{s('Translations')}</dt>
					<dd>{s(project.languages)}</dd>
				{/if}
				{#if safety}
					<dt>{s('Clinical Safety Officer')}</dt>
					<dd>{s(safety.officer)}</dd>
					<dt>{s('Medical device position')}</dt>
					<dd>{s(safety.device)}</dd>
					<dt>{s('Clinical safety documentation')}</dt>
					<dd>{#if safety.documents}<a href={safety.documents.href}>{s(safety.documents.label)}</a>{:else}{s('None published')}{/if}</dd>
				{/if}
				<dt>{s('Source')}</dt>
				<dd><a href={`https://github.com/${project.repo}`}>github.com/{project.repo}</a></dd>
			</dl>
			<p class="small">
				{s('Facts as of')} {date(STATS_AS_OF)}.
				{#if safety}{s('A library is assessed within the clinical safety case of each system that uses it.')}{/if}
			</p>
			<TagGroup label={s('Topics')}>
				{#each project.tags as tag (tag)}<Tag label={tag}>{tag}</Tag>{/each}
			</TagGroup>
		</aside>
	</div>

	{#if related.length}
		<section class="section" aria-labelledby="related-heading">
			<h2 id="related-heading">{s('Related projects')}</h2>
			<ProjectGrid projects={related} {locale} />
		</section>
	{/if}
</ContainerWithFixedWidth>
