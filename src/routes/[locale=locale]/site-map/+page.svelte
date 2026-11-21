<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { AREAS, projectsInArea, type Area } from '#lib/data/projects.js';
	import { LOCALES, LOCALE_LABELS, LOCALE_TAGS, localePath, t } from '#lib/locales.js';
	import { PAGES } from '#lib/pages.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const areas = Object.entries(AREAS) as [Area, (typeof AREAS)[Area]][];
</script>

<Seo {locale} slug="site-map" title={s('Site map')} description={s('Every page on the Public Projects website.')} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header">
		<h1>{s('Site map')}</h1>
		<p class="lead">{s('An overview of every page on this website. The site is available in several languages; use the language control in the header, or the links below.')}</p>
	</header>

	<div class="site-map-grid">
		<section aria-labelledby="sm-main">
			<h2 id="sm-main">{s('Main pages')}</h2>
			<ul>
				<li><a href={href('')}>{s('Home')}</a></li>
				{#each PAGES.filter((p) => p.nav) as page (page.slug)}
					<li><a href={href(page.slug)}>{s(page.name)}</a></li>
				{/each}
				<li><a href={href('search')}>{s('Search')}</a></li>
			</ul>

			<h2 id="sm-policies">{s('Policies')}</h2>
			<ul>
				{#each PAGES.filter((p) => p.footer) as page (page.slug)}
					<li><a href={href(page.slug)}>{s(page.name)}</a></li>
				{/each}
			</ul>

			<h2 id="sm-languages">{s('Languages')}</h2>
			<ul>
				{#each LOCALES as l (l)}
					<li><a href={`${base}${localePath(l, 'site-map')}`} hreflang={LOCALE_TAGS[l]} lang={LOCALE_TAGS[l]}>{LOCALE_LABELS[l]}</a></li>
				{/each}
			</ul>

			<h2 id="sm-machine">{s('For search engines and AI agents')}</h2>
			<ul>
				<li><a href={`${base}/sitemap.xml`}>sitemap.xml</a></li>
				<li><a href={`${base}/llms.txt`}>llms.txt</a></li>
			</ul>
		</section>

		{#each areas as [key, area] (key)}
			<section aria-labelledby={`sm-${key}`}>
				<h2 id={`sm-${key}`}><a href={href(area.slug)}>{s(area.name)}</a></h2>
				<ul>
					{#each projectsInArea(key) as project (project.slug)}
						<li><a href={href(`projects/${project.slug}`)}>{project.name}</a></li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
</ContainerWithFixedWidth>
