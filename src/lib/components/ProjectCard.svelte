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
		/** Show a Lily SharePicker (lower left) that shares this project's page. */
		share?: boolean;
	} = $props();
	const s = (text: string) => t(locale, text);
	const m = $derived(ui(locale));
	const path = $derived(`${base}${localePath(locale, `projects/${project.slug}`)}`);
	const status = $derived(statusOf(project));
	// Cards leave out the common statuses; the project page still shows them in its key facts.
	const QUIET_STATUSES: string[] = ['active', 'pre-release'];
</script>

<Card class="project-card" heading={s(project.name)} {headingLevel} href={path} wholeCardLink>
	{#if showArea}<p class="project-card-area">{s(AREAS[project.area].name)}</p>{/if}
	<p>{s(project.summary)}</p>
	<ul class="project-card-facts">
		{#if !QUIET_STATUSES.includes(status)}<li class="project-status" data-status={status}>{s(STATUS_NAMES[status])}</li>{/if}
		{#each project.stats ?? [] as ref (ref.key)}
			{@const stat = statValue(ref)}
			<li><strong>{formatNumber(locale, stat.value, stat.value >= 10000)}</strong> {stat.label === 'stars' ? m.stars : m.downloads}</li>
		{/each}
		{#if project.languages}<li><strong>{s(project.languages)}</strong></li>{/if}
	</ul>
	{#if share}
		<div class="project-card-share">
			<SharePicker
				label={`${m.share.project}: ${s(project.name)}`}
				url={`${SITE_ORIGIN}${path}`}
				title={`${s(project.name)} · ${SITE_NAME}`}
				text={s(project.summary)}
				targets={shareTargets(m)}
				copyLabel={m.share.copy}
				copiedLabel={m.share.copied}
				copyFailedLabel={m.share.copyFailed}
			/>
		</div>
	{/if}
</Card>
