<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import ProjectGrid from '#lib/components/ProjectGrid.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { AREAS, PROJECTS } from '#lib/data/projects.js';
	import { localePath, t } from '#lib/locales.js';
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

	<div class="prose detail-prose">
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

	{#if related.length}
		<section class="section" aria-labelledby="related-heading">
			<h2 id="related-heading">{s('Related projects')}</h2>
			<ProjectGrid projects={related} {locale} />
		</section>
	{/if}
</ContainerWithFixedWidth>
