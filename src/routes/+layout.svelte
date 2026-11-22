<script lang="ts">
	import '../app.css';
	import { base } from '#lib/base.js';
	import { page } from '$app/state';
	import { ContainerWithFixedWidth, Footer, Header, InsetText, NavigationMenu, SkipLink } from '@lilydesignsystem/svelte-headless';
	import type { Snippet } from 'svelte';
	import SitePickerBar from '#lib/components/SitePickerBar.svelte';
	import { LOCALE_TAGS, isTranslated, localeDir, localePath, parsePath, t } from '#lib/locales.js';
	import { PAGES } from '#lib/pages.js';
	import { projectBySlug } from '#lib/data/projects.js';
	import { ISSUES_URL, PERSON, SITE_NAME, SITE_TAGLINE } from '#lib/site.js';
	import { ui } from '#lib/ui.js';

	let { data, children }: { data: { locale: import('#lib/locales.js').Locale }; children: Snippet } = $props();

	const locale = $derived(data.locale);
	const m = $derived(ui(locale));
	const s = (text: string) => t(locale, text);
	const slug = $derived(parsePath(page.url.pathname.slice(base.length) || '/').slug);
	const section = $derived(slug.split('/')[0]);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const title = $derived.by(() => {
		const project = slug.startsWith('projects/') ? projectBySlug(slug.slice('projects/'.length)) : undefined;
		return project ? s(project.name) : s(PAGES.find((p) => p.slug === slug)?.name ?? SITE_TAGLINE);
	});
	const year = new Date().getFullYear();
	// The language picker navigates in the browser, so keep <html lang> and <html dir>
	// in step; prerendering sets them for a first visit.
	$effect(() => {
		document.documentElement.lang = LOCALE_TAGS[locale];
		document.documentElement.dir = localeDir(locale);
	});
</script>

<SkipLink href="#content" label={m.skip} />

<Header class="site-header" label={SITE_NAME}>
	<!-- Wider than page content (76rem) so logo, links, and picker bar fit one row. -->
	<ContainerWithFixedWidth maxWidth="84rem">
		<div class="site-header-row">
			<a class="site-brand" href={href('')}>
				<svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
					<circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="2.5" />
					<path d="M13 8h6v5h5v6h-5v5h-6v-5H8v-6h5z" fill="currentColor" />
				</svg>
				<span>{SITE_NAME}</span>
			</a>
			<NavigationMenu label={m.mainNav} class="site-nav">
				<ul>
					{#each PAGES.filter((p) => p.nav) as item (item.slug)}
						<li>
							<a href={href(item.slug)} aria-current={section === item.slug ? 'page' : undefined}>{s(item.name)}</a>
						</li>
					{/each}
				</ul>
			</NavigationMenu>
			<SitePickerBar {locale} {slug} {title} />
		</div>
	</ContainerWithFixedWidth>
</Header>

<main id="content" tabindex="-1">
	{#if isTranslated(locale)}
		<ContainerWithFixedWidth maxWidth="76rem">
			<InsetText class="draft-notice"><p>{m.draftNotice} <a href={ISSUES_URL}>{m.reportIssue}</a>.</p></InsetText>
		</ContainerWithFixedWidth>
	{/if}
	{@render children()}
</main>

<Footer class="site-footer" label={m.footerNav}>
	<ContainerWithFixedWidth maxWidth="76rem">
		<div class="site-footer-columns">
			<div>
				<p class="site-footer-brand"><strong>{SITE_NAME}</strong>: {s(SITE_TAGLINE.toLowerCase())}.</p>
				<p>{m.footerAbout}</p>
			</div>
			<nav aria-label={m.footerNav}>
				<ul>
					{#each PAGES.filter((p) => p.nav) as item (item.slug)}
						<li><a href={href(item.slug)}>{s(item.name)}</a></li>
					{/each}
				</ul>
			</nav>
		</div>
		<nav class="site-footer-policies" aria-label={m.policies}>
			<ul>
				{#each PAGES.filter((p) => p.footer) as item (item.slug)}
					<li><a href={href(item.slug)} aria-current={slug === item.slug ? 'page' : undefined}>{s(item.name)}</a></li>
				{/each}
			</ul>
		</nav>
		<p class="site-colophon">
			© {year} <a href={PERSON.website}>{PERSON.name}</a> ·
			<a href={PERSON.github}>GitHub</a> ·
			<a href={PERSON.orcid}>ORCID</a> ·
			<a href={PERSON.linkedin}>LinkedIn</a>
		</p>
	</ContainerWithFixedWidth>
</Footer>
