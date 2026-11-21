<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { POLICIES_REVIEWED, SOURCE_URL } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
</script>

<Seo {locale} slug="security" title={s('Security')} description={s(pageBySlug('security').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('Security policy')}</h1>
			<p class="lead">
				{s('Many of these projects handle health data or support public services, so security reports are taken seriously and handled privately.')}
			</p>
		</header>

		<h2>{s('Report a vulnerability privately')}</h2>
		<p>{s('Do not report a suspected vulnerability in a public issue, discussion, or pull request. Instead:')}</p>
		<ol>
			<li>{s('Open the affected project’s repository on GitHub. Each project page links to it under “Source”.')}</li>
			<li>{s('Choose the Security tab, then “Report a vulnerability”. This sends a private report that only the maintainers can see.')}</li>
		</ol>
		<p>
			{s('For a problem with this website itself, report it privately on')}
			<a href={`${SOURCE_URL}/security/advisories/new`}>{s('the website repository')}</a>.
		</p>

		<h2>{s('What to include')}</h2>
		<ul>
			<li>{s('a description of the issue and its likely impact;')}</li>
			<li>{s('the affected project, versions, or commit;')}</li>
			<li>{s('safe steps to reproduce it; and')}</li>
			<li>{s('any fix or mitigation you can suggest.')}</li>
		</ul>
		<p>{s('Remove credentials and any personal or patient data from your report. Never include real patient data.')}</p>

		<h2>{s('Safety-relevant reports')}</h2>
		<p>
			{s('If the issue could affect patient safety, clinical workflow, or patient-identifiable data, say so clearly, so it can be treated as both a security finding and a potential clinical safety hazard.')}
		</p>

		<h2>{s('Disclosure')}</h2>
		<p>
			{s('We follow coordinated disclosure: the issue is fixed first, then an advisory or release note is published and, if you agree, you are credited. For guidance on running disclosure in your own organisation, see')}
			<a href={href('projects/coordinated-vulnerability-disclosure')}>Coordinated Vulnerability Disclosure</a>.
		</p>

		<p class="small">{s('This policy was last reviewed on')} {formatDate(locale, POLICIES_REVIEWED)}.</p>
	</div>
</ContainerWithFixedWidth>
