<script lang="ts">
	// The project cards, with a category filter and a keyword box above them.
	// Filtering runs in the browser, so the controls appear after hydration; without
	// JavaScript, every card shows.
	import { onMount } from 'svelte';
	import { SearchInput, SegmentGroup, SegmentGroupItem } from '@lilydesignsystem/svelte-headless';
	import type { Project } from '#lib/data/projects.js';
	import { formatNumber, t, type Locale } from '#lib/locales.js';
	import { CATEGORIES, filterProjects } from '#lib/project-filter.js';
	import { ui } from '#lib/ui.js';
	import ProjectGrid from './ProjectGrid.svelte';

	let { projects, locale, share = false }: { projects: Project[]; locale: Locale; share?: boolean } = $props();
	const s = (text: string) => t(locale, text);
	const m = $derived(ui(locale));

	let ready = $state(false);
	let category = $state('');
	let query = $state('');
	const shown = $derived(filterProjects(locale, projects, category, query));
	const count = (c: string) => filterProjects(locale, projects, c, '').length;
	const options = $derived([{ value: '', name: s('All categories') }, ...CATEGORIES.map((c) => ({ value: c, name: s(c) }))]);

	onMount(() => (ready = true));
</script>

{#if ready}
	<div class="project-filter">
		<SearchInput class="project-filter-query" label={m.projectFilter.query} placeholder={m.projectFilter.query} bind:value={query} />
		<SegmentGroup class="project-filter-categories" label={m.projectFilter.categories}>
			{#each options as option (option.value)}
				<SegmentGroupItem checked={category === option.value} value={option.value} onclick={() => (category = option.value)}>
					{option.name} ({formatNumber(locale, count(option.value))})
				</SegmentGroupItem>
			{/each}
		</SegmentGroup>
		<p class="project-filter-status" role="status">{s('Projects shown:')} {formatNumber(locale, shown.length)}</p>
	</div>
{/if}
{#if shown.length}
	<ProjectGrid projects={shown} {locale} showArea {share} maxColumns={3} />
{:else}
	<p class="project-filter-empty">{s('No projects match. Try fewer words, or another category.')}</p>
{/if}
