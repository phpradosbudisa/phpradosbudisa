import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  SITE,
  EPISODES,
  FILTERS,
  getPrompt,
  moreEpisodes,
} from "./episodes.mjs";

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
  return `<footer class="site-footer wrap">
<nav aria-label="Footer">
<a href="${prefix}privacy/">Privacy</a>
<a href="${SITE.instagram}" rel="noopener noreferrer">Instagram</a>
</nav>
<p>© ${new Date().getFullYear()} ${esc(SITE.name)} · Examples use example.com; no client data.</p>
</footer>`;
}

function headerBlock(depth, { showHomeLink = false } = {}) {
  const prefix = assetPrefix(depth);
  const home = showHomeLink
    ? `<a class="home-link" href="${prefix}">← All checklists</a>`
    : "";
  return `${home}<header class="site-header wrap">
<div class="header-inner">
<img src="${prefix}assets/avatar_circle.png" width="72" height="72" alt="">
<div class="header-text">
<p class="tagline"><strong>${esc(SITE.name)}</strong> · ${esc(SITE.positioning)}</p>
</div>
</div>
</header>`;
}

function ctaSoft(slug, depth) {
  const prefix = assetPrefix(depth);
  const audit = `https://convertixdigital.com/en/audit?utm_source=ship-hub&utm_content=${slug}`;
  return `<section class="cta-soft wrap" aria-labelledby="cta-${slug}">
<h2 id="cta-${slug}" class="visually-hidden">Convertix audit</h2>
<p><strong>Need it done?</strong> Launch audit for AI-built apps. €390, 3 working days. A senior developer reads your code, database rules and payment flow, then tells you what to fix before real users arrive. <a href="${audit}">See the audit →</a></p>
<p class="vat">Convertix Digital (Pika Care d.o.o., Slovenia) is not VAT-registered. VAT is not charged under Art. 94(1) ZDDV-1.</p>
</section>`;
}

function renderChecklist(ep) {
  let itemIndex = 0;
  let html = `<section class="checklist" aria-labelledby="checklist-heading">
<h2 id="checklist-heading">Full checklist</h2>`;
  for (const sec of ep.sections) {
    if (sec.title) html += `<h2>${esc(sec.title)}</h2>`;
    if (sec.lead) {
      for (const p of sec.lead) {
        html += `<p class="lead">${esc(p)}</p>`;
      }
    }
    if (sec.items.length) {
      html += "<ol>";
      for (const item of sec.items) {
        const id = `${ep.slug}-${itemIndex++}`;
        html += `<li><input type="checkbox" id="${id}" data-item="${id}" aria-label="Checklist item"><label for="${id}">${item}</label></li>`;
      }
      html += "</ol>";
    }
    if (sec.footer) {
      html += `<p class="lead">${esc(sec.footer)}</p>`;
    }
  }
  html += "</section>";
  return html;
}

function renderPrompt(ep) {
  const text = getPrompt(ep);
  const id = `prompt-${ep.slug}`;
  return `<section class="prompt-section" aria-labelledby="prompt-heading">
<h2 id="prompt-heading">Copy-paste prompt</h2>
<div class="copy-row">
<button type="button" data-copy-target="${id}">Copy prompt</button>
<span class="hint">Paste into your coding assistant.</span>
</div>
<pre class="prompt-block" id="${id}">${esc(text)}</pre>
</section>`;
}

function renderSources(ep) {
  let html = `<section class="sources" aria-labelledby="sources-heading">
<h2 id="sources-heading">Official sources</h2><ul>`;
  for (const s of ep.sources) {
    html += `<li><a href="${esc(s.url)}" rel="noopener noreferrer">${esc(s.title)}</a><span>${esc(s.note)}</span></li>`;
  }
  html += "</ul></section>";
  return html;
}

function renderMoreCards(ep, depth) {
  const prefix = assetPrefix(depth);
  const others = moreEpisodes(ep.slug);
  let html = `<section class="more-checklists wrap" aria-labelledby="more-heading">
<h2 id="more-heading">More checklists</h2>
<div class="episode-grid">`;
  for (const card of others) {
    html += `<a class="card" href="${prefix}${card.slug}/">
<span class="card-num">#${card.num}</span>
<span class="keyword">${esc(card.keyword)}</span>
<h3>${esc(card.title)}</h3>
<p class="card-promise">${esc(card.promise)}</p>
<span class="card-date">${esc(card.date)}</span>
</a>`;
  }
  html += "</div></section>";
  return html;
}

