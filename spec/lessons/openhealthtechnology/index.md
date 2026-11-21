# Lessons from openhealthtechnology.org

Assessment of https://openhealthtechnology.org (Open Health Technology Foundation,
OHTF), and advice for improving https://publicprojects.io.

- Researched: 21 November 2026, by reading all 28 pages of the site.
- Status: advice. Nothing here is a requirement until it is moved into
  [`spec/index.md`](../../index.md).
- Reuse: OHTF's site content is licensed CC BY-SA 4.0. Learn from its structure and
  ideas; do not copy its wording without attribution and share-alike.

## 1. What OHTF is

OHTF is a UK community interest company (Open Health Technology CIC, company 17544421,
incorporated 27 October 2026). It gives open-source health software a neutral,
long-term home: it holds repositories at github.com/ohtf, holds domains and
trademarks, and sells hosting, support, implementation and training to pay for
maintenance. Its Articles of Association entrench a promise that Foundation Projects
cannot be closed.

Its site is a documentation-style static site (Zensical, the successor to Material for
MkDocs) with about 28 pages:

| Section | Pages |
| --- | --- |
| Home | The gap OHTF fills; what it looks after (four tests); projects table; how a project joins; services; get involved |
| About | What OHTF does and is not; operating principles; legal form; origins; why OHTF rather than an existing body; Awesome Missing NHS Things; the logo story (Chamberlen forceps); advisers |
| Projects | Foundation, candidate and experimental projects; a page per project with key facts; bring a project |
| Services | Hosted services, support, implementation, training |
| Governance | Company details; do-ocracy; open-source commitment; project lifecycle |
| Community | Contributing; code of conduct; Developer Certificate of Origin; security policy |
| Transparency | Why we publish so much; incorporation; Articles of Association |
| Contact | Addresses by purpose (hello, security, conduct), mailing list, issues |

### Direct relevance to Public Projects

OHTF's candidate projects page lists **NHS Number for Rust** ("The nhs-number Rust
crate, by Joel Parker Henderson, implements the same NHS Number checks and is tested
against the same shared vectors"), linking to the repository and crates.io. This is a
public, third-party citation of a Public Projects project, and the Rust crate shares
conformance test vectors with OHTF's Python `nhs-number` package.

Source: https://openhealthtechnology.org/projects/candidates/#nhs-number-for-rust

## 2. What OHTF does well

