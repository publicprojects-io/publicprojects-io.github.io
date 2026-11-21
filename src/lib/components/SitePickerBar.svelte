<script lang="ts">
	// Lily PickerBar: search, theme, locale, text size, and share in one header row.
	// See spec/lily-design-system-svelte-with-picker-bar/index.md for the rules this follows.
	import { goto } from '$app/navigation';
	import { base } from '#lib/base.js';
	import PickerBar from '@lilydesignsystem/svelte-picker-bar';
	import type { ShareTarget } from '@lilydesignsystem/svelte-share-picker';
	import { themeName } from '@lilydesignsystem/svelte-theme-picker';
	import { LOCALES, LOCALE_LABELS, localePath, type Locale } from '#lib/locales.js';
	import { DEFAULT_THEME, SITE_NAME, STORAGE_KEYS } from '#lib/site.js';
	import { THEMES } from '#lib/themes.js';
	import { ui } from '#lib/ui.js';

	let { locale, slug, title }: { locale: Locale; slug: string; title: string } = $props();
	const m = $derived(ui(locale));

	const enc = encodeURIComponent;
	const shareTargets: ShareTarget[] = $derived([
		{ id: 'email', label: m.share.email, href: (url, t) => `mailto:?subject=${enc(t)}&body=${enc(url)}`, newTab: false },
		{ id: 'linkedin', label: m.share.linkedin, href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
		{ id: 'reddit', label: m.share.reddit, href: (url, t) => `https://www.reddit.com/submit?url=${enc(url)}&title=${enc(t)}` },
		{ id: 'bluesky', label: m.share.bluesky, href: (url, t) => `https://bsky.app/intent/compose?text=${enc(`${t} ${url}`)}` },
		// Mastodon has no single instance; mastodonshare.com asks for the reader's own.
		{ id: 'mastodon', label: m.share.mastodon, href: (url, t) => `https://mastodonshare.com/?text=${enc(t)}&url=${enc(url)}` }
	]);

	let themeValue = $state(DEFAULT_THEME);

	// Each locale is a separate set of prerendered pages, so changing locale navigates to the same page there.
	function changeLocale(code: string) {
		if (code === locale || !(LOCALES as readonly string[]).includes(code)) return;
		goto(`${base}${localePath(code as Locale, slug)}`);
	}
</script>

<PickerBar
	class="site-pickers"
	role="group"
	aria-label={m.preferences}
	labels={{ ...m.picker }}
	searchProps={{ action: `${base}${localePath(locale, 'search')}`, navigate: (href: string) => goto(href) }}
	themesUrl={`${base}/themes/`}
	themes={THEMES}
	themeProps={{
		defaultValue: DEFAULT_THEME,
		storageKey: STORAGE_KEYS.theme,
		cookieName: '', // no cookies: a static site has no server to read one
		onChange: (value: string) => (themeValue = value)
	}}
	locales={[...LOCALES]}
	localeProps={{ value: locale, localeLabels: LOCALE_LABELS, onChange: changeLocale }}
	textSizeProps={{ storageKey: STORAGE_KEYS.textSize, sizeLabels: m.sizes }}
	{shareTargets}
	shareProps={{
		title: `${title} · ${SITE_NAME}`,
		copyLabel: m.share.copy,
		copiedLabel: m.share.copied,
		copyFailedLabel: m.share.copyFailed
	}}
/>
<p class="visually-hidden" aria-live="polite">{m.activeTheme}: {themeName(themeValue)}</p>
<p class="visually-hidden" aria-live="polite">{m.activeLanguage}: {LOCALE_LABELS[locale]}</p>
