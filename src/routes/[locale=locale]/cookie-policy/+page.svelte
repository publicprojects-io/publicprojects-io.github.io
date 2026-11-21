<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { ISSUES_URL, POLICIES_REVIEWED, STORAGE_KEYS } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const reviewed = $derived(formatDate(locale, POLICIES_REVIEWED));
</script>

<Seo {locale} slug="cookie-policy" title={s('Cookie policy')} description={s(pageBySlug('cookie-policy').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('Cookie policy')}</h1>
			<p class="lead">
				{s('The Public Projects website sets no cookies. It keeps two display preferences in your browser so that your choices last. This page explains what cookies are, lists everything the site stores, and how to manage it.')}
			</p>
		</header>

		<h2>{s('What are cookies?')}</h2>
		<p>
			{s('Cookies are small files saved on your phone, tablet, or computer by websites that you visit. They are widely used to make websites work, or work more efficiently, and to give information to the owners of a site. A cookie is sent back to the website with every later request.')}
		</p>
		<p>
			{s('Browsers also offer storage that stays on your device and is never sent to a website’s server: local storage, which is kept until you clear it, and session storage, which is cleared when you close the tab. This policy covers cookies and browser storage.')}
		</p>

		<h2>{s('How we use cookies')}</h2>
		<p>
			{s('We do not use cookies. There are no essential cookies, no analytics or measurement cookies, and no advertising or tracking cookies. The site loads no third-party scripts, fonts, or embedded media. Because of that, there is no cookie banner and nothing to accept.')}
		</p>

		<h2>{s('Browser storage we use')}</h2>
		<p>{s('These values stay in your browser and are never sent to us. They hold your own choices and nothing that identifies you.')}</p>
		<div class="needs-table-wrap">
			<table class="data-table">
				<caption class="visually-hidden">{s('Browser storage used by this site')}</caption>
				<thead>
					<tr><th scope="col">{s('Name')}</th><th scope="col">{s('Kind')}</th><th scope="col">{s('What it remembers')}</th><th scope="col">{s('How long')}</th></tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row"><code>{STORAGE_KEYS.theme}</code></th>
						<td>{s('Local storage')}</td>
						<td>{s('The colour theme you picked in the header.')}</td>
						<td>{s('Until you clear it')}</td>
					</tr>
					<tr>
						<th scope="row"><code>{STORAGE_KEYS.textSize}</code></th>
						<td>{s('Local storage')}</td>
						<td>{s('The text size you picked in the header.')}</td>
						<td>{s('Until you clear it')}</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			{s('Your language is not stored: it is part of the page address, such as /en-gb/. The site works without any of this storage. If storage is blocked, you get the default theme and text size each time.')}
		</p>

		<h2>{s('Managing cookies and storage')}</h2>
		<ul>
			<li>{s('Use the theme and text-size controls in the header at any time; each new choice replaces the old one.')}</li>
			<li>{s('Clear the stored values in your browser’s settings, under site data, or use private browsing, which discards them when you close the window.')}</li>
			<li>{s('Turn off storage for this site in your browser’s settings. Nothing will break.')}</li>
		</ul>
		<p>
			{s('Most web browsers let you control cookies and storage through their settings, and the Help function in your browser explains how. To find out more about cookies, visit')}
			<a href="https://ico.org.uk/for-the-public/online/cookies/">{s('the UK Information Commissioner’s Office guide to cookies')}</a>.
		</p>

		<h2>{s('Other websites')}</h2>
		<p>
			{s('This site links to other websites, such as code repositories, package registries, and social networks when you use the share control. They may set their own cookies. We do not control them; read their policies before you use them.')}
		</p>

		<h2>{s('If you have a concern')}</h2>
		<p>
			{s('If you have a question or concern about how this site uses cookies or storage, tell us on')} <a href={ISSUES_URL}>{s('the issue tracker')}</a>.
		</p>

		<h2>{s('Changes to this policy')}</h2>
		<p>
			{s('If we ever add a cookie, or a script that sets one, we will list it here before it goes live and ask for your permission first. This policy was last reviewed on')}
			{reviewed}. {s('See also the')} <a href={href('privacy-policy')}>{s('privacy policy')}</a>.
		</p>
	</div>
</ContainerWithFixedWidth>
