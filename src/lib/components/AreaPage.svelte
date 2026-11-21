<script lang="ts">
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import type { Snippet } from 'svelte';
	import ProjectGrid from './ProjectGrid.svelte';
	import Seo from './Seo.svelte';
	import { AREAS, projectsInArea, type Area } from '#lib/data/projects.js';
	import { t, type Locale } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';

	let { area, locale, intro, after }: { area: Area; locale: Locale; intro: Snippet; after?: Snippet } = $props();
	const s = (text: string) => t(locale, text);
	const info = $derived(AREAS[area]);
	const projects = $derived(projectsInArea(area));
</script>

<Seo {locale} slug={info.slug} title={s(info.name)} description={s(pageBySlug(info.slug).description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header" data-area={area}>
		<h1>{s(info.name)}</h1>
		<p class="lead">{s(info.summary)}</p>
	</header>
	<div class="prose">{@render intro()}</div>
	<section class="section" aria-labelledby="projects-heading">
		<h2 id="projects-heading">{s('Projects')} ({projects.length})</h2>
		<ProjectGrid {projects} {locale} />
	</section>
	{#if after}<div class="prose">{@render after()}</div>{/if}
</ContainerWithFixedWidth>
