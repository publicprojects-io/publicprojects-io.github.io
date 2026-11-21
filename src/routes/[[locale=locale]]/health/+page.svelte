<script lang="ts">
	import { InsetText } from '@lilydesignsystem/svelte-headless';
	import AreaPage from '#lib/components/AreaPage.svelte';
	import { spell } from '#lib/locales.js';

	let { data } = $props();
	const locale = $derived(data.locale);
	const s = (text: string) => spell(locale, text);
</script>

<AreaPage area="health" {locale}>
	{#snippet intro()}
		<h2>{s('Shared foundations for safer care')}</h2>
		<p>
			{s('Health systems everywhere depend on the same standards: FHIR and HL7 to exchange data, SNOMED CT and the WHO classifications to describe it, openEHR to keep it for life, and the International Patient Summary to share the essentials when a patient crosses a border. Each of these projects makes one of those standards easier, cheaper, and safer to adopt.')}
		</p>
		<p>
			{s('Most of the libraries are written in Rust, a memory-safe language recommended by national cyber security agencies, so that software which handles patient data starts from a stronger security footing.')}
		</p>
		<ul>
			<li><strong>{s('Interoperability')}</strong>: {s('FHIR, HL7 v2 and v3, ER7, and Schematron validation.')}</li>
			<li><strong>{s('Terminology and classification')}</strong>: {s('SNOMED CT and the WHO family: ICD, ICF, and ICHI.')}</li>
			<li><strong>{s('Records and identity')}</strong>: {s('openEHR, the NHS Number, and the International Patient Summary in 50+ locales.')}</li>
			<li><strong>{s('Services and evidence')}</strong>: {s('patient administration, patient records, clinical forms, digital health metrics, and health economics.')}</li>
			<li><strong>{s('People')}</strong>: {s('an accessible contacts app for people with disabilities, and a free care plan for carers.')}</li>
		</ul>
	{/snippet}
	{#snippet after()}
		<InsetText>
			<p>
				<strong>{s('Clinical safety')}:</strong>
				{s('These are open-source building blocks provided as is, without warranty. Any use in a live clinical setting needs your own organisation’s clinical safety assessment, for example under the UK standards DCB0129 and DCB0160. Demonstration projects are for learning only and are not for medical use.')}
			</p>
		</InsetText>
		<p class="small">
			{s('HL7® and FHIR® are registered trademarks of Health Level Seven International. SNOMED® and SNOMED CT® are registered trademarks of the International Health Terminology Standards Development Organisation (IHTSDO, trading as SNOMED International). openEHR® is a registered trademark of the openEHR Foundation. Use of these trademarks does not imply endorsement. These projects are independent works.')}
		</p>
	{/snippet}
</AreaPage>
