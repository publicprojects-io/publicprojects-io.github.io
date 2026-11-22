<script lang="ts">
	import type { Project } from '#lib/data/projects.js';
	import type { Locale } from '#lib/locales.js';
	import ProjectCard from './ProjectCard.svelte';

	let { projects, locale, headingLevel = 3, showArea = false, share = false, maxColumns }: {
		projects: Project[];
		locale: Locale;
		headingLevel?: 2 | 3 | 4;
		showArea?: boolean;
		share?: boolean;
		maxColumns?: 3;
	} = $props();
</script>

<ul class={["card-grid", maxColumns === 3 && "card-grid-max-3"]} role="list">
	{#each projects as project (project.slug)}
		<li><ProjectCard {project} {locale} {headingLevel} {showArea} {share} /></li>
	{/each}
</ul>
