<script lang="ts">
	// "On this page": links to a long page's sections. `sections` are the English texts
	// of the page's <h2> headings, each rendered with id={anchor(text)}; the prerender
	// fails if a link here has no matching id.
	import { ContentsList, ContentsListItem, ContentsNav } from '@lilydesignsystem/svelte-headless';
	import { t, type Locale } from '#lib/locales.js';
	import { anchor } from '#lib/urls.js';

	let { locale, sections }: { locale: Locale; sections: string[] } = $props();
</script>

<ContentsNav class="on-this-page" label={t(locale, 'On this page')}>
	<p class="on-this-page-heading" aria-hidden="true">{t(locale, 'On this page')}</p>
	<ContentsList>
		{#each sections as section (section)}
			<ContentsListItem><a href={`#${anchor(section)}`}>{t(locale, section)}</a></ContentsListItem>
		{/each}
	</ContentsList>
</ContentsNav>
