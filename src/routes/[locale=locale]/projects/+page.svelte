<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import ProjectGrid from '#lib/components/ProjectGrid.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import { AREAS, PROJECTS, projectsInArea, type Area } from '#lib/data/projects.js';
	import { localePath, t, tCount } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const areas = Object.entries(AREAS) as [Area, (typeof AREAS)[Area]][];
</script>

<Seo {locale} slug="projects" title={s('All projects')} description={s(pageBySlug('projects').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{s('All projects')}</h1>
		<p class="lead">
			{PROJECTS.length} {tCount(locale, 'free, open-source projects in three areas. Every project is free to use, study, change, and share.', PROJECTS.length)}
		</p>
		<nav aria-label={s('Areas')}>
			<ul class="inline-list">
				{#each areas as [key, area] (key)}
					<li><a href={`#${key}`}>{s(area.name)} ({projectsInArea(key).length})</a></li>
				{/each}
			</ul>
		</nav>
	</header>
	{#each areas as [key, area] (key)}
		<section class="section" id={key} aria-labelledby={`${key}-heading`}>
			<h2 id={`${key}-heading`}><a href={`${base}${localePath(locale, area.slug)}`}>{s(area.name)}</a></h2>
			<p>{s(area.summary)}</p>
			<ProjectGrid projects={projectsInArea(key)} {locale} />
		</section>
	{/each}
</ContainerWithFixedWidth>
