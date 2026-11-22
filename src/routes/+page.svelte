<script lang="ts">
	// The site root: a language chooser, like lilydesignsystem.com. With
	// JavaScript, it sends the visitor straight to the locale that best matches
	// their browser's languages, or en-001. Nothing is stored. Without
	// JavaScript, the visitor picks from the list.
	import { onMount } from 'svelte';
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_TAGS, localeDir, localePath, pickLocale } from '#lib/locales.js';
	import { SITE_NAME, SITE_TAGLINE } from '#lib/site.js';

	onMount(() => {
		const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
		location.replace(`${base}${localePath(pickLocale(preferred) ?? DEFAULT_LOCALE)}`);
	});
</script>

<Seo locale={DEFAULT_LOCALE} slug="" title={SITE_TAGLINE} description="Public Projects: open source for the public good. Choose your language." />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{SITE_NAME}</h1>
		<p class="lead" lang="en">Choose your language.</p>
		<p class="lead" lang="cy">Dewiswch eich iaith.</p>
	</header>
	<ul class="language-chooser" role="list">
		{#each LOCALES as l (l)}
			<li><a href={`${base}${localePath(l)}`} hreflang={LOCALE_TAGS[l]} lang={LOCALE_TAGS[l]} dir={localeDir(l)}>{LOCALE_LABELS[l]}</a></li>
		{/each}
	</ul>
</ContainerWithFixedWidth>
