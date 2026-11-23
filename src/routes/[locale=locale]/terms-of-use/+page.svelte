<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { formatDate, localePath, t } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { ISSUES_URL, POLICIES_REVIEWED, SOURCE_URL } from '#lib/site.js';
	import OnThisPage from '#lib/components/OnThisPage.svelte';
	import { anchor } from '#lib/urls.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => t(locale, text);
	const href = (to: string) => `${base}${localePath(locale, to)}`;
	const reviewed = $derived(formatDate(locale, POLICIES_REVIEWED));
</script>

<Seo {locale} slug="terms-of-use" title={s('Terms of use')} description={s(pageBySlug('terms-of-use').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<div class="prose policy">
		<header class="page-header">
			<h1>{s('Terms of use')}</h1>
			<p class="lead">{s('How you may use this website and the projects it describes. This is a plain-language summary and is not legal advice.')}</p>
		</header>

		<OnThisPage {locale} sections={[
			'Using the website',
			'Licences',
			'Trademarks and independence',
			'Health and clinical use',
			'No warranty',
			'Safe and responsible use',
			'Links to other sites',
			'Changes to these terms'
		]} />

		<h2 id={anchor('Using the website')}>{s('Using the website')}</h2>
		<p>{s('You may read, link to, and share this website. By using it you agree to these terms. If you do not agree, please do not use it.')}</p>

		<h2 id={anchor('Licences')}>{s('Licences')}</h2>
		<p>
			{s('Each project has its own licence, stated in its repository or package registry entry; that licence, not this page, sets out what you may do with the project. Where a project’s repository states no licence, ask the author before reusing it.')}
		</p>
		<p>{s('The source code of this website is public in')} <a href={SOURCE_URL}>{s('its repository')}</a>.</p>

		<h2 id={anchor('Trademarks and independence')}>{s('Trademarks and independence')}</h2>
		<ul>
			<li>{s('Names such as HL7®, FHIR®, SNOMED CT®, and openEHR® are trademarks of their owners. The projects are independent works and are not endorsed by those owners.')}</li>
			<li>{s('These are personal projects. They are not products of, or endorsed by, any employer or health organisation.')}</li>
			<li>{s('The colour themes in the header are independent implementations of published design systems. They are not affiliated with, or endorsed by, the bodies that publish those systems.')}</li>
		</ul>

		<h2 id={anchor('Health and clinical use')}>{s('Health and clinical use')}</h2>
		<p>
			{s('Nothing on this site is clinical, legal, or other professional advice. The health projects are building blocks, not certified medical devices. Any use in a live clinical setting needs your own organisation’s clinical safety assessment. Demonstration projects are for learning only and are not for medical use.')}
		</p>

		<h2 id={anchor('No warranty')}>{s('No warranty')}</h2>
		<p>
			{s('The site and the projects are provided “as is”, without warranty of any kind. We aim for accuracy, but we do not promise that the site is error free or always available. To the extent the law allows, we are not liable for any loss that comes from using the site or the projects; each project’s licence sets out its exact terms.')}
		</p>

		<h2 id={anchor('Safe and responsible use')}>{s('Safe and responsible use')}</h2>
		<ul>
			<li>{s('Do not try to disrupt the site, or use it to harm others.')}</li>
			<li>{s('If you find a security problem, please report it privately, as the')} <a href={href('security')}>{s('security policy')}</a> {s('explains.')}</li>
		</ul>

		<h2 id={anchor('Links to other sites')}>{s('Links to other sites')}</h2>
		<p>{s('We link to other websites for your convenience. We do not control them, and a link is not an endorsement.')}</p>

		<h2 id={anchor('Changes to these terms')}>{s('Changes to these terms')}</h2>
		<p>
			{s('We may change these terms. If you keep using the site after a change, you accept the new terms. Questions are welcome on')}
			<a href={ISSUES_URL}>{s('the issue tracker')}</a>. {s('Related pages:')}
			<a href={href('privacy-policy')}>{s('privacy policy')}</a>,
			<a href={href('cookie-policy')}>{s('cookie policy')}</a>, {s('and')}
			<a href={href('accessibility-statement')}>{s('accessibility statement')}</a>.
		</p>
		<p class="small">{s('Last reviewed on')} {reviewed}.</p>
	</div>
</ContainerWithFixedWidth>
