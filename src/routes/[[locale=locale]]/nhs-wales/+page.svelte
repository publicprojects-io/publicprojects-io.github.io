<script lang="ts">
	import { base } from '#lib/base.js';
	import { ContainerWithFixedWidth, InsetText } from '@lilydesignsystem/svelte-headless';
	import Seo from '#lib/components/Seo.svelte';
	import { projectBySlug } from '#lib/data/projects.js';
	import { localePath, spell } from '#lib/locales.js';
	import { pageBySlug } from '#lib/pages.js';
	import { PERSON } from '#lib/site.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => spell(locale, text);
	const project = (slug: string) => {
		const p = projectBySlug(slug);
		if (!p) throw new Error(`Unknown project: ${slug}`);
		return p;
	};
	const href = (to: string) => `${base}${localePath(locale, to)}`;

	// Common needs in a national digital health organisation, mapped to projects that can help.
	const needs: { need: string; detail: string; slugs: string[] }[] = [
		{
			need: 'Patient identity',
			detail: 'Validate and format NHS Numbers consistently, including the check digit, in any Rust service.',
			slugs: ['nhs-number']
		},
		{
			need: 'Integration and messaging',
			detail: 'Parse, validate, and transform HL7 v2 and FHIR messages; validate clinical XML documents with Schematron.',
			slugs: ['hl7', 'er7', 'fhir', 'schematron']
		},
		{
			need: 'Clinical terminology and classification',
			detail: 'Work with SNOMED CT releases and the WHO classifications in tested, open code.',
			slugs: ['snomed', 'who-fic']
		},
		{
			need: 'Shared care records',
			detail: 'Explore openEHR building blocks and explain the International Patient Summary to colleagues and partners.',
			slugs: ['openehr', 'international-patient-summary']
		},
		{
			need: 'Business cases and benefits',
			detail: 'Use open methods and calculations for public value, cost-benefit, social return on investment, and health economics.',
			slugs: ['public-value', 'health-economics', 'digital-health']
		},
		{
			need: 'Architecture governance',
			detail: 'Record and share technology decisions with architecture decision records, used by organisations worldwide.',
			slugs: ['architecture-decision-record', 'system-quality-attributes']
		},
		{
			need: 'Security',
			detail: 'Set up a clear route for researchers to report vulnerabilities, with example policies to adapt.',
			slugs: ['coordinated-vulnerability-disclosure']
		},
		{
			need: 'Accessible user interfaces',
			detail: 'Build accessible interfaces with the Lily Design System, which includes NHS Wales themes for patients and practitioners.',
			slugs: ['lily-design-system', 'form-examples']
		},
		{
			need: 'Delivery and ways of working',
			detail: 'Adapt open guides for agile delivery, service management, engineering metrics, and teamwork.',
			slugs: ['software-engineering', 'agile-itil', 'service-management', 'ways-of-working']
		}
	];
</script>

<Seo {locale} slug="nhs-wales" title={s('For NHS Wales colleagues')} description={s(pageBySlug('nhs-wales').description)} />

<ContainerWithFixedWidth maxWidth="76rem">
	<header class="page-header" data-area="health">
		<h1>{s('For NHS Wales and DHCW colleagues')}</h1>
		<p class="lead">
			{s('Free, open-source tools and guides for problems that NHS digital teams work on every day: patient identity, integration, terminology, business cases, architecture, and accessible services. Use them, adapt them, and help improve them.')}
		</p>
	</header>

	<InsetText>
		<p>
			{s('Public Projects are personal open-source projects by')} {PERSON.name}, {s('built in the author’s own time. They are not products of NHS Wales or Digital Health and Care Wales, and are not endorsed by either. Any use in a live clinical setting needs your own clinical safety assessment, for example under DCB0129 and DCB0160.')}
		</p>
	</InsetText>

	<section class="section" aria-labelledby="needs-heading">
		<h2 id="needs-heading">{s('Where these projects can help')}</h2>
		<div class="needs-table-wrap">
			<table class="needs-table">
				<caption class="visually-hidden">{s('Common needs and the projects that can help with each')}</caption>
				<thead>
					<tr><th scope="col">{s('Need')}</th><th scope="col">{s('How it helps')}</th><th scope="col">{s('Projects')}</th></tr>
				</thead>
				<tbody>
					{#each needs as row (row.need)}
						<tr>
							<th scope="row">{s(row.need)}</th>
							<td>{s(row.detail)}</td>
							<td>
								<ul class="plain-list">
									{#each row.slugs as slug (slug)}
										<li><a href={href(`projects/${slug}`)}>{project(slug).name}</a></li>
									{/each}
								</ul>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="section prose" aria-labelledby="why-open-heading">
		<h2 id="why-open-heading">{s('Why open source fits public health services')}</h2>
		<p>
			{s('UK public-sector guidance asks digital teams to work in the open. The Service Standard asks teams to')}
			<a href="https://www.gov.uk/service-manual/service-standard/point-12-make-new-source-code-open">{s('make new source code open')}</a>,
			{s('and the Technology Code of Practice asks them to')}
			<a href="https://www.gov.uk/guidance/be-open-and-use-open-source">{s('be open and use open source')}</a>.
			{s('Open, reusable building blocks help health organisations reduce duplicated effort, avoid supplier lock-in, and share what works with the rest of the NHS and with health systems in other countries.')}
		</p>
	</section>

	<section class="section prose" aria-labelledby="involved-heading">
		<h2 id="involved-heading">{s('How to get involved')}</h2>
		<ol>
			<li><strong>{s('Try one')}</strong>: {s('pick a project from the table and read its documentation. Most Rust crates install with one line.')}</li>
			<li><strong>{s('Tell us what you need')}</strong>: {s('open an issue on the project’s GitHub repository with a use case, a bug, or a question.')}</li>
			<li><strong>{s('Contribute')}</strong>: {s('improvements to code, documentation, tests, and translations are all welcome, including translations into Welsh.')}</li>
			<li><strong>{s('Share it')}</strong>: {s('use the share button at the top of this page to send it to a colleague who might benefit.')}</li>
		</ol>
		<p>
			{s('Questions are welcome on')} <a href={PERSON.github}>GitHub</a> {s('or')} <a href={PERSON.linkedin}>LinkedIn</a>.
		</p>
	</section>
</ContainerWithFixedWidth>
