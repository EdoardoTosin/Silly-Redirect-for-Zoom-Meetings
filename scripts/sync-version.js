'use strict';

// Runs as npm's `version` lifecycle script; anything `git add`ed here folds into npm's own version-bump commit.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { readJSON, runMain } = require('./lib/cli.js');

const ROOT_DIR       = path.resolve(__dirname, '..');
const PACKAGE_PATH   = path.join(ROOT_DIR, 'package.json');
const README_PATH    = path.join(ROOT_DIR, 'README.md');
const CHANGELOG_PATH = path.join(ROOT_DIR, 'CHANGELOG.md');

// Reminder, not a gate: bumping the version and writing the changelog entry can happen in either
// order, so this only warns when they're out of sync instead of blocking the bump.
function warnIfChangelogMismatched(version) {
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const top = changelog.match(/^## \[([^\]]+)\]/m);

  if (!top || top[1] !== version) {
    console.warn(
      `⚠ CHANGELOG.md's latest entry is "${top ? top[1] : '(none)'}", not "${version}". ` +
      `Add or update the "## [${version}]" entry before releasing.`
    );
  }
}

// bug-report.md's "[e.g. 5.0.0]" is a reporter fill-in-the-blank, not a version reference, so it's left alone.
function syncReadmeExample(version) {
  const readme = fs.readFileSync(README_PATH, 'utf8');
  const pattern = /\(e\.g\. `v\d+\.\d+\.\d+`\)/;

  if (!pattern.test(readme)) {
    throw new Error('README.md: expected version-tag example "(e.g. `vX.Y.Z`)" not found.');
  }

  fs.writeFileSync(README_PATH, readme.replace(pattern, `(e.g. \`v${version}\`)`), 'utf8');
}

function regenerateDocs() {
  execFileSync('node', [path.join(ROOT_DIR, 'scripts', 'docs.js')], { stdio: 'inherit' });
}

function main() {
  const { version } = readJSON(PACKAGE_PATH);

  warnIfChangelogMismatched(version);
  syncReadmeExample(version);
  regenerateDocs();

  execFileSync('git', ['add', 'README.md', 'docs/index.html'], { cwd: ROOT_DIR, stdio: 'inherit' });

  console.log(`✓ Synced README.md and docs/index.html to v${version}`);
}

runMain(main);
