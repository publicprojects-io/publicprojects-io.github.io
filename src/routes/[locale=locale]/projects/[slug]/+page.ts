import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';
import { PROJECTS, projectBySlug } from '#lib/data/projects.js';
import { LOCALES } from '#lib/locales.js';

export const entries: EntryGenerator = () =>
	PROJECTS.flatMap(({ slug }) => LOCALES.map((locale) => ({ locale, slug })));

export const load: PageLoad = async ({ params, parent }) => {
	const project = projectBySlug(params.slug);
	if (!project) error(404, 'Project not found');
	return { ...(await parent()), project };
};
