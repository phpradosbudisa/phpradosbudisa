import { WHY_EPISODE, applyStories } from "./stories.mjs";

export const SITE = {
  baseUrl: "https://phpradosbudisa.github.io/phpradosbudisa",
  instagram: "https://www.instagram.com/burad.ships/",
  linkedin: "https://www.linkedin.com/in/rados-budisa/",
  brandName: "3am Deploy",
  title: "3am Deploy: what actually breaks when you go live",
  metaDescription:
    "Stories from 8 years of shipping software: what breaks in prod and the call I make.",
  name: "Rados Budisa",
  positioning: "8 years shipping software",
  intro:
    "The posts introduce the topic. These pages are the reference you come back to.",
  ga4Id: "G-KFGVW1WRMB",
  finePrint: [
    "Slovenia has about 2 million people. I run 5 products. Working on the ratio.",
    "Five products in parallel. The CPU is fine. The calendar is not.",
    "I ship before the burja does.",
    "Burad means barrel. Five products, one barrel, zero leaks so far.",
  ],
};

export const FILTERS = [
  { id: "all", label: "All" },
  { id: "checklist", label: "Checklist" },
  { id: "war-story", label: "War story" },
  { id: "tradeoff", label: "Tradeoff" },
  { id: "build-in-public", label: "Build in public" },
];

export const PRODUCTS = [
  {
    name: "Convertix",
    url: "https://convertixdigital.com",
    domain: "convertixdigital.com",
    tagline: "We fix and ship AI-built apps.",
    status: "Live",
    linkSlug: "convertix",
  },
  {
    name: "Urejamo.si",
    url: "https://urejamo.si",
    domain: "urejamo.si",
    tagline: "One inquiry. Up to three offers.",
    status: "Live",
    linkSlug: "urejamo",
  },
  {
    name: "DueChat",
    url: "https://duechat.io",
    domain: "duechat.io",
    tagline: "Your AI can now get you paid.",
    status: "Live",
    linkSlug: "duechat",
  },
  {
    name: "Nabiralniček",
    url: "https://nabiralnicek.si",
    domain: "nabiralnicek.si",
    tagline: "Pošta pride k nam. Vi jo vidite v portalu.",
    status: "Live",
    linkSlug: "nabiralnicek",
  },
  {
    name: "Holdquiet",
    tagline: "Coming soon.",
    status: "Coming soon",
  },
  {
    name: "Odprti prihodki",
    tagline: "Verified revenue of Slovenian startups.",
    status: "Building",
  },
];

export function episodeIsLive(ep) {
  return ep.live !== false;
}

