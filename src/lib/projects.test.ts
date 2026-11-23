import { describe, expect, it } from 'vitest';
import { HOME_DOWNLOADS_FLOOR, HOME_FIRST, PROJECTS, TOTALS, homeProjects } from '#lib/data/projects.js';

describe('homeProjects', () => {
	it('puts the chosen nine first, then every other project once', () => {
		const slugs = homeProjects().map((p) => p.slug);
		expect(slugs.slice(0, 9)).toEqual(HOME_FIRST);
		expect([...slugs].sort()).toEqual(PROJECTS.map((p) => p.slug).sort());
	});
});

describe('HOME_DOWNLOADS_FLOOR', () => {
	it('never claims more downloads than stats.json records', () => {
		expect(HOME_DOWNLOADS_FLOOR).toBeLessThanOrEqual(TOTALS.downloads);
	});
});

import stats from '#lib/data/stats.json';
import {
	AREAS,
	STATUSES,
	STATUS_NAMES,
	projectBySlug,
	projectsInArea,
	statSource,
	statValue,
	statusOf,
	versionOf,
	type Project
} from '#lib/data/projects.js';

const project = (slug: string): Project => {
	const found = projectBySlug(slug);
	if (!found) throw new Error(slug);
	return found;
};

/** Runs `body` with one repository's stats changed, then restores them. */
function withRepo(key: keyof typeof stats.repos, change: Partial<(typeof stats.repos)[typeof key]>, body: () => void) {
	const saved = { ...stats.repos[key] };
	Object.assign(stats.repos[key], change);
	try {
		body();
	} finally {
		Object.assign(stats.repos[key], saved);
	}
}

describe('projectBySlug', () => {
	it('finds a project, and returns undefined for an unknown slug', () => {
		expect(projectBySlug('nhs-number')?.name).toBe('NHS Number');
		expect(projectBySlug('no-such-project')).toBeUndefined();
	});
});

describe('homeProjects', () => {
	it('fails loudly when HOME_FIRST names an unknown project', () => {
		HOME_FIRST.push('no-such-project');
		try {
			expect(() => homeProjects()).toThrow('Unknown project: no-such-project');
		} finally {
			HOME_FIRST.pop();
		}
	});
});

describe('projectsInArea', () => {
	it('splits every project into exactly one area', () => {
		const areas = Object.keys(AREAS) as (keyof typeof AREAS)[];
		const all = areas.flatMap((area) => projectsInArea(area));
		expect(all.length).toBe(PROJECTS.length);
		for (const area of areas) expect(projectsInArea(area).every((p) => p.area === area)).toBe(true);
	});
});

describe('statusOf', () => {
	const nhs = project('nhs-number');

	it('names every status', () => {
		expect(STATUSES.map((s) => STATUS_NAMES[s])).toEqual(['Active', 'Pre-release', 'Demonstration', 'Maintenance', 'Archived']);
	});

	it('is archived when the repository is archived, whatever else is true', () => {
		withRepo(nhs.repo, { archived: true }, () => expect(statusOf(nhs)).toBe('archived'));
		const demo = PROJECTS.find((p) => p.status === 'demonstration');
		expect(demo).toBeDefined();
		withRepo(demo!.repo, { archived: true }, () => expect(statusOf(demo!)).toBe('archived'));
	});

	it('uses the project override next', () => {
		for (const p of PROJECTS.filter((p) => p.status)) expect(statusOf(p)).toBe(p.status);
	});

	it('is pre-release below version 1.0.0', () => {
		const pre = PROJECTS.find((p) => !p.status && Number(versionOf(p)?.version.split('.')[0]) === 0);
		if (pre) expect(statusOf(pre)).toBe('pre-release');
		const synthetic: Project = { ...nhs, stats: [{ kind: 'crate', key: 'nhs-number' }] };
		const saved = stats.crateVersions['nhs-number'];
		stats.crateVersions['nhs-number'] = { ...saved, version: '0.9.0' };
		try {
			expect(statusOf(synthetic)).toBe('pre-release');
		} finally {
			stats.crateVersions['nhs-number'] = saved;
		}
	});

	it('is maintenance after a year without a commit, otherwise active', () => {
		const p = PROJECTS.find((p) => !p.status && !versionOf(p))!;
		withRepo(p.repo, { pushedAt: '2024-01-01T00:00:00Z' }, () => expect(statusOf(p)).toBe('maintenance'));
		withRepo(p.repo, { pushedAt: stats.asOf }, () => expect(statusOf(p)).toBe('active'));
	});
});

