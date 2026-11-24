# Lessons from openhealthtechnology.org

Assessment of https://openhealthtechnology.org (Open Health Technology Foundation,
OHTF), and advice for improving https://publicprojects.io.

- Researched: 21 November 2026, by reading all 28 pages of the site.
- Refreshed: 23 November 2026. The home, about, projects, services, governance,
  community, transparency, and contact pages were read again, along with the
  candidates, project lifecycle, security, advisers, and two project pages, the HTML
  metadata, `robots.txt`, and `llms.txt`. Each recommendation was checked against
  this repository as it stands on that date.
- Status: advice. Nothing here is a requirement until it is moved into
  [`spec/index.md`](../../index.md).
- Reuse: OHTF's site content is licensed CC BY-SA 4.0. Learn from its structure and
  ideas; do not copy its wording without attribution and share-alike.

## 1. What OHTF is

OHTF is a UK community interest company (Open Health Technology CIC, company 17544421,
incorporated 27 October 2026; a change of name to Open Health Technology Foundation
CIC is in progress). It gives open source health software a neutral, long-term home:
it holds repositories at github.com/ohtf, holds domains and trademarks, and sells
hosting, support, implementation and training to pay for maintenance. Its Articles of
Association entrench a promise that Foundation Projects cannot be closed.

Its site is a documentation-style static site (Zensical 0.1.1, the successor to
Material for MkDocs) with about 28 pages:

| Section | Pages |
| --- | --- |
| Home | The gap OHTF fills; what it looks after (four tests); projects table; how a project joins; services; get involved |
| About | What OHTF does and is not; operating principles; legal form; origins; why OHTF rather than an existing body; Awesome Missing NHS Things; the logo story (Chamberlen forceps); advisers |
| Projects | Foundation, candidate and experimental projects; a page per project with key facts; bring a project |
| Services | Hosted services, support, implementation, training |
| Governance | Company details; do-ocracy; open source commitment; project lifecycle |
| Community | Contributing; code of conduct; Developer Certificate of Origin; security policy |
| Transparency | Why we publish so much; incorporation; Articles of Association |
| Contact | Addresses by purpose (hello, security, conduct), mailing list, issues |

### Direct relevance to Public Projects

OHTF's candidate projects page still lists **NHS Number for Rust**: "The nhs-number
Rust crate, by Joel Parker Henderson, implements the same NHS Number checks and is
tested against the same shared vectors." The Rust crate shares conformance test vectors
with OHTF's Python `nhs-number` package. Public Projects now cites this on the Impact
page and in the NHS Number project's recognition.

Source: https://openhealthtechnology.org/projects/candidates/#nhs-number-for-rust

## 2. What OHTF does well

