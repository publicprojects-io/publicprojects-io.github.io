<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
</script>

<Seo {locale} slug="contribute" title={s('Contribute')} description={s(pageBySlug('contribute').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('How to contribute')}</h1>
			<p class="lead">{s('Every project is open source, and help is welcome. You do not need permission to start.')}</p>
		</header>

		<h2>{s('Ways to help')}</h2>
		<ul>
			<li><strong>{s('Report a problem or ask a question')}</strong>: {s('open an issue on the project’s repository. Each project page links to it under “Source”.')}</li>
			<li><strong>{s('Improve the documentation')}</strong>: {s('fix a mistake, clarify a step, or add an example, in a pull request.')}</li>
			<li><strong>{s('Improve the code')}</strong>: {s('for anything larger than a small fix, open an issue first, so that the change can be agreed before you start.')}</li>
			<li><strong>{s('Translate')}</strong>: {s('add a translation, or review one. This site’s translations are drafts until a first-language speaker reviews them.')}</li>
		</ul>

		<h2>{s('Ground rules')}</h2>
		<ul>
			<li>{s('Never include real patient data, or anyone’s personal data, in an issue, test, example, or commit. Use made-up data.')}</li>
			<li>{s('Report security problems privately, never in public.')} <a href={href('security')}>{s('See the security policy')}</a>.</li>
			<li>{s('Contributions are made under each project’s own licence, stated in its repository.')}</li>
		</ul>

		<h2>{s('Code of conduct')}</h2>
		<p>
			{s('Public Projects follows the')}
			<a href="https://www.contributor-covenant.org/version/2/1/code_of_conduct/">Contributor Covenant</a>
			{s('code of conduct, version 2.1: be respectful, welcoming, and constructive in issues, pull requests, and every other project space.')}
		</p>
		<p>
			{s('To report a conduct problem privately, email Joel Parker Henderson. The address is on the')}
			<a href={href('donate')}>{s('Donate page')}</a>.
		</p>
	</div>
</ContainerWithFixedWidth>
