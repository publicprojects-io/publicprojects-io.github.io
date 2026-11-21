<script lang="ts">
	import { base } from '#lib/base.js';
	import { page } from '$app/state';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import { localePath, parsePath, spell } from '#lib/locales.js';

	const locale = $derived(parsePath(page.url.pathname.slice(base.length) || '/').locale);
	const s = (text: string) => spell(locale, text);
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