1. **States the problem first.** The home page opens with a tagline ("A neutral,
   long-term home for open source health software"), a one-line belief ("Public money
   should buy public code"), and a short "The gap OHTF fills" section, then how the
   organisation fills it.
2. **Clear criteria.** Four tests (vendor-neutral, built for implementers, open and
   maintained, worth keeping) explain what belongs and what does not.
3. **Says what it is not.** Not a standards body, not a product vendor, not a
   professional body, not a substitute for clinical safety work. This prevents
   misunderstanding, especially by NHS buyers.
4. **A key-facts table on every project page**: lifecycle status, maturity, current
   version, licence, authors, Clinical Safety Officer, medical device position,
   clinical safety documentation, source, and documentation. Gaps are stated plainly,
   such as "Not approved for live patient workflows".
5. **An explicit project lifecycle** (Experimental, Candidate, Incubating, Active,
   Maintenance, Archived), with what users can expect at each stage and the rules for
   moving between them.
6. **Real code instead of decoration.** The home page hero shows a `pip install
   nhs-number` session with a valid and an invalid number, and each project page has
   an "In action" example.
7. **Shared conformance test vectors** that let a port in any language prove it gives
   the same answers. This turns a single library into a cross-language standard.
8. **Contributor basics in one place**: code of conduct, DCO sign-off, private security
   reporting, "you do not need permission to start", and advice for contributing
   alongside a day job.
9. **Transparency as a selling point.** "Why we publish so much" explains, for health
   buyers, why open safety documentation, limitations and governance make due
   diligence easier and avoid lock-in. It also says what is not published, and why.
10. **Memorable storytelling.** The logo story (the Chamberlen forceps, kept secret for
    a century) makes the case against closed health technology in a way people
    remember and retell.
11. **A public list of gaps.** "Awesome Missing NHS Things" lists what NHS work needs
    but does not have, and several projects began there. It invites collaboration and
    shows direction.
12. **A sustainability model.** Free code, paid services; service income funds
    maintenance and never encloses the code.
13. **Contact by purpose**: general, security, and code of conduct addresses, project
    issues, a mailing list, and an edit link on every page.
14. **Social sharing metadata**: a 1200 × 630 social card image (`og:image`, Twitter
    `summary_large_image`) and a page-specific description on every page.

## 3. Where Public Projects is already stronger

Keep these; they are differentiators.

- **Dated, sourced statistics** for every project, with a refresh script and an Impact
  page. OHTF shows no adoption figures.
- **Translation**: 47 locales in 21 languages, including right-to-left Arabic and
  Urdu, with the root page sending each browser to its language at once. Many
  projects are themselves published in 50 to 60+ languages. OHTF is English only
  (`lang="en"`).
- **Accessibility and preferences**: Lily's default themes, text size, and an
  accessibility statement. OHTF has light and dark modes and no accessibility
  statement.
- **Privacy**: no cookies and no third-party requests. OHTF loads Google Fonts (Inter
  and JetBrains Mono) from `fonts.googleapis.com`, which sends each visitor's IP
  address to Google.
- **Machine-readable**: `sitemap.xml` with `hreflang` alternates, `llms.txt`,
  `robots.txt`, and JSON-LD. OHTF has a sitemap with no `lastmod`, no JSON-LD, and
  `robots.txt` and `llms.txt` both return 404.
- **Breadth**: public value and software engineering leadership as well as health.
- **Site search** in every locale.

## 4. Progress since 21 November

| Advice (21 November) | State on 23 November |
| --- | --- |
| Record the OHTF citation | Done: Impact page and the NHS Number project's recognition |
| Give every project a lifecycle status, with a page defining each | Done: `statusOf()` and the Project status page (active, pre-release, demonstration, maintenance, archived); cards show the less common statuses |
| Publish a security policy | Done: the Security page, with GitHub private vulnerability reporting |
| Show each project in action | Done for seven crates: `fhir`, `hl7`, `snomed`, `nhs-number`, `er7`, `openehr`, and `assertables` ("Use it", with real output and its version) |
| Add a social card image | Done: one language-neutral 1200 × 630 card for every page and locale (§ 5, item 1) |
| (New) Add "What Public Projects is not" to About | Done (§ 5, item 2) |
| (New) Add a Contribute page with a code of conduct | Done (§ 5, item 3) |
| Add a key-facts table to every project page | Built, then removed on 23 November at the author's request: project pages are now a single column, and the licence and clinical safety data were deleted with it. This is a deliberate difference from OHTF; see § 6, question 4 |

## 5. Remaining advice

Ranked by value for the site's three goals (spec § 1): reach, evidence of recognition,
and usefulness to digital health teams. Each needs entries in every catalogue for any
new text.

### High value

1. **Add a social card image.** Done on 23 November: `static/social-card.png`
   (1200 × 630, language-neutral), with `og:image`, its size and alt text, and
   `twitter:card` `summary_large_image` on every page.
2. **Add "What Public Projects is not" to the About page.** Done on 23 November:
   not a standards body, not a vendor, not a medical device supplier, not an
   employer’s programme, and not a charity, in every locale.
3. **Add a short Contribute page.** Done on 23 November: `/contribute/`, linked from
   Donate › "Donate time", Digital health teams, and the footer: no permission
   needed; ways to help; never include real patient data; security reports privately;
   each project's licence; and the Contributor Covenant 2.1 code of conduct. Advice
   for contributing alongside a day job was left out, since it risks naming an
   employer.

### Medium value

4. **More "Use it" examples.** Done on 23 November for `er7` 0.3.0, `openehr` 0.11.0,
   and `assertables` 10.1.0, each run against that version before publishing. A test
   now fails when `stats.json` records a newer version than an example was run
   against, so examples are re-run after each `pnpm stats`.
5. **Say where test vectors are shared.** The NHS Number page already says so, in its
   recognition, with OHTF's link; repeating it under "Use it" would duplicate it.
   What remains is outside this site: publish vectors for other standards crates where
   they exist. Cross-language conformance is strong evidence of engineering
   leadership and invites ports.
6. **State the problem and the criteria on the home page.** The hero could open with
   one belief sentence, then a short list of what Public Projects builds (for example:
   shared foundations, open and maintained, useful across borders, honest about
   safety). The existing "Why public open source matters" section is the natural
   place.
7. **Publish a gaps list**, like Awesome Missing NHS Things: what digital health and
   public services need that Public Projects would build or welcome help with. Link it
   from Donate and Digital health teams.
8. **Add an updates feed.** Done on 23 November as a Releases page and an Atom feed
   (`releases.xml`), built from the release dates already in `stats.json`, so every
   entry is dated and sourced and nothing is written by hand. A hand-written changelog
   of the site itself was left out: it would need the author's wording.

### Lower value or optional

9. **An "On this page" contents list.** Done on 23 November on the four policy pages,
   using Lily's `ContentsNav`, with anchors that are the same in every locale. Impact
   and Digital health teams were left without one: Impact's sections are short and
   already have ids, and Digital health teams has only three.
10. **Contact by purpose.** Today the routes are the issue tracker, the Security page,
    and the author's email (Donate page only). If volume grows, a Contact page could
    list them by purpose.
11. **Tell a story.** A short, sourced "why open" story, as OHTF does with its logo,
    could make the home page's argument more memorable. It must be factual and cited.
12. **Edit links.** OHTF puts an edit link on every page. The footer's source-code link
    was removed by request, so this is a decision for the author, not a default.

## 6. Strategic questions for the author

These are decisions for the author, not changes to make by default.

1. **Continuity of health projects.** OHTF's core argument is that important health
   software should not depend on one person's GitHub account. Many Public Projects
   health crates live in personal or single-person organisations. Options: propose more
   crates to OHTF as candidates (for example `fhir`, `hl7`, or `snomed`, as NHS Number
   for Rust already is), name co-maintainers, or publish a short continuity statement.
   Any of these strengthens the case to health teams that adopting a crate is safe in
   the long term.
2. **Relationship with OHTF.** Public Projects can complement OHTF rather than overlap:
   Public Projects as the author's portfolio and incubator across health, public value,
   and engineering; OHTF as the neutral long-term home for health projects that mature.
   OHTF's lifecycle already has a route for this (Candidate, then Incubating once the
   repository moves to github.com/ohtf). A short note and link on the Digital health
   teams page would make the relationship explicit.
3. **Donations.** OHTF funds maintenance through paid services under a CIC asset lock.
   Public Projects asks for personal donations by PayPal or Venmo. GitHub Sponsors, or
   a fiscal host such as Open Collective, publish income and spending and may
   reassure organisational donors.
4. **Where health teams find a project's safety position.** OHTF shows each project's
   licence, Clinical Safety Officer, medical device position, and safety documentation
   on its page. Public Projects removed these on 23 November, so a clinical safety
   officer must now look in each repository. The site-wide clinical safety notices
   remain. Options: leave it to the repositories (simplest, and nothing on the site
   can go stale); add a sentence on the Health care page pointing to each
   repository's safety documents; or, if health teams ask, publish the position
   elsewhere, such as on the Digital health teams page.

## 7. Suggested next steps

1. ~~Add the social card image~~ (done on 23 November).
2. ~~Add "What Public Projects is not" to About~~ and ~~the Contribute page~~ (done on 23 November).
3. Decide the strategic questions in § 6, starting with continuity and the
   relationship with OHTF, which affect what the Digital health teams page says.
4. ~~Add further verified "Use it" examples~~ (done on 23 November); publish shared
   test vectors for other standards crates (item 5, outside this site).
