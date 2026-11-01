import fs from "fs";
import path from "path";
import { Resvg } from "@resvg/resvg-js";

function escXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTitle(text, maxLen) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxLen && line) {
      lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

export function generateOgImages({ pages, siteDir, outDir }) {
  const avatarPath = path.join(siteDir, "assets", "avatar_circle.png");
  const avatarB64 = fs.readFileSync(avatarPath).toString("base64");
  const serifFont = path.join(siteDir, "assets", "fonts", "dm-serif-display.woff2");
  const sansFont = path.join(siteDir, "assets", "fonts", "inter-400.woff2");
  fs.mkdirSync(outDir, { recursive: true });

  for (const page of pages) {
    const lines = wrapTitle(page.headline, 28);
    const tspans = lines
      .map((ln, i) => {
        const dy = i === 0 ? 0 : 52;
        return `<tspan x="200" dy="${dy}">${escXml(ln)}</tspan>`;
      })
      .join("");
    const sub = page.subtitle ? escXml(page.subtitle.slice(0, 120)) : "";
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#faf8f5"/>
<rect x="48" y="48" width="120" height="32" rx="8" fill="#d9f94a"/>
<text x="60" y="70" font-family="Inter" font-size="14" font-weight="600" fill="#16131b">SHIP</text>
<image href="data:image/png;base64,${avatarB64}" x="48" y="120" width="120" height="120" clip-path="url(#avclip)"/>
<defs>
<clipPath id="avclip"><circle cx="108" cy="180" r="60"/></clipPath>
</defs>
<text font-family="DM Serif Display" font-size="52" fill="#16131b">${tspans}</text>
<text x="200" y="${200 + lines.length * 52 + 24}" font-family="Inter" font-size="22" fill="#4b4454">${sub}</text>
</svg>`;
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
      font: {
        loadSystemFonts: false,
        defaultFontFamily: "Inter",
        fontFiles: [serifFont, sansFont],
      },
    });
    const png = resvg.render().asPng();
    fs.writeFileSync(path.join(outDir, `${page.slug}.png`), png);
  }
}
