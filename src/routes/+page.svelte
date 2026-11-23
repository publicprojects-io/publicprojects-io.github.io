<script lang="ts">
	// The site root: a language chooser, like lilydesignsystem.com. With
	// JavaScript, an inline head script sends the visitor straight to the locale
	// that best matches their browser's languages, or en-001 when the browser has
	// none or none match. It runs before the app loads. Nothing is stored. Without
	// JavaScript, the visitor picks from the list.
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { DEFAULT_LOCALE, LOCALES, LOCALE_LABELS, LOCALE_TAGS, localeDir, localePath, rootRedirectScript } from '#lib/locales.js';
	import { SITE_NAME, SITE_TAGLINE } from '#lib/site.js';

	// Split so the closing tag does not end this component's own script block.
	const redirect = `<script>${rootRedirectScript(base)}<` + '/script>';
</script>

<svelte:head>
	{@html redirect}
</svelte:head>

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
