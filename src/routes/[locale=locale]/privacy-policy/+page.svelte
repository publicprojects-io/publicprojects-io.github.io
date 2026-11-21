<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { ISSUES_URL, POLICIES_REVIEWED } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const reviewed = $derived(formatDate(locale, POLICIES_REVIEWED));
</script>

<Seo {locale} slug="privacy-policy" title={s('Privacy policy')} description={s(pageBySlug('privacy-policy').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('Privacy policy')}</h1>
			<p class="lead">{s('This site is built to collect nothing about you. This page says what that means and where the limits are.')}</p>
		</header>

		<h2>{s('The short version')}</h2>
		<ul>
			<li>{s('No accounts, no sign-in, and no forms that send data to us.')}</li>
			<li>{s('No analytics, advertising, tracking pixels, or cookies.')}</li>
			<li>{s('No third-party scripts, fonts, or embedded media.')}</li>
			<li>{s('Your theme and text-size choices stay in your own browser.')}</li>
		</ul>

		<h2>{s('What we collect')}</h2>
		<p>{s('We do not collect personal information about visitors. The website does not send any information about you or your visit to us. Search runs entirely in your browser.')}</p>

		<h2>{s('What is stored on your device')}</h2>
		<p>
			{s('Two display preferences are kept in your browser’s storage so that your choices last. They stay on your device. See the')}
			<a href={href('cookie-policy')}>{s('cookie policy')}</a> {s('for the full list.')}
		</p>

		<h2>{s('Who else can see your visit')}</h2>
		<p>
			{s('This site is hosted by GitHub Pages. When your browser asks for a page, the host necessarily receives that request, which includes your network address. That is how every website works. GitHub’s')}
			<a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">{s('privacy statement')}</a>
			{s('describes what it keeps. We do not receive that data and do not use it.')}
		</p>
		<p>{s('Your own internet provider, network, and browser can also see which sites you visit; they are outside our control.')}</p>

		<h2>{s('Sharing a page')}</h2>
		<p>
			{s('The share control in the header only opens a link to the service you choose, such as email, LinkedIn, Reddit, Bluesky, or Mastodon. Nothing is sent until you choose one, and then that service’s own privacy policy applies.')}
		</p>

		<h2>{s('If you contact us')}</h2>
		<p>
			{s('You can report a problem or ask a question through')} <a href={ISSUES_URL}>{s('the public issue tracker')}</a>.
			{s('Anything you post there is public, and is held by GitHub under its own terms. We use what you tell us only to answer you and to improve the project.')}
		</p>
		<p>{s('If you find a security problem, please do not post the details publicly. Open an issue asking for a private contact, and we will reply.')}</p>

		<h2>{s('Your rights')}</h2>
		<p>
			{s('Because we hold no personal information about visitors, there is normally nothing to access, correct, or delete. If you have contacted us and want your message removed, ask, and we will remove it where we are able. Wherever you live, you keep the rights your data protection laws give you, including the right to complain to your local data protection authority; in the UK, that is the Information Commissioner’s Office.')}
		</p>

		<h2>{s('Children')}</h2>
		<p>{s('The site is not aimed at children and collects nothing from anyone, including children.')}</p>

		<h2>{s('Changes to this policy')}</h2>
		<p>{s('If this changes, for example if we ever add analytics, we will update this page first. This policy was last reviewed on')} {reviewed}.</p>
	</div>
</ContainerWithFixedWidth>
