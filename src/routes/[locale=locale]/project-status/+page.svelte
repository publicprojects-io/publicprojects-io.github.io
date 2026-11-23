<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { PROJECTS, STATUSES, STATUS_NAMES, statusOf, type Status } from '#lib/data/projects.js';
	import { localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;

	const meaning: Record<Status, { what: string; rule: string }> = {
		active: {
			what: 'Released and maintained. Usable today; follow the project’s own versioning for changes.',
			rule: 'A package at version 1.0.0 or later, or a site or repository, with a commit in the past year.'
		},
		'pre-release': {
			what: 'Usable for evaluation and development, but interfaces, data formats, and documents may still change.',
			rule: 'A package version below 1.0.0, or a project that describes itself as pre-release or draft.'
		},
		demonstration: {
			what: 'Made for learning and illustration. Not for production use, and never for medical use.',
			rule: 'The project says it is a demonstration or tutorial.'
		},
		maintenance: {
			what: 'Stable and still available. Fixes are possible, but new features are unlikely.',
			rule: 'No commit to the main repository for more than a year.'
		},
		archived: {
			what: 'No longer maintained. The repository is read-only; use at your own risk.',
			rule: 'The repository is archived on GitHub.'
		}
	};
</script>

<Seo {locale} slug="project-status" title={s('Project status')} description={s(pageBySlug('project-status').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('Project status')}</h1>
			<p class="lead">
				{s('Every project has a status, so you can tell how much to rely on it today. Statuses are worked out from dated facts, such as package versions and the latest commit, so they stay honest as projects change.')}
			</p>
		</header>
		<div class="needs-table-wrap">
			<table class="data-table">
				<thead>
					<tr><th scope="col">{s('Status')}</th><th scope="col">{s('What you can expect')}</th><th scope="col">{s('How it is decided')}</th><th scope="col" class="num">{s('Projects')}</th></tr>
				</thead>
				<tbody>
					{#each STATUSES as status (status)}
						<tr>
							<th scope="row"><span class="project-status" data-status={status}>{s(STATUS_NAMES[status])}</span></th>
							<td>{s(meaning[status].what)}</td>
							<td>{s(meaning[status].rule)}</td>
							<td class="num">{PROJECTS.filter((p) => statusOf(p) === status).length}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p>
			{s('The checks run in this order: archived first, then a project’s own description, then the package version, then the latest commit. See also')}
			<a href={href('projects')}>{s('all projects')}</a>.
		</p>
	</div>
</ContainerWithFixedWidth>
