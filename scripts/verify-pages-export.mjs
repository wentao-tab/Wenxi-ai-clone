import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const outDir = "out";
const basePath = (process.argv[2] || process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const htmlFiles = [];
const failures = [];

if (!basePath) {
  failures.push("Missing basePath. Pass it as an argument, for example: /Wenxi-ai-clone");
}

if (!existsSync(outDir)) {
  failures.push("Missing out directory. Run the Pages build before verification.");
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) {
      walk(path);
    } else if (path.endsWith(".html")) {
      htmlFiles.push(path);
    }
  }
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function isIgnoredUrl(url) {
  return (
    !url ||
    url.startsWith("#") ||
    url.startsWith("data:") ||
    url.startsWith("blob:") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("javascript:") ||
    /^https?:\/\//.test(url)
  );
}

function stripUrl(url) {
  return url.split("#")[0].split("?")[0];
}

function pathExists(pathname) {
  const cleanPath = stripUrl(pathname);
  const localPath = cleanPath === basePath ? "/" : cleanPath.slice(basePath.length);
  const normalized = localPath === "/" ? "index.html" : localPath.replace(/^\//, "");
  const candidates = [
    join(outDir, normalized),
    join(outDir, `${normalized}.html`),
    join(outDir, normalized, "index.html"),
  ];
  return candidates.some((candidate) => existsSync(candidate));
}

function recordFailure(file, message) {
  failures.push(`${relative(".", file)}: ${message}`);
}

if (existsSync(outDir)) {
  walk(outDir);
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");

  if (html.includes("_next/image")) {
    recordFailure(file, "contains Next image optimizer URL (_next/image), which does not work on GitHub Pages static export");
  }

  const attrPattern = /\b(?:href|src|srcSet|imageSrcSet)=["']([^"']+)["']/g;
  for (const match of html.matchAll(attrPattern)) {
    const rawValue = decodeHtml(match[1]);
    const urls = rawValue.includes(",")
      ? rawValue.split(",").map((part) => part.trim().split(/\s+/)[0])
      : [rawValue.trim().split(/\s+/)[0]];

    for (const url of urls) {
      if (isIgnoredUrl(url)) continue;

      if (url.startsWith("/") && !url.startsWith(`${basePath}/`) && url !== basePath) {
        recordFailure(file, `absolute URL is missing basePath: ${url}`);
        continue;
      }

      if (url.startsWith(basePath) && !pathExists(url)) {
        recordFailure(file, `referenced export path is missing: ${url}`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(`Pages export verification failed (${failures.length} issue${failures.length > 1 ? "s" : ""}):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Pages export verified: ${htmlFiles.length} HTML files, basePath ${basePath}`);
