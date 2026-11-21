// The project catalogue: the single source for every project card, detail
// page, search entry, sitemap entry, and llms.txt line.
//
// Rules (spec/index.md § Content integrity):
// - Facts only from public, checkable sources: the project's own site, its
//   repository, its package registry page, or the author's ORCID record.
// - Numbers only from stats.json (dated, refreshed by `pnpm stats`), or a
//   language count the project itself publishes. Never estimate.
// - Prose in international / British English; en-us spelling is derived.

import stats from './stats.json';

export type Area = 'health' | 'public-value' | 'engineering';

export type Link = { label: string; href: string };

/** A pointer into stats.json. */
export type StatRef =
	| { kind: 'github'; key: keyof typeof stats.github }
	| { kind: 'crate'; key: keyof typeof stats.crates }
	| { kind: 'gem'; key: keyof typeof stats.gems };

export type Project = {
	slug: string;
	name: string;
	area: Area;
	/** One sentence, shown on cards and in search results. */
	summary: string;
	/** A short paragraph for the detail page: what it is, who it helps. */
	description: string;
	/** Why it matters to the public: patients, citizens, teams, the world. */
	value: string;
	links: Link[];
	stats?: StatRef[];
	/** A translation count the project itself publishes, e.g. "60+ languages". */
	languages?: string;
	tags: string[];
	/** Shown on the home page. */
	featured?: boolean;
};

export const AREAS: Record<Area, { name: string; slug: string; summary: string }> = {
	health: {
		name: 'Health care and medical',
		slug: 'health',
		summary:
			'Open health data standards, clinical terminology, and patient-centred software, so that every health system can build safer care on shared foundations.'
	},
	'public-value': {
		name: 'Public value',
		slug: 'public-value',
		summary:
			'Guides, metrics, and tools that help public services decide well, measure what matters, stay secure, and serve everyone, in many languages.'
	},
	engineering: {
		name: 'Software engineering leadership',
		slug: 'engineering',
		summary:
			'Practices and tools that help technology leaders and teams make better decisions and ship reliable software, used by engineers around the world.'
	}
};

const crate = (name: string): Link => ({ label: 'crates.io', href: `https://crates.io/crates/${name}` });
const github = (path: string): Link => ({ label: 'GitHub', href: `https://github.com/${path}` });
const site = (href: string, label = 'Website'): Link => ({ label, href });

