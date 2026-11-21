<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { OWNERS, PROJECTS, STATS_AS_OF, TOTALS, statSource, statValue } from '#lib/data/projects.js';
	import { formatDate, formatNumber, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { PERSON } from '#lib/site.js';
	import { ui } from '#lib/ui.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const m = $derived(ui(locale));
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;

	const rows = $derived(
		PROJECTS.flatMap((project) => (project.stats ?? []).map((ref) => ({ project, ref, ...statValue(ref) }))).sort(
			(a, b) => b.value - a.value
		)
	);
	const downloads = $derived(rows.filter((r) => r.label === 'downloads'));
	const stars = $derived(rows.filter((r) => r.label === 'stars'));
	const translated = PROJECTS.filter((p) => p.languages);
</script>

<Seo {locale} slug="impact" title={s('Impact')} description={s(pageBySlug('impact').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{s('Impact')}</h1>
		<p class="lead">
			{s('Every number on this site, with its date and a link to where you can check it. Figures are as of')}
			{formatDate(locale, STATS_AS_OF)}.
		</p>
	</header>

	<section class="stat-band" aria-labelledby="totals-heading">
		<h2 id="totals-heading" class="visually-hidden">{s('Totals')}</h2>
		<dl>
			<div><dt>{s('package downloads')}</dt><dd>{formatNumber(locale, TOTALS.downloads)}</dd></div>
			<div><dt>{s('GitHub stars across the joelparkerhenderson, GitAlias, and SixArm repositories')}</dt><dd>{formatNumber(locale, TOTALS.ownerStars)}</dd></div>
			<div><dt>{s('projects translated into 10 or more languages')}</dt><dd>{translated.length}</dd></div>
			<div><dt>{s('health care and medical projects')}</dt><dd>{TOTALS.healthProjects}</dd></div>
		</dl>
	</section>

	<section class="section prose" aria-labelledby="recognition-heading">
		<h2 id="recognition-heading">{s('Recognition')}</h2>
		<ul>
			<li>
				{s('The GitHub Blog’s engineering article')}
				<a href="https://github.blog/engineering/architecture-optimization/why-write-adrs/">{s('Why write ADRs')}</a>
				{s('links to the')} <a href={href('projects/architecture-decision-record')}>{s('Architecture Decision Record')}</a> {s('project as a resource.')}
			</li>
			<li>
				{s('Public Projects works are listed on the author’s')} <a href={PERSON.orcid}>{s('ORCID record')}</a>
				{s('(0009-0000-4681-282X), the persistent identifier used by researchers and publishers worldwide.')}
			</li>
		</ul>
	</section>

	<section class="section" aria-labelledby="downloads-heading">
		<h2 id="downloads-heading">{s('Package downloads')}</h2>
		<div class="needs-table-wrap">
			<table class="data-table">
				<thead><tr><th scope="col">{s('Project')}</th><th scope="col" class="num">{s('Downloads')}</th><th scope="col">{m.source}</th></tr></thead>
				<tbody>
					{#each downloads as row (row.ref.key)}
						<tr>
							<th scope="row"><a href={href(`projects/${row.project.slug}`)}>{row.project.name}</a></th>
							<td class="num">{formatNumber(locale, row.value)}</td>
							<td><a href={statSource(row.ref)}>{row.ref.kind === 'gem' ? 'RubyGems' : 'crates.io'}</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="section" aria-labelledby="accounts-heading">
		<h2 id="accounts-heading">{s('GitHub stars by account')}</h2>
		<p>{s('Every repository each account owns, including forks.')}</p>
		<div class="needs-table-wrap">
			<table class="data-table">
				<thead><tr><th scope="col">{s('Account')}</th><th scope="col" class="num">{s('Repositories')}</th><th scope="col" class="num">{s('Stars')}</th></tr></thead>
				<tbody>
					{#each OWNERS as owner (owner.login)}
						<tr>
							<th scope="row"><a href={owner.url}>{owner.login}</a></th>
							<td class="num">{formatNumber(locale, owner.repos)}</td>
							<td class="num">{formatNumber(locale, owner.stars)}</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th scope="row">{s('Total')}</th>
						<td class="num">{formatNumber(locale, TOTALS.ownerRepos)}</td>
						<td class="num">{formatNumber(locale, TOTALS.ownerStars)}</td>
					</tr>
				</tfoot>
			</table>
		</div>
		<p class="small">{s('The Architecture Decision Record repository belongs to its own organisation, so its stars are listed separately below and are not in this total.')}</p>
	</section>

	<section class="section" aria-labelledby="stars-heading">
		<h2 id="stars-heading">{s('GitHub stars by project')}</h2>
		<div class="needs-table-wrap">
			<table class="data-table">
				<thead><tr><th scope="col">{s('Project')}</th><th scope="col" class="num">{s('Stars')}</th><th scope="col">{m.source}</th></tr></thead>
				<tbody>
					{#each stars as row (row.ref.key)}
						<tr>
							<th scope="row"><a href={href(`projects/${row.project.slug}`)}>{row.project.name}</a></th>
							<td class="num">{formatNumber(locale, row.value)}</td>
							<td><a href={statSource(row.ref)}>GitHub</a></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="section" aria-labelledby="translations-heading">
		<h2 id="translations-heading">{s('Translations')}</h2>
		<ul class="plain-list">
			{#each translated as project (project.slug)}
				<li><a href={href(`projects/${project.slug}`)}>{project.name}</a>: {project.languages}</li>
			{/each}
		</ul>
		<p class="small">{s('Translation counts are as published by each project.')}</p>
	</section>

	<section class="section prose" aria-labelledby="method-heading">
		<h2 id="method-heading">{s('How these numbers are gathered')}</h2>
		<p>
			{s('Downloads come from the public crates.io and RubyGems APIs, and stars from the public GitHub API. They are collected on one date by a script in this site’s source code, reviewed, and published with that date, so that each figure can be checked and none is estimated.')}
		</p>
	</section>
</ContainerWithFixedWidth>