function episodePage(ep) {
  const depth = 1;
  const prefix = assetPrefix(depth);
  const url = `${SITE.baseUrl}/${ep.slug}/`;
  const body = `<body data-episode="${ep.slug}">
<a class="skip-link" href="#main">Skip to content</a>
${headerBlock(depth, { showHomeLink: true })}
<main id="main" class="wrap">
<article>
<div class="episode-hero">
<h1>${esc(ep.title)}</h1>
<p class="episode-promise">${esc(ep.promise)}</p>
<p class="episode-meta">From the post on ${esc(ep.date)}</p>
</div>
${renderChecklist(ep)}
${renderPrompt(ep)}
${renderSources(ep)}
</article>
${ctaSoft(ep.slug, depth)}
${renderMoreCards(ep, depth)}
</main>
${footer(depth)}
<script src="${prefix}assets/main.js" defer></script>
</body>`;
  return headMeta({
    title: ep.title,
    description: ep.promise,
    url,
    depth,
  }) + body + "\n</html>\n";
}

function homePage() {
  const depth = 0;
  const url = `${SITE.baseUrl}/`;
  let grid = "";
  for (const ep of EPISODES) {
    grid += `<a class="card" href="${ep.slug}/" data-kind="${ep.kind}">
<span class="card-num">#${ep.num}</span>
<span class="keyword">${esc(ep.keyword)}</span>
<h2>${esc(ep.title)}</h2>
<p class="card-promise">${esc(ep.promise)}</p>
<span class="card-date">${esc(ep.date)}</span>
</a>`;
  }
  let filters = `<div class="filter-bar" role="navigation" aria-label="Filter by kind">`;
  for (const f of FILTERS) {
    filters += `<a class="filter-chip" href="#" data-filter="${f.id}">${esc(f.label)}</a>`;
  }
  filters += "</div>";

  const body = `<body>
<a class="skip-link" href="#main">Skip to content</a>
${headerBlock(depth)}
<main id="main" class="wrap">
<div class="header-text" style="margin-bottom:1.5rem">
<h1>${esc(SITE.title)}</h1>
<p class="tagline">Senior developer · ${esc(SITE.positioning)}</p>
<p class="tagline">${esc(SITE.metaDescription)}</p>
<a class="ig-link" href="${SITE.instagram}" rel="noopener noreferrer">Instagram</a>
</div>
<p class="intro">${esc(SITE.intro)}</p>
<section class="projects" aria-labelledby="projects-heading">
<h2 id="projects-heading">Projects</h2>
<ul>
<li><a href="https://convertixdigital.com" rel="noopener noreferrer">Convertix</a> — launch studio</li>
<li><a href="https://urejamo.si" rel="noopener noreferrer">Urejamo.si</a> — local services marketplace</li>
</ul>
</section>
${filters}
<div class="episode-grid" id="episode-grid">${grid}</div>
${ctaSoft("home", depth)}
</main>
${footer(depth)}
<script>
(function(){
  var chips=document.querySelectorAll(".filter-chip");
  var cards=document.querySelectorAll("#episode-grid .card");
  function setActive(id){
    chips.forEach(function(c){c.setAttribute("aria-current",c.getAttribute("data-filter")===id?"true":"false");});
    cards.forEach(function(card){
      var show=id==="all"||card.getAttribute("data-kind")===id;
      card.style.display=show?"":"none";
    });
  }
  chips.forEach(function(chip){
    chip.addEventListener("click",function(e){
      e.preventDefault();
      setActive(chip.getAttribute("data-filter"));
    });
  });
  setActive("all");
})();
</script>
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
${headerBlock(depth, { showHomeLink: true })}
<main id="main" class="wrap legal-page">
<h1>${esc(title)}</h1>
${bodyHtml}
</main>
${ctaSoft(slug, depth)}
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
${headerBlock(depth)}
<main class="wrap not-found">
<h1>Page not found</h1>
<p>That checklist is not here. <a href="./">Back to Ship</a></p>
</main>
${ctaSoft("404", depth)}
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
