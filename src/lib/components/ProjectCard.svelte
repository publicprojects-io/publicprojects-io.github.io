<script lang="ts">
	import { base } from '#lib/base.js';
	import { Card } from '@lilydesignsystem/svelte-headless';
	import { AREAS, statValue, type Project } from '#lib/data/projects.js';
	import { formatNumber, localePath, spell, type Locale } from '#lib/locales.js';
	import { ui } from '#lib/ui.js';

	let { project, locale, headingLevel = 3, showArea = false }: {
		project: Project;
		locale: Locale;
		headingLevel?: 2 | 3 | 4;
		showArea?: boolean;
	} = $props();
	const s = (text: string) => spell(locale, text);
	const m = $derived(ui(locale));
</script>

<Card
	class="project-card"
	heading={project.name}
	{headingLevel}
	href={`${base}${localePath(locale, `projects/${project.slug}`)}`}
	wholeCardLink
>
	{#if showArea}<p class="project-card-area">{s(AREAS[project.area].name)}</p>{/if}
	<p>{s(project.summary)}</p>
	{#if project.stats?.length || project.languages}
		<ul class="project-card-facts">
			{#each project.stats ?? [] as ref (ref.key)}
				{@const stat = statValue(ref)}
				<li><strong>{formatNumber(locale, stat.value, stat.value >= 10000)}</strong> {stat.label === 'stars' ? m.stars : m.downloads}</li>
			{/each}
			{#if project.languages}<li><strong>{project.languages}</strong></li>{/if}
		</ul>
	{/if}
</Card>
