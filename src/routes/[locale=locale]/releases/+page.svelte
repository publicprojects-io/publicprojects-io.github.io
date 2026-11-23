<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { STATS_AS_OF, releases } from '#lib/data/projects.js';
	import { formatDate, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const rows = releases();
</script>

<Seo {locale} slug="releases" title={s('Releases')} description={s(pageBySlug('releases').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{s('Releases')}</h1>
		<p class="lead">{s('The latest release of each published package, newest first. Regular releases show that a project is maintained.')}</p>
	</header>

	<div class="needs-table-wrap">
		<table class="data-table">
			<thead>
				<tr>
					<th scope="col">{s('Released')}</th>
					<th scope="col">{s('Project')}</th>
					<th scope="col">{s('Package')}</th>
					<th scope="col">{s('Version')}</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as row (row.href)}
					<tr>
						<td><time datetime={row.released}>{formatDate(locale, row.released)}</time></td>
						<th scope="row"><a href={href(`projects/${row.project.slug}`)}>{s(row.project.name)}</a></th>
						<td><a href={row.href}><code>{row.name}</code></a> ({row.registry})</td>
						<td>{row.version}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<p class="small">
		{s('Release dates are from crates.io and RubyGems, as of')} {formatDate(locale, STATS_AS_OF)}.
		{s('Follow new releases with the')} <a href={`${base}/releases.xml`} type="application/atom+xml">{s('Atom feed')}</a>.
	</p>
</ContainerWithFixedWidth>