const EPISODE_LIST = [
  {
    slug: "docs",
    num: 8,
    live: false,
    keyword: "DOCS",
    kind: "checklist",
    date: "14 Nov 2026",
    dateIso: "2026-11-14",
    title: "4 docs before anyone touches your codebase",
    promise:
      "The 4 files that stop newcomers guessing.",
    sections: [
      {
        title: null,
        lead: [
          "Before anyone new touches a codebase I'm responsible for (a new hire or a contractor), these 4 files exist.",
          "What breaks in prod: without them, people guess. Guesses ship, and they get \"fixed\" by the next person who guesses.",
        ],
        items: [
          "<strong>RUNBOOK.md</strong><ul><li>Run locally, run the tests, deploy, roll back: as copy-paste commands.</li><li>Where the logs and dashboards are.</li><li>Who gets paged, and what \"down\" means.</li></ul>",
          "<strong>ARCHITECTURE.md</strong><ul><li>The modules, and which tables each one owns.</li><li>Data flow for the 3 journeys that make money (signup, core action, payment).</li><li>Every external service, and what breaks when it's down.</li></ul>",
          "<strong>DECISIONS/</strong> (one short record per big choice)<ul><li>Context, decision, alternatives rejected, consequences, when to revisit.</li><li>This is what stops a smart newcomer from \"fixing\" a tradeoff that was deliberate.</li></ul>",
          "<strong>RULES.md</strong> (or CONTRIBUTING.md)<ul><li>Naming, error handling, logging conventions.</li><li>No-go zones: migrations, billing, auth. Changes there need review.</li><li>Secrets never go in code or chat.</li><li>Definition of done: tests, docs updated, rollback path.</li></ul>",
        ],
        footer:
          "My call: an hour per doc vs. weeks of tribal knowledge. Keep each one short enough that people actually read it. One page beats a wiki nobody opens.",
      },
    ],
    prompt:
      "Read this repository and draft RUNBOOK.md, ARCHITECTURE.md, a DECISIONS/ folder with records for the 3 biggest existing choices, and RULES.md. Mark every guess as TODO for me to verify.",
    sources: [
      {
        title: "Documenting Architecture Decisions",
        url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
        note: "Michael Nygard on ADR format and why to write decisions down.",
      },
      {
        title: "adr.github.io",
        url: "https://adr.github.io/",
        note: "Templates and tooling for architecture decision records.",
      },
      {
        title: "Setting guidelines for repository contributors",
        url: "https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors",
        note: "GitHub guidance for CONTRIBUTING and community docs.",
      },
    ],
  },
  {
    slug: "pricing",
    num: 7,
    live: false,
    keyword: "PRICING",
    kind: "build-in-public",
    date: "12 Nov 2026",
    dateIso: "2026-11-12",
    title: "How I'd price a SaaS today",
    promise: "5 deliberate pricing calls, with public numbers.",
    sections: [
      {
        title: null,
        lead: [
          "If I were pricing a new SaaS today, I'd make the same 5 calls I've made for my own products. Public numbers only.",
          "What breaks in prod: free with no end date and no price on the page. Signups grow, revenue doesn't, and you can't tell who's serious.",
        ],
        items: [
          "<strong>Charge from day one.</strong> The price is public before the first signup. Free is a phase with an end date, not the model. Urejamo (my local services marketplace): replies cost €19/month or €190/year, excl. VAT. The deliberate exception: the first month of replies is free, no card. A marketplace lives on supply-side trust. Providers should see real jobs before they pay, and that matters more to me than early revenue.",
          "<strong>Price the unit of value.</strong> For a provider, the value is replying to real jobs. So the profile is free forever, replies are unlimited, and there's no fee per inquiry. A per-inquiry fee makes providers hesitate on every job. A flat price makes replying the default. The cost: busy months don't earn me more.",
          "<strong>Fixed price over hourly.</strong> Convertix, my launch studio: Audit €390 one-off; Sprint €1,900–3,900, fixed after the audit. It doesn't grow if the work takes longer. Care €149/month, cancel anytime. Hourly billing makes the client carry the risk. Fixed price makes me estimate properly. I'll take that side.",
          "<strong>Make the first step small.</strong> The €390 audit is credited in full toward the Sprint. The first yes is cheap; the second one is easy.",
          "<strong>Reward commitment, don't force it.</strong> Urejamo offers monthly or yearly, and yearly comes with 2 months free. Lock-in has to be a choice the customer makes, not a trap.",
        ],
        footer:
          "My call: I give up early revenue, the upside of per-lead fees, and forced annual contracts. Providers get a price they can trust, and every renewal has to be earned. I'd make that trade again.",
      },
    ],
    prompt:
      "Here's my product, customer and costs: <...>. Propose a value metric, 2–3 price points, a free-period policy and a monthly vs yearly option, and list the tradeoffs of each choice. No discounts as a first lever.",
    sources: [
      {
        title: "Stripe pricing models",
        url: "https://docs.stripe.com/products-prices/pricing-models",
        note: "How Stripe models recurring and usage-based pricing.",
      },
      {
        title: "Convertix pricing",
        url: "https://convertixdigital.com/en/pricing",
        note: "Public pricing for the launch studio (own example).",
      },
      {
        title: "Urejamo for providers",
        url: "https://urejamo.si/za-izvajalce",
        note: "Provider pricing on the marketplace (own example).",
      },
    ],
  },
  {
    slug: "seo",
    num: 6,
    live: false,
    keyword: "SEO",
    kind: "checklist",
    date: "10 Nov 2026",
    dateIso: "2026-11-10",
    title: "Every redesign I ship starts with a 301 map",
    promise: "Relaunch without losing the traffic you've earned.",
    sections: [
      {
        title: null,
        lead: [
          "A pattern I've seen more times than I can count: new design, new CMS, cleaner URLs. Launch day goes fine. Then search traffic slides, week after week.",
          "What breaks in prod: no redirects. Every URL Google had indexed, and every backlink the business earned over years, now returns a 404.",
          "That's why the 301 map is the first deliverable on every redesign I ship, before any design work:",
        ],
        items: [
          "<strong>Collect every old URL</strong><ul><li>Old sitemap.xml</li><li>Analytics: landing pages from the last 12 months</li><li>Search Console: pages with impressions</li><li>Backlink export (pages other sites link to)</li><li>Server logs, if you have them</li></ul>",
          "<strong>Map 1:1</strong> Each old URL → the closest new page. Don't send everything to the homepage; Google treats mass homepage redirects like soft 404s.",
          "<strong>Implement properly</strong><ul><li>Server-side 301s, not JavaScript or meta refresh.</li><li>One hop. No chains (A → B → C) and no loops.</li><li>Update internal links, canonical tags and the sitemap to the new URLs.</li></ul>",
          "<strong>Keep them</strong><ul><li>Google says at least a year. I keep them indefinitely.</li><li>New domain? Also use Search Console's Change of Address tool.</li></ul>",
          "<strong>Watch it</strong><ul><li>Crawl the old URL list after launch: every one should return a single 301 to a 200.</li><li>Check 404s and Search Console indexing weekly for 8 weeks.</li></ul> Redirects stop the loss. Recovery still takes weeks, not days.",
        ],
        footer:
          "My call: the map costs a day before design starts. I put it first on every redesign, ahead of any pixels. A redesign is a migration. Treat it like one.",
      },
    ],
    prompt:
      "Here is my old URL list and new sitemap. Produce a 1:1 redirect map (old, new, 301), flag URLs with no good match, detect chains and loops, and output it in <server/platform> format.",
    sources: [
      {
        title: "Site moves with URL changes",
        url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes",
        note: "Google guidance on migrating URLs without losing signals.",
      },
      {
        title: "301 redirects",
        url: "https://developers.google.com/search/docs/crawling-indexing/301-redirects",
        note: "How Google treats permanent redirects.",
      },
      {
        title: "Change of Address tool",
        url: "https://support.google.com/webmasters/answer/9370220",
        note: "Search Console tool for domain moves.",
      },
    ],
  },
  {
    slug: "email",
    num: 5,
    live: false,
    keyword: "EMAIL",
    kind: "checklist",
    date: "9 Nov 2026",
    dateIso: "2026-11-09",
    title: "Your emails land in spam. Fix 3 records.",
    promise: "SPF, DKIM and DMARC set up correctly, plus the Gmail/Yahoo rules.",
    sections: [
      {
        title: null,
        lead: [
          "Launch day. The password reset email lands in spam. What breaks in prod here is rarely the code; it's the DNS nobody set up. The fix is three records and a bit of patience:",
        ],
        items: [
          "<strong>SPF: who may send for your domain</strong> A TXT record listing your email providers, e.g. v=spf1 include:&lt;your provider&gt; ~all<ul><li>Only ONE SPF record per domain. Two records = SPF fails.</li><li>Max 10 DNS lookups. Every include counts.</li></ul>",
          "<strong>DKIM: every message is signed</strong> Your provider gives you a key (usually a CNAME or TXT at selector._domainkey). Publish it, turn signing on, use 2048-bit where offered.",
          "<strong>DMARC: what receivers do when checks fail</strong> _dmarc TXT \"v=DMARC1; p=none; rua=mailto:you@yourdomain\"<ul><li>Start at p=none and read the reports for 2–4 weeks.</li><li>Then p=quarantine, then p=reject.</li><li>DMARC needs alignment: the From domain must match the SPF or DKIM domain.</li></ul>",
          "Send app email from a subdomain (mail.yourdomain) and keep marketing separate, so one can't burn the other's reputation.",
          "Gmail and Yahoo require SPF, DKIM and DMARC for bulk senders (5,000+ a day to Gmail), plus one-click unsubscribe on marketing mail and a spam rate under 0.3%.",
          "Test it: send to Gmail → \"Show original\" → spf=pass, dkim=pass, dmarc=pass.",
          "DNS changes can take hours to propagate. Do this the week before launch, not the morning of.",
        ],
        footer:
          "My call: two to four weeks at p=none before you tighten. Slower, but you never block your own invoices.",
      },
    ],
    prompt:
      "Given my sending domain <domain> and providers <list>, produce the exact SPF, DKIM and DMARC DNS records, check the SPF lookup count, and give a 4-week DMARC rollout plan.",
    sources: [
      {
        title: "Google sender guidelines",
        url: "https://support.google.com/a/answer/81126",
        note: "Authentication and bulk sender requirements for Gmail.",
      },
      {
        title: "Yahoo sender best practices",
        url: "https://senders.yahooinc.com/best-practices/",
        note: "Yahoo's expectations for authenticated mail.",
      },
      {
        title: "RFC 7208 (SPF)",
        url: "https://www.rfc-editor.org/rfc/rfc7208",
        note: "SPF specification.",
      },
      {
        title: "RFC 7489 (DMARC)",
        url: "https://www.rfc-editor.org/rfc/rfc7489",
        note: "DMARC policy and alignment rules.",
      },
      {
        title: "RFC 8058 (one-click unsubscribe)",
        url: "https://www.rfc-editor.org/rfc/rfc8058",
        note: "List-Unsubscribe-Post for marketing mail.",
      },
      {
        title: "Resend domains",
        url: "https://resend.com/docs/dashboard/domains/introduction",
        note: "DNS records when sending via Resend.",
      },
    ],
  },
  {
    slug: "monolith",
    num: 4,
    live: false,
    keyword: "MONOLITH",
    kind: "tradeoff",
    date: "7 Nov 2026",
    dateIso: "2026-11-07",
    title: "Monolith first. Still my call.",
    promise: "When one deployable is right, and the 4 signals that justify a split.",
    sections: [
      {
        title: "What I mean",
        lead: [
          "It's 2026 and I still start almost everything as a monolith. Deliberately.",
          "What I mean: one deployable, one database, and modules with hard boundaries inside it. Not a ball of mud.",
        ],
        items: [],
      },
      {
        title: "What it buys",
        items: [
          "One deploy, one log stream, one thing to monitor.",
          "Real database transactions instead of distributed sagas.",
          "Refactors your editor and tests can follow end to end.",
          "A small team that can hold the whole system in their heads.",
        ],
      },
      {
        title: "What it costs",
        items: [
          "You scale everything together.",
          "Boundaries only hold if you enforce them.",
          "What breaks in prod: a bad deploy takes everything down at once. So a one-step rollback isn't optional.",
        ],
      },
      {
        title: "4 split signals",
        items: [
          "A part with a very different scaling profile: video, media processing, heavy batch jobs.",
          "A part with its own release cadence or its own team.",
          "Hard isolation needs: compliance scope, running untrusted code.",
          "Measured pain: profiling and incident data, not a diagram of the future.",
        ],
      },
      {
        title: "Keep the split cheap",
        items: [
          "Each module owns its tables. Nobody else reads them directly.",
          "Modules talk through an interface, so the call can become a network call later.",
          "Background work goes through a queue from day one.",
          "The same rule applies to product scope. Launch the smallest scope that can prove the idea, and widen it on evidence, not on a roadmap. Hard limits help: Urejamo, the local services marketplace I'm building, sends each inquiry to at most 3 providers. Fewer, better matches beat more noise.",
        ],
        footer:
          "My call: I trade independent scaling for speed and one place to debug. Until the evidence says otherwise, I'd make that call again.",
      },
    ],
    prompt:
      "Map this codebase into modules: which tables each one reads and writes, and every cross-module table access. Propose boundaries so each module owns its tables. No service split.",
    sources: [
      {
        title: "MonolithFirst",
        url: "https://martinfowler.com/bliki/MonolithFirst.html",
        note: "Martin Fowler on starting with a monolith.",
      },
      {
        title: "Microservice Prerequisites",
        url: "https://martinfowler.com/bliki/MicroservicePrerequisites.html",
        note: "When microservices are worth the complexity.",
      },
    ],
  },
  {
    slug: "security",
    num: 3,
    live: false,
    keyword: "SECURITY",
    kind: "checklist",
    date: "5 Nov 2026",
    dateIso: "2026-11-05",
    title: "7 security holes I find in almost every audit",
    promise: "Check your app for the 7 holes before someone else does.",
    sections: [
      {
        title: null,
        lead: [
          "I audit a lot of apps before they launch. Different stacks, same 7 holes.",
          "What breaks in prod is never the clever exploit. It's someone changing ?id=42 to ?id=43.",
        ],
        items: [
          "<strong>Secret keys in the frontend bundle.</strong> Service keys, payment secret keys, third-party API keys. If it's in the browser, it's public. Move it server-side and rotate it.",
          "<strong>Database tables any logged-in user can read.</strong> Row-level rules missing or set to \"authenticated = allowed\". Deny by default, then allow per owner. Test as a second user.",
          "<strong>The API trusts the ID in the request.</strong> The UI hides other users' records; the endpoint happily returns them if you change ?id=. Check ownership on the server, every time.",
          "<strong>No rate limits on login, password reset or OTP.</strong> That's how you get credential stuffing and a surprise SMS bill. Limit per IP AND per account.",
          "<strong>Payment webhooks that aren't verified.</strong> Anyone can POST \"payment succeeded\". Verify the signature, make the handler idempotent.",
          "<strong>Public storage buckets and unchecked uploads.</strong> Listable files, user documents behind guessable URLs. Keep buckets private, serve signed URLs, check type and size.",
          "<strong>Debug leftovers in production.</strong> Admin or debug routes, source maps, verbose errors, CORS set to *. Turn them off for prod builds.",
        ],
        footer:
          "My call: one day of checks before launch beats a breach notice after. It's the cheapest security work you'll ever buy.",
      },
    ],
    prompt:
      "Check this codebase for the 7 issues below. For each: where it occurs (file:line), severity, and a minimal fix. Search the built frontend bundle for key patterns. List every table without deny-by-default access rules.",
    sources: [
      {
        title: "OWASP Top 10",
        url: "https://owasp.org/Top10/",
        note: "Common application security risks.",
      },
      {
        title: "OWASP API Security Top 10",
        url: "https://owasp.org/API-Security/",
        note: "API-specific failure modes.",
      },
      {
        title: "Authentication Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
        note: "Session and auth hardening patterns.",
      },
      {
        title: "Supabase RLS",
        url: "https://supabase.com/docs/guides/database/postgres/row-level-security",
        note: "Row-level security for Postgres.",
      },
      {
        title: "Stripe webhook verification",
        url: "https://docs.stripe.com/webhooks",
        note: "Signing secret verification for webhooks.",
      },
    ],
  },
  {
    slug: "backup",
    num: 2,
    live: true,
    keyword: "BACKUP",
    kind: "war-story",
    date: "3 Nov 2026",
    dateIso: "2026-11-03",
    title: "Backups are not restores",
    promise: "A monthly restore drill you can run in an hour.",
    sections: [
      {
        title: null,
        lead: [
          "Every team I've seen lose data had backups. The nightly job was green for months. Nobody had ever restored one.",
          "What breaks in prod: the first real restore happens during the outage. That's when you find out what the backup doesn't contain.",
        ],
        items: [],
      },
      {
        title: "The 4 patterns I see over and over",
        items: [
          "<strong>The dump isn't the system.</strong> Roles, grants and extensions missing, so it won't load cleanly. Config and secrets were never in it. The schema restores; the app still can't start.",
          "<strong>Files nobody covered.</strong> User uploads live in object storage that no backup touches. No versioning, so a delete is permanent.",
          "<strong>Keys on the same box.</strong> Backup credentials stored on the machine being backed up, in the same account and region. One incident takes out the system AND the way back.",
          "<strong>Hours, not minutes.</strong> Nobody timed a restore. The data grew; the estimate didn't.",
        ],
      },
      {
        title: "The drill I run on every system I'm responsible for",
        items: [
          "Write down RPO (how much data you can afford to lose) and RTO (how long you can afford to be down).",
          "Back up the database AND files AND config/secrets (in a separate vault).",
          "Keep backup credentials off the machine being backed up. Keep at least one copy in a different account or region.",
          "Use point-in-time recovery where your database offers it.",
          "Once a month, restore into a scratch environment. Time it.",
          "Smoke-test the restored copy: row counts, a login, one real workflow.",
          "Alert on a failed backup job AND on a missed restore drill.",
          "Document the restore steps so someone other than you can run them at 3 am.",
        ],
        footer:
          "My call: a monthly drill costs a few hours. I take that over finding out mid-outage, every time. A backup you haven't restored is a hypothesis.",
      },
    ],
    prompt:
      "Write a restore runbook for this project: list every data store, how it's backed up, how to restore it to a scratch environment, and a smoke test (row counts, login, one workflow). Flag anything not backed up.",
    sources: [
      {
        title: "PostgreSQL backup",
        url: "https://www.postgresql.org/docs/current/backup.html",
        note: "Backup approaches for Postgres.",
      },
      {
        title: "PostgreSQL PITR",
        url: "https://www.postgresql.org/docs/current/continuous-archiving.html",
        note: "Continuous archiving and point-in-time recovery.",
      },
      {
        title: "Google SRE: Data Integrity",
        url: "https://sre.google/sre-book/data-integrity/",
        note: "Designing for recoverable data.",
      },
    ],
  },
  {
    slug: "launch",
    num: 1,
    live: true,
    keyword: "LAUNCH",
    kind: "checklist",
    date: "2 Nov 2026",
    dateIso: "2026-11-02",
    title: "20 things I check before any app goes live",
    promise: "The pre-launch pass that keeps launch week quiet.",
    sections: [
      {
        title: null,
        lead: [
          "Eight years of shipping software, and launch day still breaks in the same places. This is the list I go through before anything goes live, mine or a client's.",
          "What breaks in prod is rarely the feature. It's the cert nobody renews, the reset email in spam, the migration that locks a table.",
        ],
        items: [],
      },
      {
        title: "Domain & HTTPS",
        items: [
          "HTTPS only. Every http:// URL 301s to https://.",
          "www and the bare domain resolve to ONE canonical host.",
          "Certificates auto-renew, and something alerts you 14 days before expiry.",
        ],
      },
      {
        title: "Secrets & access",
        items: [
          "No secret keys in the frontend bundle. Anything that ever shipped to a browser gets rotated.",
          "Database access rules deny by default. Test them logged in as a second, ordinary user.",
          "Rate limits on login, signup, password reset, OTP and contact forms.",
        ],
      },
      {
        title: "Hardening",
        items: [
          "Security headers: HSTS, nosniff, Referrer-Policy, frame-ancestors, and a CSP rolled out in Report-Only first.",
          "Dependency audit is clean or triaged; the lockfile is committed.",
        ],
      },
      {
        title: "Data",
        items: [
          "Automated backups, plus one real restore into a scratch environment. Time it.",
          "Every migration has a rollback, or a written roll-forward plan.",
        ],
      },
      {
        title: "Money & email",
        items: [
          "Payment webhooks: signature verified, idempotent, safe to retry. App state comes from the webhook, not the success page.",
          "A refund and a declined card tested end to end.",
          "SPF, DKIM and DMARC on the domain you send from.",
          "Password reset and verification emails tested in Gmail AND Outlook.",
        ],
      },
      {
        title: "Seeing problems",
        items: [
          "Error tracking that alerts a human, not a dashboard nobody opens.",
          "Uptime check on a real path (log in, load data), not just the homepage.",
          "Logs contain no passwords, tokens or personal data.",
        ],
      },
      {
        title: "Search & rollback",
        items: [
          "Titles, meta descriptions and OG image per page, sitemap.xml live, robots.txt not blocking production, staging noindex removed.",
          "Replacing an old site? A 301 map from every old URL.",
          "Rollback in one step, and a named person on call for the first 72 hours.",
        ],
        footer:
          "My call: speed vs. boring, I pick boring. Every item here is cheaper the week before launch than the week after.",
      },
    ],
    promptIntro:
      "Audit this project against the 20 items below. For each: pass / fail / not applicable, the file or setting that proves it, and the smallest fix. Don't change code until I confirm.",
    promptList: true,
    sources: [
      {
        title: "Strict-Transport-Security (HSTS)",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security",
        note: "MDN reference for HSTS.",
      },
      {
        title: "HTTP Headers Cheat Sheet",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html",
        note: "OWASP security header guidance.",
      },
      {
        title: "OWASP ASVS",
        url: "https://owasp.org/www-project-application-security-verification-standard/",
        note: "Application security verification standard.",
      },
      {
        title: "Stripe webhooks",
        url: "https://docs.stripe.com/webhooks",
        note: "Webhook signing and delivery.",
      },
      {
        title: "SEO starter guide",
        url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide",
        note: "Google fundamentals for crawlable sites.",
      },
      {
        title: "Let's Encrypt docs",
        url: "https://letsencrypt.org/docs/",
        note: "Automated certificate issuance.",
      },
    ],
  },
];

export const EPISODES = [WHY_EPISODE, ...applyStories(EPISODE_LIST)];

export function launchPromptBody(ep) {
  if (!ep.promptList) return ep.prompt;
  const lines = [];
  for (const sec of ep.sections) {
    if (sec.title) lines.push(sec.title.toUpperCase());
    sec.items.forEach((item, i) => {
      const plain = item.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      lines.push(`${lines.filter((l) => /^\d+\./.test(l)).length + 1}. ${plain}`);
    });
  }
  let n = 0;
  const numbered = [];
  for (const sec of ep.sections) {
    if (sec.title) numbered.push(sec.title.toUpperCase());
    for (const item of sec.items) {
      n += 1;
      const plain = item.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      numbered.push(`${n}. ${plain}`);
    }
  }
  return `${ep.promptIntro}\n\n${numbered.join("\n")}`;
}

export function getPrompt(ep) {
  if (ep.promptList) return launchPromptBody(ep);
  return ep.prompt;
}

export function moreEpisodes(currentSlug) {
  return EPISODES.filter((e) => e.slug !== currentSlug).slice(0, 3);
}
