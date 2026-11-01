export const WHY_EPISODE = {
  slug: "why",
  num: 0,
  keyword: "START",
  kind: "intro",
  date: "1 Nov 2026",
  dateIso: "2026-11-01",
  title: "Why I'm sharing this",
  promise:
    "Eight years of shipping software, and the patterns that still decide launch week.",
  introPage: true,
  live: true,
  storyLede:
    "After eight years of shipping APIs, dashboards, and mobile apps for my own products and for teams who need something live, the same failure modes keep showing up. 3am Deploy is where I write down what I actually check before go-live, with enough context to decide what applies to your stack.",
  introSections: [
    {
      heading: "Why this series exists",
      paragraphs: [
        "Useful detail rarely arrives before launch. It shows up in the week after, when traffic, email, payments, or search behave differently than they did on a laptop.",
        "These pages capture the decisions and tradeoffs behind each reference list, while the pattern is still clear. No generic advice: each episode is one topic, one pass you can run on a real project.",
      ],
    },
    {
      heading: "What each episode covers",
      episodeIndex: true,
    },
    {
      heading: "How to use the series",
      paragraphs: [
        "Short reels on Instagram introduce the topic and the promise. These pages are the reference you keep open while you work: sources, prompts where they help, and a list you can tick off in the browser.",
        "You do not need to read everything in order. Open the episode that matches the problem in front of you, take what fits, and leave the rest.",
      ],
    },
  ],
  sections: [],
  sources: [],
};

