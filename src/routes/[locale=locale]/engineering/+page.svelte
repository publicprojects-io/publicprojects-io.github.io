<script lang="ts">
	import { base } from '#lib/base.js';
	import AreaPage from '#lib/components/AreaPage.svelte';
	import { statValue, TOTALS } from '#lib/data/projects.js';
	import { formatNumber, localePath, t } from '#lib/locales.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const n = (value: number) => formatNumber(locale, value);
	const adr = statValue({ kind: 'github', key: 'architecture-decision-record/architecture-decision-record' }).value;
	const assertables = statValue({ kind: 'crate', key: 'assertables' }).value;
	const unaccent = statValue({ kind: 'gem', key: 'sixarm_ruby_unaccent' }).value;
</script>

<AreaPage area="engineering" {locale}>
	{#snippet intro()}
		<h2>{s('Global leadership in software engineering')}</h2>
		<p>
			{s('Good public services need good engineering: decisions that are recorded and explained, systems that are measured honestly, and software that is tested thoroughly. These projects share practices that engineering leaders and teams use around the world.')}
		</p>
		<ul>
			<li>
				<strong>{s('Architecture Decision Record')}</strong>: {n(adr)} {s('GitHub stars, translated into 60+ languages, and referenced by the GitHub Blog’s engineering article on why teams should write ADRs.')}
			</li>
			<li>
				<strong>{s('Package downloads')}</strong>: {n(unaccent)} {s('for the Unaccent Ruby gem and')} {n(assertables)} {s('for the Assertables Rust crate, part of')} {formatNumber(locale, TOTALS.downloads, true)}+ {s('downloads across all packages.')}
			</li>
			<li>
				<strong>{s('Leadership toolkits')}</strong>: {s('OKRs, KPIs, maturity models, system quality attributes, queueing theory, and repository strategy, each shared openly for any organisation to adapt.')}
			</li>
		</ul>
		<p><a href={`${base}${localePath(locale, 'impact')}`}>{s('See the dated sources for every number')}</a>.</p>
	{/snippet}
</AreaPage>
