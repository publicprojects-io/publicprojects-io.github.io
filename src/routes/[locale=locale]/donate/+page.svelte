<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { ISSUES_URL, PERSON } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const mailto = $derived(`mailto:${PERSON.email}?subject=${encodeURIComponent(s('Supporting Public Projects'))}`);
</script>

<Seo {locale} slug="donate" title={s('Donate')} description={s(pageBySlug('donate').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose">
		<header class="page-header">
			<h1>{s('Donate')}</h1>
			<p class="lead">
				{s('Public Projects is free for everyone, and it is built and maintained in spare time. You can help keep it going by giving time, money, or other support. Every contribution, large or small, helps more people benefit from open source for the public good.')}
			</p>
		</header>

		<section aria-labelledby="time-heading">
			<h2 id="time-heading">{s('Donate time')}</h2>
			<ul>
				<li><strong>{s('Improve the code')}</strong>: {s('fix a bug, add a test, or build a feature in any project.')}</li>
				<li><strong>{s('Improve the documentation')}</strong>: {s('clarify a guide, add an example, or correct a mistake.')}</li>
				<li><strong>{s('Translate')}</strong>: {s('translate a guide into your language, or review an existing translation, including the translations of this site.')}</li>
				<li><strong>{s('Test and review')}</strong>: {s('try a project in your own setting, check accessibility, or review clinical, security, or data-protection aspects, and report what you find.')}</li>
				<li><strong>{s('Share')}</strong>: {s('tell colleagues, star a repository, or write about a project you use.')}</li>
			</ul>
			<p>
				{s('To start, open an issue on the project’s repository, or on')} <a href={ISSUES_URL}>{s('the issue tracker for this site')}</a>.
				{s('See')} <a href={href('projects')}>{s('all projects')}</a>.
			</p>
		</section>

		<section aria-labelledby="money-heading">
			<h2 id="money-heading">{s('Donate money')}</h2>
			<p>{s('Money helps pay for development time, accessibility and security reviews, professional translation, and hosting. You can send a donation by:')}</p>
			<ul>
				<li><strong>PayPal</strong>: {s('send to')} <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a></li>
				<li><strong>Venmo</strong>: {s('send to')} <a href={`mailto:${PERSON.email}`}>{PERSON.email}</a></li>
			</ul>
			<p class="small">
				{s('Donations go to the author, Joel Parker Henderson, personally. They are not payments to any employer or charity, and they are not tax-deductible.')}
			</p>
		</section>

		<section aria-labelledby="other-heading">
			<h2 id="other-heading">{s('Other ways to help')}</h2>
			<p>
				{s('There are many other ways to help, such as sponsoring a feature, funding a translation or an accessibility audit, or inviting a talk. To discuss these or any other ideas, contact Joel by email at')}
				<a href={mailto}>{PERSON.email}</a>.
			</p>
		</section>

		<p><strong>{s('Thank you.')}</strong></p>
	</div>
</ContainerWithFixedWidth>