describe('versionOf', () => {
	it('reads the crate or gem version, and nothing for other projects', () => {
		expect(versionOf(project('nhs-number'))?.version).toBe(stats.crateVersions['nhs-number'].version);
		const gem = PROJECTS.find((p) => p.stats?.some((ref) => ref.kind === 'gem'))!;
		const key = gem.stats!.find((ref) => ref.kind === 'gem')!.key as keyof typeof stats.gemVersions;
		expect(versionOf(gem)).toEqual(stats.gemVersions[key]);
		expect(versionOf({ ...gem, stats: undefined })).toBeUndefined();
		expect(versionOf({ ...gem, stats: [{ kind: 'github', key: Object.keys(stats.github)[0] as keyof typeof stats.github }] })).toBeUndefined();
	});
});

describe('statValue and statSource', () => {
	const github = Object.keys(stats.github)[0] as keyof typeof stats.github;
	const crate = Object.keys(stats.crates)[0] as keyof typeof stats.crates;
	const gem = Object.keys(stats.gems)[0] as keyof typeof stats.gems;

	it('reads each kind of stat from stats.json', () => {
		expect(statValue({ kind: 'github', key: github })).toEqual({ value: stats.github[github].stars, label: 'stars' });
		expect(statValue({ kind: 'crate', key: crate })).toEqual({ value: stats.crates[crate], label: 'downloads' });
		expect(statValue({ kind: 'gem', key: gem })).toEqual({ value: stats.gems[gem], label: 'downloads' });
	});

	it('links each kind of stat to where it can be checked', () => {
		expect(statSource({ kind: 'github', key: github })).toBe(`https://github.com/${github}`);
		expect(statSource({ kind: 'crate', key: crate })).toBe(`https://crates.io/crates/${crate}`);
		expect(statSource({ kind: 'gem', key: gem })).toBe(`https://rubygems.org/gems/${gem}`);
	});

	it('every project stat points at a stats.json entry', () => {
		for (const p of PROJECTS) for (const ref of p.stats ?? []) expect(Number.isFinite(statValue(ref).value)).toBe(true);
		for (const p of PROJECTS) expect(stats.repos[p.repo], p.slug).toBeDefined();
	});
});

describe('TOTALS', () => {
	it('adds up the projects', () => {
		expect(TOTALS.projects).toBe(PROJECTS.length);
		expect(TOTALS.healthProjects).toBe(projectsInArea('health').length);
		expect(TOTALS.stars).toBeGreaterThan(0);
		expect(TOTALS.ownerStars).toBeGreaterThan(0);
		expect(TOTALS.ownerRepos).toBeGreaterThan(0);
	});
});

describe('Use it examples', () => {
	it('were run against the published version that stats.json records', () => {
		const withUsage = PROJECTS.filter((p) => p.usage);
		expect(withUsage.map((p) => p.slug).sort()).toEqual(['assertables', 'er7', 'fhir', 'hl7', 'nhs-number', 'openehr', 'snomed']);
		for (const p of withUsage) {
			expect(p.usage!.version, `${p.slug}: re-run the example against the new version`).toBe(versionOf(p)?.version);
			expect(p.usage!.install, p.slug).toMatch(/^cargo add /);
			expect(p.usage!.output.length, p.slug).toBeGreaterThan(0);
		}
	});
});

import { releases } from '#lib/data/projects.js';

describe('releases', () => {
	const rows = releases();

	it('lists every published crate and gem once, newest first', () => {
		expect(rows.length).toBe(Object.keys(stats.crateVersions).length + Object.keys(stats.gemVersions).length);
		expect(new Set(rows.map((r) => r.href)).size).toBe(rows.length);
		for (let i = 1; i < rows.length; i++) expect(rows[i - 1].released >= rows[i].released).toBe(true);
	});

	it('breaks ties by package name, and reads versions and dates from stats.json', () => {
		for (let i = 1; i < rows.length; i++) {
			if (rows[i - 1].released === rows[i].released) expect(rows[i - 1].name < rows[i].name).toBe(true);
		}
		const nhs = rows.find((r) => r.name === 'nhs-number')!;
		const { version, released } = stats.crateVersions['nhs-number'];
		expect(nhs).toMatchObject({ registry: 'crates.io', href: 'https://crates.io/crates/nhs-number', version, released });
		expect(nhs.project.slug).toBe('nhs-number');
		const gem = rows.find((r) => r.registry === 'RubyGems')!;
		expect(gem.href).toBe(`https://rubygems.org/gems/${gem.name}`);
	});
});
