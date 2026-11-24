// The home page's project filter: a category, plus free text. Pure functions, so
// the filter is tested here and the component only holds state.
import { AREAS, PROJECTS, type Project } from './data/projects';
import { t, type Locale } from './locales';

/** A project's category: the name shown above its name on cards. */
export function categoryOf(project: Project): string {
	return project.eyebrow ?? AREAS[project.area].name;
}

/** Every category, in catalogue order, each listed once. */
export const CATEGORIES: string[] = [...new Set(PROJECTS.map(categoryOf))];

/** Short, title-case names for the filter's buttons; other categories show their full name. */
const LABELS: Record<string, string> = {
	'Health care and medical': 'Health Care',
	'Public value': 'Public Value',
	'Software engineering leadership': 'Software Engineering',
	'Business executive leadership': 'Business Leadership'
};

/** The label for `category` on the filter's buttons, in English (translate it with `t`). */
export function categoryLabel(category: string): string {
	return LABELS[category] ?? category;
}

/** The text a project matches against: in `locale`, plus its English name and tags. */
export function projectText(locale: Locale, project: Project): string {
	const s = (text: string) => t(locale, text);
	return [
		s(project.name),
		project.name,
		...[project.summary, project.description, project.value, categoryOf(project)].map(s),
		...project.tags
	]
		.join(' ')
		.toLocaleLowerCase('en');
}

/**
 * Projects in `category` (all, when it is empty) that contain every word of `query`,
 * in their original order.
 */
export function filterProjects(locale: Locale, projects: Project[], category: string, query: string): Project[] {
	const words = query.toLocaleLowerCase('en').split(/\s+/).filter(Boolean);
	return projects.filter(
		(project) =>
			(!category || categoryOf(project) === category) &&
			(!words.length || words.every((word) => projectText(locale, project).includes(word)))
	);
}
