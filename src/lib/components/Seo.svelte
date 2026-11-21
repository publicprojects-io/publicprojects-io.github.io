<script lang="ts">
	// Title, description, canonical URL, hreflang alternates, and Open Graph tags.
	import { base } from '#lib/base.js';
	import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, localePath, type Locale } from '#lib/locales.js';
	import { SITE_NAME, SITE_ORIGIN } from '#lib/site.js';

	let {
		locale,
		slug,
		title,
		description,
		jsonLd
	}: { locale: Locale; slug: string; title: string; description: string; jsonLd?: object } = $props();

	const url = (l: Locale) => `${SITE_ORIGIN}${base}${localePath(l, slug)}`;
	const fullTitle = $derived(slug ? `${title} · ${SITE_NAME}` : `${SITE_NAME}: ${title}`);
	const ld = $derived(jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` + 'script>' : '');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url(locale)} />
	{#each LOCALES as l (l)}
		<link rel="alternate" hreflang={LOCALE_TAGS[l]} href={url(l)} />
	{/each}
	<!-- x-default: the root language chooser, which redirects to the visitor's language. -->
	<link rel="alternate" hreflang="x-default" href={slug ? url(DEFAULT_LOCALE) : `${SITE_ORIGIN}${base}/`} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url(locale)} />
	{#if locale !== DEFAULT_LOCALE}
		<meta property="og:locale" content={LOCALE_TAGS[locale].replace('-', '_')} />
	{/if}
	<meta name="twitter:card" content="summary" />
	{@html ld}
</svelte:head>
