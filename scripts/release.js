'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { readJSON, runMain } = require('./lib/cli.js');

const ROOT_DIR       = path.resolve(__dirname, '..');
const PACKAGE_PATH   = path.join(ROOT_DIR, 'package.json');
const CHANGELOG_PATH = path.join(ROOT_DIR, 'CHANGELOG.md');

function latestChangelogVersion() {
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const top = changelog.match(/^## \[([^\]]+)\]/m);

  if (!top) {
    throw new Error('CHANGELOG.md has no "## [...]" heading.');
  }
  if (!/^\d+\.\d+\.\d+$/.test(top[1])) {
    throw new Error(
      `CHANGELOG.md's latest heading is "${top[1]}", not a released version yet. ` +
      'Finalize it (e.g. rename "## [Unreleased]" to "## [X.Y.Z] - date") before running npm run release.'
    );
  }

  return top[1];
}

function main() {
  const target  = latestChangelogVersion();
  const current = readJSON(PACKAGE_PATH).version;

  if (target === current) {
    console.log(`✓ Already at v${target}, matching CHANGELOG.md`);
    return;
  }

  console.log(`Releasing v${target} (from CHANGELOG.md, currently v${current})...`);
  execFileSync('npm', ['version', target], { cwd: ROOT_DIR, stdio: 'inherit' });
}

runMain(main);
