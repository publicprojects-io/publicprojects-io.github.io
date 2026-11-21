<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { search, searchIndex } from '#lib/search.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const index = $derived(searchIndex(locale));

	// The page is prerendered once; the query (the Lily search picker sends /search/?<query>) is only known in the browser.
	let query = $state('');
	let ready = $state(false);
	afterNavigate(() => {
		try {
			query = decodeURIComponent(location.search.slice(1).replace(/\+/g, ' ')).trim();
		} catch {
			query = '';
		}
		ready = true;
	});
	const results = $derived(search(index, query));
</script>

<Seo {locale} slug="search" title={s('Search')} description={s(pageBySlug('search').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{s('Search')}</h1>
	</header>
	<form
		class="search-form"
		role="search"
		aria-label={s('Search this site')}
		onsubmit={(event) => {
			event.preventDefault();
			history.replaceState(history.state, '', `?${encodeURIComponent(query.trim())}`);
		}}
	>
		<label for="search-query">{s('Search terms')}</label>
		<input id="search-query" type="search" bind:value={query} autocomplete="off" />
	</form>
	<noscript><p>{s('Search needs JavaScript. Every project is also listed on the all projects page.')}</p></noscript>
	<div aria-live="polite">
		{#if ready && query}
			<p>{results.length} {s(results.length === 1 ? 'result for' : 'results for')} “{query}”</p>
		{/if}
	</div>
	{#if results.length}
		<ol class="search-results">
			{#each results as result (result.path)}
				<li>
					<a href={`${base}${result.path}`}>{result.title}</a>
					<p>{result.description}</p>
				</li>
			{/each}
		</ol>
	{/if}
</ContainerWithFixedWidth>
