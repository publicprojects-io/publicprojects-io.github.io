<script lang="ts">
	import AreaPage from '#lib/components/AreaPage.svelte';
	import { spell } from '#lib/locales.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => spell(locale, text);
</script>

<AreaPage area="public-value" {locale}>
	{#snippet intro()}
		<h2>{s('Doing public good, and showing it')}</h2>
		<p>
			{s('Public services have to make hard choices with limited budgets, and then show citizens what those choices achieved. These guides, metrics, and tools give organisations shared, open methods for that work: from cost-benefit and social return on investment, to secure vulnerability disclosure, to dependable service management.')}
		</p>
		<p>
			{s('Translation is a core part of the work. The Public Value Guide, Public Value Metrics, Coordinated Vulnerability Disclosure, and the Lily Design System are each available in 60 or more languages, because public value should not depend on which language you speak.')}
		</p>
		<p>
			{s('The Lily Design System brings the same idea to user interfaces: hundreds of accessible components, with themes for public-sector design systems, so that digital public services can work for disabled people and speakers of every language. This website is built with it; try the theme picker at the top of the page.')}
		</p>
	{/snippet}
</AreaPage>
