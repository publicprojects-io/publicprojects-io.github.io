// Refreshes src/lib/data/stats.json: a dated snapshot of public, verifiable
// numbers (GitHub stars and forks, crates.io and RubyGems downloads).
//
// Run by hand (`pnpm stats`), review the diff, and commit. The build never
// calls the network, so a build is reproducible and every number on the site
// has a known "as of" date and a source anyone can check.
//
// GITHUB_TOKEN is optional; without it the GitHub API allows 60 requests an hour.
import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../src/lib/data/stats.json', import.meta.url);
const previous = JSON.parse(await readFile(file, 'utf8'));
const userAgent = 'publicprojects-io-stats (https://github.com/publicprojects-io/publicprojects-io.github.io)';

async function json(url, headers = {}) {
	const response = await fetch(url, { headers: { 'User-Agent': userAgent, ...headers } });
	if (!response.ok) throw new Error(`${response.status} ${url}`);
	return response.json();
}

const githubHeaders = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
const next = { asOf: new Date().toISOString().slice(0, 10), github: {}, crates: {}, gems: {} };

for (const repo of Object.keys(previous.github)) {
	const data = await json(`https://api.github.com/repos/${repo}`, githubHeaders);
	next.github[repo] = { stars: data.stargazers_count, forks: data.forks_count };
}
for (const name of Object.keys(previous.crates)) {
	const data = await json(`https://crates.io/api/v1/crates/${name}`);
	next.crates[name] = data.crate.downloads;
	await new Promise((resolve) => setTimeout(resolve, 1000)); // crates.io asks for at most one request a second
}
for (const name of Object.keys(previous.gems)) {
	const data = await json(`https://rubygems.org/api/v1/gems/${name}.json`);
	next.gems[name] = data.downloads;
}

await writeFile(file, JSON.stringify(next, null, '\t') + '\n');
console.log(`Wrote ${file.pathname} as of ${next.asOf}`);
