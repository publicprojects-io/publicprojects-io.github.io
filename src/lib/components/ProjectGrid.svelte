<script lang="ts">
	import type { Project } from '#lib/data/projects.js';
	import type { Locale } from '#lib/locales.js';
	import ProjectCard from './ProjectCard.svelte';

	let { projects, locale, headingLevel = 3, showArea = false }: {
		projects: Project[];
		locale: Locale;
		headingLevel?: 2 | 3 | 4;
		showArea?: boolean;
	} = $props();
</script>

<ul class="card-grid" role="list">
	{#each projects as project (project.slug)}
		<li><ProjectCard {project} {locale} {headingLevel} {showArea} /></li>
	{/each}
</ul>
