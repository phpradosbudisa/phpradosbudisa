import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SITE, EPISODES, getPrompt } from "./episodes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "docs");

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function assetPrefix(depth) {
  return depth === 0 ? "" : "../".repeat(depth);
}

function epLabel(num) {
  return `Ep. ${String(num).padStart(2, "0")}`;
}

function sourceDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function countChecklistItems(ep) {
  let n = 0;
  for (const sec of ep.sections) n += sec.items.length;
  return n;
}

function episodeIndex(slug) {
  return EPISODES.findIndex((e) => e.slug === slug);
}

function headMeta({ title, description, url, depth }) {
  const prefix = assetPrefix(depth);
  const fullTitle = title === SITE.title ? title : `${title} · Ship`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(description)}">
<link rel="stylesheet" href="${prefix}assets/styles.css">
<link rel="stylesheet" href="${prefix}assets/print.css" media="print">
</head>`;
}

function footer(depth) {
  const prefix = assetPrefix(depth);
  const y = new Date().getFullYear();
  return `<footer class="site-footer wrap">
<p>© ${y} ${esc(SITE.name)} · <a href="${prefix}privacy/">Privacy</a> · <a href="${SITE.instagram}" rel="noopener noreferrer">Instagram</a> · Examples use example.com; no client data.</p>
</footer>`;
}

function brandBar(depth) {
  const prefix = assetPrefix(depth);
  return `<header class="wrap brand-bar">
<a class="brand-link" href="${prefix}">
<img class="brand-avatar" src="${prefix}assets/avatar_circle.png" width="48" height="48" alt="">
<span class="brand-name"><span class="hl">Ship</span></span>
</a>
</header>`;
}

function homeHero(depth) {
  const prefix = assetPrefix(depth);
  return `<header class="hero wrap">
<div class="hero-layout">
<img class="hero-avatar" src="${prefix}assets/avatar_circle.png" width="144" height="144" alt="">
<div>
<h1 class="hero-title"><span class="hl">Ship</span></h1>
<p class="hero-sub">what actually breaks when you go live</p>
<p class="hero-bio">Senior developer · ${esc(SITE.positioning)}</p>
<p class="hero-meta">${esc(SITE.metaDescription)}</p>
<div class="pill-row">
<a class="pill" href="${SITE.instagram}" rel="noopener noreferrer">Instagram</a>
<a class="pill" href="#projects">Projects</a>
</div>
</div>
</div>
</header>`;
}

function ctaAudit(slug, depth) {
  const audit = `https://convertixdigital.com/en/audit?utm_source=ship-hub&utm_content=${slug}`;
  return `<section class="cta-audit wrap" aria-labelledby="cta-${slug}">
<h2 id="cta-${slug}" class="visually-hidden">Convertix audit</h2>
<p><strong>Need it done?</strong> Launch audit for AI-built apps. €390, 3 working days. A senior developer reads your code, database rules and payment flow, then tells you what to fix before real users arrive.</p>
<p class="vat">Convertix Digital (Pika Care d.o.o., Slovenia) is not VAT-registered. VAT is not charged under Art. 94(1) ZDDV-1.</p>
<a class="btn-audit" href="${audit}">See the audit →</a>
</section>`;
}

function renderChecklist(ep) {
  const total = countChecklistItems(ep);
  let itemIndex = 0;
  let html = `<section class="checklist" aria-labelledby="checklist-heading">
<div class="checklist-head">
<h2 id="checklist-heading">Checklist</h2>
<span id="checklist-progress" class="checklist-progress">0 / ${total} done</span>
</div>`;
  for (const sec of ep.sections) {
    html += `<div class="checklist-section">`;
    if (sec.title) html += `<h3>${esc(sec.title)}</h3>`;
    if (sec.lead) {
      for (const p of sec.lead) {
        html += `<p class="lead">${esc(p)}</p>`;
      }
    }
    if (sec.items.length) {
      html += `<ul class="checklist-items">`;
      for (const item of sec.items) {
        const id = `${ep.slug}-${itemIndex++}`;
        html += `<li><label class="checklist-row"><input type="checkbox" id="${id}" data-item="${id}"><span class="check-ui" aria-hidden="true"></span><span class="check-body">${item}</span></label></li>`;
      }
      html += `</ul>`;
    }
    if (sec.footer) {
      html += `<p class="lead">${esc(sec.footer)}</p>`;
    }
    html += `</div>`;
  }
  html += `</section>`;
  return html;
}

