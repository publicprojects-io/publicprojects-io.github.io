<script lang="ts">
	import { base } from '#lib/base.js';
	import { page } from '$app/state';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import { onMount } from 'svelte';
	import { DEFAULT_LOCALE, localePath, parsePath, t } from '#lib/locales.js';
	import { SLUGS } from '#lib/urls.js';

	const locale = $derived(parsePath(page.url.pathname.slice(base.length) || '/').locale);

	// Links from before every page had a locale prefix (such as /donate/) still
	// work: forward them to the same page in the default locale.
	onMount(() => {
		const { slug, prefixed } = parsePath(location.pathname.slice(base.length) || '/');
		if (!prefixed && (SLUGS.includes(slug) || slug === 'search')) {
			location.replace(`${base}${localePath(DEFAULT_LOCALE, slug)}${location.search}${location.hash}`);
		}
	});
	const s = (text: string) => t(locale, text);
</script>

<svelte:head><title>{page.status} · Public Projects</title></svelte:head>

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{page.status === 404 ? s('Page not found') : s('Something went wrong')}</h1>
		<p class="lead">{s('Try the home page, the list of all projects, or search.')}</p>
		<ul class="inline-list">
			<li><a href={`${base}${localePath(locale)}`}>{s('Home')}</a></li>
			<li><a href={`${base}${localePath(locale, 'projects')}`}>{s('All projects')}</a></li>
			<li><a href={`${base}${localePath(locale, 'search')}`}>{s('Search')}</a></li>
		</ul>
	</header>
</ContainerWithFixedWidth>
