<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { ISSUES_URL, POLICIES_REVIEWED } from '#lib/site.js';
	import OnThisPage from '#lib/components/OnThisPage.svelte';
	import { anchor } from '#lib/urls.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const reviewed = $derived(formatDate(locale, POLICIES_REVIEWED));
</script>

<Seo {locale} slug="accessibility-statement" title={s('Accessibility statement')} description={s(pageBySlug('accessibility-statement').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('Accessibility statement')}</h1>
			<p class="lead">{s('This statement covers the Public Projects website at publicprojects.io. It was prepared on')} {reviewed}.</p>
		</header>

		<OnThisPage {locale} sections={[
			'What you should be able to do',
			'How accessible this site is',
			'What we know falls short',
			'Content in another format',
			'Report a problem',
			'If you are not happy with our reply',
			'Our plans'
		]} />

		<h2 id={anchor('What you should be able to do')}>{s('What you should be able to do')}</h2>
		<p>{s('We want as many people as possible to use this site. You should be able to:')}</p>
		<ul>
			<li>{s('change colours, contrast, and text size using the theme and text-size controls in the header, or your own browser and device settings;')}</li>
			<li>{s('zoom in to 400 percent without text spilling off the screen;')}</li>
			<li>{s('use every page with a keyboard alone, starting from the “Skip to content” link;')}</li>
			<li>{s('use the site with a screen reader, speech recognition, or switch access;')}</li>
			<li>{s('choose your language and spelling with the language control in the header.')}</li>
		</ul>

		<h2 id={anchor('How accessible this site is')}>{s('How accessible this site is')}</h2>
		<p>
			{s('The standard we aim for is WCAG 2.2 level AA. We say we aim for it, not that we meet it: no independent audit has been carried out, so we do not claim conformance at any level.')}
		</p>
		<p>
			{s('What is checked: every change is type-checked, including the accessibility checks built into the Svelte compiler, and the site is built with the accessible components of the Lily Design System. Pages use landmarks, one main heading, labelled controls, and table headers.')}
		</p>

		<h2 id={anchor('What we know falls short')}>{s('What we know falls short')}</h2>
		<ul>
			<li><strong>{s('Screen readers')}</strong>: {s('the site has not yet been tested in full with VoiceOver, NVDA, JAWS, or TalkBack.')}</li>
			<li><strong>{s('Themes')}</strong>: {s('the default light theme is designed for good contrast. Other themes are a reader’s choice, and some may not reach the contrast you need.')}</li>
			<li><strong>{s('Translations')}</strong>: {s('the translated versions are drafts that native speakers have not yet reviewed, so some wording may be wrong.')}</li>
			<li><strong>{s('Other websites')}</strong>: {s('the projects link to repositories and websites we do not control, which may be less accessible.')}</li>
		</ul>

		<h2 id={anchor('Content in another format')}>{s('Content in another format')}</h2>
		<p>
			{s('Every page is plain HTML, and a plain-text summary of the site is available at')} <a href={`${base}/llms.txt`}>llms.txt</a>.
			{s('If you need something in another form, such as large print, easy read, or audio, open an issue and say what you need. We will reply, and where we can make it, we will.')}
		</p>

		<h2 id={anchor('Report a problem')}>{s('Report a problem')}</h2>
		<p>
			{s('If something on this site does not work for you, tell us on')} <a href={ISSUES_URL}>{s('the issue tracker')}</a>.
			{s('“I could not operate this with the keyboard” is a complete report. You do not need to name a WCAG criterion. Please say which page, which browser, and which assistive technology you were using, if you know.')}
		</p>

		<h2 id={anchor('If you are not happy with our reply')}>{s('If you are not happy with our reply')}</h2>
		<p>
			{s('Public Projects is a personal, open source project, not a public sector body, so no statutory accessibility regulation applies to it directly. If a public service uses one of these projects and you have a concern about that service, contact the service and its regulator.')}
		</p>

		<h2 id={anchor('Our plans')}>{s('Our plans')}</h2>
		<ul>
			<li>{s('Automated accessibility checks on every page as part of each build.')}</li>
			<li>{s('Screen-reader testing of the main pages, with the results published.')}</li>
			<li>{s('Native-speaker review of the translations.')}</li>
		</ul>

		<p class="small">
			{s('This statement was last reviewed on')} {reviewed}. {s('It will be reviewed again when the site changes in a way that affects accessibility, and at least once a year. See also the')}
			<a href={href('privacy-policy')}>{s('privacy policy')}</a>.
		</p>
	</div>
</ContainerWithFixedWidth>