function renderPrompt(ep) {
  const text = getPrompt(ep);
  const id = `prompt-${ep.slug}`;
  return `<section class="prompt-section" aria-labelledby="prompt-heading">
<h2 id="prompt-heading">Copy-paste prompt</h2>
<div class="prompt-card">
<div class="prompt-toolbar">
<span>Paste into your coding assistant</span>
<button type="button" data-copy-target="${id}">Copy prompt</button>
</div>
<pre class="prompt-block" id="${id}">${esc(text)}</pre>
</div>
</section>`;
}

function renderSources(ep) {
  let html = `<section class="sources" aria-labelledby="sources-heading">
<h2 id="sources-heading">Official sources</h2>
<ul class="source-list">`;
  for (const s of ep.sources) {
    html += `<li><span class="source-domain">${esc(sourceDomain(s.url))}</span><a href="${esc(s.url)}" rel="noopener noreferrer">${esc(s.title)}</a><span class="source-note">${esc(s.note)}</span></li>`;
  }
  html += `</ul></section>`;
  return html;
}

function episodeNav(ep, depth) {
  const prefix = assetPrefix(depth);
  const idx = episodeIndex(ep.slug);
  const newer = idx > 0 ? EPISODES[idx - 1] : null;
  const older = idx >= 0 && idx < EPISODES.length - 1 ? EPISODES[idx + 1] : null;
  if (!newer && !older) return "";
  const count = (newer ? 1 : 0) + (older ? 1 : 0);
  let html = `<nav class="episode-nav wrap${count === 1 ? " episode-nav--single" : ""}" aria-label="Episode navigation">`;
  if (newer) {
    html += `<a class="ep-nav-link prev" href="${prefix}${newer.slug}/"><span class="ep-nav-label">← ${epLabel(newer.num)}</span><span class="ep-nav-title">${esc(newer.title)}</span></a>`;
  } else {
    html += `<span></span>`;
  }
  if (older) {
    html += `<a class="ep-nav-link next" href="${prefix}${older.slug}/"><span class="ep-nav-label">${epLabel(older.num)} →</span><span class="ep-nav-title">${esc(older.title)}</span></a>`;
  }
  html += `</nav>`;
  return html;
}

function episodePage(ep) {
  const depth = 1;
  const prefix = assetPrefix(depth);
  const url = `${SITE.baseUrl}/${ep.slug}/`;
  const body = `<body data-episode="${ep.slug}">
<a class="skip-link" href="#main">Skip to content</a>
<a class="home-link wrap" href="${prefix}">← All checklists</a>
${brandBar(depth)}
<main id="main" class="wrap">
<article>
<header class="episode-page-head">
<h1>${esc(ep.title)}</h1>
<p class="lead-promise">${esc(ep.promise)}</p>
<p class="episode-meta">From the post on ${esc(ep.date)}</p>
</header>
${renderChecklist(ep)}
${renderPrompt(ep)}
${renderSources(ep)}
</article>
${episodeNav(ep, depth)}
${ctaAudit(ep.slug, depth)}
</main>
${footer(depth)}
<script src="${prefix}assets/main.js" defer></script>
</body>`;
  return (
    headMeta({
      title: ep.title,
      description: ep.promise,
      url,
      depth,
    }) +
    body +
    "\n</html>\n"
  );
}

function homePage() {
  const depth = 0;
  const url = `${SITE.baseUrl}/`;
  let rows = "";
  for (const ep of EPISODES) {
    rows += `<li class="episode-row"><a href="${ep.slug}/"><span class="ep-num">${epLabel(ep.num)}</span><span class="ep-tag">${esc(ep.keyword)}</span><span class="ep-title">${esc(ep.title)}</span><span class="ep-date">${esc(ep.date)}</span><span class="ep-arrow" aria-hidden="true">→</span></a></li>`;
  }
  const body = `<body>
<a class="skip-link" href="#main">Skip to content</a>
${homeHero(depth)}
<main id="main" class="wrap">
<p class="intro-block">${esc(SITE.intro)}</p>
<section class="projects-section" id="projects" aria-labelledby="projects-heading">
<p class="section-label" id="projects-heading">Projects</p>
<div class="project-grid">
<a class="project-card" href="https://convertixdigital.com" rel="noopener noreferrer">
<div class="project-card-head"><h3>Convertix</h3><span class="arrow" aria-hidden="true">→</span></div>
<p>Launch studio.</p>
<span class="project-domain">convertixdigital.com</span>
</a>
<a class="project-card" href="https://urejamo.si" rel="noopener noreferrer">
<div class="project-card-head"><h3>Urejamo.si</h3><span class="arrow" aria-hidden="true">→</span></div>
<p>Local services marketplace.</p>
<span class="project-domain">urejamo.si</span>
</a>
</div>
</section>
<section class="episode-list-section" aria-labelledby="episodes-heading">
<p class="section-label" id="episodes-heading">Checklists</p>
<ul class="episode-list">${rows}</ul>
</section>
${ctaAudit("home", depth)}
</main>
${footer(depth)}
</body>`;
  return (
    headMeta({
      title: SITE.title,
      description: SITE.metaDescription,
      url,
      depth,
    }) +
    body +
    "\n</html>\n"
  );
}

