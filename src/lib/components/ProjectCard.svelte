<script lang="ts">
	import { base } from '#lib/base.js';
	import { Card } from '@lilydesignsystem/svelte-headless';
	import SharePicker from '@lilydesignsystem/svelte-share-picker';
	import { AREAS, STATUS_NAMES, statusOf, statValue, type Project } from '#lib/data/projects.js';
	import { formatNumber, localePath, t, type Locale } from '#lib/locales.js';
	import { shareTargets } from '#lib/share.js';
	import { SITE_NAME, SITE_ORIGIN } from '#lib/site.js';
	import { ui } from '#lib/ui.js';

	let {
		project,
		locale,
		headingLevel = 3,
		showArea = false,
		share = false
	}: {
		project: Project;
		locale: Locale;
		headingLevel?: 2 | 3 | 4;
		showArea?: boolean;
		/** Show a Share button (lower left) that shares this project's page. */
		share?: boolean;
	} = $props();
	const s = (text: string) => t(locale, text);
	const m = $derived(ui(locale));
	const path = $derived(`${base}${localePath(locale, `projects/${project.slug}`)}`);
	const status = $derived(statusOf(project));
</script>

<Card class="project-card" heading={project.name} {headingLevel} href={path} wholeCardLink>
	{#if showArea}<p class="project-card-area">{s(AREAS[project.area].name)}</p>{/if}
	<p>{s(project.summary)}</p>
	<ul class="project-card-facts">
		<li class="project-status" data-status={status}>{s(STATUS_NAMES[status])}</li>
		{#each project.stats ?? [] as ref (ref.key)}
			{@const stat = statValue(ref)}
			<li><strong>{formatNumber(locale, stat.value, stat.value >= 10000)}</strong> {stat.label === 'stars' ? m.stars : m.downloads}</li>
		{/each}
		{#if project.languages}<li><strong>{s(project.languages)}</strong></li>{/if}
	</ul>
	{#if share}
		<div class="project-card-share">
			<SharePicker
				label={`${m.share.project}: ${project.name}`}
				url={`${SITE_ORIGIN}${path}`}
				title={`${project.name} · ${SITE_NAME}`}
				text={s(project.summary)}
				targets={shareTargets(m)}
				copyLabel={m.share.copy}
				copiedLabel={m.share.copied}
				copyFailedLabel={m.share.copyFailed}
			>
				{#snippet children()}
					<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10V2M5 5l3-3 3 3M3 9v4h10V9" /></svg>
					<span>{m.share.button}</span>
				{/snippet}
			</SharePicker>
		</div>
	{/if}
</Card>