export const STORY_BY_SLUG = {
  launch: {
    storyLede:
      "Launch week is rarely about the feature. It is about certificates, email, migrations, and the assumptions that only break under real traffic. This is the pass I run before any app goes live, whether I built it or I am signing it off.",
    storySteps: [
      {
        title: "Set the bar before the date moves",
        situation:
          "A fixed launch date is on the calendar and the product demo works on staging.",
        decision:
          "Decide whether the date serves learning or revenue, and what must be true on day one.",
        tradeoff:
          "A hard date focuses the team; a soft date avoids shipping known gaps.",
        choice:
          "I keep the date but define a written go/no-go list. Anything not on the list is out of scope for day one.",
        prod:
          "When something slips, we cut scope instead of skipping checks. Launch day stays boring on purpose.",
        sourceIndexes: [],
      },
      {
        title: "Domain and transport",
        situation:
          "Users bookmark both www and bare host, and old links still use http.",
        decision:
          "Pick one canonical host and enforce HTTPS everywhere.",
        tradeoff:
          "Strict redirects can break old marketing links if they are not mapped first.",
        choice:
          "One canonical host, http to https, certificates on auto-renew with an expiry alert two weeks ahead.",
        prod:
          "Mixed content and certificate surprises are the first support tickets I see after go-live when this is skipped.",
        sourceIndexes: [5],
      },
      {
        title: "Secrets and access on the server",
        situation:
          "The UI hides admin actions and the API feels fine in manual testing.",
        decision:
          "Treat the browser as public and the API as the real gate.",
        tradeoff:
          "Server checks and rate limits add code; skipping them ships faster until someone scripts the endpoints.",
        choice:
          "Rotate anything that ever lived in a frontend bundle, deny-by-default data rules tested as a second user, rate limits on auth flows.",
        prod:
          "Credential stuffing and ID tampering show up as odd support tickets long before a formal incident.",
        sourceIndexes: [2, 1],
      },
      {
        title: "Money and email paths",
        situation:
          "Checkout works in test mode and password reset sends from the default provider domain.",
        decision:
          "Trust webhooks and DNS, not the success page.",
        tradeoff:
          "Webhook idempotency and SPF, DKIM, and DMARC take a week of calendar time.",
        choice:
          "Verified payment webhooks, a real declined-card test, authenticated mail on the production From domain, reset tested in Gmail and Outlook.",
        prod:
          "Paid users with app state stuck on pending and resets in spam are the classic day-two fires.",
        sourceIndexes: [3, 4],
      },
      {
        title: "Rollback and eyes on the system",
        situation:
          "The deploy pipeline is green and nobody is scheduled for the holiday weekend.",
        decision:
          "Name who gets paged and how to roll back in one step.",
        tradeoff:
          "On-call rotas cost attention; without them, the first outage waits for whoever checks Slack last.",
        choice:
          "One-step rollback rehearsed, error tracking that pages a human, uptime on a path that logs in, 301 map if URLs changed.",
        prod:
          "Quiet launch weeks correlate with boring prep, not with luck.",
        sourceIndexes: [0, 4],
      },
    ],
  },
  backup: {
    storyLede:
      "Every team I have worked with that lost data had backup jobs reporting success. The gap is almost always restore: nobody timed it, and nobody tested the app against the copy.",
    storySteps: [
      {
        title: "Define loss and downtime you can accept",
        situation:
          "Backups run nightly but nobody has written down RPO or RTO.",
        decision:
          "Agree how much data and how many hours you can lose before the business cares.",
        tradeoff:
          "Tighter numbers cost storage and engineering time.",
        choice:
          "Write RPO and RTO on the runbook wall. Match backup frequency and restore target to those numbers.",
        prod:
          "During an outage, arguments about acceptable loss waste the hours you needed for the restore.",
        sourceIndexes: [2],
      },
      {
        title: "Backup the whole system, not just the database",
        situation:
          "The database dump restores cleanly but uploads and config live elsewhere.",
        decision:
          "List every store: database, files, secrets, search indexes if any.",
        tradeoff:
          "Object storage versioning and separate secret vaults add ops work.",
        choice:
          "Database plus files plus config in a vault. Credentials for backups live off the machine being backed up.",
        prod:
          "Schema without roles, or uploads without objects, produces a green restore that still cannot serve users.",
        sourceIndexes: [0, 1],
      },
      {
        title: "Restore into scratch, on a calendar",
        situation:
          "The team trusts the backup vendor dashboard.",
        decision:
          "Treat untested backup as a hypothesis.",
        tradeoff:
          "Monthly drills interrupt other work.",
        choice:
          "Once a month, restore to a scratch environment, time it, smoke-test login and one workflow, alert on missed drills.",
        prod:
          "The first real restore mid-outage is when you learn the dump never included extensions or queue state.",
        sourceIndexes: [2],
      },
    ],
  },
  security: {
    storyLede:
      "Security audits on pre-launch apps converge on the same seven gaps regardless of framework. They are boring until someone automates the boring attack.",
    storySteps: [
      {
        title: "Secrets and the browser bundle",
        situation:
          "Third-party keys sit in environment variables wired to the client build.",
        decision:
          "Decide what may ever ship to the browser.",
        tradeoff:
          "Moving calls server-side adds latency and code.",
        choice:
          "Payment secret keys and service roles stay server-side; rotate anything that was ever client-visible.",
        prod:
          "Scrapers find keys in minutes once the app is public.",
        sourceIndexes: [0],
      },
      {
        title: "Row-level access",
        situation:
          "Logged-in users see only their rows in the UI.",
        decision:
          "Enforce ownership in the database or API, not in the template.",
        tradeoff:
          "Strict rules break quick demos until policies are written properly.",
        choice:
          "Deny by default, allow per owner, test with two ordinary accounts.",
        prod:
          "Changing an ID in the query string still works when the API trusts the request.",
        sourceIndexes: [3, 0],
      },
      {
        title: "Auth endpoints and money webhooks",
        situation:
          "Login and reset endpoints accept unlimited tries; webhooks accept any JSON.",
        decision:
          "Rate-limit identity flows and verify payment signatures.",
        tradeoff:
          "Stricter limits can block legitimate users behind shared IPs.",
        choice:
          "Limits per IP and per account; webhook handlers idempotent with signature verification.",
        prod:
          "Surprise SMS bills and fake paid states are launch-week patterns, not year-two bugs.",
        sourceIndexes: [2, 4, 1],
      },
      {
        title: "Storage and production hygiene",
        situation:
          "Upload buckets are public for convenience; staging debug routes ship in prod builds.",
        decision:
          "Private by default, signed URLs, type and size checks.",
        tradeoff:
          "Signed URLs expire and need refresh logic.",
        choice:
          "No listable buckets, no debug routes or permissive CORS in production builds.",
        prod:
          "Guessable file URLs and verbose errors leak more than scanners need.",
        sourceIndexes: [0, 1],
      },
    ],
  },
  monolith: {
    storyLede:
      "Microservices are a scaling strategy, not a starting gift. I still begin with one deployable, hard module boundaries, and evidence before a split.",
    storySteps: [
      {
        title: "Name what you are optimizing for",
        situation:
          "The roadmap shows eight boxes on a diagram before the first paying user.",
        decision:
          "Ship one deployable or pay the tax of distributed operations on day one.",
        tradeoff:
          "A monolith scales as a unit; a bad deploy takes everything down.",
        choice:
          "One app, one database, modules that own their tables and talk through interfaces.",
        prod:
          "Teams that split early often debug network traces before they debug product fit.",
        sourceIndexes: [0],
      },
      {
        title: "What the monolith buys",
        situation:
          "Features need consistent transactions and fast refactors.",
        decision:
          "Keep shared state in one place until measured pain says otherwise.",
        tradeoff:
          "You cannot scale one hot endpoint without scaling the rest.",
        choice:
          "One log stream, real transactions, refactors the test suite can follow, rollback in one step.",
        prod:
          "Incident response stays in one repository until profiling proves a hotspot.",
        sourceIndexes: [0, 1],
      },
      {
        title: "When a split is justified",
        situation:
          "Traffic grows and one subsystem needs a different release cadence or compliance boundary.",
        decision:
          "Split on evidence from incidents and profiles, not on a slide.",
        tradeoff:
          "Services add deployment, tracing, and failure modes you previously avoided.",
        choice:
          "Extract only when scaling profile, team boundary, isolation need, or measured pain clears the bar. Queue heavy work from day one so the boundary can move later.",
        prod:
          "Partial splits without queues become the worst of both models.",
        sourceIndexes: [1],
      },
    ],
  },
  email: {
    storyLede:
      "Transactional email fails quietly: the app thinks it sent, the user never sees it, and the code path looked fine in staging.",
    storySteps: [
      {
        title: "Separate app mail from marketing",
        situation:
          "Product and newsletter share one domain and one reputation.",
        decision:
          "Put transactional mail on a subdomain and protect its reputation.",
        tradeoff:
          "More DNS records and provider setup before launch.",
        choice:
          "App mail from mail.example.com; marketing on its own stream with unsubscribe on bulk mail.",
        prod:
          "One bad campaign can push password resets into spam for everyone on the domain.",
        sourceIndexes: [0, 1],
      },
      {
        title: "SPF and DKIM without breaking DNS",
        situation:
          "Multiple tools append TXT records and someone adds a second SPF line.",
        decision:
          "Publish one SPF record and sign with DKIM at 2048-bit where offered.",
        tradeoff:
          "SPF lookup limits cap how many includes you can chain.",
        choice:
          "Single SPF, provider include, DKIM published and verified before go-live.",
        prod:
          "Two SPF records fail authentication for every message until DNS is fixed.",
        sourceIndexes: [2],
      },
      {
        title: "DMARC in phases",
        situation:
          "Receivers start rejecting mail that fails alignment.",
        decision:
          "Roll DMARC from monitor to enforce without blocking your own invoices.",
        tradeoff:
          "p=reject protects the domain; misconfiguration blocks legitimate mail.",
        choice:
          "Start at p=none with reports, read them for two to four weeks, then quarantine, then reject.",
        prod:
          "Jumping straight to reject without reports is how teams lock themselves out of their own domain.",
        sourceIndexes: [3, 0],
      },
      {
        title: "Verify before launch day",
        situation:
          "DNS propagates slowly and launch is tomorrow morning.",
        decision:
          "Send test messages and read Gmail headers the week before.",
        tradeoff:
          "Waiting a week delays other work.",
        choice:
          "Show original in Gmail: spf=pass, dkim=pass, dmarc=pass. Meet bulk sender rules if volume applies.",
        prod:
          "Morning-of DNS changes are the ones that miss propagation when users arrive.",
        sourceIndexes: [0, 4],
      },
    ],
  },
  seo: {
    storyLede:
      "Redesigns feel like a visual project. For organic traffic they are migrations: every old URL is a contract you either honor or break.",
    storySteps: [
      {
        title: "Inventory before pixels",
        situation:
          "New URLs are cleaner and marketing wants the rebrand live.",
        decision:
          "Build the redirect map before design sign-off.",
        tradeoff:
          "A day of URL work delays mockups.",
        choice:
          "Collect old URLs from sitemap, analytics landings, Search Console, and backlinks first.",
        prod:
          "Traffic slides for weeks when launches skip the map; recovery is slower than the redirect work would have been.",
        sourceIndexes: [0],
      },
      {
        title: "One hop to the best match",
        situation:
          "Someone suggests sending every old path to the homepage.",
        decision:
          "Map each old URL to the closest new page.",
        tradeoff:
          "Partial matches take judgment and content work.",
        choice:
          "Server-side 301, single hop, update internal links and sitemap to the new URLs.",
        prod:
          "Mass homepage redirects look like soft 404s to search engines.",
        sourceIndexes: [0, 1],
      },
      {
        title: "Keep redirects and watch crawl",
        situation:
          "The launch team wants to remove old rules after a month.",
        decision:
          "Treat redirects as part of the asset you bought with the old site.",
        tradeoff:
          "Long redirect lists are tedious to maintain.",
        choice:
          "Keep 301s indefinitely; crawl the old list after launch; watch 404s and indexing for eight weeks.",
        prod:
          "Removing redirects early erases years of links for a short-term tidy config file.",
        sourceIndexes: [0, 2],
      },
    ],
  },
  pricing: {
    storyLede:
      "Pricing is a product decision with public consequences. I prefer numbers on the page, a clear unit of value, and tradeoffs I can explain without a spreadsheet apology.",
    storySteps: [
      {
        title: "Charge from day one with a clear unit",
        situation:
          "Free signups grow but revenue and intent stay fuzzy.",
        decision:
          "Publish price before the first signup and tie it to the action users value.",
        tradeoff:
          "Free forever maximizes top of funnel; it delays learning who will pay.",
        choice:
          "Public price, free only as a bounded phase. On a marketplace, the unit is often the reply or the job, not the profile.",
        prod:
          "Without a price on the page, every roadmap debate mixes growth with monetization.",
        sourceIndexes: [0, 2],
      },
      {
        title: "Fixed scope over open-ended meters",
        situation:
          "Clients ask for hourly support on a launch engagement.",
        decision:
          "Fix price after a small paid discovery step.",
        tradeoff:
          "Fixed price shifts overrun risk to the studio.",
        choice:
          "A small audit credited toward a fixed sprint band; ongoing care as a flat monthly cancel-anytime line.",
        prod:
          "Hourly billing rewards slow discovery; fixed pricing forces honest estimates up front.",
        sourceIndexes: [1],
      },
      {
        title: "Commitment as a choice",
        situation:
          "Annual-only contracts boost cash but anger users who churn early.",
        decision:
          "Offer monthly and yearly with a reason to stay, not a trap.",
        tradeoff:
          "Yearly discounts reduce MRR per seat.",
        choice:
          "Monthly and yearly side by side; reward yearly with time, not lock-in clauses.",
        prod:
          "Renewals that must be earned produce fewer angry chargebacks than forced terms.",
        sourceIndexes: [0],
      },
    ],
  },
  docs: {
    storyLede:
      "Onboarding speed is documentation speed. Before a new hire or contractor merges, I want four short files that answer run, architecture, decisions, and rules.",
    storySteps: [
      {
        title: "Runbook before repo tour",
        situation:
          "A newcomer asks how to deploy in chat every week.",
        decision:
          "Write commands before explanations.",
        tradeoff:
          "Runbooks go stale if nobody owns them.",
        choice:
          "RUNBOOK.md with local run, test, deploy, rollback, logs, and who gets paged.",
        prod:
          "Tribal knowledge ships guesses; guesses ship bugs that the next person re-guesses.",
        sourceIndexes: [],
      },
      {
        title: "Architecture for money paths",
        situation:
          "Modules overlap and nobody knows which table owns billing state.",
        decision:
          "Document modules, owned tables, and the three journeys that pay.",
        tradeoff:
          "Architecture docs can balloon into unreadable wikis.",
        choice:
          "One short ARCHITECTURE.md: modules, data flow for signup, core action, payment, external dependencies.",
        prod:
          "Outages stretch when three people each think a different service owns the broken table.",
        sourceIndexes: [0, 1],
      },
      {
        title: "Decisions and rules",
        situation:
          "A smart newcomer refactors a deliberate tradeoff.",
        decision:
          "Record big choices and no-go zones.",
        tradeoff:
          "ADR overhead feels heavy on a two-person team.",
        choice:
          "DECISIONS/ with context and consequences; RULES.md for naming, logging, migrations, billing, auth review.",
        prod:
          "Without written decisions, every new contributor relitigates the same boundary calls.",
        sourceIndexes: [0, 2],
      },
    ],
  },
};

export function applyStories(episodes) {
  return episodes.map((ep) => {
    const story = STORY_BY_SLUG[ep.slug];
    if (!story) return ep;
    return { ...ep, ...story };
  });
}