export const PROJECTS: Project[] = [
	// ── Health care and medical ────────────────────────────────────────────
	{
		slug: 'international-patient-summary',
		name: 'International Patient Summary',
		area: 'health',
		summary:
			'A plain-language introduction to the International Patient Summary (IPS), the worldwide standard for a short electronic health record extract, translated into 50+ locales.',
		description:
			'The International Patient Summary holds the basic clinical facts a clinician needs to treat a patient safely, wherever that patient is. This project explains the standard in one page, translated into more than 50 locales, with a SvelteKit viewer and a Rust service.',
		value:
			'When a patient falls ill away from home, a summary that any clinician can read, in their own language, can prevent harm. Shared, open explanations help every country adopt the same standard.',
		links: [site('https://international-patient-summary.github.io'), github('international-patient-summary/international-patient-summary')],
		languages: '50+ locales',
		tags: ['IPS', 'HL7 FHIR', 'interoperability', 'translation', 'SvelteKit', 'Rust'],
		featured: true
	},
	{
		slug: 'fhir',
		name: 'FHIR for Rust',
		area: 'health',
		summary:
			'The Fast Healthcare Interoperability Resources (FHIR®) data model for Rust: FHIR R2 to R6 resources, datatypes, and code systems.',
		description:
			'Serde-serialisable Rust types for the complete set of FHIR resources, datatypes, and code systems across releases R2 to R6, with cross-release conversion and a specification-driven code generator. A companion project stores FHIR as real relational tables across several SQL engines.',
		value:
			'FHIR is how modern health systems exchange data. A fast, memory-safe, openly licensed implementation lowers the cost and risk of building interoperable clinical software.',
		links: [crate('fhir'), github('fhir-rust/fhir-rust')],
		stats: [{ kind: 'crate', key: 'fhir' }],
		tags: ['FHIR', 'HL7', 'interoperability', 'Rust'],
		featured: true
	},
	{
		slug: 'hl7',
		name: 'HL7 for Rust',
		area: 'health',
		summary: 'HL7® message tooling in Rust: parse, navigate, validate, modify, and render Health Level Seven messages.',
		description:
			'Covers HL7 version 2 (releases 2.1 to 2.9) and the HL7 version 3 Reference Information Model and message envelope, with room for FHIR as that standard is implemented.',
		value:
			'HL7 v2 messages still carry much of the world’s hospital data: admissions, orders, results. Reliable open tooling helps integration teams move that data safely.',
		links: [crate('hl7'), github('hl7-rust/hl7-rust')],
		stats: [{ kind: 'crate', key: 'hl7' }],
		tags: ['HL7 v2', 'HL7 v3', 'integration', 'Rust']
	},
	{
		slug: 'er7',
		name: 'ER7 for Rust',
		area: 'health',
		summary: 'Parse, query, edit, and write HL7® v2 messages in the ER7 pipe-hat encoding, with zero dependencies.',
		description:
			'A small, dependency-free Rust library for the ER7 encoding that HL7 v2 messages use on the wire, suited to integration engines and test tooling.',
		value: 'Zero dependencies means a smaller attack surface and simpler assurance for software that handles patient data.',
		links: [crate('er7'), github('er7-rust/er7-rust')],
		stats: [{ kind: 'crate', key: 'er7' }],
		tags: ['HL7 v2', 'ER7', 'integration', 'Rust']
	},
	{
		slug: 'snomed',
		name: 'SNOMED for Rust',
		area: 'health',
		summary: 'SNOMED® CT tooling in Rust: RF2 parsing, SCTID validation, a snapshot store, and hierarchy queries.',
		description:
			'Rust tooling for SNOMED CT, the clinical terminology used by health systems worldwide, including the NHS, to record diagnoses, findings, and procedures consistently.',
		value: 'Consistent clinical terminology makes records comparable, so that research, audit, and decision support can work across organisations.',
		links: [crate('snomed'), github('snomed-rust/snomed-rust')],
		stats: [{ kind: 'crate', key: 'snomed' }],
		tags: ['SNOMED CT', 'terminology', 'Rust']
	},
	{
		slug: 'openehr',
		name: 'openEHR for Rust',
		area: 'health',
		summary: 'openEHR® Reference Model types, validation, paths, AQL parsing, and change-control security primitives in Rust.',
		description:
			'Rust building blocks for openEHR, the open specification for vendor-neutral, long-lived clinical data repositories.',
		value: 'Vendor-neutral clinical data lets health systems keep their records for life and change suppliers without losing them.',
		links: [crate('openehr'), github('openehr-rust/openehr-rust')],
		stats: [{ kind: 'crate', key: 'openehr' }],
		tags: ['openEHR', 'AQL', 'clinical data repository', 'Rust']
	},
	{
		slug: 'nhs-number',
		name: 'NHS Number',
		area: 'health',
		summary: 'Parse, format, and validate the ten-digit NHS Number used by NHS England, NHS Scotland, NHS Wales, and NHS Isle of Man.',
		description:
			'A focused Rust crate for the UK National Health Service Number, including its check digit, so that software can catch mistyped identifiers before they reach a record.',
		value: 'The right patient identifier on the right record is a basic safety requirement. Validating it in code, the same way everywhere, prevents errors.',
		links: [crate('nhs-number'), github('joelparkerhenderson/nhs-number-using-rust')],
		stats: [{ kind: 'crate', key: 'nhs-number' }],
		tags: ['NHS', 'patient identifier', 'UK', 'Rust'],
		featured: true
	},
	{
		slug: 'schematron',
		name: 'Schematron for Rust',
		area: 'health',
		summary: 'A pure Rust implementation of ISO/IEC 19757-3 rule-based XML validation, with its own XML parser and XPath engine.',
		description:
			'Includes an XPath 1.0 engine, XPath 2.0 and 3.0 subsets, schema linting, and SVRL reporting. Schematron is widely used to validate clinical documents such as HL7 CDA.',
		value: 'Clinical documents must be checked against their rules before they are shared. An open, embeddable validator makes that checking easier to do everywhere.',
		links: [crate('schematron'), github('schematron-rust/schematron-rust')],
		stats: [{ kind: 'crate', key: 'schematron' }],
		tags: ['Schematron', 'XML', 'validation', 'CDA', 'Rust']
	},
	{
		slug: 'who-fic',
		name: 'WHO Family of International Classifications for Rust',
		area: 'health',
		summary: 'Rust tooling for the World Health Organization Family of International Classifications: ICD, ICF, and ICHI.',
		description:
			'Rust types and tooling for the WHO classifications of diseases (ICD), of functioning, disability, and health (ICF), and of health interventions (ICHI).',
		value: 'The WHO classifications are how the world counts disease and disability. Open tooling helps every country report and compare health data.',
		links: [crate('who-fic'), github('who-fic-rust/who-fic-rust')],
		stats: [{ kind: 'crate', key: 'who-fic' }],
		tags: ['WHO', 'ICD', 'ICF', 'ICHI', 'Rust']
	},
	{
		slug: 'form-examples',
		name: 'Form Examples',
		area: 'health',
		summary: '360 medical-form reference implementations: clinical assessments, scoring engines, SQL, FHIR R5, SvelteKit, and Rust.',
		description:
			'Reference implementations of medical forms and clinical assessments, with scoring engines, SQL data models, FHIR R5, SvelteKit, and Rust, so teams do not have to rebuild them from scratch.',
		value: 'Every health system builds the same forms. Shared, open, tested versions save time and reduce the chance of a scoring error.',
		links: [site('https://formexamples.github.io')],
		tags: ['clinical forms', 'assessments', 'FHIR R5', 'SvelteKit', 'Rust']
	},
	{
		slug: 'digital-health',
		name: 'Digital Health Guide and Metrics',
		area: 'health',
		summary: 'A guide to digital health, with metrics and a Rust crate of models and calculations.',
		description:
			'A practical guide to delivering digital health services, paired with a metrics site and a Rust crate of digital health models, structures, and calculations.',
		value: 'Shared definitions and measures help health organisations learn from each other and show what their digital services achieve.',
		links: [
			site('https://digital-health-guide.github.io', 'Guide'),
			site('https://digital-health-metrics.github.io', 'Metrics'),
			crate('digital-health')
		],
		stats: [{ kind: 'crate', key: 'digital-health' }],
		tags: ['digital health', 'metrics', 'guide', 'Rust']
	},
	{
		slug: 'health-economics',
		name: 'Health Economics Guide and Metrics',
		area: 'health',
		summary: 'A guide to health economics, with metrics and a Rust crate of models and calculations.',
		description:
			'An introduction to health economics for clinicians, managers, and technologists, paired with a metrics site and a Rust crate of health economics models and calculations.',
		value: 'Health budgets are finite. Clear, open methods for weighing costs and outcomes help decision makers fund the care that does the most good.',
		links: [
			site('https://health-economics-guide.github.io', 'Guide'),
			site('https://health-economics-metrics.github.io', 'Metrics'),
			crate('health-economics')
		],
		stats: [{ kind: 'crate', key: 'health-economics' }],
		languages: '10+ languages',
		tags: ['health economics', 'metrics', 'guide', 'Rust']
	},
	{
		slug: 'electronic-patient-record',
		name: 'Electronic Patient Record',
		area: 'health',
		summary: 'Software for longitudinal patient records, developed in public under open licences.',
		description: 'An open-source electronic patient record (EPR), specified and developed in public, as a reference for how such a system can be planned and built.',
		value: 'Designing core clinical systems in the open lets anyone inspect, learn from, and improve them.',
		links: [site('https://electronic-patient-record.github.io'), github('electronic-patient-record/electronic-patient-record')],
		tags: ['EPR', 'patient record', 'SvelteKit']
	},
	{
		slug: 'patient-administration-system',
		name: 'Patient Administration System',
		area: 'health',
		summary: 'An open-source patient administration system for hospitals and clinics: appointments, reminders, waiting lists, and access reporting.',
		description: 'An open-source patient administration system (PAS), developed in public, covering the everyday administration that keeps patients moving through care.',
		value: 'Waiting lists and appointments shape every patient’s experience of care. Open reference designs help services get the basics right.',
		links: [site('https://patient-administration-system.github.io'), github('patient-administration-system/patient-administration-system')],
		tags: ['PAS', 'appointments', 'waiting lists', 'SvelteKit']
	},
	{
		slug: 'emergency-care-system',
		name: 'Emergency Care System',
		area: 'health',
		summary: 'A public demonstration of how to plan an emergency care system, from high-level use cases to low-level test automation.',
		description:
			'A fictitious, educational demonstration that walks through planning an emergency care system end to end. It is for learning only and is not for medical use.',
		value: 'Showing the whole path from use case to automated test helps teams plan safer clinical software.',
		links: [site('https://emergency-care-system.github.io'), github('emergency-care-system/emergency-care-system')],
		tags: ['emergency care', 'planning', 'test automation', 'education']
	},
	{
		slug: 'care-plan',
		name: 'Care Plan',
		area: 'health',
		summary: 'A free, open-source care plan template for caregivers: medical, financial, government, legal, and practical care.',
		description: 'A template that helps families and carers organise everything involved in caring for someone, from medications to legal documents.',
		value: 'Carers hold health and care systems together. A clear, free template makes a hard job a little easier.',
		links: [github('joelparkerhenderson/care-plan')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/care-plan' }],
		tags: ['carers', 'care plan', 'template']
	},
	{
		slug: 'bold-contacts',
		name: 'Bold Contacts',
		area: 'health',
		summary: 'A mobile contacts app for people with vision, cognition, or motor disabilities.',
		description:
			'A contacts app designed for people living with conditions such as Alzheimer’s, Parkinson’s, multiple sclerosis, and ALS, for use by patients, carers, care centres, hospitals, and disability researchers.',
		value: 'Being able to call family or a carer is basic independence. Accessible design keeps that within reach for more people.',
		links: [site('https://boldcontacts.org')],
		tags: ['accessibility', 'disability', 'mobile app', 'carers']
	},

	// ── Public value ───────────────────────────────────────────────────────
	{
		slug: 'public-value',
		name: 'Public Value Guide and Metrics',
		area: 'public-value',
		summary: 'A guide to creating and measuring public value, in 60+ languages, with a Rust crate of public-sector calculations.',
		description:
			'Explains how public services can define, deliver, and evidence public value, alongside a metrics site and a Rust crate of typed, tested cost-benefit, social-value, SROI, and impact calculations.',
		value: 'Public money should do public good, provably. Shared methods, in people’s own languages, make that easier to show and to scrutinise.',
		links: [
			site('https://public-value-guide.github.io', 'Guide'),
			site('https://public-value-metrics.github.io', 'Metrics'),
			crate('public-value')
		],
		stats: [{ kind: 'crate', key: 'public-value' }],
		languages: '60+ languages',
		tags: ['public value', 'cost-benefit', 'SROI', 'social value', 'Rust'],
		featured: true
	},
	{
		slug: 'coordinated-vulnerability-disclosure',
		name: 'Coordinated Vulnerability Disclosure',
		area: 'public-value',
		summary: 'Guidance and policy examples for coordinated vulnerability disclosure (CVD), in 60+ languages.',
		description:
			'Helps organisations set up a safe, clear way for security researchers to report vulnerabilities, with example policies they can adapt.',
		value: 'Public services hold sensitive data. A clear disclosure route means flaws are reported and fixed before they are exploited.',
		links: [site('https://coordinated-vulnerability-disclosure.github.io')],
		languages: '60+ languages',
		tags: ['cybersecurity', 'CVD', 'policy']
	},
	{
		slug: 'lily-design-system',
		name: 'Lily Design System',
		area: 'public-value',
		summary: 'A free, open-source headless design system: accessible components across seven frameworks, with themes and 60+ languages.',
		description:
			'Hundreds of accessible user-interface components for Svelte, React, Vue, Blazor, and more, with themes that include public-sector design systems. This site is built with it.',
		value: 'Accessible, translatable interface components help public services reach everyone, including disabled people and speakers of every language.',
		links: [site('https://lilydesignsystem.github.io'), github('lilydesignsystem/lily-design-system')],
		languages: '60+ languages',
		tags: ['design system', 'accessibility', 'i18n', 'Svelte', 'React', 'Vue'],
		featured: true
	},
	{
		slug: 'service-management',
		name: 'Service Management Guide and Metrics',
		area: 'public-value',
		summary: 'A guide to IT service management, with a companion metrics site.',
		description: 'Practical guidance for running dependable digital services, with measures for service quality.',
		value: 'Citizens notice when services fail. Good service management keeps them running.',
		links: [site('https://service-management-guide.github.io', 'Guide'), site('https://service-management-metrics.github.io', 'Metrics')],
		tags: ['service management', 'ITSM', 'metrics']
	},
	{
		slug: 'agile-itil',
		name: 'Agile ITIL Guide and Metrics',
		area: 'public-value',
		summary: 'A guide to combining agile ways of working with ITIL service management, in 10+ languages.',
		description: 'Shows how teams can bring agile delivery and ITIL service practices together, with a companion metrics site.',
		value: 'Large public organisations need both fast change and stable services. This guide helps them have both.',
		links: [site('https://agile-itil-guide.github.io', 'Guide'), site('https://agile-itil-metrics.github.io', 'Metrics')],
		languages: '10+ languages',
		tags: ['agile', 'ITIL', 'service management']
	},
	{
		slug: 'ways-of-working',
		name: 'Ways of Working',
		area: 'public-value',
		summary: '100+ tips for teamwork: principles, values, tenets, ground rules, norms, and agreements.',
		description: 'A practical collection that helps teams agree how they will work together, written to be adapted by any organisation.',
		value: 'Healthy teams deliver better public services. Clear ways of working are where that starts.',
		links: [github('ways-of-working/ways-of-working')],
		stats: [{ kind: 'github', key: 'ways-of-working/ways-of-working' }],
		tags: ['teamwork', 'culture', 'agile']
	},

	// ── Software engineering leadership ───────────────────────────────────
	{
		slug: 'architecture-decision-record',
		name: 'Architecture Decision Record',
		area: 'engineering',
		summary: 'Architecture decision record (ADR) examples and templates for software planning and IT leadership, in 60+ languages.',
		description:
			'The widely used open collection of ADR templates and examples, comparing industry approaches and their strengths. It is referenced by the GitHub Blog’s engineering article on why to write ADRs.',
		value: 'Recording why a decision was made helps organisations, including public bodies, govern technology transparently and avoid repeating costly mistakes.',
		links: [
			github('architecture-decision-record/architecture-decision-record'),
			site('https://github.blog/engineering/architecture-optimization/why-write-adrs/', 'GitHub Blog: Why write ADRs')
		],
		stats: [{ kind: 'github', key: 'architecture-decision-record/architecture-decision-record' }],
		languages: '60+ languages',
		tags: ['ADR', 'architecture', 'governance', 'decision making'],
		featured: true
	},
	{
		slug: 'software-engineering',
		name: 'Software Engineering Guide and Metrics',
		area: 'engineering',
		summary: 'A guide to software engineering practice, with a metrics site in 20+ languages and a Rust crate of metrics models.',
		description:
			'Guidance for engineering teams and leaders, paired with a metrics site covering approaches such as DORA and SPACE, and a Rust crate of software engineering models and calculations.',
		value: 'Measuring delivery well, without gaming it, helps teams improve and helps leaders invest wisely.',
		links: [
			site('https://software-engineering-guide.github.io', 'Guide'),
			site('https://software-engineering-metrics.github.io', 'Metrics'),
			crate('software-engineering')
		],
		stats: [{ kind: 'crate', key: 'software-engineering' }],
		languages: '20+ languages',
		tags: ['software engineering', 'DORA', 'SPACE', 'metrics', 'Rust']
	},
	{
		slug: 'assertables',
		name: 'Assertables',
		area: 'engineering',
		summary: 'A Rust crate of assert macros for better testing, debugging, quality assurance, and runtime reliability.',
		description: 'Semantic assertion macros that make Rust tests clearer and failures easier to diagnose, for values, collections, paths, streams, functions, and more.',
		value: 'Better tests mean more reliable software, including the health and public-sector software built on Rust.',
		links: [crate('assertables'), github('assertables/assertables-rust-crate')],
		stats: [{ kind: 'crate', key: 'assertables' }],
		tags: ['Rust', 'testing', 'quality assurance'],
		featured: true
	},
	{
		slug: 'unaccent',
		name: 'Unaccent for Ruby',
		area: 'engineering',
		summary: 'A Ruby gem that converts accented Unicode characters to their unaccented equivalents.',
		description: 'A small string-processing gem, compatible with every Ruby release for more than 15 years, used for search, matching, and data cleaning.',
		value: 'Matching names regardless of accents helps software treat people from every language fairly, for example when searching for a record.',
		links: [{ label: 'RubyGems', href: 'https://rubygems.org/gems/sixarm_ruby_unaccent' }],
		stats: [{ kind: 'gem', key: 'sixarm_ruby_unaccent' }],
		tags: ['Ruby', 'Unicode', 'strings']
	},
	{
		slug: 'gitalias',
		name: 'GitAlias',
		area: 'engineering',
		summary: 'Hundreds of git alias commands for faster, easier version control.',
		description: 'Ready-made git aliases for branches, workflows, logs, charts, churn, and more, used by developers to work faster and more safely.',
		value: 'Version control underpins all modern software. Small accelerators, shared freely, add up across millions of developers.',
		links: [github('gitalias/gitalias'), site('https://gitalias.com')],
		stats: [{ kind: 'github', key: 'gitalias/gitalias' }],
		tags: ['git', 'version control', 'developer tools']
	},
	{
		slug: 'queueing-theory',
		name: 'Queueing Theory',
		area: 'engineering',
		summary: 'An introduction to queueing theory for software development.',
		description: 'Explains arrival rates, utilisation, lead time, and error rates for services, workflows, streams, and distributed systems.',
		value: 'Queues are everywhere in public services, from waiting lists to call centres. Understanding them helps design systems that cope with demand.',
		links: [github('joelparkerhenderson/queueing-theory')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/queueing-theory' }],
		tags: ['queueing theory', 'performance', 'systems thinking']
	},
	{
		slug: 'git-commit-message',
		name: 'Git Commit Message',
		area: 'engineering',
		summary: 'How to write a great git commit message, with a commit template for version control.',
		description: 'Guidance and a template that help teams write commit messages that explain why a change was made.',
		value: 'Clear history makes software easier to audit and maintain, which matters for long-lived public systems.',
		links: [github('joelparkerhenderson/git-commit-message')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/git-commit-message' }],
		tags: ['git', 'documentation', 'version control']
	},
	{
		slug: 'monorepo-vs-polyrepo',
		name: 'Monorepo vs. Polyrepo',
		area: 'engineering',
		summary: 'Architecture for source code management: the trade-offs between one repository and many.',
		description: 'A balanced comparison that helps engineering leaders choose a repository strategy for their organisation.',
		value: 'Repository strategy shapes how teams collaborate. Good choices save organisations years of friction.',
		links: [github('joelparkerhenderson/monorepo-vs-polyrepo')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/monorepo-vs-polyrepo' }],
		tags: ['architecture', 'source control', 'leadership']
	},
	{
		slug: 'objectives-and-key-results',
		name: 'Objectives and Key Results',
		area: 'engineering',
		summary: 'Objectives and key results (OKR) examples for goals, plans, projects, and strategy.',
		description: 'Worked OKR examples that help leaders connect strategy to measurable outcomes.',
		value: 'Clear goals and honest measures help organisations focus effort on outcomes that matter.',
		links: [github('joelparkerhenderson/objectives-and-key-results')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/objectives-and-key-results' }],
		tags: ['OKRs', 'strategy', 'leadership']
	},
	{
		slug: 'key-performance-indicators',
		name: 'Key Performance Indicators',
		area: 'engineering',
		summary: 'Key performance indicator (KPI) examples for metrics, measurements, and OKRs.',
		description: 'Examples of KPIs across business and technology, with guidance on choosing measures that drive the right behaviour.',
		value: 'Good indicators let public bodies see whether services are improving.',
		links: [github('joelparkerhenderson/key-performance-indicators')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/key-performance-indicators' }],
		tags: ['KPIs', 'metrics', 'leadership']
	},
	{
		slug: 'system-quality-attributes',
		name: 'System Quality Attributes',
		area: 'engineering',
		summary: 'System quality attributes, non-functional requirements, and cross-cutting concerns.',
		description: 'A catalogue of the qualities that make systems dependable, such as security, accessibility, and availability, to help teams specify and test them.',
		value: 'Public systems must be secure, accessible, and available. Naming those qualities is the first step to delivering them.',
		links: [github('joelparkerhenderson/system-quality-attributes')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/system-quality-attributes' }],
		tags: ['non-functional requirements', 'architecture', 'quality']
	},
	{
		slug: 'maturity-models',
		name: 'Maturity Models',
		area: 'engineering',
		summary: 'Maturity models for IT, agile, DevOps, TOGAF, Six Sigma, P3M3, and more.',
		description: 'A comparison of maturity models that help organisations assess where they are and plan improvement.',
		value: 'Honest self-assessment helps organisations improve step by step rather than by leaps that fail.',
		links: [github('joelparkerhenderson/maturity-models')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/maturity-models' }],
		tags: ['maturity models', 'improvement', 'leadership']
	},
	{
		slug: 'unicode-separated-values',
		name: 'Unicode Separated Values',
		area: 'engineering',
		summary: 'Unicode Separated Values (USV): a data format beyond CSV and TSV for units, records, groups, files, and streams.',
		description: 'A data exchange format that handles commas, quotes, tabs, and newlines in data without escaping, with libraries and tools.',
		value: 'Data that moves between organisations without corruption is the basis of trustworthy reporting.',
		links: [github('sixarm/usv')],
		stats: [{ kind: 'github', key: 'sixarm/usv' }],
		tags: ['data', 'standards', 'Unicode']
	},
	{
		slug: 'num',
		name: 'Num',
		area: 'engineering',
		summary: 'Number utilities for statistics on the command line, using only standard POSIX.',
		description: 'Calculates aggregations, deviations, quartiles, kurtosis, skewness, and more, anywhere a POSIX shell runs.',
		value: 'Simple, portable analysis tools help people check numbers for themselves.',
		links: [github('numcommand/num'), site('https://numcommand.com')],
		stats: [{ kind: 'github', key: 'numcommand/num' }],
		tags: ['statistics', 'command line', 'POSIX']
	},
	{
		slug: 'demo-rust-axum',
		name: 'Demo Rust Axum',
		area: 'engineering',
		summary: 'A demonstration of the Rust Axum web framework with Tokio, Tower, Hyper, and Serde.',
		description: 'A step-by-step tutorial for building web services in Rust with Axum.',
		value: 'Memory-safe languages remove whole classes of security flaws. Good tutorials help more teams adopt them.',
		links: [github('joelparkerhenderson/demo-rust-axum')],
		stats: [{ kind: 'github', key: 'joelparkerhenderson/demo-rust-axum' }],
		tags: ['Rust', 'Axum', 'web services', 'tutorial']
	}
];

export const STATS_AS_OF = stats.asOf;

export function projectBySlug(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}

export function projectsInArea(area: Area): Project[] {
	return PROJECTS.filter((project) => project.area === area);
}

/** The value and label of one stat. */
export function statValue(ref: StatRef): { value: number; label: 'stars' | 'downloads' } {
	if (ref.kind === 'github') return { value: stats.github[ref.key].stars, label: 'stars' };
	if (ref.kind === 'crate') return { value: stats.crates[ref.key], label: 'downloads' };
	return { value: stats.gems[ref.key], label: 'downloads' };
}

/** Where a reader can check a stat for themselves. */
export function statSource(ref: StatRef): string {
	if (ref.kind === 'github') return `https://github.com/${ref.key}`;
	if (ref.kind === 'crate') return `https://crates.io/crates/${ref.key}`;
	return `https://rubygems.org/gems/${ref.key}`;
}

/** Totals derived from stats.json, so headline numbers can never drift from the detail. */
export const TOTALS = {
	downloads:
		Object.values(stats.crates).reduce((sum, n) => sum + n, 0) + Object.values(stats.gems).reduce((sum, n) => sum + n, 0),
	stars: Object.values(stats.github).reduce((sum, repo) => sum + repo.stars, 0),
	projects: PROJECTS.length,
	healthProjects: PROJECTS.filter((project) => project.area === 'health').length
};