function legalPage({ title, bodyHtml, slug }) {
  const depth = 1;
  const url = `${SITE.baseUrl}/${slug}/`;
  return (
    headMeta({ title, description: title, url, depth }) +
    `<body>
<a class="skip-link" href="#main">Skip to content</a>
<a class="home-link wrap" href="../">← All checklists</a>
${brandBar(depth)}
<main id="main" class="wrap legal-page">
<h1>${esc(title)}</h1>
${bodyHtml}
</main>
${ctaAudit(slug, depth)}
${footer(depth)}
</body>
</html>
`
  );
}

function notFoundPage() {
  const depth = 0;
  return (
    headMeta({
      title: "Page not found",
      description: "This checklist page does not exist.",
      url: `${SITE.baseUrl}/404.html`,
      depth,
    }) +
    `<body>
${brandBar(depth)}
<main class="wrap not-found">
<h1>Page not found</h1>
<p>That checklist is not here. <a href="./">Back to Ship</a></p>
</main>
${ctaAudit("404", depth)}
${footer(depth)}
</body>
</html>
`
  );
}

function sitemap() {
  const urls = [
    { loc: `${SITE.baseUrl}/`, priority: "1.0" },
    ...EPISODES.map((e) => ({
      loc: `${SITE.baseUrl}/${e.slug}/`,
      priority: "0.8",
      lastmod: e.dateIso,
    })),
    { loc: `${SITE.baseUrl}/privacy/`, priority: "0.3" },
  ];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const u of urls) {
    xml += "  <url>\n";
    xml += `    <loc>${u.loc}</loc>\n`;
    if (u.lastmod) xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += "  </url>\n";
  }
  xml += "</urlset>\n";
  return xml;
}

function robots() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}/sitemap.xml\n`;
}

function copyAssets() {
  const assetsOut = path.join(outDir, "assets");
  fs.mkdirSync(assetsOut, { recursive: true });
  const copies = [
    ["styles.css", path.join(__dirname, "styles.css")],
    ["main.js", path.join(__dirname, "main.js")],
    ["print.css", path.join(__dirname, "print.css")],
    ["avatar_circle.png", path.join(__dirname, "assets", "avatar_circle.png")],
  ];
  for (const [name, src] of copies) {
    fs.copyFileSync(src, path.join(assetsOut, name));
  }
  const fontsSrc = path.join(__dirname, "assets", "fonts");
  const fontsOut = path.join(assetsOut, "fonts");
  fs.mkdirSync(fontsOut, { recursive: true });
  for (const f of fs.readdirSync(fontsSrc)) {
    if (f.endsWith(".woff2")) {
      fs.copyFileSync(path.join(fontsSrc, f), path.join(fontsOut, f));
    }
  }
}

function writeFile(rel, content) {
  const full = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, "utf8");
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
copyAssets();
writeFile("index.html", homePage());
for (const ep of EPISODES) {
  writeFile(`${ep.slug}/index.html`, episodePage(ep));
}
writeFile(
  "privacy/index.html",
  legalPage({
    slug: "privacy",
    title: "Privacy",
    bodyHtml: `<p>At launch, this site collects no personal data through forms. Checklist progress is stored only in your browser (localStorage).</p>
<h2>Purpose &amp; legal basis</h2>
<p>Static checklists for information only. No account system.</p>
<h2>Processors</h2>
<p>Hosting: GitHub Pages. Analytics (if enabled): cookieless (Cloudflare Web Analytics or GA4 without cookies).</p>
<h2>Retention &amp; rights</h2>
<p>No server-side personal data at launch. You can clear localStorage in your browser. Contact the site owner for privacy requests.</p>`,
  })
);
writeFile("404.html", notFoundPage());
writeFile("sitemap.xml", sitemap());
writeFile("robots.txt", robots());

console.log("Built docs/ (" + (EPISODES.length + 3) + " pages)");