1. **States the problem first.** The home page opens with a one-line belief ("Public
   money should buy public code") and a short "gap we fill" section, then how the
   organisation fills it.
2. **Clear criteria.** Four tests (vendor-neutral, built for implementers, open and
   maintained, worth keeping) explain what belongs and what does not.
3. **Says what it is not.** Not a standards body, not a product vendor, not a
   professional body, not a substitute for clinical safety work. This prevents
   misunderstanding, especially by NHS buyers.
4. **An honest key-facts table on every project page**: lifecycle status, current
   version, licence, authors or maintainers, Clinical Safety Officer, medical device
   position, clinical safety documentation, source and documentation. Gaps are stated
   plainly, such as "Clinical Safety Officer: not yet appointed".
5. **An explicit project lifecycle** (Experimental, Candidate, Incubating, Active,
   Maintenance, Archived), with what users can expect at each stage and the rules for
   moving between stages.
6. **"In action" examples.** Each project page shows a few lines of real usage and
   output, with the version they came from.
7. **Shared conformance test vectors** that let a port in any language prove it gives
   the same answers. This turns a single library into a cross-language standard.
8. **Contributor basics in one place**: code of conduct, DCO sign-off, private security
   reporting (with GitHub private vulnerability reporting, a security address, and
   response times of 5 and 15 working days), and "never include real patient data".
   It also gives advice for contributing alongside a day job.
9. **Transparency as a selling point.** "Why we publish so much" explains, for health
   buyers, why open safety documentation, limitations and governance make due
   diligence easier and avoid lock-in.
10. **Memorable storytelling.** The logo story (the Chamberlen forceps, kept secret for
    a century) makes the case against closed health technology in a way people
    remember and retell.
11. **A public list of gaps.** "Awesome Missing NHS Things" lists what NHS work needs
    but does not have, and several projects began there. It invites collaboration and
    shows direction.
12. **A sustainability model.** Free code, paid services; service income funds
    maintenance and never encloses the code.
13. **Contact by purpose**: general, security, code of conduct, project issues, a
    mailing list, and an edit link on every page.
14. **A social card image** (Open Graph) for shared links.

## 3. Where Public Projects is already stronger

Keep these; they are differentiators.

- **Dated, sourced statistics** for every project, with a refresh script and an Impact
  page. OHTF shows no adoption figures.
- **Translation**: four locales including Welsh, and projects published in 50 to 60+
  languages. OHTF is English only (`lang="en"`).
- **Accessibility and preferences**: 63 Lily themes, text size, and an accessibility
  statement. OHTF has light and dark modes and no accessibility statement.
- **Privacy**: no cookies, no third-party requests. OHTF loads Google Fonts, which
  sends every visitor's IP address to Google.
- **Machine-readable**: `sitemap.xml` with `hreflang`, `llms.txt`, `robots.txt`, and
  JSON-LD. OHTF has a sitemap only (`robots.txt` and `llms.txt` return 404).
- **Breadth**: public value and software engineering leadership as well as health.
- **Site search** in every locale.

## 4. Gaps in Public Projects, and advice

Ranked by value for the site's three goals: reach, evidence of recognition, and
usefulness to digital health teams.

### High value

1. **Add a key-facts table to every project page.** Today the "Licence" row says only
   "Free and open source; see the project for its licence." Add, from real sources:
   - licence (SPDX, from crates.io, RubyGems, or the GitHub API);
   - current version and release date;
   - lifecycle status (see item 2);
   - maintainer;
   - for health projects: Clinical Safety Officer, medical device position, and
     clinical safety documentation, stating gaps plainly ("None", "Not assessed").
   Extend `scripts/refresh-stats.mjs` to collect licence and version, so the facts
   stay dated and sourced.
2. **Give every project a lifecycle status** (for example Experimental, Pre-release,
   Active, Maintenance, Archived), shown on cards and detail pages, with a short
   lifecycle page defining each status. For example, `fhir-rust` describes itself as
   pre-release, and the emergency care system is a demonstration. An
   honest status builds trust with clinical safety officers and buyers.
3. **Record the OHTF citation.** Add it to the Impact page's Recognition section and to
   the NHS Number project page: listed by the Open Health Technology Foundation as a
   candidate project, tested against shared NHS Number test vectors. This is
   third-party recognition with a public URL, useful for the Global Talent evidence
   (spec § 1, subgoal 2).
4. **Show each project in action.** Add an install line and three to five lines of
   usage with real output to each project page, starting with the health crates
   (`nhs-number`, `fhir`, `hl7`, `snomed`). Store the snippets in `projects.ts`
   alongside the version they came from. This is the fastest way to convert visitors
   into users.
5. **Publish a security policy.** The current advice ("open an issue asking for a
   private contact") is weak for health software. Enable GitHub private vulnerability
   reporting on each repository, add `SECURITY.md` files, and add a Security page that
   gives the reporting route, what to include, response times, safety-relevant
   triage, and coordinated disclosure. Then update the privacy policy and terms to
   point to it.

### Medium value

6. **Add a Contribute page**, or expand Donate › "Donate time", with the basics:
   code of conduct, how to sign off contributions, private security reporting, the
   rule "never include real patient data", and advice for contributing alongside a day
   job. Add a code of conduct (an adopted standard such as the Contributor Covenant).
7. **Add "What Public Projects is not"** to the About page: not a standards body, not a
   product vendor, not a certified medical device supplier, not an employer's
   programme. This reinforces the independence and clinical safety notices in one
   memorable list.
8. **State the problem and criteria on the home page.** Open with one belief sentence
   and a short "the gap" paragraph, then the criteria for what Public Projects builds
   (for example: shared foundations, open and maintained, honest about safety, useful
   across borders).
9. **Publish shared test vectors** for the standards crates (NHS Number already has
   them through OHTF), and say so on project pages. Conformance across languages is
   strong evidence of engineering leadership and invites ports.
10. **Publish a gaps or roadmap list**, like Awesome Missing NHS Things: what digital
    health and public services need that Public Projects intends to build or would
    welcome help with. Link it from Donate and Digital health teams.
11. **Add a news or updates channel**: a dated changelog page and an RSS or Atom feed
    (generated at build time, with no third-party service). This gives returning
    visitors and recommenders a reason to come back, and gives evidence of continued
    activity.

### Lower value or optional

12. **Add a social card image** (already an open item in the spec), drawn from the hero
    art, so shared links show a preview.
13. **Add an "On this page" contents list** to long pages (policies, impact, digital
    health teams), using Lily's `ContentsNav`.
14. **Tell a story.** A short, sourced "why open" story, as OHTF does with its logo, could
    make the home page's argument more memorable. It must be factual and cited.
15. **Edit links.** OHTF puts an edit link on every page. The footer's source-code link
    was removed by request, so treat this as a decision for the author, not a default.
16. **Contact by purpose.** Today the issue tracker and the author's email (Donate page
    only) are the contact routes. If volume grows, add a Contact page that lists
    routes by purpose: projects, security, conduct, and donations.

## 5. Strategic questions for the author

These are decisions for the author, not changes to make by default.

- **Continuity of health projects.** OHTF's core argument is that important health
  software should not live in one person's GitHub account. Many Public Projects health
  crates live in personal or single-person organisations. Options: propose more crates
  to OHTF as candidates (as NHS Number for Rust already is), name co-maintainers, or
  publish a continuity statement. Any of these strengthens the case to NHS teams that
  adopting a crate is safe in the long term.
- **Relationship with OHTF.** Public Projects can complement OHTF rather than overlap:
  Public Projects as the author's portfolio and incubator across health, public value
  and engineering; OHTF as the neutral long-term home for health projects that mature.
  A short note and link on the Digital health teams page would make this explicit.
- **Donations.** OHTF funds maintenance through paid services under a CIC asset lock.
  Public Projects asks for personal donations by PayPal or Venmo. Consider adding
  GitHub Sponsors, or a fiscal host such as Open Collective, which publish income and
  spending and may reassure organisational donors.

## 6. Suggested next steps

1. Record the OHTF citation on the Impact and NHS Number pages (item 3).
2. Add licence, version and lifecycle status to the stats script, catalogue, and
   project pages (items 1 and 2).
3. Enable private vulnerability reporting and add the Security page (item 5).
4. Add "in action" snippets for the four core health crates (item 4).
5. Decide on the strategic questions in § 5.

Each step needs Welsh translations for any new text (`locales/cy-gb/messages.json`).
