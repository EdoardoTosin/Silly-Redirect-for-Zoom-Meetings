'use strict';

const fs = require('fs');
const path = require('path');
const { marked, Renderer } = require('marked');
const { runMain } = require('./lib/cli.js');

const ROOT_DIR    = path.resolve(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const OUTPUT_PATH = path.join(ROOT_DIR, 'docs', 'index.html');

const OWNER  = 'EdoardoTosin';
const REPO   = 'Silly-Redirect-for-Zoom-Meetings';
const BRANCH = 'main';

const RAW_BASE  = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/`;
const BLOB_BASE = `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}/`;
const PAGE_URL  = `https://${OWNER.toLowerCase()}.github.io/${REPO}/`;

const PAGE_TITLE = 'Silly Redirect for Zoom Meetings';
const PAGE_DESCRIPTION =
  "Skips Zoom's app-download prompt and joins meetings directly in your browser, on Zoom and ZoomGov links alike. " +
  'A simple on/off toggle, a dashboard that follows your system theme, and no data collection.';
const PAGE_ICON  = `${RAW_BASE}src/icons/256x256.png`;
const PAGE_SOCIAL_IMAGE = `${RAW_BASE}assets/social-preview.png`;

function isRelativeUrl(url) {
  return !/^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(url);
}

function toAssetUrl(url) {
  return isRelativeUrl(url) ? RAW_BASE + url.replace(/^\.\//, '') : url;
}

function toDocUrl(url) {
  return isRelativeUrl(url) ? BLOB_BASE + url.replace(/^\.\//, '') : url;
}

function slugify(text) {
  // Matches GitHub's heading-slug algorithm (no hyphen collapsing), so anchors like #permissions--privacy still resolve.
  return text.toLowerCase().replace(/[^a-z0-9 _-]/g, '').replace(/ /g, '-');
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Raw HTML in the README passes through marked untouched, so rewrite its attributes on the source text first.
function rewriteHtmlAttributes(markdown) {
  return markdown
    .replace(/\bsrc="([^"]+)"/g, (_m, url) => `src="${toAssetUrl(url)}"`)
    .replace(/\bhref="([^"]+)"/g, (_m, url) => `href="${toDocUrl(url)}"`);
}

// marked doesn't support GitHub's `> [!NOTE]`-style alerts, so rewrite them into a styled <div> first.
function convertAlerts(markdown) {
  const ALERT_RE = /^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\][ \t]*\r?\n((?:>.*(?:\r?\n|$))*)/gm;

  return markdown.replace(ALERT_RE, (_match, type, body) => {
    const inner = body
      .split(/\r?\n/)
      .map((line) => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim();
    const label = type.charAt(0) + type.slice(1).toLowerCase();
    const cls   = type.toLowerCase();

    return `<div class="markdown-alert markdown-alert-${cls}">\n` +
      `<p class="markdown-alert-title">${label}</p>\n` +
      `${marked.parse(inner)}</div>\n\n`;
  });
}

function configureRenderer() {
  const renderer = new Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const html = this.parser.parseInline(tokens);
    const text = this.parser.parseInline(tokens, this.parser.textRenderer);
    const id   = slugify(text);
    return `<h${depth} id="${id}"><a class="header-link" href="#${id}"></a>${html}</h${depth}>\n`;
  };

  renderer.link = function ({ href, title, tokens }) {
    return Renderer.prototype.link.call(this, { href: toDocUrl(href), title, tokens });
  };

  renderer.image = function ({ href, title, text, tokens }) {
    return Renderer.prototype.image.call(this, { href: toAssetUrl(href), title, text, tokens });
  };

  renderer.code = function ({ text, lang, escaped }) {
    const language  = (lang || '').match(/\S*/)?.[0] || '';
    const classAttr = language ? ` class="hljs language-${language}"` : ' class="hljs"';
    const body      = escaped ? text : escapeHtml(text);
    return `<pre><code${classAttr}>${body}\n</code></pre>\n`;
  };

  renderer.paragraph = function ({ tokens }) {
    const html = this.parser.parseInline(tokens);
    const isSingleImage = tokens.length === 1 && tokens[0].type === 'image';
    return isSingleImage ? `<p class="img-container">${html}</p>\n` : `<p>${html}</p>\n`;
  };

  marked.use({ renderer });
}

function buildArticleHtml(readmeMarkdown) {
  const withAbsoluteAttrs = rewriteHtmlAttributes(readmeMarkdown);
  const withAlerts        = convertAlerts(withAbsoluteAttrs);
  return marked.parse(withAlerts);
}

function buildPage(articleHtml) {
  return `<!doctype html>
<html lang="en">

<head>
  <title>${PAGE_TITLE}</title>
  <meta charset="utf-8">
  <link rel="icon" href="${PAGE_ICON}">

  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
  <meta name="color-scheme" content="dark light">
  <meta name="description" content="${PAGE_DESCRIPTION}">
  <meta name="image" content="${PAGE_SOCIAL_IMAGE}">
  <meta itemprop="name" content="${PAGE_TITLE}">
  <meta itemprop="description" content="${PAGE_DESCRIPTION}">
  <meta itemprop="image" content="${PAGE_SOCIAL_IMAGE}">
  <meta name="og:title" content="${PAGE_TITLE}">
  <meta name="og:description" content="${PAGE_DESCRIPTION}">
  <meta name="og:url" content="${PAGE_URL}">
  <meta name="og:site_name" content="${PAGE_TITLE}">
  <meta name="og:type" content="website">
  <meta name="og:image" content="${PAGE_SOCIAL_IMAGE}">
  <meta name="og:image:width" content="640">
  <meta name="og:image:height" content="320">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${PAGE_TITLE}">
  <meta name="twitter:description" content="${PAGE_DESCRIPTION}">
  <meta name="twitter:image" content="${PAGE_SOCIAL_IMAGE}">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="dark">

  <link type="text/css" rel="stylesheet" href="assets/css/github-markdown.css">
  <link type="text/css" rel="stylesheet" href="assets/css/pilcrow.css">
  <link type="text/css" rel="stylesheet" href="assets/css/hljs-github.min.css">
  <link type="text/css" rel="stylesheet" href="assets/css/theme.css">
</head>
<body>
  <article class="markdown-body">
${articleHtml}  </article>
</body>
</html>
`;
}

function main() {
  configureRenderer();

  const readme  = fs.readFileSync(README_PATH, 'utf8');
  const article = buildArticleHtml(readme);

  fs.writeFileSync(OUTPUT_PATH, buildPage(article), 'utf8');
  console.log('✓ Generated docs/index.html from README.md');
}

runMain(main);
